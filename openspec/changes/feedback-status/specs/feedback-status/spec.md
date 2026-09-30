## ADDED Requirements

### Requirement: Feedback status and submission date

The application SHALL show each feedback item's status and original submission
date. Status SHALL be exactly `new`, `planned`, or `done`. Newly created
feedback SHALL have status `new`. A legacy item without a stored status SHALL
be returned and displayed as `new` without changing its original submission
date or creating a status-history event merely by reading it.

#### Scenario: Visitor submits feedback

- **WHEN** a visitor submits valid feedback with their full name
- **THEN** the application stores the feedback and self-reported name, assigns
  status `new`, and returns the feedback with its submission date

#### Scenario: Board displays a new feedback item

- **WHEN** the board loads feedback that has a stored status
- **THEN** it displays that status and the item's original submission date

#### Scenario: Board displays legacy feedback without status

- **WHEN** the board loads an existing feedback item with no stored status
- **THEN** it displays the status as `new` and the original submission date
  without creating a status-history event or rewriting the record as a side
  effect of reading it

### Requirement: Forward-only status transitions

The application SHALL permit only the next forward transition in the sequence
`new` → `planned` → `done`. The UI SHALL offer only the next available status
and SHALL offer no status action for `done`. The API and storage behavior SHALL
enforce the transition rule independently of UI controls.

#### Scenario: Visitor advances new feedback

- **WHEN** a visitor provides their full name and advances an item from `new`
  to `planned`
- **THEN** the application persists the status and appends a history event
  recording the prior status, new status, actor name, and time

#### Scenario: Visitor completes planned feedback

- **WHEN** a visitor provides their full name and advances an item from
  `planned` to `done`
- **THEN** the application persists the status and appends a history event
  recording the prior status, new status, actor name, and time

#### Scenario: Board offers only the next status

- **WHEN** a visitor views an item with status `new` or `planned`
- **THEN** the board offers only `planned` or `done`, respectively, and does
  not offer the current or an earlier status

#### Scenario: Completed feedback has no forward action

- **WHEN** a visitor views an item with status `done`
- **THEN** the board shows `done` and offers no further status action

### Requirement: Attributable status history

The application SHALL retain and display each successful status transition
with its previous status, resulting status, self-reported actor name, and
timestamp. History SHALL be displayed in chronological order. Reading or
rejecting an update SHALL NOT append a history event. Names SHALL be
represented as self-reported and SHALL NOT be presented as verified identity.

#### Scenario: Visitor reviews status history

- **WHEN** an item has one or more successful status transitions
- **THEN** the board displays those transitions in chronological order with
  the previous and resulting statuses, actor names, and transition times

#### Scenario: Legacy feedback has no transition history

- **WHEN** a legacy feedback item has no status-history events
- **THEN** the board displays its effective status as `new` and does not
  fabricate a status-change event

### Requirement: Reject invalid status changes without mutation

The application SHALL reject missing or invalid status/actor input, skipped
or reversed transitions, requests targeting unknown feedback, and stale
transitions. Rejected requests SHALL NOT change feedback, votes, or history.
Error responses SHALL identify the failure with actionable, consistent copy.
All errors SHALL use the same visual treatment while allowing their copy to
vary by scenario.

#### Scenario: Visitor attempts to skip or reverse a status

- **WHEN** a visitor requests a transition other than the next forward step
- **THEN** the application rejects the request with an actionable transition
  error and leaves the status, votes, and history unchanged

#### Scenario: Visitor submits invalid transition input

- **WHEN** a visitor submits a missing or unsupported status or an empty or
  invalid actor name
- **THEN** the application rejects the request with actionable validation
  feedback and leaves the status, votes, and history unchanged

#### Scenario: Visitor updates unknown feedback

- **WHEN** a visitor requests a status update for an identifier that does not
  exist
- **THEN** the application returns a not-found error and creates no feedback
  or history

#### Scenario: Visitor submits a stale transition

- **WHEN** another successful status update has made the visitor's requested
  transition no longer the next valid transition
- **THEN** the application preserves the latest status and history and returns
  the message "This feedback has changed. Refresh to see the latest status."

#### Scenario: Status update encounters storage failure

- **WHEN** the storage operation fails before a status transition is
  committed
- **THEN** the application shows an actionable save-failure message in the
  standard error style and does not report success or change the displayed
  status

### Requirement: Accessible status interactions

Status, submission date, transition history, status controls, and operation
feedback SHALL be perceivable and operable without relying on color or pointer
input. Controls SHALL be associated with the feedback item they affect.
Pending, success, and error outcomes SHALL be available to assistive
technology.

#### Scenario: Visitor operates a status control with a keyboard

- **WHEN** a visitor navigates to an available status control using a
  keyboard
- **THEN** the control has an item-specific accessible name, can be activated
  by keyboard, and exposes the next status action

#### Scenario: Visitor receives status operation feedback

- **WHEN** a status update is pending, succeeds, or fails
- **THEN** the board communicates the outcome visually and through an
  appropriate assistive-technology announcement, using consistent visual
  error treatment for failures

### Requirement: Status changes preserve feedback and voting behavior

Status changes SHALL NOT alter the original feedback content, submission
date, or vote count. Existing duplicate-vote prevention SHALL continue to
work. Concurrent vote and status updates SHALL NOT silently overwrite one
another.

#### Scenario: Visitor updates status on feedback with votes

- **WHEN** a status transition succeeds for feedback that has votes
- **THEN** the feedback content and vote count remain unchanged and existing
  duplicate-vote behavior remains in effect

#### Scenario: Vote and status update occur concurrently

- **WHEN** a vote and a valid status update target the same feedback at the
  same time
- **THEN** both successful changes are retained, or the status update returns
  the defined actionable conflict without losing the vote
