# Hosting Options cho CV Project

Captured: 2026-06-12  
Source: chat session với Claude Code

## Context

Spec của dự án cv gồm 3 thành phần: CVWiki, HR Web UI, Owner Web UI. Web tĩnh không đủ vì cần LLM backend để match JD, chat, ingest, interview simulation.

Hướng được chọn để phát triển: **Next.js + py-agent** (tận dụng py-agent đang có sẵn trên homelab).

## Yêu cầu hosting

- Next.js với API routes (SSR/serverless, không phải static)
- py-agent đang chạy trên homelab (goku VMs) — cần expose ra internet

## Tùy chọn ~$1/tháng

| Service | Giá | Ghi chú |
|---------|-----|---------|
| Vercel (free) | $0 | Next.js frontend + API routes, timeout 10s |
| Cloudflare Pages + Workers | $0 | Frontend + edge functions |
| Fly.io (free tier) | $0 | 3 shared VMs miễn phí |
| Oracle Cloud Free | $0 | ARM 4CPU/24GB RAM, free mãi |
| RackNerd (promo) | ~$1.2/tháng | VPS thật, 1GB RAM |

## Đề xuất tối ưu

**Vercel (Next.js frontend) + Cloudflare Tunnel (expose py-agent từ homelab)**

- Chi phí: $0
- Cloudflare Tunnel: tunnel từ homelab ra internet, không cần public IP, miễn phí
- Next.js deploy Vercel, API routes gọi vào Cloudflare Tunnel endpoint
- Không cần VPS riêng

## Việc cần làm nếu chọn hướng này

- [ ] Setup Cloudflare Tunnel trỏ vào py-agent trên goku
- [ ] Cấu hình Next.js API routes gọi py-agent qua tunnel
- [ ] Deploy cv-nextjs lên Vercel
