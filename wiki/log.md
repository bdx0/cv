# CV Wiki Log

## 2026-07-07

- UPDATE: cv_itbee_cloud-engineer.md — review pass: bỏ project "CI/CD Pipelines" (trùng với bullet Freelance), Skills IaC rút gọn thành "Terraform, Ansible" (bỏ mention Incus/libvirt providers), sửa thì động từ (Design/Deploy and operate), dọn dòng trống thừa

- UPDATE: cv_itbee_cloud-engineer.md — bỏ project AI Router khỏi Selected Projects (theo yêu cầu Duy)
- UPDATE: cv_itbee_cloud-engineer.md — viết lại Summary tích cực hơn (bỏ câu phủ định "Have not yet worked..."); rút gọn Freelance từ 6 → 4 bullets
- UPDATE: cv_itbee_cloud-engineer.md — gỡ mọi mention GCP khỏi CV (theo yêu cầu Duy): xóa dòng Skills "Cloud Platforms: No hands-on GCP...", Summary đổi thành "transfer across cloud platforms". CV không claim GCP, cũng không tự nhận thiếu — gap sẽ xử lý ở vòng trao đổi với recruiter
- UPDATE: entities/project-agent-tooling.md — ghi nhận agent-assisted infra ops (xác nhận bởi Duy): là working practice, chưa phải project nghiêm túc; trên CV chỉ dùng làm bullet Work Experience
- UPDATE: cv_itbee_cloud-engineer.md — gỡ project "Agent-Assisted Infrastructure Operations", chuyển thành bullet trong Freelance experience

## 2026-07-06 (4)

- UPDATE: cv_itbee_cloud-engineer.md — thêm AI projects có góc DevOps: py-agent (deploy trên self-managed Linux infra), Agent-Assisted Infrastructure Operations (agent tooling cho ops/tmux/SSH, AI-assisted Terraform/Ansible), mở rộng AI Router (self-hosted trên homelab). Thêm dòng Skills "AI / Automation".

## 2026-07-06 (3)

- GENERATE: cv-nextjs/public/cv_itbee_cloud-engineer.md — CV cho JD entities/jd-itbee-remote-cloud-engineer.md (Cloud Engineer, mã HANHBT). Nhấn mạnh Terraform (homelab layered IaC), Docker, GitHub Actions CI/CD, k3s/Ceph. Nêu rõ ràng KHÔNG có GCP experience (theo Evidence Policy — không claim skill không có evidence) thay vì paraphrase/che giấu gap.

## 2026-07-06 (2)

- UPDATE: entities/jd-itbee-remote-cloud-engineer.md — bổ sung JD chi tiết đầy đủ (mã HANHBT, budget 30tr gross, mô tả công việc, yêu cầu bắt buộc, điểm cộng)
- INGEST: Tạo entities/github-actions.md — evidence CI/CD từ repo bdx0/cv (deploy.yml: build+deploy Next.js → GitHub Pages) và bdx0/airouter (e2e.yml: Postgres service container + Playwright)
- MATCH JD: re-match với JD chi tiết — ~35% (Docker: strong match, GitHub Actions: weak-moderate, Terraform: weak, toàn bộ GCP core services VPC/IAM/Pub-Sub/Cloud Scheduler: gap hoàn toàn — đây là yêu cầu chính #1 của JD)
- UPDATE: index.md — thêm github-actions.md, cập nhật % match JD

## 2026-07-06

- INGEST: Tạo entities/jd-itbee-remote-cloud-engineer.md từ inbox/2026-07-06-jd-itbee-remote-cloud-engineer.md — JD Remote Cloud Engineer (Contractor) @ ITBee Solutions
- MATCH JD: 0% match — gap hoàn toàn ở required_skills [gcp, terraform], không có entity/evidence nào trong wiki
- UPDATE: index.md — thêm section Job Descriptions, thêm jd-itbee-remote-cloud-engineer.md
- INGEST: Tạo entities/terraform.md — evidence từ repo private bdx0/devops (homelab IaC), Incus/libvirt providers, layered environments, k3s + Ceph provisioning
- UPDATE: entities/homelab.md — thêm terraform, ansible, incus, ceph vào tech list
- UPDATE: entities/jd-itbee-remote-cloud-engineer.md — re-match: Terraform weak match (25%), GCP vẫn Gap
- UPDATE: index.md — thêm terraform.md vào Skills devops, cập nhật % match JD

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
2026-06-28 GENERATE cv_cb-centres_it-staff.md — JD: Nhân viên Công nghệ & Lập trình @ CB Centres. Match ~75%. Tập trung kinh nghiệm, bỏ projects chưa hoàn thành (ai-router, doc-rag, nanogpt). Tiếng Việt, ATS-compliant.

## 2026-07-05 — UPDATE cv_mobile_developer_en.md
- Strengthened for Flutter remote job applications
- Added ZaloCall 30M+ users stat, state management, py-agent project
- Cleaned skills section, fixed company locations

