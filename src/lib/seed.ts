import type { Database, Prospectus, Template, User } from "./types";

const now = "2026-04-12T15:00:00.000Z";

function pkg(
  id: string,
  name: string,
  price: string,
  level: Prospectus["packages"][number]["level"],
  benefits: string[],
) {
  return { id, name, price, level, benefits };
}

export const defaultSettings = {
  siteName: "SponsorPortal",
  tagline: "The quiet place to make a case for partnership.",
  allowPublicSignup: true,
  requireModeration: false,
  supportEmail: "hello@sponsorportal.com",
};

export const seedTemplates: Template[] = [
  {
    id: "tpl-editorial",
    name: "Editorial Atlas",
    description: "A magazine-like prospectus for cultural institutions and design weeks.",
    category: "Arts & Culture",
    tone: "editorial",
    accent: "#8a5a2b",
    paper: "#f4efe6",
    featured: true,
    active: true,
    defaults: {
      title: "Design Week",
      tagline: "A week of rooms, conversations, and the people who shape them.",
      overview:
        "For six days the city becomes a campus. Studios open their doors, emerging makers share unfinished work, and the people who commission culture sit beside the people who make it. This prospectus invites a small number of partners to underwrite that exchange — not as a backdrop, but as a named presence inside it.",
      audience:
        "Curators, independent studios, civic cultural officers, and a public that treats design as a civic language rather than a luxury.",
      demographics:
        "Guests travel from twelve cities. Median age 34. 61% work in creative practice or commissioning. 44% hold budget authority over brand, place, or cultural partnerships.",
      benefits:
        "Partners receive named rooms, a printed atlas circulated to every guest, and a private breakfast with festival directors and visiting commissioners. The association is editorial, not promotional.",
      callToAction:
        "We reserve eight partnerships. If the week belongs in your next chapter, we would like to speak before the atlas goes to press.",
      packages: [
        pkg("p1", "Atlas", "$8,500", "silver", [
          "Half-page in the printed atlas",
          "Named lounge for one afternoon",
          "Logo on wayfinding",
        ]),
        pkg("p2", "Studio", "$18,000", "gold", [
          "Full-page editorial portrait",
          "Hosted conversation with a visiting maker",
          "Private breakfast for eight",
        ]),
        pkg("p3", "House", "$42,000", "title", [
          "Title presence on the week",
          "Opening night remarks",
          "Year-round credit in the archive",
        ]),
      ],
    },
  },
  {
    id: "tpl-summit",
    name: "Summit Line",
    description: "Precise and architectural. Built for conferences, forums, and founder rooms.",
    category: "Technology",
    tone: "summit",
    accent: "#1c3d5a",
    paper: "#eef2f5",
    featured: true,
    active: true,
    defaults: {
      title: "Founders Summit",
      tagline: "Two days. One room. The people who decide what gets built next.",
      overview:
        "The summit is intentionally small. Two hundred operators, researchers, and capital partners gather for a closed program of working sessions. There are no expo halls. Partnership here means sitting inside the agenda, not around it.",
      audience:
        "Founders with product in market, operators scaling teams, and a limited gallery of institutional partners.",
      demographics:
        "220 attendees. 70% C-level or founding. 18 countries represented. Average company size 40–200 people.",
      benefits:
        "Sponsors receive a named working session, a private dinner table, and a post-event briefing with unattributed notes from the room.",
      callToAction:
        "Four partner seats remain. Write to us with the problem you want this room to sit with.",
      packages: [
        pkg("p1", "Session", "$12,000", "silver", [
          "Named breakout",
          "Logo on the program",
          "Two tickets",
        ]),
        pkg("p2", "Table", "$28,000", "gold", [
          "Private dinner for ten",
          "Opening remarks",
          "Four tickets",
        ]),
        pkg("p3", "House Partner", "$65,000", "platinum", [
          "Title on the summit",
          "Closed briefing",
          "Year-long credit",
        ]),
      ],
    },
  },
  {
    id: "tpl-festival",
    name: "Festival Light",
    description: "Warm, generous, and outdoor-minded. For music, food, and civic gatherings.",
    category: "Music & Entertainment",
    tone: "festival",
    accent: "#c45c26",
    paper: "#fff6ea",
    featured: true,
    active: true,
    defaults: {
      title: "Solstice Festival",
      tagline: "Three evenings when the city stays out later than it meant to.",
      overview:
        "Solstice is a late-June gathering of music, food, and neighborly spectacle. Stages sit in a public park. The audience is local first, then regional. Partners help keep the gates open and the program free after dusk.",
      audience:
        "Families before sunset, a night crowd after. Neighbors, visiting friends, and a press desk that covers the city’s summer.",
      demographics:
        "35,000 over three nights. 58% live within ten miles. Peak age band 22–44. Strong household spend on dining and culture.",
      benefits:
        "Brand presence lives in the park, not only on a banner: named groves, a hospitality tent, and a chef collaboration that people actually remember.",
      callToAction:
        "We partner with eight houses each year. If your name belongs in a midsummer park, we should talk while the program is still being drawn.",
      packages: [
        pkg("p1", "Grove", "$15,000", "silver", [
          "Named grove",
          "On-site activation",
          "Social feature",
        ]),
        pkg("p2", "Tent", "$32,000", "gold", [
          "Hospitality tent",
          "Chef collaboration",
          "Stage mention each night",
        ]),
        pkg("p3", "Night", "$75,000", "title", [
          "Presenting partner",
          "Sunset stage name",
          "City-wide outdoor campaign",
        ]),
      ],
    },
  },
  {
    id: "tpl-civic",
    name: "Civic Ledger",
    description: "Quiet authority for nonprofits, galas, and public-interest work.",
    category: "Nonprofit",
    tone: "civic",
    accent: "#2f4f4f",
    paper: "#f3f4f1",
    featured: true,
    active: true,
    defaults: {
      title: "Annual Gala",
      tagline: "An evening that funds the year — and names the people who made it possible.",
      overview:
        "The gala is the organization’s most visible night and its most practical one. Tickets and tables underwrite programs. Sponsors are written into the ledger as partners in the work, not ornaments on the evening.",
      audience:
        "Long-time donors, civic leaders, and a younger circle meeting the organization for the first time.",
      demographics:
        "420 seated guests. Average gift history $2,400. 35% are new to the room. Strong overlap with education, health, and civic boards.",
      benefits:
        "Recognition is restrained and lasting: a printed ledger, a named table, and a year of program credit that outlives the evening.",
      callToAction:
        "Tables are being placed now. If this year’s work belongs on your civic calendar, we would be honored to reserve a seat.",
      packages: [
        pkg("p1", "Friend", "$5,000", "community", [
          "Program listing",
          "Two seats",
          "Digital thanks",
        ]),
        pkg("p2", "Table", "$15,000", "gold", [
          "Named table of ten",
          "Remarks in the ledger",
          "Year-round web credit",
        ]),
        pkg("p3", "Evening", "$40,000", "title", [
          "Presenting partner",
          "Opening toast",
          "Named program fund",
        ]),
      ],
    },
  },
  {
    id: "tpl-arena",
    name: "Arena",
    description: "Athletic and direct. For races, leagues, and outdoor sport.",
    category: "Sports",
    tone: "arena",
    accent: "#16382b",
    paper: "#eef3ef",
    featured: false,
    active: true,
    defaults: {
      title: "City Marathon",
      tagline: "Twenty-six miles the city can see, and a morning it will talk about.",
      overview:
        "The course runs through neighborhoods that rarely share a Saturday. Eighteen thousand runners. A few hundred thousand more on the sidewalks. Partners stand at the points where the city gathers — start, bridges, and finish.",
      audience:
        "Competitive amateurs, first-time marathoners, families on the course, and a broadcast audience across the region.",
      demographics:
        "18,200 registered. Median age 36. 47% household income above $110k. 62% travel from outside the host city.",
      benefits:
        "On-course ownership, a hospitality balcony at the finish, and a year of athlete-community storytelling.",
      callToAction:
        "Course and finish partners are confirmed in autumn. If this race should carry your name, the window is open.",
      packages: [
        pkg("p1", "Mile", "$20,000", "silver", [
          "Named mile",
          "Crew presence",
          "Digital recap",
        ]),
        pkg("p2", "Bridge", "$45,000", "gold", [
          "Landmark activation",
          "Hospitality for twenty",
          "Athlete film credit",
        ]),
        pkg("p3", "Finish", "$120,000", "title", [
          "Finish line name",
          "Broadcast open",
          "Year-round community series",
        ]),
      ],
    },
  },
  {
    id: "tpl-noir",
    name: "Studio Noir",
    description: "A dark, spare template for luxury houses, fashion, and private clubs.",
    category: "Fashion",
    tone: "noir",
    accent: "#c9b37a",
    paper: "#161616",
    featured: false,
    active: true,
    defaults: {
      title: "After Hours",
      tagline: "A private evening for the houses that prefer to be found, not announced.",
      overview:
        "Eighty guests. One room. A short program of clothes, sound, and conversation that never leaves the building. Partnership is limited to three names, printed once, spoken once.",
      audience:
        "Editors, private clients, and a handful of buyers who still prefer a room to a lookbook.",
      demographics:
        "80 seated. Invitation only. 90% have purchased from a partner house in the last 18 months.",
      benefits:
        "A single credit, a private preview, and an introduction that cannot be bought in a media plan.",
      callToAction:
        "Three names. If yours should be one of them, write privately. We answer slowly on purpose.",
      packages: [
        pkg("p1", "Seat", "$18,000", "silver", [
          "Four invitations",
          "Printed credit",
        ]),
        pkg("p2", "Room", "$48,000", "gold", [
          "Named interlude",
          "Private preview",
          "Eight invitations",
        ]),
        pkg("p3", "House", "$90,000", "title", [
          "Sole evening partner",
          "Opening word",
          "Archive credit",
        ]),
      ],
    },
  },
];

export const seedUsers: Omit<User, "passwordHash">[] = [
  {
    id: "user-admin",
    email: "admin@sponsorportal.com",
    name: "Amelia Cho",
    role: "admin",
    organization: "SponsorPortal",
    location: "San Francisco, CA",
    industry: "Technology",
    active: true,
    createdAt: "2025-11-02T18:00:00.000Z",
  },
  {
    id: "user-prospect-1",
    email: "creator@sponsorportal.com",
    name: "Jonah Hale",
    role: "prospect",
    organization: "North Shore Athletics",
    location: "Vancouver, BC",
    industry: "Sports",
    active: true,
    createdAt: "2026-01-08T16:20:00.000Z",
  },
  {
    id: "user-prospect-2",
    email: "walt.e@example.net",
    name: "Mira Solano",
    role: "prospect",
    organization: "Lumen Collective",
    location: "New York, NY",
    industry: "Arts & Culture",
    active: true,
    createdAt: "2026-01-19T14:10:00.000Z",
  },
  {
    id: "user-prospect-3",
    email: "olivia.t@example.org",
    name: "Priya Raman",
    role: "prospect",
    organization: "Harbor Youth Foundation",
    location: "Chicago, IL",
    industry: "Nonprofit",
    active: true,
    createdAt: "2026-02-03T11:40:00.000Z",
  },
  {
    id: "user-sponsor-1",
    email: "sponsor@sponsorportal.com",
    name: "Elena Voss",
    role: "sponsor",
    organization: "Northline Capital",
    location: "Chicago, IL",
    industry: "Technology",
    active: true,
    createdAt: "2026-01-14T09:00:00.000Z",
  },
  {
    id: "user-sponsor-2",
    email: "beth.t@example.com",
    name: "Marcus Adeyemi",
    role: "sponsor",
    organization: "Field & Harbor",
    location: "Seattle, WA",
    industry: "Food & Hospitality",
    active: true,
    createdAt: "2026-02-11T17:25:00.000Z",
  },
  {
    id: "user-inactive",
    email: "xavier.y@example.org",
    name: "Closed Account",
    role: "prospect",
    organization: "—",
    location: "",
    industry: "",
    active: false,
    createdAt: "2025-09-01T12:00:00.000Z",
  },
];

export function seedProspectuses(): Prospectus[] {
  return [
    {
      id: "prs-marathon",
      slug: "north-shore-marathon",
      ownerId: "user-prospect-1",
      templateId: "tpl-arena",
      status: "published",
      title: "North Shore Marathon",
      tagline: "A coastal course the city can see from its kitchen windows.",
      organization: "North Shore Athletics",
      industry: "Sports",
      location: "Vancouver, BC",
      eventDate: "2026-10-04",
      audienceSize: "10,000–50,000",
      overview:
        "The North Shore Marathon follows the water from Ambleside to the Lions Gate and back through neighborhoods that rarely share a Saturday. Eighteen thousand runners. Families on the seawall. A finish that faces the mountains. We are looking for a small set of partners who want their name at the points where the city gathers — not a logo on every cup.",
      audience:
        "Competitive amateurs, first-time marathoners from across the Pacific Northwest, and a sidewalk audience that treats the morning as a civic holiday.",
      demographics:
        "18,200 registered runners. Median age 36. 47% household income above $110k. 62% travel from outside Metro Vancouver. Broadcast and social reach last year: 1.4 million impressions.",
      benefits:
        "Partners receive a named stretch of course, a hospitality balcony at the finish, and a year of athlete-community storytelling that continues long after the tape is broken.",
      packages: [
        pkg("m1", "Seawall Mile", "$22,000", "silver", [
          "Named mile along the water",
          "Crew and hydration presence",
          "Inclusion in the official recap film",
        ]),
        pkg("m2", "Lions Gate", "$48,000", "gold", [
          "Landmark activation on the bridge approach",
          "Hospitality for twenty at the finish",
          "Athlete ambassador story",
        ]),
        pkg("m3", "Finish Line", "$125,000", "title", [
          "Name on the finish and broadcast open",
          "Year-round community run series",
          "Category exclusivity",
        ]),
      ],
      callToAction:
        "Course and finish partners are confirmed by the end of summer. If this race should carry your name, write to Jonah. The window is open.",
      contactEmail: "creator@sponsorportal.com",
      contactName: "Jonah Hale",
      createdAt: "2026-03-02T18:00:00.000Z",
      updatedAt: "2026-03-28T10:12:00.000Z",
      publishedAt: "2026-03-28T10:12:00.000Z",
    },
    {
      id: "prs-lumen",
      slug: "lumen-design-week",
      ownerId: "user-prospect-2",
      templateId: "tpl-editorial",
      status: "published",
      title: "Lumen Design Week",
      tagline: "Six days of open studios, unfinished work, and the people who commission culture.",
      organization: "Lumen Collective",
      industry: "Arts & Culture",
      location: "New York, NY",
      eventDate: "2026-09-14",
      audienceSize: "2,000–10,000",
      overview:
        "Lumen turns a handful of Manhattan and Brooklyn rooms into a temporary campus. Independent studios open their doors. Emerging makers show work that is not yet for sale. Commissioners, editors, and the public share the same benches. We invite eight partners to underwrite that exchange — editorially, not as a backdrop.",
      audience:
        "Curators, independent studios, civic cultural officers, and a public that treats design as a civic language.",
      demographics:
        "8,400 guests over six days. Median age 34. 61% work in creative practice or commissioning. 44% hold budget authority. Visitors from twelve cities.",
      benefits:
        "Named rooms, a printed atlas in every guest’s hand, and a private breakfast with festival directors and visiting commissioners.",
      packages: [
        pkg("l1", "Atlas", "$9,500", "silver", [
          "Half-page in the printed atlas",
          "Named lounge for one afternoon",
          "Wayfinding credit",
        ]),
        pkg("l2", "Studio", "$21,000", "gold", [
          "Full-page editorial portrait",
          "Hosted conversation",
          "Private breakfast for eight",
        ]),
        pkg("l3", "House", "$46,000", "title", [
          "Title presence on the week",
          "Opening night remarks",
          "Archive credit",
        ]),
      ],
      callToAction:
        "We reserve eight partnerships. If the week belongs in your next chapter, write to Mira before the atlas goes to press.",
      contactEmail: "walt.e@example.net",
      contactName: "Mira Solano",
      createdAt: "2026-02-18T15:20:00.000Z",
      updatedAt: "2026-04-01T09:40:00.000Z",
      publishedAt: "2026-04-01T09:40:00.000Z",
    },
    {
      id: "prs-harbor",
      slug: "harbor-youth-gala",
      ownerId: "user-prospect-3",
      templateId: "tpl-civic",
      status: "published",
      title: "Harbor Youth Foundation Gala",
      tagline: "An evening that funds after-school studios on the South Side.",
      organization: "Harbor Youth Foundation",
      industry: "Nonprofit",
      location: "Chicago, IL",
      eventDate: "2026-11-07",
      audienceSize: "500–2,000",
      overview:
        "Harbor runs after-school studios in four neighborhoods. The gala is the night that funds the year: materials, instructors, and the late buses that make attendance possible. Sponsors are written into the ledger as partners in the work.",
      audience:
        "Long-time donors, civic leaders, and a younger circle meeting the foundation for the first time.",
      demographics:
        "420 seated guests. Average prior gift $2,400. 35% are new to the room. Strong overlap with education, health, and civic boards.",
      benefits:
        "A printed ledger, a named table, and a year of program credit that outlives the evening. Partners may visit a studio the following month.",
      packages: [
        pkg("h1", "Friend", "$5,000", "community", [
          "Program listing",
          "Two seats",
          "Digital thanks",
        ]),
        pkg("h2", "Table", "$16,000", "gold", [
          "Named table of ten",
          "Remarks in the ledger",
          "Studio visit",
        ]),
        pkg("h3", "Evening", "$40,000", "title", [
          "Presenting partner",
          "Opening toast",
          "Named materials fund",
        ]),
      ],
      callToAction:
        "Tables are being placed now. If this year’s studios belong on your civic calendar, Priya would be honored to reserve a seat.",
      contactEmail: "olivia.t@example.org",
      contactName: "Priya Raman",
      createdAt: "2026-03-11T13:00:00.000Z",
      updatedAt: "2026-04-04T16:05:00.000Z",
      publishedAt: "2026-04-04T16:05:00.000Z",
    },
    {
      id: "prs-apex",
      slug: "apex-founders-summit",
      ownerId: "user-prospect-2",
      templateId: "tpl-summit",
      status: "published",
      title: "Apex Founders Summit",
      tagline: "Two hundred operators. No expo hall. The agenda is the product.",
      organization: "Lumen Collective",
      industry: "Technology",
      location: "Austin, TX",
      eventDate: "2026-08-20",
      audienceSize: "500–2,000",
      overview:
        "Apex is a closed summit for operators who have already shipped. Two days of working sessions in a single building. Partnership means sitting inside the agenda — a named session, a dinner table, a briefing afterward — not a booth in a corridor.",
      audience:
        "Founders with product in market, operators scaling teams of 40–200, and a limited gallery of institutional partners.",
      demographics:
        "220 attendees. 70% C-level or founding. 18 countries. Average company age six years.",
      benefits:
        "A named working session, a private dinner table, and a post-event briefing with unattributed notes from the room.",
      packages: [
        pkg("a1", "Session", "$14,000", "silver", [
          "Named breakout",
          "Program credit",
          "Two tickets",
        ]),
        pkg("a2", "Table", "$30,000", "gold", [
          "Private dinner for ten",
          "Opening remarks",
          "Four tickets",
        ]),
        pkg("a3", "House", "$68,000", "platinum", [
          "Title on the summit",
          "Closed briefing",
          "Year-long credit",
        ]),
      ],
      callToAction:
        "Four partner seats remain. Write with the problem you want this room to sit with.",
      contactEmail: "walt.e@example.net",
      contactName: "Mira Solano",
      createdAt: "2026-02-27T19:10:00.000Z",
      updatedAt: "2026-03-22T11:18:00.000Z",
      publishedAt: "2026-03-22T11:18:00.000Z",
    },
    {
      id: "prs-solstice",
      slug: "solstice-music-festival",
      ownerId: "user-prospect-1",
      templateId: "tpl-festival",
      status: "published",
      title: "Solstice Music Festival",
      tagline: "Three evenings when Denver stays in the park later than it meant to.",
      organization: "North Shore Athletics",
      industry: "Music & Entertainment",
      location: "Denver, CO",
      eventDate: "2026-06-19",
      audienceSize: "10,000–50,000",
      overview:
        "Solstice is a late-June gathering of music, food, and neighborly spectacle in City Park. The program is free after dusk. Partners keep the gates open and give the park a few named groves people actually use.",
      audience:
        "Families before sunset, a night crowd after. Neighbors first, then the Front Range.",
      demographics:
        "35,000 over three nights. 58% live within ten miles. Peak age band 22–44. Strong household spend on dining and culture.",
      benefits:
        "Named groves, a hospitality tent, and a chef collaboration. Presence lives in the park, not only on a banner.",
      packages: [
        pkg("s1", "Grove", "$16,000", "silver", [
          "Named grove",
          "On-site activation",
          "Social feature",
        ]),
        pkg("s2", "Tent", "$34,000", "gold", [
          "Hospitality tent",
          "Chef collaboration",
          "Stage mention each night",
        ]),
        pkg("s3", "Night", "$78,000", "title", [
          "Presenting partner",
          "Sunset stage name",
          "Outdoor campaign",
        ]),
      ],
      callToAction:
        "We partner with eight houses each year. If your name belongs in a midsummer park, write while the program is still being drawn.",
      contactEmail: "creator@sponsorportal.com",
      contactName: "Jonah Hale",
      createdAt: "2026-01-30T20:00:00.000Z",
      updatedAt: "2026-03-15T08:44:00.000Z",
      publishedAt: "2026-03-15T08:44:00.000Z",
    },
    {
      id: "prs-climate",
      slug: "coastal-climate-forum",
      ownerId: "user-prospect-3",
      templateId: "tpl-summit",
      status: "published",
      title: "Coastal Climate Forum",
      tagline: "A working room for the people who fund, build, and regulate the shoreline.",
      organization: "Harbor Youth Foundation",
      industry: "Environment",
      location: "Seattle, WA",
      eventDate: "2026-07-09",
      audienceSize: "500–2,000",
      overview:
        "The forum is a two-day working meeting of municipal staff, coastal engineers, insurers, and community trusts. It is not a keynote circuit. Partners underwrite the room and sit in the sessions that match their work.",
      audience:
        "Public works directors, climate officers, engineering firms, and philanthropic climate desks.",
      demographics:
        "900 attendees. 40 agencies. 22 firms. Median decision horizon: the next capital cycle.",
      benefits:
        "A named working track, a briefing paper circulated after, and introductions that continue in the months of procurement that follow.",
      packages: [
        pkg("c1", "Track", "$11,000", "silver", [
          "Named working track",
          "Program listing",
          "Two seats",
        ]),
        pkg("c2", "Brief", "$24,000", "gold", [
          "Post-forum briefing paper",
          "Dinner table",
          "Four seats",
        ]),
        pkg("c3", "Shore", "$52,000", "platinum", [
          "Title partner",
          "Opening session",
          "Year-long credit",
        ]),
      ],
      callToAction:
        "Tracks are being assigned in May. If the shoreline is already on your desk, this is the room.",
      contactEmail: "olivia.t@example.org",
      contactName: "Priya Raman",
      createdAt: "2026-03-20T12:30:00.000Z",
      updatedAt: "2026-04-06T14:22:00.000Z",
      publishedAt: "2026-04-06T14:22:00.000Z",
    },
    {
      id: "prs-draft",
      slug: "untitled-prospectus",
      ownerId: "user-prospect-1",
      templateId: "tpl-noir",
      status: "draft",
      title: "After Hours Preview",
      tagline: "",
      organization: "North Shore Athletics",
      industry: "Fashion",
      location: "Vancouver, BC",
      eventDate: "",
      audienceSize: "Under 500",
      overview: "",
      audience: "",
      demographics: "",
      benefits: "",
      packages: [
        pkg("d1", "Seat", "", "silver", [""]),
        pkg("d2", "Room", "", "gold", [""]),
      ],
      callToAction: "",
      contactEmail: "creator@sponsorportal.com",
      contactName: "Jonah Hale",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function emptyDatabase(): Database {
  return {
    users: [],
    templates: seedTemplates,
    prospectuses: [],
    interests: [],
    settings: defaultSettings,
  };
}
