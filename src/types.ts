/**
 * Kylyvnyk Club Types and Interfaces
 */

export enum UserRole {
  MEMBER = "MEMBER",
  VIP = "VIP",
  PARTNER = "PARTNER", // Business Partner
  MANAGER = "MANAGER",
  ADMIN = "ADMIN"
}

export enum BusinessStatus {
  UNDER_REVIEW = "UNDER_REVIEW",
  PUBLISHED = "PUBLISHED",
  HIDDEN = "HIDDEN"
}

export interface UserProfile {
  id: string;
  phone: string;
  email?: string;
  name: string;
  lastName?: string;
  role: UserRole;
  country: string;
  city: string;
  reputation: number; // Verification reputation points
  cardId: string; // e.g., "VIP-UA-000501" or "MEM-UA-081292"
  cardExpiry: string;
  avatarUrl?: string;
  isBlocked: boolean;
  registrationDate: string;
  businessId?: string;
}

export interface BusinessProfile {
  id: string;
  ownerId: string;
  name: string;
  representativeName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  category: string;
  description: string;
  specialCondition: string; // Discount or exclusive offer
  website?: string;
  logoUrl?: string;
  status: BusinessStatus;
  createdAt: string;
  reputationRequired: number; // Reputation threshold to unlock offer
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date
  time: string;
  location: string;
  country: string;
  city: string;
  image?: string;
  minRole: UserRole; // Minimum role to attend
  attendeesCount: number;
  attendedUserIds: string[];
}

export interface ClubMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string; // "ALL" for community chat, or userId for private
  recipientName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface MatchmakingRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  targetIndustry: string;
  goal: string; // e.g., "Looking for partner in Kyiv", "Logistics services"
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNote?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
}

export interface PushNotification {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: "EVENT" | "MESSAGE" | "OFFER" | "SYSTEM";
}
