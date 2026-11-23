# MediCore — Hospital, Appointment & Patient Care Management Platform

**Orion Project 03 | Educational full-stack assessment | Synthetic data only**

MediCore is a multi-service teaching project for hospital operations. It demonstrates a Next.js interface, Express business API, PostgreSQL data model, FastAPI operational analytics, Redis infrastructure, Docker Compose, GitHub Actions, API documentation, test foundations and incident/deployment runbooks.

> **Safety boundary:** This is not a real hospital information system and is not certified for clinical, privacy, security or regulatory compliance. Use synthetic data only. Do not use real patient records, real prescriptions, real payments, insurance claims or identity documents. No diagnosis or treatment recommendations are generated. Notification and FHIR integrations must remain in sandbox/test environments.

## Repository layout

```text
medicore/
├── apps/
│   ├── web/                 # Next.js App Router, React, TypeScript, Tailwind
│   ├── api/                 # Express REST API, JWT, Prisma, PostgreSQL
│   └── analytics/           # FastAPI operational analytics and pytest suite
├── docs/                    # Architecture, ERD, assessment map, API, runbooks
├── postman/                 # Postman collection
├── .github/workflows/       # CI, dependency review and secret scan
├── docker-compose.yml       # PostgreSQL, Redis, API, web, analytics, FHIR profile
└── .env.example
```

## Requirements

- Docker Desktop with Docker Compose v2 (recommended), or Node.js 22+, Python 3.12+, PostgreSQL 16+, Redis 7+.
- Git and a GitHub account for source control and CI evidence.

## Quick start with Docker

1. Copy `.env.example` to `.env` and replace both JWT secrets with long random values.
2. From the repository root run:

   ```bash
   docker compose up --build
   ```

3. Open:
   - Web dashboard: http://localhost:3000
   - Express API health: http://localhost:4000/healthz
   - Express readiness: http://localhost:4000/readyz
   - FastAPI docs: http://localhost:8000/docs
4. In a second terminal, seed the demo accounts:

   ```bash
   docker compose exec api node prisma/seed.js
   ```

5. Demo credentials (local synthetic environment only):
   - `admin@medicore.test` / `DemoPass123!`
   - `doctor@medicore.test` / `DemoPass123!`
   - `patient@medicore.test` / `DemoPass123!`

   Authenticate at `POST http://localhost:4000/api/v1/auth/login`. Copy the returned `accessToken` into Postman as a Bearer token.

FHIR mock profile is optional: `docker compose --profile integrations up --build`. The HAPI FHIR test endpoint is then exposed on localhost:8081. Do not expose it publicly.

## Run without Docker

### API

```bash
cd apps/api
npm install
# Configure DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET in environment
npx prisma generate
npx prisma db push
node prisma/seed.js
npm run dev
```

### Frontend

```bash
cd apps/web
npm install
# Set NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm run dev
```

### Analytics

```bash
cd apps/analytics
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## API routes currently implemented

All routes below except `/healthz` and `/readyz` require `Authorization: Bearer <accessToken>`.

| Method | Endpoint | Roles / purpose |
|---|---|---|
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/refresh` | Refresh access token (teaching baseline) |
| GET | `/api/v1/departments`, `/api/v1/providers` | Directory lookup |
| POST / GET | `/api/v1/patients` | Receptionist/admin registration; authorized staff listing |
| GET | `/api/v1/patients/:patientId` | Patient record with relationship check baseline |
| POST / GET | `/api/v1/appointments` | Booking and schedule listing |
| PATCH | `/api/v1/appointments/:id/cancel` | Cancel appointment |
| POST | `/api/v1/encounters` | Doctor/nurse/admin creates encounter |
| POST | `/api/v1/diagnoses` | Clinician adds diagnosis code |
| POST | `/api/v1/prescriptions` | Doctor/admin creates prescription record |
| POST | `/api/v1/lab-orders` | Doctor/nurse/admin creates order |
| POST | `/api/v1/lab-orders/:id/results` | Lab technician/admin records result |
| POST | `/api/v1/invoices` | Billing/admin creates synthetic invoice |
| POST | `/api/v1/consents` | Patient/receptionist/admin records consent |
| GET | `/api/v1/audit-logs` | Admin audit review |
| GET | `/api/v1/fhir/Patient/:id` | FHIR sandbox read |
| POST | `/api/v1/notifications/sandbox` | Console-only email/SMS sandbox event |

FastAPI: `POST /analytics/appointments`, `POST /analytics/labs`, `POST /analytics/population`.

## Tests and quality checks

```bash
# API policy tests
cd apps/api && npm install && npm test
# Frontend role-preview test and production build
cd ../web && npm install && npm test && npm run build
# Analytics tests
cd ../analytics && pip install -r requirements.txt && pytest -q
```

Tests are a starting suite, not full coverage of all acceptance criteria. Add DB-backed API integration, browser E2E, security, concurrency and failure-path tests before claiming full assessment completion.

## Engineering notes and known gaps to complete

This project intentionally distinguishes a working baseline from production-style requirements that need additional implementation/evidence:

1. Complete resource-level authorization for every clinical endpoint, including encounter ownership, nurse scope, lab scope and patient scope. The dashboard's role selector is visual only.
2. Replace the teaching refresh-token flow with persisted hashed refresh tokens, rotation, revocation, reuse detection and secure client storage.
3. Add a PostgreSQL exclusion constraint/locking for race-safe provider appointment scheduling; a transaction plus pre-check alone is not sufficient under all concurrency patterns.
4. Implement appointment waitlists, provider working hours/time zones, full encounter and prescription/lab state machines, and idempotency keys.
5. BullMQ notification queue/worker with retry/backoff and failed-job retention is included. Add an operator-controlled dead-letter replay endpoint, queue metrics and durable recovery procedures for full acceptance.
6. Add a standalone CSV/JSON clinical dataset processing CLI, reference-unit dictionary and benchmark evidence for Assessment 05.
7. Expand FHIR support beyond the Patient read adapter to Patient, Appointment, Encounter and Observation create/read/update mappings, plus verified webhook handling if used.
8. Add full API integration/E2E tests, Playwright browser flows, security scanning of built images, dependency pinning and coverage reporting.
9. Add staging/production deployment workflows with approval gates, cloud secrets, TLS, monitoring, backups and restore-drill evidence. The repository does not create cloud infrastructure or DNS automatically.
10. Finish a complete responsive clinical UI for each role and connect forms to the API; current pages are module workflow placeholders and the dashboard has illustrative metrics.

Use `docs/ASSESSMENT-MAP.md` to plan each assessment's evidence. Never describe a mock, placeholder or sandbox adapter as a completed live integration.

## Git collaboration and review checklist

- Create `main` as protected branch; require pull request, at least one reviewer, passing CI, resolved conversations and no force pushes.
- Use feature branches named `feature/assessment-xx-short-description`.
- Require review for schema migrations, authorization changes and clinical data changes.
- Keep migrations forward-compatible where possible; review generated SQL and test rollback/forward recovery.
- Never commit `.env`, tokens, real patient data or screenshots containing secrets.

## Documentation index

- `docs/ARCHITECTURE.md` — service boundaries and data ownership
- `docs/ERD.md` — entity relationship diagram
- `docs/ASSESSMENT-MAP.md` — all 15 assessments and evidence plan
- `docs/OPENAPI.yaml` — OpenAPI specification
- `postman/MediCore.postman_collection.json` — starter API collection
- `docs/DEPLOYMENT.md` — secure deployment runbook
- `docs/INCIDENT-PLAYBOOK.md` — five required incident simulations
