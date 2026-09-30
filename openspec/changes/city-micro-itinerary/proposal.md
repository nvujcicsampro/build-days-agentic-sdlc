# Proposal

## Why

Travelers with only a few hours in a city need quick activity ideas that fit
their time, budget, and interests, plus practical transport guidance. A small
curated local-first app makes that decision easier without depending on live
services or exposing a personal profile; its deliberately narrow outcome fits
an individual session of about 60 minutes.

This is a facilitator-authorized custom local variation, not one of the four
briefs in the repository catalog and not a claim that the full formal capstone
has been completed.

## What Changes

- Define a new `city-micro-itinerary` capability for one workflow: enter a
  selected city, available time, budget, and interests, then receive a short
  curated itinerary.
- Seed a small catalog for London, Mexico City, and New York with a couple of
  activity suggestions and one transit tip per city. Verify each item against
  an official source, retain its source link and last-checked date, and avoid
  presenting tips as live or guaranteed.
- Use deterministic matching against the submitted preferences. The first
  version does not read profile data or call AI, maps, routing, or other live
  services.
- Apply the supplied Bold Editorial Motion design selectively: use its
  oversized display type, strong section colors, and restrained motion for
  introductory and city-result moments while keeping the preference form,
  itinerary details, and status messages readable and accessible.
- Keep the application isolated under `capstone/city-micro-itinerary/` and
  validate its local user flow. Treat independent Actions validation as
  follow-up/stretch if time permits; do not claim it ran unless a run exists.
- Record Azure deployment, deployed smoke evidence, GH-AW, and the full
  transcript-free evidence chain as incomplete unless each is actually
  completed. Do not modify the workshop-wide capstone brief requirement.

## Capabilities

### New Capabilities

- `city-micro-itinerary`: Collect minimal trip preferences and return a short,
  source-attributed local itinerary and regional transit guidance.

### Modified Capabilities

None. The custom brief is a facilitator-authorized local variation; the
repository's workshop-wide requirement to choose one of its four published
briefs remains unchanged.

## Impact

- New app source, local guidance, curated data, and focused validation beneath
  `capstone/city-micro-itinerary/`.
- Optional capstone-specific GitHub Actions validation only if time remains;
  existing workshop workflows and the feedback application stay unchanged.
- No new external service, cloud resource, credential, or dependency is
  required for the local-first outcome.
- Source verification and attribution are required before curated travel or
  transit claims are presented as factual.
