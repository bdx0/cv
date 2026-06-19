---
name: CV-Nextjs Hosting Decision
type: synthesis
subtype: infra-decision
tags: [hosting, deployment, cv-nextjs, infra, cloudflare, vercel]
source: inbox/2026-06-12-hosting-options.md
updated: 2026-06-12
---

## Context

CV project gồm 3 thành phần: CVWiki, HR Web UI, Owner Web UI. Cần LLM backend (py-agent) cho match JD, chat, ingest, interview simulation — web tĩnh không đủ.

Hướng phát triển: **Next.js (frontend + API routes) + py-agent (LLM backend trên homelab)**.

## Options xét tới (~$1/tháng trở xuống)

| Service | Giá | Ghi chú |
|---------|-----|---------|
| Vercel (free) | $0 | Next.js frontend + API routes, timeout 10s |
| Cloudflare Pages + Workers | $0 | Frontend + edge functions |
| Fly.io (free tier) | $0 | 3 shared VMs miễn phí |
| Oracle Cloud Free | $0 | ARM 4CPU/24GB RAM, free mãi |
| RackNerd (promo) | ~$1.2/tháng | VPS thật, 1GB RAM |

## Quyết định

**Vercel (Next.js frontend) + Cloudflare Tunnel (expose py-agent từ homelab)** — chi phí $0.

- Cloudflare Tunnel: tunnel từ homelab ra internet, không cần public IP, miễn phí
- Next.js deploy Vercel, API routes gọi vào Cloudflare Tunnel endpoint
- Không cần VPS riêng

## Việc cần làm (chưa thực hiện tại thời điểm capture)

- [ ] Setup Cloudflare Tunnel trỏ vào py-agent trên goku
- [ ] Cấu hình Next.js API routes gọi py-agent qua tunnel
- [ ] Deploy cv-nextjs lên Vercel

> Lưu ý: tại thời điểm ingest (2026-06-19), cv-nextjs đang chạy dev local (`localhost:3000`) gọi trực tiếp `http://ddm1pro:9980` qua Tailscale, chưa deploy theo hướng này. Checklist trên còn là kế hoạch, chưa verify lại trạng thái thực tế.
