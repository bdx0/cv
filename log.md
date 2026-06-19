# CV Project Log

Append-only timeline cho project-wide changes.

## [2026-06-12] structure | add index.md + log.md to cv-nextjs | what: tạo source index và append-only log cho app layer theo convention py-agent/source | files: `cv-nextjs/index.md`, `cv-nextjs/log.md` | why: đồng bộ convention với py-agent

## [2026-06-12] structure | add SPEC.md | what: tạo file spec lưu requirements và constraints cho CV system — target role, variants, evidence policy, wiki requirements, generate workflow | files: `SPEC.md` | why: lưu lại yêu cầu rõ ràng để agent và user đồng nhất khi làm việc với repo

## [2026-06-12] spec | rewrite SPEC.md | what: viết lại spec đúng với vision thực sự của project — 3 thành phần: CVWiki (knowledge base), HR Web UI (recruiter tương tác với CV theo JD), Owner Web UI (Duy quản lý wiki); ghi rõ current state từng thành phần | files: `SPEC.md` | why: spec cũ chỉ mô tả file management, không phản ánh đúng product vision

## [2026-06-12] structure | update AGENTS.md | what: cập nhật Directory Contract phản ánh SPEC.md và cv-nextjs internal structure; thêm Load Order bước 6 cho app layer | files: `AGENTS.md` | why: AGENTS.md lỗi thời sau khi thêm SPEC.md và cv-nextjs/index.md

## [2026-06-12] infra | move repo to local GitHub folder | what: move cv repo từ /Volumes/data/repos/cv sang ~/Documents/00-Project/00-code/GitHub/cv; cập nhật settings.local.json | files: — | why: tổ chức lại repos về local thay vì SMB mount
