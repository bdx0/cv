import { NextRequest } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  baseURL: process.env.LLM_PROXY_URL ?? "http://ddm1pro:9980/v1",
  apiKey: "proxy",
});

const MODEL = process.env.LLM_MODEL ?? "gemma-4-31b-it";
const MAX_STEPS = Number(process.env.AGENT_MAX_STEPS) || 19;

// ── Wiki root ────────────────────────────────────────────────────────────────

function wikiRoot(): string {
  return path.join(process.cwd(), "..", "wiki");
}

// ── Tools ────────────────────────────────────────────────────────────────────

const TOOLS: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "list_wiki_files",
      description: "List all files in the wiki knowledge base",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "read_wiki_file",
      description: "Read a specific wiki file",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Path relative to wiki/, e.g. 'personal/profile.md' or 'entities/skills/python.md'",
          },
        },
        required: ["path"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "write_wiki_file",
      description: "Create or update a wiki file. Use for ingest and wiki updates.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path relative to wiki/" },
          content: { type: "string", description: "Full markdown content to write" },
        },
        required: ["path", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "patch_wiki_file",
      description:
        "Edit part of an existing wiki file by exact string replacement, without rewriting the whole file. " +
        "old_text must match exactly (including whitespace) and must be unique in the file — read the file first to copy it exactly. " +
        "Prefer this over write_wiki_file for small edits (adding a line, fixing a value) to avoid losing content.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path relative to wiki/" },
          old_text: { type: "string", description: "Exact existing text to find (must be unique in the file)" },
          new_text: { type: "string", description: "Text to replace it with" },
        },
        required: ["path", "old_text", "new_text"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_wiki",
      description: "Search for a keyword across all wiki files. Returns matching excerpts.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search keyword or phrase" },
        },
        required: ["query"],
      },
    },
  },
];

// ── Tool execution ────────────────────────────────────────────────────────────

const SUBDIRS = ["personal", "entities", "concepts", "comparisons", "syntheses", "questions"];

function executeTool(name: string, args: Record<string, string>): string {
  const root = wikiRoot();

  switch (name) {
    case "list_wiki_files": {
      const lines: string[] = [];
      if (fs.existsSync(path.join(root, "index.md"))) lines.push("index.md");
      for (const sub of SUBDIRS) {
        const dir = path.join(root, sub);
        if (!fs.existsSync(dir)) continue;
        for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
          lines.push(`${sub}/${f}`);
        }
      }
      return lines.join("\n") || "(empty)";
    }

    case "read_wiki_file": {
      const target = path.resolve(root, args.path);
      if (!target.startsWith(root)) return "Error: path traversal not allowed";
      if (!fs.existsSync(target)) return `File not found: ${args.path}`;
      return fs.readFileSync(target, "utf-8");
    }

    case "write_wiki_file": {
      const target = path.resolve(root, args.path);
      if (!target.startsWith(root)) return "Error: path traversal not allowed";
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, args.content, "utf-8");
      return `✓ Written: ${args.path} (${args.content.length} chars)`;
    }

    case "patch_wiki_file": {
      const target = path.resolve(root, args.path);
      if (!target.startsWith(root)) return "Error: path traversal not allowed";
      if (!fs.existsSync(target)) return `File not found: ${args.path}`;
      const content = fs.readFileSync(target, "utf-8");
      const occurrences = content.split(args.old_text).length - 1;
      if (occurrences === 0) return `Error: old_text not found in ${args.path}. Read the file first and copy the exact text.`;
      if (occurrences > 1) return `Error: old_text matches ${occurrences} times in ${args.path} — must be unique. Add more surrounding context.`;
      const updated = content.replace(args.old_text, args.new_text);
      fs.writeFileSync(target, updated, "utf-8");
      return `✓ Patched: ${args.path}`;
    }

    case "search_wiki": {
      const q = args.query.toLowerCase();
      const results: string[] = [];
      const scan = (dir: string, prefix: string) => {
        if (!fs.existsSync(dir)) return;
        for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
          const content = fs.readFileSync(path.join(dir, f), "utf-8");
          if (!content.toLowerCase().includes(q)) continue;
          const hits = content
            .split("\n")
            .filter((l) => l.toLowerCase().includes(q))
            .slice(0, 3)
            .join("\n");
          results.push(`${prefix}/${f}:\n${hits}`);
        }
      };
      const indexPath = path.join(root, "index.md");
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, "utf-8");
        if (content.toLowerCase().includes(q)) {
          const hits = content.split("\n").filter((l) => l.toLowerCase().includes(q)).slice(0, 3).join("\n");
          results.push(`index.md:\n${hits}`);
        }
      }
      for (const sub of SUBDIRS) scan(path.join(root, sub), sub);
      return results.length ? results.join("\n\n") : "No matches found";
    }

    default:
      return `Unknown tool: ${name}`;
  }
}

// ── Initial context (lightweight — only index + personal) ─────────────────────

function loadInitialContext(): string {
  const root = wikiRoot();
  let ctx = "";
  const indexPath = path.join(root, "index.md");
  if (fs.existsSync(indexPath)) {
    ctx += `# wiki/index.md\n${fs.readFileSync(indexPath, "utf-8")}\n\n---\n\n`;
  }
  for (const f of ["profile.md", "career-goals.md"]) {
    const fp = path.join(root, "personal", f);
    if (fs.existsSync(fp)) {
      ctx += `# wiki/personal/${f}\n${fs.readFileSync(fp, "utf-8")}\n\n---\n\n`;
    }
  }
  return ctx;
}

// ── System prompt — domain knowledge from cv/AGENTS.md + dynamic tool catalog ──

function loadAgentsMd(): string {
  const agentsPath = path.join(process.cwd(), "..", "AGENTS.md");
  if (!fs.existsSync(agentsPath)) return "";
  return fs.readFileSync(agentsPath, "utf-8");
}

// Built from TOOLS itself so it can never drift from the actual function definitions —
// tool selection guidance (e.g. "prefer patch over write") lives in each tool's own
// `description`, not duplicated as prose here.
function buildToolCatalog(): string {
  const lines = TOOLS.filter((t) => t.type === "function").map(
    (t) => `- **${t.function.name}**: ${t.function.description}`
  );
  return `## Available Tools\n\n${lines.join("\n")}`;
}

// ── Agent loop ────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { messages, maxSteps, preloadContext } = await req.json();
  const effectiveMaxSteps = Number(maxSteps) > 0 ? Number(maxSteps) : MAX_STEPS;
  const shouldPreloadContext = preloadContext !== false;
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));

      const agentsMd = loadAgentsMd();
      const toolCatalog = buildToolCatalog();
      const initialCtx = shouldPreloadContext ? loadInitialContext() : "";
      const systemContent = [
        agentsMd,
        toolCatalog,
        initialCtx ? `--- WIKI CONTEXT (index + personal) ---\n${initialCtx}` : "",
      ]
        .filter(Boolean)
        .join("\n\n---\n\n");

      const agentMessages: ChatCompletionMessageParam[] = [
        { role: "system", content: systemContent },
        ...messages,
      ];

      try {
        for (let step = 0; step < effectiveMaxSteps; step++) {
          const response = await client.chat.completions.create({
            model: MODEL,
            max_tokens: 4096,
            stream: false,
            tools: TOOLS,
            tool_choice: "auto",
            messages: agentMessages,
          });

          const msg = response.choices[0].message;
          agentMessages.push(msg as ChatCompletionMessageParam);

          // No tool calls → final answer
          if (!msg.tool_calls?.length) {
            send(msg.content ?? "");
            break;
          }

          // Execute each tool call
          for (const tc of msg.tool_calls) {
            let args: Record<string, string> = {};
            try {
              args = JSON.parse(tc.function.arguments || "{}");
            } catch {
              // ignore parse error
            }
            const label = args.path ?? args.query ?? "";
            send(`\`[${tc.function.name}${label ? `: ${label}` : ""}]\`\n`);

            const result = executeTool(tc.function.name, args);
            agentMessages.push({
              role: "tool",
              tool_call_id: tc.id,
              content: result,
            });
          }
        }
      } catch (err) {
        send(`\nError: ${err instanceof Error ? err.message : String(err)}`);
      }

      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Accel-Buffering": "no",
    },
  });
}
