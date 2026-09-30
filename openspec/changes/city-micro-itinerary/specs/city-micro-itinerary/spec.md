# Spec Delta

## Purpose

Helps a short-stay traveler choose a few city activities and understand one
basic local transport option using their available time, budget tier, and
interests.

## ADDED Requirements

### Requirement: Generate a preference-matched local itinerary

The application SHALL let a traveler select London, Mexico City, or New York,
enter available time, choose a budget tier, and select interests, then produce
a short itinerary from its curated local catalog. Matching SHALL be
deterministic, and the application SHALL NOT require a user profile or external
AI, map, routing, or recommendation service.

#### Scenario: Valid preferences produce a useful plan

- **WHEN** a traveler submits valid preferences for a supported city
- **THEN** the application returns one or more curated activities for that
  city that fit the selected interests, time, and budget tier, along with the
  city's transit tip

#### Scenario: No activity matches all selected interests

- **WHEN** valid preferences produce no exact interest match
- **THEN** the application explains that no exact match was found and offers
  the available activities for that city without implying a match

#### Scenario: Unsupported city or invalid time is submitted

- **WHEN** a traveler submits a city outside the supported catalog or an
  invalid available-time value
- **THEN** the application identifies the invalid field and does not present
  an itinerary as if the input were accepted

### Requirement: Attribute curated activities and transit guidance

The curated catalog SHALL contain at least two activity suggestions and one
regional transit tip for each supported city. Each suggestion and transit tip
SHALL provide an official source link and a last-checked date. Cost and travel
details SHALL be presented as curated guidance, not live prices, schedules,
availability, or guarantees.

#### Scenario: Traveler reviews a suggested activity or transit tip

- **WHEN** a plan displays an activity or transit tip
- **THEN** the traveler can identify its official source and last-checked
  date, and can open that source for current details

#### Scenario: Current details are not verified or available

- **WHEN** an official source cannot be checked or does not substantiate a
  proposed claim
- **THEN** that claim is omitted or presented only as a general pointer to
  verify details with the official source, not as confirmed current advice

### Requirement: Provide an accessible preference and itinerary experience

The application SHALL provide a keyboard-operable preference form and
readable itinerary results with programmatic labels, text-based status and
validation messages, and perceivable updates. Motion SHALL respect a reduced
motion preference and SHALL NOT be required to understand or operate the
workflow.

#### Scenario: Traveler enters preferences and receives results

- **WHEN** a traveler uses the form and submits valid preferences by keyboard
- **THEN** each control has an understandable label, the result is announced
  or brought into the user's reading flow, and key information does not depend
  on color, animation, or oversized display typography

#### Scenario: Traveler submits invalid preferences

- **WHEN** required preferences are missing or invalid
- **THEN** an actionable text error is associated with the relevant control
  and the traveler can correct it using the keyboard

#### Scenario: Reduced motion is preferred

- **WHEN** the operating system or browser requests reduced motion
- **THEN** decorative transitions and animations are removed or minimized
  without hiding content or changing the workflow
