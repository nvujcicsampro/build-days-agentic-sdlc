export const catalogCheckedOn = "2026-09-30";

export type City = "London" | "Mexico City" | "New York";
export type Interest = "art" | "culture" | "history" | "nature" | "architecture";
export type BudgetTier = "free" | "low" | "moderate";

export interface Activity {
  id: string;
  city: City;
  title: string;
  description: string;
  interests: Interest[];
  estimatedHours: number;
  budgetTier: BudgetTier;
  sourceLabel: string;
  sourceUrl: string;
  sourceCheckedOn: string;
  sourceNote?: string;
}

export interface TransitTip {
  city: City;
  title: string;
  text: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceCheckedOn: string;
  sourceNote?: string;
}

export const cities: City[] = ["London", "Mexico City", "New York"];

export const activities: Activity[] = [
  {
    id: "tate-modern",
    city: "London",
    title: "Explore Tate Modern",
    description:
      "Spend a couple of hours with modern and contemporary art on the South Bank.",
    interests: ["art", "culture", "architecture"],
    estimatedHours: 2,
    budgetTier: "free",
    sourceLabel: "Tate Modern visitor information",
    sourceUrl: "https://www.tate.org.uk/visit/tate-modern",
    sourceCheckedOn: catalogCheckedOn,
  },
  {
    id: "tate-britain",
    city: "London",
    title: "Visit Tate Britain",
    description:
      "Browse the gallery's collection and make a short art stop near Millbank.",
    interests: ["art", "culture", "history"],
    estimatedHours: 2,
    budgetTier: "free",
    sourceLabel: "Tate Britain visitor information",
    sourceUrl: "https://www.tate.org.uk/visit/tate-britain",
    sourceCheckedOn: catalogCheckedOn,
    sourceNote:
      "Check the linked page for current entrance arrangements before you go.",
  },
  {
    id: "reforma-walk",
    city: "Mexico City",
    title: "Walk along Paseo de la Reforma",
    description:
      "Take in the monumental avenue, its public landmarks, and city views at your own pace.",
    interests: ["architecture", "history", "culture", "nature"],
    estimatedHours: 2,
    budgetTier: "free",
    sourceLabel: "Mexico City official visitor guide: Paseo de la Reforma",
    sourceUrl: "https://mexicocity.cdmx.gob.mx/venues/av-paseo-de-la-reforma/",
    sourceCheckedOn: catalogCheckedOn,
  },
  {
    id: "chapultepec-castle",
    city: "Mexico City",
    title: "Explore Chapultepec Castle",
    description:
      "Visit the castle that houses Mexico's National Museum of History.",
    interests: ["history", "culture", "architecture"],
    estimatedHours: 3,
    budgetTier: "moderate",
    sourceLabel: "Mexico City official visitor guide: Chapultepec Castle",
    sourceUrl: "https://mexicocity.cdmx.gob.mx/venues/chapultepec-castle/",
    sourceCheckedOn: catalogCheckedOn,
    sourceNote:
      "Budget tier is an estimate, not an admission price; check the venue's current visitor information.",
  },
  {
    id: "high-line",
    city: "New York",
    title: "Take a walk on the High Line",
    description:
      "Walk this elevated public space and take in the city from a different perspective.",
    interests: ["nature", "architecture", "culture"],
    estimatedHours: 1,
    budgetTier: "free",
    sourceLabel: "Friends of the High Line visitor information",
    sourceUrl: "https://www.thehighline.org/visit/",
    sourceCheckedOn: catalogCheckedOn,
  },
  {
    id: "staten-island-outdoors",
    city: "New York",
    title: "Explore Staten Island's green spaces",
    description:
      "Consider a longer outing among the borough's parks, gardens, and beaches.",
    interests: ["nature", "history", "culture"],
    estimatedHours: 4,
    budgetTier: "low",
    sourceLabel: "NYC Tourism + Conventions: Staten Island in one day",
    sourceUrl: "https://www.nyctourism.com/itineraries/staten-island-in-one-day/",
    sourceCheckedOn: catalogCheckedOn,
    sourceNote:
      "Budget tier is an estimate; check individual destinations for admission and travel costs.",
  },
];

export const transitTips: TransitTip[] = [
  {
    city: "London",
    title: "Check TfL's current visitor payment guidance",
    text:
      "Compare the current Oyster and contactless options on TfL's official visitor page before choosing how to pay.",
    sourceLabel: "TfL Visitor Oyster Card",
    sourceUrl:
      "https://tfl.gov.uk/travel-information/visiting-london/visitor-oyster-card",
    sourceCheckedOn: catalogCheckedOn,
    sourceNote:
      "TfL blocked access during this source check. Treat this as a link-only pointer and verify the current guidance on TfL's site.",
  },
  {
    city: "Mexico City",
    title: "Check official transit options before setting out",
    text:
      "Use the city's visitor guide to learn about transport options, then verify current payment details with the operator for your trip.",
    sourceLabel: "Mexico City official visitor guide: Getting around",
    sourceUrl: "https://mexicocity.cdmx.gob.mx/e/getting-around/",
    sourceCheckedOn: catalogCheckedOn,
    sourceNote:
      "The guide includes claims about payment and network coverage; verify current details with the transport operator.",
  },
  {
    city: "New York",
    title: "Check the payment rules for your exact service",
    text:
      "Review current MTA fare and payment guidance before riding; confirm the rules for the specific bus, subway, or other service you plan to use.",
    sourceLabel: "MTA Fares and Tolls",
    sourceUrl: "https://www.mta.info/fares-tolls",
    sourceCheckedOn: catalogCheckedOn,
  },
];
