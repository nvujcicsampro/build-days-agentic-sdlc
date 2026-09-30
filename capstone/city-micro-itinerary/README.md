# Sidequest: a few hours, well spent

Sidequest is a facilitator-authorized, local-first capstone variation. Choose
London, Mexico City, or New York, enter an available time and budget, pick
interests, and get a short list from a small curated catalog.

It is a demo, not a live travel planner. Activity time and budget tiers are
estimates; transit guidance is a dated pointer to official sources. Check the
linked pages before traveling. No profile is read, and trip preferences are
processed in the browser without being saved or sent to a service.

## Run locally on Windows

From the repository root, install the repository's locked dependencies once:

```powershell
npm ci
```

Start the isolated capstone app:

```powershell
npx vite --config .\capstone\city-micro-itinerary\vite.config.ts --host 127.0.0.1 --port 5175
```

Open `http://127.0.0.1:5175/`. Stop the server with `Ctrl+C`.

## Validate locally

Run the focused app tests and type-check:

```powershell
npx vitest run --config .\capstone\city-micro-itinerary\vite.config.ts
npx tsc --noEmit -p .\capstone\city-micro-itinerary\tsconfig.json
npx eslint .\capstone\city-micro-itinerary\src .\capstone\city-micro-itinerary\tests .\capstone\city-micro-itinerary\vite.config.ts
npx vite --config .\capstone\city-micro-itinerary\vite.config.ts build
```

The catalog records official source links and the date checked for each
activity and transit tip. The London TfL page could not be fetched during the
last source check; its entry is only a pointer to verify TfL's current visitor
guidance.

## Evidence and limitations

Local automated and browser smoke checks are the evidence for this checkpoint.
No dedicated GitHub Actions run, Azure/AVM deployment, protected OIDC
environment, deployed URL or smoke test, GH-AW run, issue-driven defect loop,
or transcript-free formal capstone evidence chain is claimed. The app has no
API or durable storage. These remain incomplete relative to the repository's
full capstone guidance.
