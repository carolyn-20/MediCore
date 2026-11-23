# Orion assessment-to-evidence map

| Assessment | Repository implementation | Evidence to capture |
|---|---|---|
| 01 Role-based frontend | `apps/web/app`, role preview and module routes | Screenshots for all seven roles; explain UI preview is not auth |
| 02 Hospital APIs | `apps/api/src/routes` | Postman requests for patients, appointments, encounters, prescriptions, lab, billing, consent |
| 03 Clinical database | `apps/api/prisma/schema.prisma`, `docs/ERD.md` | ERD, migration output, constraints/indexes review |
| 04 Clinical security | `middleware/auth.js`, `middleware/audit.js` | 401/403, cross-patient denial, audit row; finish full resource-level policy |
| 05 Python processing | `apps/analytics/app/main.py` | Valid and malformed JSON examples; add CSV import/report CLI if required by assessor |
| 06 FastAPI analytics | `/analytics/appointments`, `/analytics/labs`, `/analytics/population` | Swagger `/docs`, pytest output, sample request/response |
| 07 Workflow engine | appointment routes and status enum | conflict, cancel, lifecycle tests; add waitlist and state transition service for full rubric |
| 08 FHIR interoperability | `routes/integrations.js`, compose FHIR profile | Sandbox resource exchange and notification logs; FHIR mock profile is optional |
| 09 Docker | root `docker-compose.yml`, service Dockerfiles | `docker compose ps`, health checks, volume inspection |
| 10 Git change review | `.github` branch/PR guidance below | Protected branch settings screenshot, PR review and migration review |
| 11 CI/CD | `.github/workflows` | GitHub Actions green run; staging deploy needs environment secrets/target |
| 12 Privacy/workflow tests | `apps/api/test`, `apps/analytics/tests` | Extend integration tests for consent, IDOR, collisions, missing labs and audit |
| 13 API documentation | `docs/OPENAPI.yaml`, Postman collection | Swagger UI screenshot and imported collection |
| 14 Secure deployment | `docs/DEPLOYMENT.md` | HTTPS, secret manager, backup/restore and monitoring evidence from chosen host |
| 15 Incident simulation | `docs/INCIDENT-PLAYBOOK.md` | Reproduction, logs, root cause, fix, regression test and incident report |

**Important:** this repository is a runnable learning foundation, not proof that every advanced acceptance criterion is production-complete. Items explicitly marked as hardening/extensions must be completed and demonstrated before claiming full rubric completion.
