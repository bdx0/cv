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
    personal/
      profile.md                   ← identity anchor: wiki owner (bắt buộc đọc trước ingest)
      career-goals.md              ← target roles, skill targets, timeline
  inbox/                           ← raw sources: CV versions, JD texts, articles, reference materials — immutable after ingest
  log.md                           ← append-only project-wide change log
  SPEC.md                          ← requirements và constraints cho CV system
  cv-nextjs/                       ← Next.js app
    index.md                       ← source index, catalog cấu trúc app
    log.md                         ← append-only source/app change log
    app/                           ← Next.js App Router
    components/                    ← React components
    public/                        ← CV output files + static assets
    scripts/                       ← generate-pdf.js và operational scripts
```

## Load Order

1. Đọc `wiki/personal/profile.md` — xác định owner. Bắt buộc trước mọi operation.
2. Đọc `wiki/index.md` để navigate wiki.
3. Load relevant pages từ `wiki/entities/` và các subdirectories khác.
4. Dùng wiki trước; đọc CV output files chỉ khi cần kiểm tra generated output.
5. `inbox/` là raw sources — đọc để trace provenance, không edit sau khi ingest.
6. Khi làm việc với app layer (cv-nextjs): đọc `cv-nextjs/index.md` trước. Append changes vào `cv-nextjs/log.md`.
7. Sau mọi thay đổi đáng kể: append entry vào `log.md` (project-wide) và/hoặc `cv-nextjs/log.md` (app layer).

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

### Ingest

Nhận bất kỳ source nào, tự nhận diện loại rồi xử lý phù hợp.

**Bước 0 — Load identity anchor (bắt buộc trước mọi ingest):**

Đọc `wiki/personal/profile.md` để biết wiki thuộc về ai. Mọi personal claim phải match owner trong profile. Nếu profile chưa tồn tại → yêu cầu tạo trước khi ingest bất cứ thứ gì.

**Nhận diện source:**

| Source | Dấu hiệu | Destination |
|--------|----------|-------------|
| CV của owner | Có tên owner, sections: Summary, Work Experience, Skills | `entities/` — personal claims |
| Job description | Có: company, role, requirements, qualifications | `entities/` subtype: job-description |
| Guideline / article | Không có tên owner, nội dung tổng quát | `concepts/` ONLY — không tạo personal entities |
| URL | Bắt đầu bằng http | Fetch → nhận diện lại |

**Quy tắc phân biệt personal vs external:**

- Source có tên khớp owner (`wiki/personal/profile.md`) → personal claim → `entities/`
- Source không có tên owner hoặc là tài liệu chung → external knowledge → `concepts/`
- Không bao giờ extract personal entities từ guidelines, templates, hay example CVs

**Quy trình:**

1. Load `wiki/personal/profile.md` — xác định owner.
2. Đọc `wiki/index.md`.
3. Nhận diện source type và kiểm tra personal vs external.
4. Kiểm tra duplicate: slug, title, hoặc nội dung tương tự đã tồn tại chưa.
5. Extract và upsert vào destination phù hợp.
6. Ghi `source:` field trong mỗi entity/concept trỏ về file inbox nguồn.
7. Nếu là JD → chạy Match JD tự động.
8. Nếu là CV của owner → link evidence vào skill entities.
9. Update `wiki/index.md`.
10. Append INGEST entry vào `wiki/log.md` với reference đến source file.

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

### Generate CV

CV luôn được tạo cho một JD cụ thể — không có JD thì không generate CV.

1. Chạy Match JD trước để biết fit level.
2. Filter skills: ưu tiên `required_skills` của JD, giữ `nice_to_have` nếu có evidence.
3. Filter projects: ưu tiên projects dùng tech trong JD.
4. Viết Summary section nhấn mạnh relevant experience cho role đó.
5. Đọc `wiki/concepts/ats-guidelines.md` và `wiki/concepts/ats-resume-style.md` — áp dụng toàn bộ:
   - Single-column, không table/graphic/sidebar
   - Section names chuẩn: Summary, Work Experience, Education, Skills
   - Contact info trong body, không trong header/footer
   - Bullets bắt đầu bằng action verb (Built, Designed, Implemented...)
   - Quantify achievements khi có thể
   - Dùng exact keywords từ JD — không paraphrase
6. Commit current canonical CV vào git trước khi tạo file mới.
7. Output: `cv-nextjs/public/cv_<company-slug>_<role-slug>.md`.
8. Append GENERATE entry vào `wiki/log.md`.

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

Ingest raw sources từ `inbox/` vào wiki:

1. Đọc file trong `inbox/` chưa được ingest.
2. Nhận diện source type → chạy Ingest.
3. Sau khi ingest, giữ nguyên file trong `inbox/` — không xóa, không edit (immutable raw).
4. Append INGEST entry vào `wiki/log.md` với reference đến file nguồn.

### View Profile

Trả lời câu hỏi về career mà không generate CV file:

1. Đọc `wiki/index.md`.
2. Load các skill/project/experience entities liên quan.
3. Trả lời: "tôi là ai", "tôi biết gì", "tôi đã làm gì", "tôi fit với role X không?"
4. Không tạo CV file — chỉ trả lời từ wiki.

### Interview

Đóng vai technical interviewer để validate claimed skills và probe weak spots.

**Chuẩn bị trước khi bắt đầu:**

1. Đọc `wiki/index.md` và load tất cả skill entities.
2. Xác định scope: interview cho một role cụ thể (từ JD entity) hoặc general.
3. Nếu có JD: ưu tiên câu hỏi về `required_skills` của JD.
4. Lập danh sách probe targets theo thứ tự:
   - Skills `confidence: low` hoặc `medium` → probe trước
   - Skills chỉ có `experiment` hoặc `study` evidence → hỏi sâu hơn
   - Skills có gap lớn (`level` vs `target_level`) → kiểm tra thực chất
   - Skills `confidence: high` + production evidence → hỏi nhanh để confirm

**Quy tắc conduct:**

- Đặt câu hỏi từng cái một, chờ user trả lời trước khi hỏi tiếp.
- Hỏi cụ thể: "explain X", "how would you solve Y", "what went wrong in Z project".
- Probe deeper nếu câu trả lời vague: "can you be more specific?", "walk me through the code."
- Không hint đáp án, không confirm đúng/sai trong khi interview.
- Ghi nhớ chất lượng trả lời để đánh giá cuối.

**Kết thúc interview:**

1. Đưa ra feedback: điểm mạnh, điểm yếu, câu nào trả lời tốt/kém.
2. Đề xuất update wiki:
   - Tăng `confidence` nếu trả lời tốt hơn claim
   - Giảm `confidence` hoặc `level` nếu thực chất kém hơn
   - Lưu câu hỏi khó vào `wiki/questions/<skill>.md` để ôn
3. Hỏi user có muốn apply updates không trước khi ghi.

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
