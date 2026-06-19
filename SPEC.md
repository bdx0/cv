# CV Project Spec

## Mục tiêu

Xây dựng hệ thống quản lý career path cá nhân gồm 3 thành phần:

1. **CVWiki** — knowledge base lưu trữ toàn bộ career path: skills, projects, experience, career goals.
2. **HR Web UI** — giao diện cho HR/recruiter tương tác với CV theo JD cụ thể.
3. **Owner Web UI** — giao diện cho Duy tương tác, quản lý, và cập nhật CVWiki.

---

## Thành phần 1: CVWiki

Knowledge base file-based markdown, lưu trữ:

- Skills với evidence (project, work, experiment)
- Projects với tech stack và kết quả
- Work experience
- Career goals và skill targets
- Job descriptions đã ingest

**Location:** `wiki/`  
**Chi tiết schema:** xem `AGENTS.md`

---

## Thành phần 2: HR Web UI

Giao diện dành cho HR/recruiter.

**User:** HR, recruiter, hiring manager  
**Use cases:**
- Nhập JD → xem CV được tailored theo JD đó
- Hỏi câu hỏi về candidate (skills, experience, projects)
- So sánh candidate với requirements của JD
- Download CV phù hợp với role

**Behavior:**
- HR không cần account — nhập hoặc paste JD vào
- Hệ thống tự match JD với wiki → hiển thị CV relevant
- Chat interface để hỏi thêm về candidate

---

## Thành phần 3: Owner Web UI

Giao diện dành cho Duy để quản lý CVWiki.

**User:** Duy (owner)  
**Use cases:**
- View profile tổng quan (skills, experience, projects)
- Ingest nguồn mới (JD, article, CV version)
- Cập nhật skill level, evidence
- Chạy career path analysis
- Interview simulation
- Lint wiki (check evidence gaps, inconsistencies)

---

## Current State

| Thành phần | Trạng thái |
|------------|------------|
| CVWiki (file-based) | ✅ Đang hoạt động — `wiki/` |
| HR Web UI | ❌ Chưa có |
| Owner Web UI | ❌ Chưa có — hiện dùng Claude Code trực tiếp |
| cv-nextjs (static site) | 🔶 Chỉ render CV markdown — chưa phải HR UI |

---

## Tech Stack (dự kiến)

- **CVWiki:** markdown files (hiện tại), có thể migrate sang SQLite sau
- **HR Web UI + Owner Web UI:** Next.js (cv-nextjs là foundation)
- **LLM backend:** tích hợp với py-agent hoặc AIRouter để xử lý chat/match JD

---

## Không làm

- Không build multi-user system — chỉ một owner (Duy)
- Không edit CV output files trực tiếp — generate từ wiki
- Không xóa file trong `inbox/` sau khi ingest (immutable raw)
