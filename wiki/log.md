# CV Wiki Log

## 2026-06-19

- FIX: index.md — link entities/nanogpt-vietnamese.md vào Projects section (orphan file phát hiện lúc lint wiki)
- INGEST: Tạo syntheses/cv-nextjs-hosting-decision.md từ inbox/2026-06-12-hosting-options.md — quyết định hosting Vercel + Cloudflare Tunnel cho cv-nextjs
- UPDATE: index.md — thêm syntheses/cv-nextjs-hosting-decision.md vào Syntheses section

## 2026-06-14

- UPDATE: career-goals.md — thay AIRouter public deploy → py-agent public deploy (ai-router đã paused)

## 2026-06-13

- UPDATE: ai-router — status: active → paused (tạm dừng)

## 2026-06-12

- INGEST: Tạo entities/cv-agent.md — project entity cho cvwiki (CV Agent / CV Wiki)
- UPDATE: index.md — thêm py-agent và cv-agent vào Projects section

## 2026-06-01

- SETUP: Khởi tạo wiki từ cv_fullstack_developer_en.md
- INGEST: Tạo 24 skill pages từ cv_fullstack_developer_en.md
- INGEST: Tạo 6 project pages
- INGEST: Tạo 4 experience pages
- INGEST: Thêm evidence chi tiết cho python, flutter, dart, webrtc, kotlin, swift

## 2026-06-05

- INGEST: inbox/cv_fullstack_developer_en_v2.md → new entity py-agent, updated vng-corp (30M users), doc-rag (dates + langchain)
- INGEST: inbox/mobile cv.md → new entity nanogpt-vietnamese, updated pytorch + whisper-stt evidence
- INGEST: inbox/ats_friendly_guidelines.md → concepts/ats-guidelines.md
- INGEST: inbox/perfect_ats_resume_style.md → concepts/ats-resume-style.md
- SKIP: inbox/*.jpg, inbox/*.png — reference images, không ingest
- SKIP: inbox/me.md, inbox/resume_better.md — older drafts, thông tin đã có trong wiki
- UPDATE: llm-apis — intermediate → advanced, thêm evidence py-agent (native proxy) + ai-router
- UPDATE: pytorch — beginner → intermediate (viết GPT from scratch), confidence: low (yếu toán học)
- UPDATE: postgresql — confidence medium → high, thêm evidence ai-router + py-agent
- UPDATE: postgresql — confidence revert → low (PostgreSQL code trong projects do agent viết, không phải tự viết)
