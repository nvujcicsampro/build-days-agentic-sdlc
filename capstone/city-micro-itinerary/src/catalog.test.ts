import { describe, expect, it } from "vitest";
import { activities, cities, catalogCheckedOn, transitTips } from "./catalog";

describe("curated catalog", () => {
  it("has at least two source-attributed activities for every supported city", () => {
    for (const city of cities) {
      const cityActivities = activities.filter((activity) => activity.city === city);
      expect(cityActivities.length, city).toBeGreaterThanOrEqual(2);

      for (const activity of cityActivities) {
        expect(new URL(activity.sourceUrl).protocol).toBe("https:");
        expect(activity.sourceLabel).not.toBe("");
        expect(activity.sourceCheckedOn).toBe(catalogCheckedOn);
      }
    }
  });

  it("has a dated official transit source for every supported city", () => {
    for (const city of cities) {
      const tip = transitTips.find((candidate) => candidate.city === city);
      expect(tip, city).toBeDefined();
      if (!tip) continue;
      expect(new URL(tip.sourceUrl).protocol).toBe("https:");
      expect(tip.sourceLabel).not.toBe("");
      expect(tip.sourceCheckedOn).toBe(catalogCheckedOn);
    }
  });
});
