# Test strategy

- Unit: validators, overlap calculation, consent rules, money minor-unit policy, analytics aggregations.
- API integration: authentication, roles, patient/resource ownership, DB constraints, audit events, pagination, validation and safe errors.
- Workflow: appointment booking/cancellation/waitlist, encounter state, prescription/lab transitions, consent grant/revoke.
- Security: IDOR across every patient/encounter/lab/invoice route, privilege escalation, token expiry/revocation, rate limiting and secret leakage.
- Reliability: duplicate idempotency keys, retry safety, Redis outage, FHIR timeout, notification provider failure, database outage and graceful shutdown.
- E2E: Playwright patient registration, receptionist appointment booking, doctor encounter, lab result and billing workflows using synthetic fixtures.
- Performance: representative paginated queries, measured query plans, N+1 detection, queue throughput and analytics benchmark.

Record commands, environment, commit SHA, test count, pass/fail, coverage and evidence location for each run. Never put patient details in test logs.
