---
name: cv-wiki
description: "Maintain Duy's CV as a file-based markdown wiki: track skills with evidence, projects, and experience. CV markdown files are generated from wiki pages, not hand-edited."
---

# CV Wiki Agent

Use this skill to manage Duy's CV as a file-based markdown knowledge system.

Default language: Vietnamese for agent communication, English for CV content output.

## Purpose

CV Wiki is the source of truth for Duy's career knowledge. Markdown wiki pages store structured skill evidence, project records, and work experience. CV output files (`cv_fullstack_developer_en.md`, etc.) are derived — generated from wiki pages, not edited directly.

The goal is evidence-based CV management:

- every skill on CV must have at least one evidence entry,
- skills without evidence are excluded from generated CV,
- project pages back up skill claims,
- confidence levels reflect actual depth of experience.

## Directory Contract

```
cv/                                ← project root
  AGENTS.md                        ← this file
  wiki/
    index.md                       ← content catalog, read first
    log.md                         ← append-only operation log
    entities/                      ← skills, projects, experience, tools, people, orgs, ...
    concepts/                      ← techniques, patterns, methodologies
    comparisons/                   ← A vs B analyses
    syntheses/                     ← cross-source conclusions
    questions/                     ← open questions, gaps, unknowns
    personal/                      ← goals, preferences, career context
  inbox/                           ← stray files, drafts, reference materials
  cv-nextjs/                       ← Next.js app (internal structure not tracked here)
```

## Load Order

1. Read `wiki/index.md` before answering or editing.
2. Load relevant pages from `wiki/entities/` and other subdirectories.
3. Use wiki first; read CV output files only when checking generated output.
4. `inbox/` is unsorted — do not treat as canonical source.

## Canonical CV Output Files

CV output files live inside `cv-nextjs/public/`:

| File | Status | Purpose |
|------|--------|---------|
| `cv_fullstack_developer_en.md` | **PRIMARY** | English CV, AI/Fullstack roles |
| `cv_fullstack_developer_vi.md` | active | Vietnamese fullstack CV |
| `cv_mobile_developer_en.md` | active | Mobile-focused CV variant |
| `cv_mobile_developer_vi.md` | active | Vietnamese mobile CV |
| `resume.md` | active | Short general resume |

Any file not in the table above is a draft — move to `inbox/`, do not treat as canonical.

## Frontmatter

Every page starts with frontmatter. `type` is fixed (6 values); `subtype` and `tags` are free-form.

```yaml
---
name: <display name>
type: entity           # entity | concept | comparison | synthesis | question | personal
subtype: skill         # free-form: skill | project | experience | tool | person | org | ...
tags: [language, python]
updated: YYYY-MM-DD
---
```

### Entity: skill (`wiki/entities/<slug>.md`)

```yaml
---
name: Python
type: entity
subtype: skill
tags: [language]
category: language     # language | frontend | backend | database | ai-ml | devops | mobile | domain
level: advanced        # beginner | intermediate | advanced | expert
target_level: expert   # mục tiêu muốn đạt — omit nếu đã đủ
priority: high         # high | medium | low | none — ưu tiên nâng cấp
confidence: high       # low | medium | high
on_cv: true
cv_variant: [fullstack, mobile]  # omit = all variants
updated: YYYY-MM-DD
evidence:
  - project: ai-router
    type: personal-project  # production | personal-project | experiment | study | work-private
    note: "FastAPI backend, prompt routing logic"
  - experience: vng-corp
    type: work-private
    note: "data processing scripts, call quality tools"
---
```

### Entity: job-description (`wiki/entities/<slug>.md`)

```yaml
---
name: Senior AI Engineer @ Company X
type: entity
subtype: job-description
tags: [fullstack, ai, remote]
company: Company X
role: Senior AI Engineer
url: https://...
captured: YYYY-MM-DD
status: considering    # considering | applied | rejected | offer
required_skills: [python, fastapi, llm-apis, postgresql]
nice_to_have: [kubernetes, typescript]
updated: YYYY-MM-DD
---
```

### Entity: project (`wiki/entities/<slug>.md`)

```yaml
---
name: AI Router
type: entity
subtype: project
tags: [ai, llm, personal-project]
status: active         # active | archived | private | planned
public: true
tech: [python, fastapi, postgresql, docker]
repo: https://github.com/bdx0/airouter
start: 2024-01
updated: YYYY-MM-DD
---
```

### Entity: experience (`wiki/entities/<slug>.md`)

```yaml
---
name: VNG Corp
type: entity
subtype: experience
tags: [work, webrtc, mobile]
role: Senior Software Engineer
start: 2014-08
end: 2019-05
location: Ho Chi Minh City
tech: [python, java, c, objective-c, webrtc]
updated: YYYY-MM-DD
---
```

## Skill Categories

| Category | Examples |
|----------|----------|
| `language` | Python, TypeScript, Go, Java, Dart |
| `frontend` | React, Next.js, Flutter, HTML/CSS |
| `backend` | FastAPI, Go/Gin, REST APIs |
| `database` | PostgreSQL, SQLite |
| `ai-ml` | LLM APIs, PyTorch, Whisper/STT |
| `devops` | Docker, Kubernetes, Linux, Bash |
| `mobile` | Flutter, Android, iOS, WebRTC |
| `domain` | Real-time communication, agent tooling |

## Evidence Policy

- `on_cv: true` requires at least one evidence entry.
- Only `study` evidence → set `confidence: low`, consider `on_cv: false`.
- `work-private` evidence → allowed on CV, note project is not public.
- Only experiments → `confidence: low` or `on_cv: false`.
- Production or personal-project evidence → `confidence: medium` or `high`.

## Operations

### Init Wiki

Create the wiki directory structure and `index.md`, `log.md` if they do not exist.

### Ingest CV

Parse a CV markdown file and create/update wiki pages:

1. Read `wiki/index.md`.
2. Extract skills → create/update `wiki/entities/<slug>.md` with `subtype: skill`.
3. Extract projects → create/update `wiki/entities/<slug>.md` with `subtype: project`.
4. Extract experience → create/update `wiki/entities/<slug>.md` with `subtype: experience`.
5. Link evidence in skill frontmatter.
6. Update `wiki/index.md`.
7. Append to `wiki/log.md`.

### Query

Answer questions from the wiki:

1. Read `wiki/index.md`.
2. Load relevant pages.
3. Answer in Vietnamese with cited page paths.
4. File durable answers back into wiki when useful.

### Match JD

So sánh một job description với wiki skills để xác định fit:

1. Đọc entity `subtype: job-description` chỉ định.
2. Load tất cả `required_skills` và `nice_to_have` từ JD.
3. Với mỗi skill trong JD, tìm entity tương ứng trong `wiki/entities/`.
4. Phân loại:
   - **Strong match**: skill tồn tại, `confidence: high`, có production/personal-project evidence
   - **Weak match**: skill tồn tại nhưng `confidence: low` hoặc chỉ có experiment/study evidence
   - **Gap**: skill không có trong wiki hoặc `on_cv: false`
5. Output report: % match, strong matches, gaps cần fill trước khi apply.
6. Đề xuất: CV variant nào phù hợp nhất, phần nào cần nhấn mạnh.

### Generate CV for JD

Tạo CV variant tối ưu cho một JD cụ thể:

1. Chạy Match JD trước.
2. Filter skills: ưu tiên skills match `required_skills` của JD.
3. Filter projects: ưu tiên projects dùng tech trong JD.
4. Điều chỉnh Summary section để nhấn mạnh relevant experience.
5. Output file riêng: `cv-nextjs/public/cv_<company>_<role>.md`.

### Career Path Analysis

Xác định career path và skill gaps:

1. Đọc `wiki/personal/career-goals.md`.
2. Load tất cả skill entities.
3. Tìm skills có `level != target_level` → đây là gaps.
4. Sắp xếp theo `priority`: high trước.
5. Output:
   - Skills cần nâng ngay (priority: high, gap lớn)
   - Projects nên build để fill gaps
   - Timeline ước tính

### Lint

Check for:

- Skills với `on_cv: true` nhưng không có evidence → flag.
- Skills với `confidence: low` đang on CV → review.
- Skills có `target_level` nhưng không có `priority` → thêm priority.
- Entities không có tags → thêm tags.
- Skill level vs. evidence mismatch.

### Process Inbox

Review files in `inbox/` and decide their fate:

1. Reference materials (images, guidelines) → keep in `inbox/`, no action needed.
2. Draft CV files → compare with canonical, extract useful changes, then archive.
3. Useful content → ingest into wiki pages.
4. Append to `wiki/log.md`.

### Generate CV

Regenerate CV markdown from wiki pages:

1. Query all `wiki/entities/` pages with `subtype: skill` and `on_cv: true`, filter by `cv_variant`.
2. Query `subtype: project` pages for Selected Projects section.
3. Query `subtype: experience` pages for Work Experience section.
4. Commit current CV file to git before overwriting (git is the version history).
5. Write updated markdown to the canonical output file.
6. Append GENERATE entry to `wiki/log.md`.

## Conflict Policy

Do not silently overwrite a claim when sources disagree. Add a visible note:

```
> CONFLICT: entities/python.md says X; entities/vng-corp.md says Y. Waiting for Duy.
```

Append a `CONFLICT` entry to `wiki/log.md`.

## Conventions

- Filenames: lowercase kebab-case.
- All entity pages: `wiki/entities/<slug>.md`.
- `wiki/log.md` is append-only.
- Do not hand-edit CV output files — regenerate from wiki pages.
