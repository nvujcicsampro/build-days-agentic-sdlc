import {
  activities,
  cities,
  transitTips,
  type Activity,
  type BudgetTier,
  type City,
  type Interest,
} from "./catalog";

export interface PreferencesInput {
  city: string;
  availableHours: string;
  budgetTier: string;
  interests: string[];
}

export interface ItineraryPreferences {
  city: City;
  availableHours: number;
  budgetTier: BudgetTier;
  interests: Interest[];
}

export type PreferenceField =
  | "city"
  | "availableHours"
  | "budgetTier"
  | "interests";

export type PreferenceValidation =
  | { valid: true; value: ItineraryPreferences }
  | { valid: false; errors: Partial<Record<PreferenceField, string>> };

export interface Itinerary {
  activities: Activity[];
  transitTip: (typeof transitTips)[number];
  exactMatch: boolean;
}

const budgetRank: Record<BudgetTier, number> = {
  free: 0,
  low: 1,
  moderate: 2,
};

const supportedInterests: Interest[] = [
  "art",
  "culture",
  "history",
  "nature",
  "architecture",
];

const isInterest = (interest: string): interest is Interest =>
  supportedInterests.some((candidate) => candidate === interest);

export function validatePreferences(
  input: PreferencesInput,
): PreferenceValidation {
  const errors: Partial<Record<PreferenceField, string>> = {};
  const city = cities.find((candidate) => candidate === input.city);
  const budgetTier = (["free", "low", "moderate"] as const).find(
    (candidate) => candidate === input.budgetTier,
  );
  const availableHours = Number(input.availableHours);
  const interests = input.interests.filter(isInterest);

  if (!city) {
    errors.city = "Choose one of the listed cities.";
  }
  if (
    input.availableHours.trim() === "" ||
    !Number.isInteger(availableHours) ||
    availableHours < 1 ||
    availableHours > 24
  ) {
    errors.availableHours = "Enter a whole number of hours from 1 to 24.";
  }
  if (!budgetTier) {
    errors.budgetTier = "Choose a listed budget tier.";
  }
  if (
    input.interests.length === 0 ||
    interests.length !== input.interests.length
  ) {
    errors.interests = "Choose at least one listed interest.";
  }

  if (
    Object.keys(errors).length > 0 ||
    !city ||
    !budgetTier ||
    interests.length === 0
  ) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    value: {
      city,
      availableHours,
      budgetTier,
      interests,
    },
  };
}

export function createItinerary(
  preferences: ItineraryPreferences,
): Itinerary {
  const candidates = activities.filter(
    (activity) =>
      activity.city === preferences.city &&
      activity.estimatedHours <= preferences.availableHours &&
      budgetRank[activity.budgetTier] <= budgetRank[preferences.budgetTier],
  );
  const exactMatches = candidates.filter((activity) =>
    preferences.interests.every((interest) =>
      activity.interests.includes(interest),
    ),
  );
  const cityActivities = activities.filter(
    (activity) => activity.city === preferences.city,
  );
  const tip = transitTips.find((candidate) => candidate.city === preferences.city);

  if (!tip) {
    throw new Error(`No transit guidance is configured for ${preferences.city}.`);
  }

  return {
    activities: (exactMatches.length > 0 ? exactMatches : cityActivities).slice(
      0,
      2,
    ),
    transitTip: tip,
    exactMatch: exactMatches.length > 0,
  };
}
