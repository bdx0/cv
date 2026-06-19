"use client";

import { useState, useRef, useEffect } from "react";
import { marked } from "marked";

marked.setOptions({ breaks: true });

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "view my profile",
  "career path analysis",
  "lint wiki",
  "interview me for a senior AI engineer role",
  "match JD: Senior Fullstack Engineer, Python/FastAPI, remote",
];

const DEFAULT_MAX_STEPS = 19;
const MAX_STEPS_KEY = "cvwiki:maxSteps";
const PRELOAD_CONTEXT_KEY = "cvwiki:preloadContext";

export default function OwnerPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxSteps, setMaxSteps] = useState(DEFAULT_MAX_STEPS);
  const [preloadContext, setPreloadContext] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedSteps = localStorage.getItem(MAX_STEPS_KEY);
    if (savedSteps) setMaxSteps(Number(savedSteps) || DEFAULT_MAX_STEPS);
    const savedPreload = localStorage.getItem(PRELOAD_CONTEXT_KEY);
    if (savedPreload !== null) setPreloadContext(savedPreload === "true");
  }, []);

  const updateMaxSteps = (val: number) => {
    const clamped = Math.min(20, Math.max(1, val || DEFAULT_MAX_STEPS));
    setMaxSteps(clamped);
    localStorage.setItem(MAX_STEPS_KEY, String(clamped));
  };

  const updatePreloadContext = (val: boolean) => {
    setPreloadContext(val);
    localStorage.setItem(PRELOAD_CONTEXT_KEY, String(val));
  };

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, maxSteps, preloadContext }),
      });

      if (!res.ok) throw new Error(await res.text());

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: text };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: `Lỗi: ${err instanceof Error ? err.message : String(err)}`,
        };
        return updated;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <header className="relative flex items-center justify-between px-6 py-3 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="font-semibold text-sm tracking-wide">CVWiki — Owner</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSettings((v) => !v)}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            title="Cài đặt"
          >
            ⚙ Settings
          </button>
          <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← CV Viewer
          </a>
        </div>

        {showSettings && (
          <div className="absolute right-6 top-12 z-10 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4 space-y-3">
            <div className="text-xs font-semibold text-gray-300">Agent Settings</div>
            <div className="space-y-1">
              <label className="text-xs text-gray-400 flex items-center justify-between">
                <span>Max steps (tool-call rounds)</span>
                <span className="text-gray-200 font-mono">{maxSteps}</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={maxSteps}
                onChange={(e) => updateMaxSteps(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-[11px] text-gray-500">
                Số lần tối đa agent được gọi tool trước khi buộc phải trả lời. Cao hơn = task phức tạp hơn nhưng chậm/tốn hơn.
              </p>
            </div>

            <div className="border-t border-gray-800 pt-3 space-y-1">
              <label className="text-xs text-gray-400 flex items-center justify-between cursor-pointer">
                <span>Preload wiki context</span>
                <input
                  type="checkbox"
                  checked={preloadContext}
                  onChange={(e) => updatePreloadContext(e.target.checked)}
                  className="accent-blue-500"
                />
              </label>
              <p className="text-[11px] text-gray-500">
                Tự nạp sẵn index.md + profile.md + career-goals.md vào context. Tắt để buộc agent tự gọi tool đọc file (tiết kiệm token cho câu hỏi không cần, nhưng chậm hơn 1 round-trip).
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.length === 0 ? (
          <div className="max-w-xl mx-auto mt-12 space-y-5">
            <p className="text-gray-400 text-sm text-center">
              Xin chào Duy. CVWiki sẵn sàng.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left px-4 py-3 rounded-lg border border-gray-700 text-sm text-gray-300 hover:bg-gray-800 hover:border-gray-500 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm whitespace-pre-wrap"
                    : "bg-gray-800 text-gray-100 rounded-bl-sm"
                }`}
              >
                {msg.role === "user" ? (
                  msg.content || (loading && i === messages.length - 1 ? (
                    <span className="animate-pulse text-gray-400">...</span>
                  ) : "")
                ) : msg.content ? (
                  <div
                    className="[&_h1]:text-base [&_h1]:font-bold [&_h1]:mb-1 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mb-1 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-1 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_li]:mb-0.5 [&_strong]:font-semibold [&_code]:bg-gray-700 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_a]:text-blue-400 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-gray-500 [&_blockquote]:pl-3 [&_blockquote]:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }}
                  />
                ) : loading && i === messages.length - 1 ? (
                  <span className="animate-pulse text-gray-400">...</span>
                ) : null}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-gray-800 shrink-0">
        <div className="flex gap-2 items-end max-w-4xl mx-auto">
          <textarea
            ref={inputRef}
            className="flex-1 bg-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500 resize-none min-h-[44px] max-h-40"
            placeholder="Nhập câu hỏi hoặc lệnh... (Enter để gửi, Shift+Enter xuống dòng)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            rows={1}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-blue-600 rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-blue-500 active:bg-blue-700 transition-colors shrink-0"
          >
            {loading ? "..." : "Gửi"}
          </button>
        </div>
      </div>
    </div>
  );
}
