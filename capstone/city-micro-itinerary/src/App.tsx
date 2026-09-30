import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  cities,
  type BudgetTier,
  type Interest,
} from "./catalog";
import {
  createItinerary,
  validatePreferences,
  type Itinerary,
  type PreferenceField,
} from "./matching";

const interestLabels: Record<Interest, string> = {
  art: "Art",
  culture: "Culture",
  history: "History",
  nature: "Nature",
  architecture: "Architecture",
};

const budgetLabels: Record<BudgetTier, string> = {
  free: "Free ideas",
  low: "Free or low-cost ideas",
  moderate: "Include moderate-cost ideas",
};

const budgetValues: BudgetTier[] = ["free", "low", "moderate"];
const allInterests: Interest[] = [
  "art",
  "culture",
  "history",
  "nature",
  "architecture",
];

const checkedDate = (date: string): string => {
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid catalog check date: ${date}.`);
  }
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(parsedDate);
};

export function App() {
  const formId = useId();
  const resultsRef = useRef<HTMLElement>(null);
  const [city, setCity] = useState<string>("London");
  const [availableHours, setAvailableHours] = useState("3");
  const [budgetTier, setBudgetTier] = useState<string>("free");
  const [interests, setInterests] = useState<Interest[]>(["art"]);
  const [errors, setErrors] = useState<
    Partial<Record<PreferenceField, string>>
  >({});
  const [itinerary, setItinerary] = useState<Itinerary>();

  useEffect(() => {
    if (itinerary) resultsRef.current?.focus();
  }, [itinerary]);

  function toggleInterest(interest: Interest) {
    setItinerary(undefined);
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((selected) => selected !== interest)
        : [...current, interest],
    );
    setErrors((current) => ({ ...current, interests: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validatePreferences({
      city,
      availableHours,
      budgetTier,
      interests,
    });
    setItinerary(undefined);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setItinerary(createItinerary(validation.value));
  }

  return (
    <>
      <header className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Sidequest / A tiny city guide</p>
          <h1>
            A few hours,
            <br />
            well spent.
          </h1>
          <p className="hero-copy">
            Tell us what you have time for. We’ll find a few thoughtful ways
            to spend it.
          </p>
        </div>
      </header>

      <main className="page-shell">
        <section className="planner" aria-labelledby={`${formId}-title`}>
          <div className="section-heading">
            <p className="eyebrow">01 / Your layover, your call</p>
            <h2 id={`${formId}-title`}>Build a mini plan</h2>
            <p>Choose a city, a time window, a budget, and what you enjoy.</p>
          </div>

          <form onSubmit={submit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor={`${formId}-city`}>City</label>
                <select
                  id={`${formId}-city`}
                  name="city"
                  value={city}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={
                    errors.city ? `${formId}-city-error` : undefined
                  }
                  onChange={(event) => {
                    setCity(event.target.value);
                    setItinerary(undefined);
                    setErrors((current) => ({ ...current, city: undefined }));
                  }}
                >
                  {cities.map((supportedCity) => (
                    <option key={supportedCity} value={supportedCity}>
                      {supportedCity}
                    </option>
                  ))}
                </select>
                <FieldError id={`${formId}-city-error`} error={errors.city} />
              </div>

              <div className="field">
                <label htmlFor={`${formId}-hours`}>Time available</label>
                <div className="input-with-unit">
                  <input
                    id={`${formId}-hours`}
                    name="availableHours"
                    type="number"
                    min="1"
                    max="24"
                    step="1"
                    inputMode="numeric"
                    value={availableHours}
                    aria-invalid={Boolean(errors.availableHours)}
                    aria-describedby={
                      errors.availableHours
                        ? `${formId}-hours-error`
                        : `${formId}-hours-help`
                    }
                    onChange={(event) => {
                      setAvailableHours(event.target.value);
                      setItinerary(undefined);
                      setErrors((current) => ({
                        ...current,
                        availableHours: undefined,
                      }));
                    }}
                  />
                  <span aria-hidden="true">hours</span>
                </div>
                <FieldError
                  id={`${formId}-hours-error`}
                  error={errors.availableHours}
                  helpId={`${formId}-hours-help`}
                  help="Whole hours, from 1 to 24."
                />
              </div>

              <div className="field">
                <label htmlFor={`${formId}-budget`}>Budget vibe</label>
                <select
                  id={`${formId}-budget`}
                  name="budgetTier"
                  value={budgetTier}
                  aria-invalid={Boolean(errors.budgetTier)}
                  aria-describedby={
                    errors.budgetTier ? `${formId}-budget-error` : undefined
                  }
                  onChange={(event) => {
                    setBudgetTier(event.target.value);
                    setItinerary(undefined);
                    setErrors((current) => ({
                      ...current,
                      budgetTier: undefined,
                    }));
                  }}
                >
                  {budgetValues.map((tier) => (
                    <option key={tier} value={tier}>
                      {budgetLabels[tier]}
                    </option>
                  ))}
                </select>
                <FieldError
                  id={`${formId}-budget-error`}
                  error={errors.budgetTier}
                />
              </div>
            </div>

            <fieldset
              className="interests-fieldset"
              aria-describedby={
                errors.interests ? `${formId}-interests-error` : undefined
              }
            >
              <legend>What are you into?</legend>
              <div className="interest-options">
                {allInterests.map((interest) => (
                  <label className="interest-option" key={interest}>
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={interests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                    />
                    <span>{interestLabels[interest]}</span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="field-error" id={`${formId}-interests-error`}>
                  {errors.interests}
                </p>
              )}
            </fieldset>

            <button className="submit-button" type="submit">
              Find my sidequest <span aria-hidden="true">↗</span>
            </button>
          </form>
        </section>

        {itinerary && (
          <section
            className="results"
            aria-labelledby={`${formId}-results-title`}
            tabIndex={-1}
            ref={resultsRef}
          >
            <div className="results-heading">
              <div>
                <p className="eyebrow">02 / Your {city} edit</p>
                <h2 id={`${formId}-results-title`}>Your {city} edit</h2>
                <p className="results-subtitle">A short list, curated for you.</p>
              </div>
              <p className="match-status" role="status" aria-live="polite">
                {itinerary.exactMatch
                  ? "Picked for your filters"
                  : "No exact fit for every filter"}
              </p>
            </div>

            {!itinerary.exactMatch && (
              <p className="fallback-note">
                Here are a couple of ideas for this city. They may fall outside
                your chosen time or budget, so check the details before you go.
              </p>
            )}

            <p className="estimate-note">
              Time and budget are rough estimates, not live prices or route
              planning. Travel between places is not included.
            </p>

            <ol className="activity-list">
              {itinerary.activities.map((activity, index) => (
                <li className="activity-card" key={activity.id}>
                  <span className="activity-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="activity-copy">
                    <p className="activity-meta">
                      {activity.estimatedHours} hr estimate /{" "}
                      {activity.budgetTier} budget estimate
                    </p>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <SourceDetails
                      label={activity.sourceLabel}
                      url={activity.sourceUrl}
                      checkedOn={activity.sourceCheckedOn}
                      note={activity.sourceNote}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <aside className="transit-tip" aria-labelledby={`${formId}-transit`}>
              <div>
                <p className="eyebrow">Getting around</p>
                <h3 id={`${formId}-transit`}>{itinerary.transitTip.title}</h3>
                <p>{itinerary.transitTip.text}</p>
                <SourceDetails
                  label={itinerary.transitTip.sourceLabel}
                  url={itinerary.transitTip.sourceUrl}
                  checkedOn={itinerary.transitTip.sourceCheckedOn}
                  note={itinerary.transitTip.sourceNote}
                />
              </div>
              <span className="transit-mark" aria-hidden="true">
                ↗
              </span>
            </aside>
          </section>
        )}
      </main>
      <footer className="site-footer">
        Curated pointers, not live travel advice. Check official sources before
        heading out.
      </footer>
    </>
  );
}

interface FieldErrorProps {
  id: string;
  error?: string;
  help?: string;
  helpId?: string;
}

function FieldError({ id, error, help, helpId }: FieldErrorProps) {
  if (error) {
    return (
      <p className="field-error" id={id}>
        {error}
      </p>
    );
  }
  if (help && helpId) {
    return (
      <p className="field-help" id={helpId}>
        {help}
      </p>
    );
  }
  return null;
}

interface SourceDetailsProps {
  label: string;
  url: string;
  checkedOn: string;
  note?: string;
}

function SourceDetails({ label, url, checkedOn, note }: SourceDetailsProps) {
  return (
    <div className="source-details">
      <a href={url} target="_blank" rel="noreferrer">
        Source: {label}
      </a>
      <time dateTime={checkedOn}>Checked {checkedDate(checkedOn)}</time>
      {note && <p>{note}</p>}
    </div>
  );
}
