# Incident simulation playbook

Use synthetic fixtures only. For each exercise, capture timestamp, request/correlation ID, affected synthetic entity IDs, observed impact, evidence, root cause, mitigation, regression test and prevention owner.

## 1. Unauthorized record access
- Reproduce: sign in as a patient and attempt to read another synthetic patient's ID.
- Expected: HTTP 403, no record data returned, security event retained.
- Investigate: JWT subject/role, patient binding, API authorization middleware and audit trail.
- Fix: enforce relationship checks in the service/query itself; add IDOR regression tests for every record endpoint.

## 2. Appointment conflict
- Reproduce: book two overlapping visits for one provider, including near-simultaneous requests.
- Expected: one booking succeeds and the other receives 409.
- Investigate: transaction isolation, provider schedule query and database constraint.
- Fix: PostgreSQL range exclusion constraint or serialized locking; test concurrent requests.

## 3. Delayed notifications
- Reproduce: make the sandbox notification adapter unavailable or slow.
- Expected: bounded timeout, retry with backoff, idempotency key, dead-letter/recovery path.
- Investigate: job attempts, correlation ID and provider response.
- Fix: retry only safe/idempotent delivery operations and expose controlled replay.

## 4. Database outage
- Reproduce: stop the database container while API is running.
- Expected: readiness fails, requests return safe errors, process does not leak secrets or stack traces.
- Investigate: health checks, connection pool, logs and restart behavior.
- Fix: restore dependency, verify migrations and data integrity, then run recovery tests.

## 5. Incorrect lab-result association
- Reproduce: attempt to attach a result to the wrong order/patient in synthetic fixtures.
- Expected: server derives patient identity from the order; mismatches rejected; event audited.
- Investigate: lab order foreign key, patient relationship and request payload trust.
- Fix: never accept patient identity as authoritative on result creation; verify order linkage and add cross-patient regression tests.

## Incident report template
- Incident ID / severity / start and end time:
- Synthetic entities affected:
- Reproduction steps and request IDs:
- Impact and expected behavior:
- Evidence (logs, DB rows, screenshots):
- Root cause:
- Fix and regression test:
- Recovery / data integrity verification:
- Preventive action and owner:
