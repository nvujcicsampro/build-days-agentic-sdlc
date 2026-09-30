# Design

## Context

See `proposal.md` for motivation and `specs/city-micro-itinerary/spec.md` for
observable behavior. Root `DESIGN.md` and `capstone/AGENTS.md` require
capstone isolation, accessible UI, deterministic evidence, and honest
reporting. The full capstone guidance additionally expects an API, durable
persistence, liveness/readiness, AVM/OIDC deployment, bug remediation, GH-AW,
and transcript-free evidence. This facilitator-authorized 60-minute local
checkpoint intentionally does not claim those full-capstone outcomes.

The supplied Bold Editorial Motion file is a visual reference, not an
application specification. Its own guidance warns against using the style for
information-dense tools, so it will be applied selectively.

## Goals / Non-Goals

**Goals:**

- Make the single preference-to-itinerary workflow runnable locally with a
  very small, independently understandable implementation.
- Keep trip preferences and matching in the browser; no profile or trip data
  leaves the user's machine.
- Provide source-attributed, dated examples for London, Mexico City, and New
  York without representing curated details as live travel information.
- Keep core inputs, results, and status accessible and readable while
  retaining the visual reference's editorial character.

**Non-Goals:**

- Satisfying the repository's full formal capstone completion checklist.
- API, server, account/profile access, saved trips, or durable persistence.
- Live prices, transport schedules, route planning, map data, booking, or
  availability checks.
- Azure deployment, managed identity, GH-AW, or a deployed smoke test in this
  time-boxed checkpoint.

## Decisions

### Use a client-only local application for the checkpoint

Keep the app, source catalog, app-local Vite/Vitest configuration, and tests
within `capstone/city-micro-itinerary/`. Use a small React and TypeScript
single-page client with deterministic local matching so the requested
interaction can be completed without configuring an API or cloud resource.
Reuse the repository's installed React, Vite, Vitest, and testing-library
tooling; the existing root Vite config is bound to `src/client`, so the
capstone needs its own config rather than changing that app's config. Do not
change the root dependency manifest, lockfile, feedback application, or its
workflows for the local minimum.

An API-backed app with durable storage would better match the full capstone
guide, but adds setup and validation beyond this personal time box. If the
work later continues toward formal capstone completion, add those pieces as
explicit follow-up work rather than disguising this client-only checkpoint as
equivalent.

### Keep a small, static and source-attributed catalog

Represent each activity with its city, short description, interest tags,
relative cost tier, estimated time, official source URL, and last-checked
date. Represent each city's transit tip with an official transport source URL
and last-checked date. Include at least two activities and one transit tip for
each selected city.

Before adding a claim, verify it against the linked official tourism,
attraction, or transport source. Prefer general, durable guidance and link to
the operator for fare/card setup details. If a source is inaccessible or does
not support the claim, omit the detail or use only a clearly labeled official
source pointer. Do not invent exact fares, current schedules, eligibility, or
virtual-card availability.

Budget is a relative catalog tier, not a currency-converted spending promise.
Activity durations are approximate; the app does not calculate travel time
between locations. Both limitations must be visible near the results.

### Make matching deterministic and transparent

Filter activities by selected city, approximate duration, and the chosen
relative budget tier. Rank remaining activities by interest matches and use a
stable catalog order as a tie-breaker. If no activity matches the chosen
interests, label the fallback as a city option rather than a personalized
match. Keep the transit tip separate from activity ranking. Test the pure
matching behavior with the repository's existing Vitest tooling and exercise
the browser interaction with focused component tests where time permits.

This rule-based approach is predictable and testable in the available time.
AI recommendations and live route or price APIs were considered but rejected
because they add credentials, availability, privacy, and truthfulness risks
without being necessary for the core workflow.

### Apply Bold Editorial Motion only where it supports the workflow

Use a strong display headline and a small number of themed sections, drawing
from the reference's deep purple, green, and warm earth palette. Keep forms,
activity descriptions, source links, and transit details in readable body
typography on tested foreground/background pairs. Preserve the reference's
flat surfaces and restrained transitions where useful; do not animate
information into view in a way that blocks access.

Provide visible focus, field-associated errors, text-based statuses, and a
reduced-motion mode. Use local/system font fallbacks rather than relying on a
remote font request. The design reference's exact display sizes and palette
values are not mandatory where they reduce contrast or readability.

### Keep platform delivery separate from the local acceptance path

The local acceptance path is the preference-to-plan flow, deterministic
matching checks, source-data shape checks, and a keyboard/reduced-motion
browser review. A capstone-specific GitHub Actions workflow may be added only
after the local outcome is complete and only if time remains; it must report
actual checks and must not imply Azure, GH-AW, or full capstone completion.
Any workflow addition must follow `.github/instructions/` and remain
capstone-specific.

## Risks / Trade-offs

- [Transit or attraction details can change] -> Date every entry, link to its
  official source, avoid time-sensitive specifics unless freshly verified,
  and label all catalog guidance as non-live.
- [Official pages may block access or fail to substantiate a claim] -> Do not
  infer facts from inaccessible pages; omit the claim or present only a
  neutral official-source pointer.
- [Three cities and a tiny catalog cannot represent a comprehensive trip
  planner] -> Set expectations that this is a curated demo and keep each
  suggestion traceable to its source.
- [Relative budget and approximate durations may not match a traveler's
  actual spend or schedule] -> Label both as estimates and do not claim route
  feasibility or exact cost.
- [Bold color and motion can reduce accessibility] -> Test contrast for
  actual text/background combinations, keep body text readable, provide
  keyboard operation and reduced motion, and prefer usability over exact
  reproduction of the reference.
- [The local-only design falls short of formal capstone requirements] ->
  Record API, persistence, operations, Azure, GH-AW, defect-loop, and
  evidence-chain gaps as incomplete; create follow-up work rather than
  claiming equivalence.

## Migration Plan

There is no deployed service or persisted data to migrate. Run and validate
the application locally within its own directory. If abandoned, remove only
the capstone app directory and any capstone-specific workflow added for it;
the existing feedback app and workshop workflows remain untouched. If
continuing toward the full capstone, add reviewed API/storage and delivery
designs before introducing infrastructure or deployment authority.
