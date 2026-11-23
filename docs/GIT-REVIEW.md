# Git workflow and clinical change review

1. Protect `main`: require pull requests, CI success, one or more approvals, resolved conversations and linear history where practical.
2. Use issue-linked feature branches and small commits. Suggested format: `feat(appointments): reject overlapping provider bookings`.
3. Require explicit review from a code owner for changes to authorization middleware, patient/clinical schema, consent, audit logging and migration scripts.
4. Review migrations for data loss, lock duration, backward compatibility and restore strategy. Test against a disposable copy of synthetic data.
5. Do not merge a security-sensitive change based only on screenshots; require tests proving allowed and denied cases.
6. Record reviewer, decision, linked issue, CI run and migration notes in the pull request.

Repository owners must configure GitHub branch protection in repository Settings; YAML files cannot switch on protection rules by themselves.
