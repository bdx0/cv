# cv-nextjs Source Index

Purpose: catalog source files cho Next.js app layer của cv repo.

Updated: 2026-06-12

## Contract

`cv-nextjs/` chứa toàn bộ source code của CV web app: Next.js pages, components, build config, scripts, và static CV output files. Đây là app layer — không chứa wiki knowledge hay raw sources (những thứ đó thuộc `../wiki/` và `../inbox/`).

## Contents

- `app/` — Next.js App Router: pages, layouts, global styles.
- `components/` — React components dùng chung.
- `public/` — static files được serve trực tiếp:
  - CV output files (`cv_*.md`, `resume.md`) — generated từ wiki, không edit tay.
  - PDF exports (`*.pdf`) — generated bởi `scripts/generate-pdf.js`.
  - Static assets (SVG icons, flags).
- `scripts/` — operational scripts:
  - `generate-pdf.js` — render CV markdown → PDF via Puppeteer.
- `Dockerfile` — container build cho self-hosted deploy.
- `next.config.ts` — Next.js config (static export).
- `package.json` — dependencies và npm scripts.

## CV Output Files

Files trong `public/` có prefix `cv_` hoặc tên `resume.md` là **generated output** — không edit trực tiếp. Mọi thay đổi nội dung phải đi qua wiki entities trong `../wiki/`.

| File | Variant |
|------|---------|
| `cv_fullstack_developer_en.md` | English fullstack — PRIMARY |
| `cv_fullstack_developer_vi.md` | Vietnamese fullstack |
| `cv_mobile_developer_en.md` | English mobile |
| `cv_mobile_developer_vi.md` | Vietnamese mobile |
| `resume.md` | Short general resume |

## Deploy

- GitHub Pages: tự động deploy qua `.github/workflows/deploy.yml` khi push main.
- Self-hosted: `docker build` từ `Dockerfile`, serve port 3000.

## Log Policy

Append source changes vào `cv-nextjs/log.md` theo format:

```md
## [YYYY-MM-DD] <type> | <short title> | what: <đã làm gì> | files: <file chính> | why: <lý do>
```

Types: `feature`, `fix`, `cleanup`, `structure`, `content`, `deploy`.
