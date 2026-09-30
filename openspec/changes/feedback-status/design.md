# Design

## Context

The existing application uses shared TypeScript contracts, an Express API, a
storage interface with in-memory and Azure Table implementations, and a React
client. Existing feedback records include a submission timestamp and
self-reported display name, but no status or status history.

Root `DESIGN.md` defines the durable application boundaries and Azure identity
model. This design is specific to the feedback-status change and does not
change those boundaries.

## Goals / Non-Goals

**Goals:**

- Make each feedback item's current status and submission date apparent.
- Permit only `new` → `planned` → `done`, one step at a time.
- Retain a visible, persistent record of each successful transition, including
  the prior and resulting statuses, the actor's self-reported full name, and
  the transition time.
- Preserve old records, feedback content, and vote behavior.
- Communicate that names are self-reported and do not authenticate visitors.
- Make status controls and operation feedback usable with a keyboard and
  assistive technology.

**Non-Goals:**

- Verified identity, sign-up, accounts, role-based access control, or
  facilitator-only authorization.
- Email collection, email-code sign-in, subscriptions, or notifications.
- Custom statuses, backward or skipped transitions, status deletion, bulk
  changes, or a separate status-audit service.
- Infrastructure, workflow, or deployment changes.

## Decisions

### Keep the lifecycle fixed and forward-only

The status values are exactly `new`, `planned`, and `done`. The board offers
only the next valid status for an item; it never offers the current or an
earlier status. `done` has no further status action. The API and storage layer
enforce the same transition rule rather than relying on the UI.

### Preserve legacy feedback without rewriting it on read

An existing record with no stored status is interpreted and returned as
`new`. Listing feedback does not write to storage. The original `createdAt`
remains the feedback submission date and is shown for both new and legacy
items. A successful later status transition persists the resulting status and
its history. No synthetic transition event is created for an old item's
implicit `new` state.

### Record names as self-reported attribution

Feedback submitters provide their full name, retained with the feedback.
Visitors may update status; no identity verification or permission boundary is
introduced. Each status-history event records the full name supplied by the
person making that transition. The UI must not describe this name as verified
identity or claim that the update mechanism is secure. Capturing an email or
building a later account/notification system is deferred.

### Append history only for successful transitions

Each successful transition stores the previous status, resulting status,
self-reported actor name, and timestamp. History is displayed in chronological
order. Failed, invalid, unauthorized-by-validation, or conflicting attempts
must not append an event or change the current status. Since this feature
allows every visitor who can access the board to update status, it has no
authorization-denial scenario; input and transition validation still apply.

### Resolve stale and concurrent updates against the latest stored record

A transition is valid only if it advances the item's latest persisted status
by exactly one step. When a visitor's page is stale and the requested
transition is no longer the next step, reject it with the consistent message:
"This feedback has changed. Refresh to see the latest status." The response
must not overwrite the latest status or history.

Storage updates must preserve vote changes as well as status changes. For
Azure Table Storage, use entity concurrency/version information and retry
against the latest entity when an unrelated concurrent update (such as a vote)
occurs; re-evaluate the requested status transition before committing. If the
status itself has advanced, return the stale-update conflict instead of
overwriting it. Append the history event atomically with the successful
status update. The in-memory adapter must have equivalent observable
semantics.

### Keep validation and errors actionable and consistent

Invalid/missing status or actor input, illegal transitions, unknown feedback,
stale transitions, and storage failures have distinct machine-readable
outcomes and actionable user-facing copy. Repeated requests to set the current
status are not offered by the UI and are rejected by the API as invalid
transitions. All error messages use the same visual treatment while retaining
scenario-specific wording. Failed updates leave the displayed status and vote
count unchanged; the stale-update message directs the visitor to refresh.

### Keep the UI accessible

Each feedback item's current status and submission date are available as text
to assistive technology. The next-status control has an accessible name
associated with its feedback item and supports keyboard operation. Pending,
success, and error results are announced; status failures use the same visual
error treatment as other errors. A completed item displays `done` without a
forward action.

### Keep infrastructure and identity boundaries unchanged

No Bicep/AVM, OIDC, workflow, or deployment changes are planned. Runtime Azure
access continues through the existing managed identity and least-privilege
storage role. Local/storage/API tests establish behavior; survival across an
Azure application restart is deployment evidence for the later implementation
stage and is not claimed by Lab 1.

## Risks / Trade-offs

- Self-reported full names provide attribution for a workshop exercise, not
  trustworthy identity. The UI must state this limitation; verified accounts
  are a separate future change.
- Visitors with board access can advance statuses. This is intentional for the
  workshop-only mechanism and must not be represented as production access
  control.
- Legacy items appear as `new` without an audit event because no status-change
  event actually occurred. Their original submission date remains visible.
- Concurrent Azure writes require correct entity-version handling to avoid
  losing either vote updates or status history.
- Retaining a full name in status history increases the personal information
  stored with feedback; collect no email and document the workshop context.

## Rollback

The status and history fields are additive. Roll back the application/API/UI
while retaining unknown table properties; older application versions continue
to read their existing feedback fields. Do not delete status history as part
of rollback.
