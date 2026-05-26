import { UserRole, UserProfile, BusinessProfile, ClubEvent, ClubMessage, BusinessStatus, MatchmakingRequest, AuditLog } from "./types";

// Static premium statistics
export const CLUB_STATS = {
  members: "10,245+",
  countries: "35+",
  partners: "1,250+"
};

// Initial system categories
export const CLUB_CATEGORIES = [
  "Lifestyle & Concierge",
  "Yachting & Charter",
  "Real Estate & Development",
  "Investment & Wealth",
  "Legal & Consulting Services",
  "Luxury Hospitality & Spa",
  "Private Aviation"
];

// Initial premium user identities representing each club role
export const INITIAL_USERS: UserProfile[] = [
  {
    id: "usr_free",
    phone: "+380501234567",
    email: "free.member@kylyvnyk.club",
    name: "Alex",
    lastName: "Petrenko",
    role: UserRole.MEMBER,
    country: "Ukraine",
    city: "Kyiv",
    reputation: 15,
    cardId: "MEM-UA-104928",
    cardExpiry: "2027-12-31",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    isBlocked: false,
    registrationDate: "2026-01-15"
  },
  {
    id: "usr_vip",
    phone: "+447700900077",
    email: "vip.member@kylyvnyk.club",
    name: "Catherine",
    lastName: "Dupond",
    role: UserRole.VIP,
    country: "United Kingdom",
    city: "London",
    reputation: 85,
    cardId: "VIP-UK-000501",
    cardExpiry: "2028-06-30",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    isBlocked: false,
    registrationDate: "2025-11-20"
  },
  {
    id: "usr_partner",
    phone: "+41712345678",
    email: "partner@prestigenetwork.ch",
    name: "Marc",
    lastName: "Keller",
    role: UserRole.PARTNER,
    country: "Switzerland",
    city: "Geneva",
    reputation: 120,
    cardId: "BUS-CH-000042",
    cardExpiry: "2027-05-31",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    isBlocked: false,
    registrationDate: "2025-08-10",
    businessId: "biz_swiss_advisory"
  },
  {
    id: "usr_manager",
    phone: "+12025550143",
    email: "manager@kylyvnyk.club",
    name: "Elena",
    lastName: "Sokolova",
    role: UserRole.MANAGER,
    country: "United States",
    city: "Miami",
    reputation: 250,
    cardId: "MNG-US-000005",
    cardExpiry: "2029-01-01",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    isBlocked: false,
    registrationDate: "2025-05-01"
  },
  {
    id: "usr_admin",
    phone: "+12025559999",
    email: "neowebsphere@gmail.com", // matches user email from metadata
    name: "Kylyvnyk Admin",
    lastName: "Chief",
    role: UserRole.ADMIN,
    country: "United States",
    city: "New York",
    reputation: 999,
    cardId: "ADM-US-000001",
    cardExpiry: "2035-12-31",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    isBlocked: false,
    registrationDate: "2025-01-01"
  }
];

export const INITIAL_BUSINESSES: BusinessProfile[] = [
  {
    id: "biz_regent",
    ownerId: "usr_vip",
    name: "Regent Executive Concierge",
    representativeName: "Catherine Dupond",
    email: "concierge@regent-luxury.com",
    phone: "+447700900077",
    country: "United Kingdom",
    city: "London",
    category: "Lifestyle & Concierge",
    description: "Bespeak high-touch lifestyle solutions, Michelin star bookings, private island access, and luxury experiences across the UK and Continental Europe.",
    specialCondition: "Exclusive 15% discount on prestige concierge services and complimentary bottle of Dom Pérignon on booking confirmation.",
    website: "https://regent-executive.com",
    status: BusinessStatus.PUBLISHED,
    createdAt: "2025-12-01",
    reputationRequired: 0
  },
  {
    id: "biz_swiss_advisory",
    ownerId: "usr_partner",
    name: "Prestige Capital Advisory",
    representativeName: "Marc Keller",
    email: "advisory@prestige-capital.ch",
    phone: "+41712345678",
    country: "Switzerland",
    city: "Geneva",
    category: "Investment & Wealth",
    description: "Swiss private registry investment consultants. Specialized in international asset protection, structure management, and generational wealth transitions.",
    specialCondition: "Free initial 1-hour strategic wealth preservation consultation, and 10% discount on long-term retainer engagements.",
    website: "https://prestige-capital.ch",
    status: BusinessStatus.PUBLISHED,
    createdAt: "2025-12-10",
    reputationRequired: 30
  },
  {
    id: "biz_monaco_sail",
    ownerId: "usr_admin",
    name: "Monaco Sail Experience",
    representativeName: "Pierre Grimaldi",
    email: "charter@monacosail.mc",
    phone: "+37793101010",
    country: "Monaco",
    city: "Monaco",
    category: "Yachting & Charter",
    description: "Ultimate Mediterranean yachting. Private luxury day cruises, elite cocktail receptions in the Port de Monaco, and access to a premium motor-yacht fleet.",
    specialCondition: "12% off on superyacht day leases with elite standard catering and VIP captain service included.",
    website: "https://monacosail.mc",
    status: BusinessStatus.PUBLISHED,
    createdAt: "2025-12-15",
    reputationRequired: 50
  },
  {
    id: "biz_vesta_re",
    ownerId: "usr_free",
    name: "Vesta Real State Management",
    representativeName: "Alex Petrenko",
    email: "alex@vesta-real.com",
    phone: "+380501234567",
    country: "Ukraine",
    city: "Kyiv",
    category: "Real Estate & Development",
    description: "Premium property scouting in Kyiv, Vienna, and London. Professional transaction assistance, real estate assessment, and elite rental curation.",
    specialCondition: "Waived advisory retainer, exclusive access to pre-market luxury off-plan catalog, and 20% discount on final contract closing support.",
    website: "https://vesta-re.com",
    status: BusinessStatus.UNDER_REVIEW,
    createdAt: "2026-05-20",
    reputationRequired: 20
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: "evt_london_summit",
    title: "Global Business & Jet Summit - Monaco 2026",
    description: "Top-tier closed-door networking dinner uniting European founders, yacht sponsors, and accredited family offices. Live panel on wealth preservation paradigms and digital compliance.",
    date: "2026-06-25",
    time: "18:00 - 23:00",
    location: "Yacht Club de Monaco, Quai Louis II",
    country: "Monaco",
    city: "Monaco",
    minRole: UserRole.VIP,
    attendeesCount: 48,
    attendedUserIds: ["usr_vip", "usr_partner", "usr_admin"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "evt_kyiv_brunch",
    title: "Kyiv Networking & Synergies Brunch",
    description: "Exclusive morning brief focusing on Ukraine investment recovery ventures, critical business safety protocols, and cross-border partnership matching.",
    date: "2026-07-12",
    time: "11:00 - 14:30",
    location: "Kama Restaurant, premium panoramic room",
    country: "Ukraine",
    city: "Kyiv",
    minRole: UserRole.MEMBER,
    attendeesCount: 35,
    attendedUserIds: ["usr_free", "usr_admin"],
    image: "https://images.unsplash.com/photo-1543156880-9c47487ff5c0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "evt_geneva_legal",
    title: "Asset Curation Round-Table Geneva",
    description: "Private round-table discussing Swiss banking compliance, cross-border corporate structure optimization, and upcoming taxation alterations.",
    date: "2026-08-04",
    time: "15:00 - 18:30",
    location: "Hotel President Wilson, Salon Rhone",
    country: "Switzerland",
    city: "Geneva",
    minRole: UserRole.VIP,
    attendeesCount: 22,
    attendedUserIds: ["usr_partner", "usr_vip"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
  }
];

export const INITIAL_MESSAGES: ClubMessage[] = [
  {
    id: "msg_1",
    senderId: "usr_partner",
    senderName: "Marc Keller",
    recipientId: "ALL",
    recipientName: "Kylyvnyk Community",
    content: "Greetings to all members! If anyone needs custom structuring advice for holding setups in Zurich or Geneve, feel free to pitch direct queries in personal messaging.",
    timestamp: "2026-05-24T14:33:00Z",
    isRead: true
  },
  {
    id: "msg_2",
    senderId: "usr_vip",
    senderName: "Catherine Dupond",
    recipientId: "ALL",
    recipientName: "Kylyvnyk Community",
    content: "Looking forward to meeting partners next week at the Monaco Yacht Club Summit! I'll be sharing access to high-end London concierge slots.",
    timestamp: "2026-05-24T18:10:00Z",
    isRead: true
  },
  {
    id: "msg_3",
    senderId: "usr_admin",
    senderName: "Kylyvnyk Club Support",
    recipientId: "usr_free",
    recipientName: "Alex Petrenko",
    content: "Welcome to Kylyvnyk Club! Your profile is verified, and you can now search and browse high-end discounts across our country hubs.",
    timestamp: "2026-05-25T02:00:00Z",
    isRead: false
  }
];

export const INITIAL_INTRODUCTIONS: MatchmakingRequest[] = [
  {
    id: "intr_1",
    requesterId: "usr_vip",
    requesterName: "Catherine Dupond",
    targetIndustry: "Wealth Management & Real Estate",
    goal: "Looking to establish trust channels with Swiss financial managers for direct London luxury client transitions.",
    status: "APPROVED",
    adminNote: "Connected with Precious Capital Swiss advisors.",
    createdAt: "2026-05-20T10:00:00Z"
  },
  {
    id: "intr_2",
    requesterId: "usr_partner",
    requesterName: "Marc Keller",
    targetIndustry: "Concierge & Luxury Lifestyle",
    goal: "Seeking top-tier concierge agents in the UK to structure integrated customer onboarding flows.",
    status: "PENDING",
    createdAt: "2026-05-24T19:44:00Z"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log_1",
    timestamp: "2026-05-25T01:00:00Z",
    userId: "usr_admin",
    userName: "Kylyvnyk Admin",
    action: "USER_VERIFICATION",
    details: "Reputation score for Alex Petrenko raised from 10 to 15."
  },
  {
    id: "log_2",
    timestamp: "2026-05-25T01:30:00Z",
    userId: "usr_admin",
    userName: "Kylyvnyk Admin",
    action: "BUSINESS_STATUS_UPDATE",
    details: "Monaco Sail Experience verified and status set to PUBLISHED (category: Yachting & Charter)"
  }
];
