# Tasks

## 1. Local Itinerary MVP (Target: 60 Minutes)

- [x] 1.1 Create an isolated React/TypeScript app with app-local Vite and
  Vitest configuration under `capstone/city-micro-itinerary/`; verify the app
  starts and builds with the existing root-installed tools without changing
  the root manifest, lockfile, or feedback app.
- [x] 1.2 Research and add at least two activities and one transit tip for
  London, Mexico City, and New York; verify every factual claim against an
  official source and include its source URL and last-checked date, omitting
  unverified details.
- [x] 1.3 Implement deterministic matching for city, approximate duration,
  relative budget tier, and interests; add focused Vitest cases for a matched
  plan, stable ordering, invalid preferences, and the labeled no-interest-
  match fallback, then verify the tests pass.
- [x] 1.4 Build the accessible preference form and itinerary results with
  source/date links, budget and duration caveats, field-associated errors,
  visible focus, text-based statuses, and reduced-motion behavior; verify
  keyboard submission and result reading order in the browser and run focused
  UI tests.
- [x] 1.5 Add app-local Windows run/test instructions and a clear statement of
  incomplete full-capstone evidence; run the app tests/build and complete one
  local preference-to-plan smoke path without calling external services.

## 2. Optional Delivery Stretch

- [ ] 2.1 Only after the local MVP passes and if time remains, add a
  capstone-specific GitHub Actions workflow for its deterministic local
  checks; verify the workflow is scoped to this app, uses least privilege,
  and produces a real successful run before reporting CI evidence.
