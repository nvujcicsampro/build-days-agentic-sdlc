## 1. Shared status and actor contract

- [ ] 1.1 Define the three-status lifecycle, transition request, and
  self-reported actor-name contract and validation.
- [ ] 1.2 Add focused contract tests for valid values and rejected input.
- Validation: `npm test -- tests/contracts.test.ts`

## 2. Persistent status and history behavior

- [ ] 2.1 Extend the storage interface and both adapters to return `new` for
  legacy records without writing during reads.
- [ ] 2.2 Persist successful forward transitions with prior/new status,
  self-reported actor name, and timestamp.
- [ ] 2.3 Preserve vote updates under concurrent status writes and reject
  stale transitions without appending history.
- [ ] 2.4 Add focused adapter tests for creation, legacy reads, valid and
  invalid transitions, history ordering, stale writes, and vote preservation.
- Primary paths: `src/server/storage.ts`, `tests/storage.test.ts`.
- Depends on: Task 1.
- Validation: `npm test -- tests/storage.test.ts`

## 3. Status update API

- [ ] 3.1 Add the status-transition endpoint using the approved contract and
  storage operation.
- [ ] 3.2 Map invalid input, unknown feedback, stale transitions, and storage
  failure to distinct actionable responses without leaking internal details.
- [ ] 3.3 Add API tests proving response shape and no mutation on rejection.
- Primary paths: `src/server/app.ts`, `tests/api.test.ts`.
- Depends on: Tasks 1 and 2.
- Validation: `npm test -- tests/api.test.ts`

## 4. Accessible status and history UI

- [ ] 4.1 Show each item's effective status, original submission date, and
  chronological transition history with self-reported actor attribution.
- [ ] 4.2 Offer only the next valid transition and collect the updater's full
  name for the history entry.
- [ ] 4.3 Provide item-specific keyboard-accessible controls and announced
  pending, success, and error feedback with consistent error styling.
- [ ] 4.4 Add UI tests for status display, legacy items, history, available
  actions, input attribution, accessibility, retry/failure, and unchanged
  voting interactions.
- Primary paths: `src/client/api.ts`, `src/client/App.tsx`,
  `src/client/styles.css`, `tests/App.test.tsx`.
- Depends on: Tasks 1 and 3.
- Validation: `npm test -- tests/App.test.tsx`

## 5. Integration and specification evidence

- [ ] 5.1 Run the focused contract, storage, API, and UI tests together.
- [ ] 5.2 Verify OpenSpec scenarios map to those focused tests and later
  deployment evidence without claiming Azure validation before it runs.
- Primary paths: none; integration verification only.
- Depends on: Tasks 1–4.
- Validation:
  `npm test -- tests/contracts.test.ts tests/storage.test.ts tests/api.test.ts tests/App.test.tsx`

### Scenario-to-validation mapping

| Capability scenario | Focused validation |
|---|---|
| Visitor submits feedback | `tests/contracts.test.ts`, `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Board displays a new feedback item | `tests/api.test.ts`, `tests/App.test.tsx` |
| Board displays legacy feedback without status | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Visitor advances new feedback | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Visitor completes planned feedback | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Board offers only the next status | `tests/App.test.tsx` |
| Completed feedback has no forward action | `tests/App.test.tsx` |
| Visitor reviews status history | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Legacy feedback has no transition history | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Visitor attempts to skip or reverse a status | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Visitor submits invalid transition input | `tests/contracts.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Visitor updates unknown feedback | `tests/storage.test.ts`, `tests/api.test.ts` |
| Visitor submits a stale transition | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Status update encounters storage failure | `tests/api.test.ts`, `tests/App.test.tsx` |
| Visitor operates a status control with a keyboard | `tests/App.test.tsx` |
| Visitor receives status operation feedback | `tests/App.test.tsx` |
| Visitor updates status on feedback with votes | `tests/storage.test.ts`, `tests/api.test.ts`, `tests/App.test.tsx` |
| Vote and status update occur concurrently | `tests/storage.test.ts`, `tests/api.test.ts` |

## 6. Deferred platform work

- No Bicep/AVM, OIDC, workflow, email authentication, email notification,
  account, or deployment configuration work is included in this change.
- Verify deployed Azure restart durability during the later implementation
  and deployment stage; do not treat it as Lab 1 evidence.
