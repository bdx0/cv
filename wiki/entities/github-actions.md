---
name: GitHub Actions / CI-CD
type: entity
subtype: skill
tags: [devops, ci-cd]
category: devops
level: intermediate
target_level: advanced
priority: medium
confidence: medium
on_cv: true
cv_variant: [fullstack]
updated: 2026-07-06
evidence:
  - project: cv-agent
    type: personal-project
    note: "repo bdx0/cv — .github/workflows/deploy.yml: build Next.js app, upload-pages-artifact, deploy-pages; generate-pdf.yml workflow riêng"
  - project: ai-router
    type: personal-project
    note: "repo bdx0/airouter — .github/workflows/e2e.yml: E2E test pipeline với Postgres service container, Playwright browsers, chạy trên push/PR"
---

Kinh nghiệm viết và duy trì GitHub Actions workflows cho build/test/deploy trong personal projects: static site deploy (GitHub Pages), E2E test pipeline có service containers. Chưa có evidence pipeline build+push Docker image lên registry hoặc deploy lên cloud infra (GCP/AWS) qua CI/CD — mức độ hiện tại là app-level CI/CD, không phải infra-deployment CI/CD.
