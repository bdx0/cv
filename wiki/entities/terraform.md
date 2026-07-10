---
name: Terraform
type: entity
subtype: skill
tags: [devops, iac]
category: devops
level: intermediate
target_level: advanced
priority: high
confidence: medium
on_cv: true
cv_variant: [fullstack]
updated: 2026-07-06
evidence:
  - project: homelab
    type: personal-project
    note: "repo bdx0/devops (private), layered IaC (layer0/1/2: dev/stag/prod/test) — Incus/libvirt providers, provisioning k3s cluster (k3s01-03), Ceph storage pools, projects/storage_pool resources với for_each/locals động, lifecycle prevent_destroy. Kết hợp với Ansible provider để config-management sau khi provision. Không có cloud provider (AWS/GCP/Azure) hoặc remote state backend."
---

Terraform dùng trong homelab để provision VM/container (qua Incus và libvirt providers) theo mô hình layered environments (dev/stag/test/prod), bao gồm cụm k3s và Ceph storage. Chưa có kinh nghiệm với cloud provider chính thống (AWS/GCP/Azure) hoặc remote backend/state locking — đây là gap nếu apply cho role yêu cầu Terraform-on-cloud cụ thể (vd. GCP).
