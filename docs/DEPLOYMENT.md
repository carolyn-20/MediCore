# Secure deployment runbook

1. Choose a supported cloud VM or managed container platform and provision separate staging and production environments.
2. Terminate TLS at a maintained reverse proxy/load balancer (Caddy, Nginx or managed ingress); redirect HTTP to HTTPS and enable HSTS.
3. Keep PostgreSQL and Redis on private networks. Do not publish database or Redis ports. Restrict admin access by VPN/bastion and least-privilege identities.
4. Store JWT secrets and database credentials in the host's secret manager. Never commit `.env`; rotate secrets and document owners.
5. Build immutable images, pin versions, scan dependencies and images, and deploy through an approval-protected GitHub Actions environment.
6. Run schema migrations as a controlled release step with a tested rollback/forward-fix plan. Take a backup before destructive migrations.
7. Configure encrypted automated backups, retention and a separate backup account. Perform and record restore drills; a backup without a tested restore is not validated.
8. Monitor `/healthz`, `/readyz`, API error rate/latency, database capacity, queue depth and failed jobs. Redact patient identifiers and clinical data from logs.
9. Set incident contacts, on-call ownership, recovery objectives and a security escalation route in the deployment environment.

This repository does not provision cloud resources or certificates automatically. Record real deployment evidence only after carrying out these steps on a chosen provider.
