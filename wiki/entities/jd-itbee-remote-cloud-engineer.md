---
name: Cloud Engineer (Contractor, Mã HANHBT) @ ITBee Solutions
type: entity
subtype: job-description
tags: [devops, cloud, gcp, contractor, remote, part-time]
company: ITBee Solutions
role: Cloud Engineer (Contractor)
code: HANHBT
url:
captured: 2026-07-06
status: considering
required_skills: [terraform, gcp-vpc, gcp-iam, gcp-pubsub, gcp-cloud-scheduler, github-actions, docker]
nice_to_have: [bigquery-scheduled-query, gcp-serverless, cloud-cost-optimization, japan-client-experience]
source: inbox/2026-07-06-jd-itbee-remote-cloud-engineer.md
updated: 2026-07-06
match_percent: 35
---

## Chi tiết

- Level: 2-5 YOE với Terraform (Infrastructure as Code)
- Yêu cầu chính: GCP, Terraform
- Budget: 30 triệu gross
- Ngoại ngữ: không yêu cầu (nhưng cần đọc hiểu tài liệu kỹ thuật tiếng Anh)
- Duration: 3 tháng (contractor)
- Working mode: Remote 0.5 (~4 giờ/ngày), Mon-Fri
- Delivery: Asap
- Recruiter: quan.duong@itbeesolutions.com, (+84) 985 231 691 (Zalo/WhatsApp)

### Mô tả công việc
- Thiết kế/xây dựng/vận hành hạ tầng Cloud theo IaC (Terraform)
- Triển khai/cấu hình/quản trị tài nguyên GCP: network, IAM, messaging (Pub/Sub), scheduling (Cloud Scheduler)
- Xây dựng/duy trì CI/CD pipeline (build/test/deploy)
- Chuẩn bị deployment bằng Docker, viết/tối ưu Dockerfile
- Monitor hệ thống, xử lý sự cố, đề xuất cải thiện performance/stability/security
- Phối hợp với các nhóm kỹ thuật

### Yêu cầu bắt buộc
- 2-5 năm Terraform/IaC
- Kinh nghiệm triển khai/vận hành GCP
- Thành thạo GCP core services: VPC, IAM, Pub/Sub, Cloud Scheduler (hoặc tương đương)
- CI/CD pipeline với GitHub Actions
- Thành thạo Docker, viết Dockerfile
- Đọc hiểu tài liệu kỹ thuật tiếng Anh

### Điểm cộng
- BigQuery Scheduled Query, GCP Serverless
- Tối ưu cloud architecture (performance/security/cost)
- Kinh nghiệm khách hàng quốc tế, đặc biệt Nhật Bản

## Match JD

Cập nhật 2026-07-06 với JD chi tiết đầy đủ.

### Phân loại

| JD skill | Wiki entity | Trạng thái |
|---|---|---|
| Terraform | [terraform.md](terraform.md) — intermediate, confidence medium | **Weak match** — có nền HCL thật (layered IaC, for_each/locals, lifecycle) nhưng 100% on-prem (Incus/libvirt), không có cloud provider nào, không có remote state |
| GCP (VPC/IAM/Pub-Sub/Cloud Scheduler) | _(không có)_ | **Gap hoàn toàn** — chưa từng dùng GCP dưới bất kỳ hình thức nào |
| GitHub Actions / CI-CD | [github-actions.md](github-actions.md) — intermediate, confidence medium | **Weak-to-strong match** — có pipeline build/deploy (cv → GitHub Pages) và E2E test pipeline (airouter, service containers, Playwright) trên personal projects thật, nhưng chưa từng build+push Docker image lên registry hay deploy lên cloud infra qua CI/CD |
| Docker | [docker.md](docker.md) — advanced, confidence high | **Strong match** — evidence rõ ràng: homelab container orchestration, ai-router Dockerized deployment/compose |
| BigQuery / GCP Serverless (nice-to-have) | _(không có)_ | Gap |
| Cost optimization (nice-to-have) | _(không có evidence riêng)_ | Gap |
| Japan client experience (nice-to-have) | _(không có)_ | Gap |

**% match ước tính: ~35%** trên required_skills (Docker: strong; GitHub Actions: weak-moderate; Terraform: weak; GCP core services: gap hoàn toàn — đây là khối lớn nhất của JD và match = 0).

### Kết luận

Điểm mạnh thật sự: Docker thành thạo, có nền Terraform (dù on-prem), có kinh nghiệm viết CI/CD pipeline cơ bản. Điểm gap nghiêm trọng nhất: **toàn bộ phần GCP** (VPC, IAM, Pub/Sub, Cloud Scheduler) — đây là "Yêu cầu chính" số 1 của JD và hiện tại là con số 0 tuyệt đối, không có cách nào che được bằng kinh nghiệm on-prem.

JD này thực chất là **GCP-specific role**, không phải "Terraform nói chung" — mô tả công việc liệt kê rất cụ thể GCP services (VPC/IAM/Pub-Sub/Cloud Scheduler), nên khả năng cao recruiter/technical interview sẽ hỏi sâu về GCP ngay từ vòng đầu. Với 3 tháng, asap delivery, không có buffer để học GCP từ đầu trong lúc làm.

**Khuyến nghị:** không nên apply role này trừ khi có kế hoạch học nhanh GCP core services (VPC/IAM/Pub-Sub/Cloud Scheduler) trước, hoặc thẳng thắn deal với recruiter về gap này ngay từ đầu. Không generate CV claim GCP experience vì không có evidence — vi phạm Evidence Policy.
