import { describe, expect, it } from "vitest";
import { createItinerary, validatePreferences } from "./matching";

const validInput = {
  city: "London",
  availableHours: "3",
  budgetTier: "free",
  interests: ["art"],
};

describe("validatePreferences", () => {
  it("accepts a supported city and valid preference values", () => {
    expect(validatePreferences(validInput)).toEqual({
      valid: true,
      value: {
        city: "London",
        availableHours: 3,
        budgetTier: "free",
        interests: ["art"],
      },
    });
  });

  it("rejects unknown cities, invalid hours, budgets, and interests", () => {
    const result = validatePreferences({
      city: "Paris",
      availableHours: "0.5",
      budgetTier: "unlimited",
      interests: ["shopping"],
    });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors).toEqual({
      city: "Choose one of the listed cities.",
      availableHours: "Enter a whole number of hours from 1 to 24.",
      budgetTier: "Choose a listed budget tier.",
      interests: "Choose at least one listed interest.",
    });
  });

  it("requires at least one interest", () => {
    const result = validatePreferences({ ...validInput, interests: [] });

    expect(result.valid).toBe(false);
    if (result.valid) return;
    expect(result.errors.interests).toBe("Choose at least one listed interest.");
  });
});

describe("createItinerary", () => {
  it("returns matching activities and the city's transit tip", () => {
    const validation = validatePreferences(validInput);
    if (!validation.valid) throw new Error("Test preferences should be valid.");

    const itinerary = createItinerary(validation.value);

    expect(itinerary.exactMatch).toBe(true);
    expect(itinerary.activities.map((activity) => activity.id)).toEqual([
      "tate-modern",
      "tate-britain",
    ]);
    expect(itinerary.transitTip.city).toBe("London");
  });

  it("uses stable catalog order when selected interests have no exact fit", () => {
    const validation = validatePreferences({
      city: "Mexico City",
      availableHours: "2",
      budgetTier: "free",
      interests: ["art", "nature"],
    });
    if (!validation.valid) throw new Error("Test preferences should be valid.");

    const first = createItinerary(validation.value);
    const second = createItinerary(validation.value);

    expect(first.exactMatch).toBe(false);
    expect(first.activities.map((activity) => activity.id)).toEqual([
      "reforma-walk",
      "chapultepec-castle",
    ]);
    expect(second.activities.map((activity) => activity.id)).toEqual(
      first.activities.map((activity) => activity.id),
    );
  });

  it("limits exact recommendations to available time and selected budget", () => {
    const validation = validatePreferences({
      city: "New York",
      availableHours: "1",
      budgetTier: "free",
      interests: ["nature"],
    });
    if (!validation.valid) throw new Error("Test preferences should be valid.");

    const itinerary = createItinerary(validation.value);

    expect(itinerary.exactMatch).toBe(true);
    expect(itinerary.activities.map((activity) => activity.id)).toEqual([
      "high-line",
    ]);
  });
});
