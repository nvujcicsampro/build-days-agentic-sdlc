# Proposal

## Why

Workshop participants need to distinguish newly submitted feedback from ideas
that are planned or complete. A visible, persistent status and its change
history let visitors understand progress without editing the original feedback
or relying on the conversation in which it was discussed.

## What Changes

- Add a status lifecycle with exactly three values: `new`, `planned`, and
  `done`.
- Assign `new` to newly created feedback and present legacy feedback without a
  stored status as `new`, preserving its original submission date.
- Allow a visitor to make only the next forward transition and retain an
  attributable, dated history of successful status changes.
- Show status, the submission date, and status history accessibly on the
  feedback board.
- Record visitor names as self-reported attribution. This is not account
  authentication or a security boundary.

Email-code authentication and future email updates are explicitly deferred.
This change does not collect email addresses or add notification behavior.

## Capabilities

### New Capabilities

- `feedback-status`: Feedback has a visible, forward-only status lifecycle and
  a persistent history of who changed its status and when.

### Modified Capabilities

None.

## Impact

- Extends shared feedback contracts and validation.
- Extends the storage interface and both in-memory and Azure Table adapters to
  preserve status and status history.
- Adds an API operation for status transitions with clear validation,
  not-found, conflict, and storage-failure behavior.
- Updates the React board to collect and display name attribution, status,
  submission date, transition history, and accessible operation feedback.
- Adds focused contract, storage, API, and UI tests.
- No Bicep/AVM, GitHub OIDC, workflow, or deployment configuration changes are
  planned. Azure restart evidence belongs to later implementation and
  deployment validation, not this specification step.
