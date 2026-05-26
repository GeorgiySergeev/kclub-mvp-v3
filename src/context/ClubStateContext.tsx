import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  UserRole, 
  UserProfile, 
  BusinessProfile, 
  ClubEvent, 
  ClubMessage, 
  BusinessStatus, 
  MatchmakingRequest, 
  AuditLog,
  PushNotification
} from "../types";
import { 
  INITIAL_USERS, 
  INITIAL_BUSINESSES, 
  INITIAL_EVENTS, 
  INITIAL_MESSAGES, 
  INITIAL_INTRODUCTIONS, 
  INITIAL_AUDIT_LOGS,
  CLUB_CATEGORIES
} from "../initialData";

interface ClubStateContextType {
  // Current user simulator
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  availableUsers: UserProfile[];
  switchUser: (userId: string) => void;
  
  // App states
  users: UserProfile[];
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  blockUser: (userId: string, isBlocked: boolean) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  updateUserReputation: (userId: string, reputationDelta: number) => void;

  businesses: BusinessProfile[];
  submitBusiness: (biz: Omit<BusinessProfile, "id" | "ownerId" | "createdAt">) => void;
  updateBusinessStatus: (bizId: string, status: BusinessStatus) => void;
  updateBusinessDetails: (bizId: string, details: Partial<BusinessProfile>) => void;

  events: ClubEvent[];
  createEvent: (event: Omit<ClubEvent, "id" | "attendeesCount" | "attendedUserIds">) => void;
  toggleEventRSVP: (eventId: string, userId: string) => void;

  messages: ClubMessage[];
  sendCommunityMessage: (content: string) => void;
  sendPrivateMessage: (recipientId: string, content: string) => void;

  introductions: MatchmakingRequest[];
  createMatchmaking: (targetIndustry: string, goal: string) => void;
  moderateMatchmaking: (id: string, status: "APPROVED" | "REJECTED", adminNote?: string) => void;

  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;

  notifications: PushNotification[];
  triggerNotification: (title: string, content: string, type: "EVENT" | "MESSAGE" | "OFFER" | "SYSTEM") => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Configuration
  categories: string[];
  addCategory: (cat: string) => void;
  removeCategory: (cat: string) => void;

  // Membership Billing Checkout Sandbox
  simulateVIPSubscriptionPayment: () => void;
  cancelVIPSubscription: () => void;

  // Admin Verified Status Checks
  adminTwoFactorVerified: boolean;
  setAdminTwoFactorVerified: (verified: boolean) => void;

  // Global Language Switcher
  language: "EN" | "RU";
  setLanguage: (lang: "EN" | "RU") => void;
}

const ClubStateContext = createContext<ClubStateContextType | undefined>(undefined);

export const ClubStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage keys
  const KEY_USERS = "kylyvnyk_users_v2";
  const KEY_BIZ = "kylyvnyk_biz";
  const KEY_EVENTS = "kylyvnyk_events";
  const KEY_MESSAGES = "kylyvnyk_msgs";
  const KEY_INTRO = "kylyvnyk_intros";
  const KEY_LOGS = "kylyvnyk_logs";
  const KEY_NOTIFS = "kylyvnyk_notifs";
  const KEY_CATS = "kylyvnyk_categories";
  const KEY_CURRENT_USER_ID = "kylyvnyk_current_user_id";
  const KEY_ADMIN_2FA = "kylyvnyk_admin_2fa_v1";

  // State loading helpers
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(KEY_USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [businesses, setBusinesses] = useState<BusinessProfile[]>(() => {
    const saved = localStorage.getItem(KEY_BIZ);
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem(KEY_EVENTS);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [messages, setMessages] = useState<ClubMessage[]>(() => {
    const saved = localStorage.getItem(KEY_MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [introductions, setIntroductions] = useState<MatchmakingRequest[]>(() => {
    const saved = localStorage.getItem(KEY_INTRO);
    return saved ? JSON.parse(saved) : INITIAL_INTRODUCTIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(KEY_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<PushNotification[]>(() => {
    const saved = localStorage.getItem(KEY_NOTIFS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "not_welcome",
        title: "⭐️ Kylyvnyk Luxury Invitation",
        content: "Tap between luxury profiles in the upper toolbar to test FREE Member, VIP Member, Business Partner, Manager, or Admin roles seamlessly!",
        timestamp: new Date().toISOString(),
        isRead: false,
        type: "SYSTEM"
      }
    ];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(KEY_CATS);
    return saved ? JSON.parse(saved) : CLUB_CATEGORIES;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem(KEY_CURRENT_USER_ID) || "usr_vip"; // default acting role is Catherine (VIP) for rich features
  });

  const [adminTwoFactorVerified, setAdminTwoFactorVerified] = useState<boolean>(() => {
    return localStorage.getItem(KEY_ADMIN_2FA) === "true";
  });

  const [language, setLanguage] = useState<"EN" | "RU">(() => {
    return (localStorage.getItem("kylyvnyk_language") as "EN" | "RU") || "RU";
  });

  // Derived current active profile
  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Write updates to localStorage
  useEffect(() => {
    localStorage.setItem(KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(KEY_BIZ, JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem(KEY_EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(KEY_MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(KEY_INTRO, JSON.stringify(introductions));
  }, [introductions]);

  useEffect(() => {
    localStorage.setItem(KEY_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(KEY_CATS, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(KEY_CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(KEY_ADMIN_2FA, adminTwoFactorVerified ? "true" : "false");
  }, [adminTwoFactorVerified]);

  useEffect(() => {
    localStorage.setItem("kylyvnyk_language", language);
  }, [language]);

  // Method Implementations

  const addAuditLog = (action: string, details: string) => {
    const log: AuditLog = {
      id: "log_" + Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: currentUser.id,
      userName: `${currentUser.name} ${currentUser.lastName || ""}`.trim(),
      action,
      details
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const triggerNotification = (
    title: string, 
    content: string, 
    type: "EVENT" | "MESSAGE" | "OFFER" | "SYSTEM"
  ) => {
    const notif: PushNotification = {
      id: "not_" + Math.random().toString(36).substring(2),
      title,
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
      type
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
    const mockUser = users.find(u => u.id === userId);
    if (mockUser) {
      triggerNotification(
        "🎭 Role Simulator Active",
        `Switched perspective to ${mockUser.name} (${mockUser.role}) with customized permissions.`,
        "SYSTEM"
      );
      addAuditLog("SIMULATE_SWITCH_ROLE", `LoggedIn user changed profile view to ${mockUser.name} (${mockUser.role})`);
    }
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        const updated = { ...u, ...profile };
        // If changing country or city, make sure to sync with the logger
        return updated;
      }
      return u;
    }));
    addAuditLog("UPDATE_PROFILE", `Profile info updated: ${JSON.stringify(profile)}`);
    triggerNotification("✅ Profile Updated", "Your changes have been saved to your digital profile record.", "SYSTEM");
  };

  const blockUser = (userId: string, isBlocked: boolean) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBlocked } : u));
    const u = users.find(curr => curr.id === userId);
    const label = isBlocked ? "BLOCKED" : "UNBLOCKED";
    addAuditLog(`USER_${label}`, `Target User: ${u?.name} ${u?.lastName || ""}. Set isBlocked=${isBlocked}`);
    triggerNotification("🔒 Access Rights Updated", `User registry entry modified to ${label}.`, "SYSTEM");
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        let cardIdPrefix = "MEM";
        if (newRole === UserRole.VIP) cardIdPrefix = "VIP";
        else if (newRole === UserRole.PARTNER) cardIdPrefix = "BUS";
        else if (newRole === UserRole.MANAGER) cardIdPrefix = "MNG";
        else if (newRole === UserRole.ADMIN) cardIdPrefix = "ADM";

        const randomNo = Math.floor(100000 + Math.random() * 900000);
        const code = u.country.substring(0, 2).toUpperCase() || "UA";
        const newCardId = `${cardIdPrefix}-${code}-${randomNo}`;

        return { 
          ...u, 
          role: newRole,
          cardId: newCardId
        };
      }
      return u;
    }));
    const target = users.find(curr => curr.id === userId);
    addAuditLog("ROLE_MIGRATED", `Modified registry role of ${target?.name} to [${newRole}]`);
    triggerNotification("💳 Club Card Renewed", `Issued new ${newRole} membership keycard.`, "SYSTEM");
  };

  const updateUserReputation = (userId: string, reputationDelta: number) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextRep = Math.max(0, u.reputation + reputationDelta);
        return { ...u, reputation: nextRep };
      }
      return u;
    }));
    const target = users.find(curr => curr.id === userId);
    addAuditLog("REPUTATION_ADJUST", `Adjusted ${target?.name}'s reputation by ${reputationDelta >= 0 ? "+" : ""}${reputationDelta}`);
  };

  const submitBusiness = (biz: Omit<BusinessProfile, "id" | "ownerId" | "createdAt">) => {
    const newId = "biz_" + Date.now().toString();
    const newBusiness: BusinessProfile = {
      ...biz,
      id: newId,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBusinesses(prev => [newBusiness, ...prev]);
    
    // Auto sync owner role to PARTNER if they aren't already Admin/Manager
    if (currentUser.role !== UserRole.ADMIN && currentUser.role !== UserRole.MANAGER) {
      updateUserRole(currentUser.id, UserRole.PARTNER);
      setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, businessId: newId } : u));
    } else {
      setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, businessId: newId } : u));
    }

    addAuditLog("BUSINESS_SUBMIT", `Owner ${currentUser.name} submitted business profile: "${biz.name}"`);
    triggerNotification(
      "📁 Business Profile Pending", 
      `Your business [${biz.name}] is now in the administrative review pipeline.`, 
      "SYSTEM"
    );
  };

  const updateBusinessStatus = (bizId: string, status: BusinessStatus) => {
    setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, status } : b));
    const bObj = businesses.find(curr => curr.id === bizId);
    
    addAuditLog("BUSINESS_STATUS_CHANGE", `Business: "${bObj?.name}" status updated to [${status}]`);
    
    const owner = users.find(u => u.id === bObj?.ownerId);
    if (owner) {
      triggerNotification(
        `💼 Business Profile ${status}`, 
        `Admin has set your company profile status to [${status}].`, 
        "SYSTEM"
      );
    }
  };

  const updateBusinessDetails = (bizId: string, details: Partial<BusinessProfile>) => {
    setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, ...details } : b));
    addAuditLog("BUSINESS_DETAILS_UPDATE", `Updated columns on business ID ${bizId}`);
  };

  const createEvent = (evt: Omit<ClubEvent, "id" | "attendeesCount" | "attendedUserIds">) => {
    const newEvent: ClubEvent = {
      ...evt,
      id: "evt_" + Date.now().toString(),
      attendeesCount: 0,
      attendedUserIds: []
    };
    setEvents(prev => [newEvent, ...prev]);
    addAuditLog("EVENT_CREATED", `Admin created event: "${evt.title}"`);
    triggerNotification("🗓 New Event Scheduled", `"${evt.title}" is now open for RSVPs!`, "EVENT");
  };

  const toggleEventRSVP = (eventId: string, userId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const hasJoined = e.attendedUserIds.includes(userId);
        let nextAttendees = [...e.attendedUserIds];
        if (hasJoined) {
          nextAttendees = nextAttendees.filter(id => id !== userId);
        } else {
          nextAttendees.push(userId);
        }
        return {
          ...e,
          attendedUserIds: nextAttendees,
          attendeesCount: nextAttendees.length
        };
      }
      return e;
    }));

    const eventObj = events.find(curr => curr.id === eventId);
    const isAttending = !eventObj?.attendedUserIds.includes(userId);
    addAuditLog("EVENT_RSVP_TOGGLE", `User [${userId}] is ${isAttending ? "attending" : "no longer attending"} "${eventObj?.title}"`);
    
    triggerNotification(
      isAttending ? "🎟 RSVP Confirmed" : "🎟 RSVP Cancelled",
      isAttending ? `You are registered for "${eventObj?.title}"!` : `You cancelled registration for "${eventObj?.title}".`,
      "EVENT"
    );
  };

  const sendCommunityMessage = (content: string) => {
    const mockMsg: ClubMessage = {
      id: "msg_" + Date.now().toString(),
      senderId: currentUser.id,
      senderName: `${currentUser.name} ${currentUser.lastName || ""}`.trim(),
      senderAvatar: currentUser.avatarUrl,
      recipientId: "ALL",
      recipientName: "Kylyvnyk Community",
      content,
      timestamp: new Date().toISOString(),
      isRead: true
    };
    setMessages(prev => [...prev, mockMsg]);
    addAuditLog("COMMUNITY_CHAT_POST", `Posted a message into the community forum.`);
  };

  const sendPrivateMessage = (recipientId: string, content: string) => {
    const recUser = users.find(u => u.id === recipientId);
    const recName = recUser ? `${recUser.name} ${recUser.lastName || ""}`.trim() : "Unknown User";
    
    const mockMsg: ClubMessage = {
      id: "msg_" + Date.now().toString(),
      senderId: currentUser.id,
      senderName: `${currentUser.name} ${currentUser.lastName || ""}`.trim(),
      senderAvatar: currentUser.avatarUrl,
      recipientId,
      recipientName: recName,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setMessages(prev => [...prev, mockMsg]);
    addAuditLog("PRIVATE_CHAT_POST", `Sent private message to user ${recName}`);
  };

  const createMatchmaking = (targetIndustry: string, goal: string) => {
    const match: MatchmakingRequest = {
      id: "intr_" + Date.now().toString(),
      requesterId: currentUser.id,
      requesterName: `${currentUser.name} ${currentUser.lastName || ""}`.trim(),
      targetIndustry,
      goal,
      status: "PENDING",
      createdAt: new Date().toISOString()
    };
    setIntroductions(prev => [match, ...prev]);
    addAuditLog("MATCH_INTRO_REQUESTED", `Requested Business Introduction matching "${targetIndustry}"`);
    triggerNotification(
      "🤝 Connection Ordered", 
      `Your Business Introduction with target [${targetIndustry}] is queued.`, 
      "SYSTEM"
    );
  };

  const moderateMatchmaking = (id: string, status: "APPROVED" | "REJECTED", adminNote?: string) => {
    setIntroductions(prev => prev.map(i => i.id === id ? { ...i, status, adminNote } : i));
    const target = introductions.find(curr => curr.id === id);
    addAuditLog("MATCH_INTRO_MODERATED", `Set status of intro ${id} to ${status}`);
    
    const requester = users.find(u => u.id === target?.requesterId);
    if (requester) {
      triggerNotification(
        status === "APPROVED" ? "🤝 Introduction Verified" : "🤝 Introduction Update",
        status === "APPROVED" 
          ? `Your business match for "${target?.targetIndustry}" has been approved! Counselor note: ${adminNote || "None"}`
          : `Match request returned: ${adminNote || "Please revise your request parameters."}`,
        "SYSTEM"
      );
    }
  };

  const addCategory = (cat: string) => {
    if (!categories.includes(cat)) {
      setCategories(prev => [...prev, cat]);
      addAuditLog("CATEGORY_ADDED", `Admin added business category: "${cat}"`);
    }
  };

  const removeCategory = (cat: string) => {
    setCategories(prev => prev.filter(c => c !== cat));
    addAuditLog("CATEGORY_REMOVED", `Admin deleted business category: "${cat}"`);
  };

  const simulateVIPSubscriptionPayment = () => {
    // Upgrades current user to VIP level
    if (currentUser.role === UserRole.MEMBER) {
      updateUserRole(currentUser.id, UserRole.VIP);
      addAuditLog("MEMBERSHIP_UPGRADE", "Acquired monthly premium license subscription via direct Secure Checkout Integration.");
      triggerNotification("💳 welcome code initialized!", "Membership Tier upgraded to VIP. Exclusive discounts unlocked. Club introduction activated.", "SYSTEM");
    }
  };

  const cancelVIPSubscription = () => {
    // Downgrades to member
    if (currentUser.role === UserRole.VIP || currentUser.role === UserRole.PARTNER) {
      updateUserRole(currentUser.id, UserRole.MEMBER);
      addAuditLog("MEMBERSHIP_DOWNGRADE", "Subscription canceled or expired. Returned account access status variables to Free Member.");
      triggerNotification("💳 Membership Downgraded", "Your recurring VIP billing was halted. High-grade features are now sleeping.", "SYSTEM");
    }
  };

  return (
    <ClubStateContext.Provider value={{
      currentUser,
      setCurrentUser: (user: UserProfile) => setCurrentUserId(user.id),
      availableUsers: users,
      switchUser,
      users,
      updateUserProfile,
      blockUser,
      updateUserRole,
      updateUserReputation,
      businesses,
      submitBusiness,
      updateBusinessStatus,
      updateBusinessDetails,
      events,
      createEvent,
      toggleEventRSVP,
      messages,
      sendCommunityMessage,
      sendPrivateMessage,
      introductions,
      createMatchmaking,
      moderateMatchmaking,
      auditLogs,
      addAuditLog,
      notifications,
      triggerNotification,
      markNotificationRead,
      clearNotifications,
      categories,
      addCategory,
      removeCategory,
      simulateVIPSubscriptionPayment,
      cancelVIPSubscription,
      adminTwoFactorVerified,
      setAdminTwoFactorVerified,
      language,
      setLanguage
    }}>
      {children}
    </ClubStateContext.Provider>
  );
};

export const useClubState = () => {
  const context = useContext(ClubStateContext);
  if (context === undefined) {
    throw new Error("useClubState must be used inside a ClubStateProvider container");
  }
  return context;
};
