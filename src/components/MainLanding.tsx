import React, { useState } from "react";
import { useClubState } from "../context/ClubStateContext";
import { CLUB_STATS, CLUB_CATEGORIES } from "../initialData";
import { UserRole, BusinessStatus, BusinessProfile } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ClubLogo } from "./ClubLogo";
import { 
  Star, 
  Globe, 
  Shield, 
  ArrowRight, 
  Award, 
  Zap, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles, 
  User, 
  ThumbsUp,
  X,
  FileText
} from "lucide-react";

// Initial datasets for the newly requested modules
const INITIAL_BLOG_POSTS = [
  {
    id: "blog-1",
    titleEn: "Sovereign Asset Protections & Geneva Legal Curation in 2026",
    titleRu: "Защита суверенных активов и доверительное управление в Женеве в 2026",
    categoryEn: "Wealth & Asset Preservation",
    categoryRu: "Сохранение и защита активов",
    summaryEn: "A deep dive into Swiss banking compliance modifications and family office setups for premium protection.",
    summaryRu: "Глубокий анализ изменений в швейцарском банковском секторе и создание семейных офисов для премиальной защиты.",
    contentEn: "Swiss private registry investment consultants are adapting to new global wealth regulations. By pairing Liechtenstein foundations with sovereign Delaware structures, family offices achieve unparalleled confidentiality and generational security. Learn how Prestige Capital Advisory works with Kylyvnyk members to build resilient, multi-jurisdictional financial architecture designed to withstand regulatory tremors.",
    contentRu: "Швейцарские инвестиционные консультанты адаптируются к новым глобальным правилам в области управления активами. Сочетание фондов Лихтенштейна с суверенными структурами штата Делавэр позволяет семейным офисам достичь исключительной конфиденциальности и преемственности поколений. Узнайте, как Prestige Capital Advisory работает с членами Клуба Kylyvnyk над созданием устойчивой, многоюрисдикционной финансовой архитектуры, способной выдержать любые регуляторные потрясения.",
    date: "2026-05-20",
    readTimeEn: "5 min read",
    readTimeRu: "5 мин чтения",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "blog-2",
    titleEn: "The Yachting Class: Navigating French Riviera & Monaco Compliance Rules",
    titleRu: "Класс Яхтинга: Соблюдение законов на Лазурном Берегу и в Монако",
    categoryEn: "Yachting & Lifestyle",
    categoryRu: "Яхтинг и образ жизни",
    summaryEn: "Exclusive legal insights on superyacht day leases, VAT refunds on luxury services, and selecting elite crews.",
    summaryRu: "Эксклюзивные юридические аспекты аренды суперяхт, возврат НДС на услуги премиум-класса и подбор экипажа.",
    contentEn: "Superyacht charters on the French Riviera require a masterclass in maritime compliance. Selecting Malta or Gibraltar registries can defer significant VAT obligations while opening premium international channels. Monaco Sail Experience is curating premium fleets for Kylyvnyk VIP, ensuring fully-staffed custom vessels equipped with executive helipads and Michelin-star service lines without transit hassles.",
    contentRu: "Аренда суперяхт на Лазурном Берегу требует детального понимания морского права. Выбор реестров Мальты или Гибралтара позволяет оптимизировать обязательства по НДС, одновременно открывая доступ к международным водам. Monaco Sail Experience формирует премиальный флот для VIP-резидентов Kylyvnyk, гарантируя укомплектованные лучшим экипажем суда с вертолетными площадками и обслуживанием уровня Мишлен.",
    date: "2026-05-18",
    readTimeEn: "4 min read",
    readTimeRu: "4 мин чтения",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "blog-3",
    titleEn: "Beyond Concierge: Combatting Luxury Fatigue & Bespoke Lifestyle Protocols",
    titleRu: "Вне консьержа: Борьба с роскошной усталостью и персонализированный сервис",
    categoryEn: "Concierge & Lifestyle",
    categoryRu: "Консьерж и стиль жизни",
    summaryEn: "How artificial intelligence is breaking high-end service, and why relationship-driven human counseling reigns supreme.",
    summaryRu: "Почему технологии отдаляют нас от настоящего премиум-сервиса, и почему человеческий подход ценится выше всего.",
    contentEn: "Modern luxury suffers from automation fatigue. Chatbots, high-level algorithms, and sterile database apps fail when executing complex, real-world lifestyle needs. Kylyvnyk counselors serve as direct family office lifelines, ensuring direct executive intervention for prestige transport, urgent medical triage, and closed yacht summits where automated listings cannot penetrate.",
    contentRu: "Современная сфера роскоши страдает от чрезмерной автоматизации. Чат-боты, продвинутые алгоритмы и безликие приложения терпят неудачу при выполнении сложных жизненных задач. Личные консультанты Kylyvnyk действуют как прямая линия поддержки вашей семьи, гарантируя оперативное вмешательство для фрахта самолетов, экстренной медицины или организации закрытых встреч.",
    date: "2026-05-12",
    readTimeEn: "6 min read",
    readTimeRu: "6 мин чтения",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop"
  }
];

const INITIAL_FAQS = [
  {
    id: "faq-1",
    qEn: "How does Kylyvnyk verify corporate partners?",
    qRu: "Как Клуб верифицирует корпоративных партнеров?",
    aEn: "Our board implements rigorous peer-vetting, checking business licenses, financial standing, reputation indicators, and client reviews to ensure absolute premium tier delivery.",
    aRu: "Наш совет проводит строгую проверку контрагентов, изучая лицензии, финансовую состоятельность, репутационные показатели и отзывы клиентов, гарантируя соответствие высочайшим стандартам."
  },
  {
    id: "faq-2",
    qEn: "Are there any passive income schemes or MLM models?",
    qRu: "Есть ли в клубе пассивный доход или MLM-схемы?",
    aEn: "Strictly forbidden. Kylyvnyk is built entirely upon pure business alliances, corporate savings on premium services, real executive matchmaking, and authentic lifestyle support.",
    aRu: "Категорически запрещено. Kylyvnyk строится исключительно на чистом партнерстве, корпоративных скидках, реальных бизнес-знакомствах и аутентичном сопровождении стиля жизни."
  },
  {
    id: "faq-3",
    qEn: "Is my personal data (PII) safe?",
    qRu: "Безопасны ли мои персональные данные (PII)?",
    aEn: "Yes. Our Card Scanner lookup filters any sensitive customer cellular credentials, email records, and transaction logs. Database values are encrypted with nightly sanitized backups.",
    aRu: "Да. Наш сканер карт скрывает любые конфиденциальные данные клиентов, почту и историю транзакций. Базы данных зашифрованы и регулярно очищаются в соответствии с протоколами безопасности."
  },
  {
    id: "faq-4",
    qEn: "How can I redeem specialized partner rewards?",
    qRu: "Как мне воспользоваться специальными условиями партнеров?",
    aEn: "Simply display your digital membership keycard in real-world venues or launch a secure negotiation thread through our active Matchmaking messengers.",
    aRu: "Просто покажите свою цифровую клубную карту в заведениях партнеров или начните защищенную сессию переговоров прямо через наш встроенный мессенджер."
  }
];

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Catherine Dupond",
    roleEn: "Founder, Regent Concierge",
    roleRu: "Основатель, Regent Concierge",
    rating: 5,
    textEn: "An exceptional matchmaking resource. Guided by counselors, we connected with elite Swiss wealth preservation networks in days.",
    textRu: "Исключительный ресурс для бизнес-знакомств. Благодаря кураторам Клуба мы вышли на швейцарских экспертов за пару дней.",
    date: "2026-05-20"
  },
  {
    id: "rev-2",
    author: "Marc Keller",
    roleEn: "Managing Partner, Prestige Advisor",
    roleRu: "Управляющий партнер, Prestige Advisor",
    rating: 5,
    textEn: "Publishing our Swiss Corporate listing brought us highly verified, qualified international contacts. Zero noise, high integrity.",
    textRu: "Размещение нашей швейцарской компании в каталоге принесло нам проверенных и серьезных клиентов. Никакого спама, только доверие клиентов.",
    date: "2026-05-18"
  },
  {
    id: "rev-3",
    author: "Dmitry K.",
    roleEn: "VIP Club Resident, Tech Investor",
    roleRu: "VIP-резидент Клуба, Техно-инвестор",
    rating: 5,
    textEn: "The physical keycard looks stellar, but the real value is direct counselor introduction lines. Seamless, high-reputation networking.",
    textRu: "Физическая карта выглядит потрясающе, но реальная ценность — в прямой связи с куратором. Бесшовный нетворкинг с высокой репутацией.",
    date: "2026-05-15"
  }
];

interface MainLandingProps {
  setActiveSection: (sec: string) => void;
  onOpenPartnerModal: (partner: BusinessProfile) => void;
}

export const MainLanding: React.FC<MainLandingProps> = ({ setActiveSection, onOpenPartnerModal }) => {
  const { currentUser, businesses, simulateVIPSubscriptionPayment, language } = useClubState();
  const [showWorksPopup, setShowWorksPopup] = useState(false);

  // Expanded blog state
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  // Accordion faq state
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Custom user reviews state
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviewLanguage, setReviewLanguage] = useState<"EN" | "RU">("RU");

  // Top Partners Slider State
  const [partnerSliderIndex, setPartnerSliderIndex] = useState(0);

  // Curated premium visuals for Top Partners Cards
  const slideDecorationForPartners: Record<string, { image: string; countryCode: string; rating: string; accent: string }> = {
    "biz_regent": {
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
      countryCode: "GB",
      rating: "5.0 ★",
      accent: "from-amber-500/20 via-yellow-500/5 to-zinc-950/40"
    },
    "biz_swiss_advisory": {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
      countryCode: "CH",
      rating: "4.9 ★",
      accent: "from-[#d4af37]/20 via-zinc-900/10 to-zinc-950/40"
    },
    "biz_monaco_sail": {
      image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800&auto=format&fit=crop",
      countryCode: "MC",
      rating: "5.0 ★",
      accent: "from-blue-600/15 via-[#d4af37]/10 to-zinc-950/40"
    }
  };

  const defaultSliderBizImage = "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop";

  // Filter state for recommended partners
  const [recommendedCategory, setRecommendedCategory] = useState<string>("ALL");

  // Filter recommended partners (published + matches chosen category)
  const recommendedPartnersList = businesses
    .filter(b => b.status === BusinessStatus.PUBLISHED)
    .filter(b => recommendedCategory === "ALL" ? true : b.category === recommendedCategory);

  // Filter top 3 published businesses for standard hero overview
  const topThreePartners = businesses
    .filter(b => b.status === BusinessStatus.PUBLISHED)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#060605] text-stone-100 flex flex-col relative overflow-hidden">
      
      {/* Full-width premium background with golden glowing network connections */}
      <div className="absolute top-0 left-0 w-full h-[760px] pointer-events-none select-none overflow-hidden z-0" id="hero_premium_ambient_globe">
        {/* Full-width high-definition background image of glowing planet from space with golden-amber city lights */}
        <div className="absolute inset-0 w-full h-full opacity-[0.38] bg-cover bg-center mix-blend-screen"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')`,
            backgroundPosition: 'center 45%'
          }} 
        />
        
        {/* Subtle, soft amber-gold premium overlays to harmoniously blend the image with our corporate golden luxury style */}
        <div className="absolute inset-0 w-full h-full bg-amber-500/[0.08] mix-blend-color" />
        <div className="absolute inset-0 w-full h-full bg-[#d4af37]/[0.05] mix-blend-overlay" />

        {/* Mask gradients to seamlessly fade the full-width background to bottom and sides so it never overlays or clutters statistics below */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060605] via-transparent to-[#060605] h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060605] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#060605] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-44 bg-gradient-to-l from-[#060605] to-transparent" />

        {/* Soft, warm, out-of-focus golden light-leaks & ambient blur spheres */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-500/12 via-[#d4af37]/6 to-transparent rounded-full blur-[130px]" />
        
        {/* Custom luxury SVG grid globe network and connections (centered over the image, giving depth) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-45">
          <svg className="w-full h-full text-[#d4af37]/30" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
            {/* Globe Outline rings */}
            <circle cx="50" cy="50" r="45" stroke="#1f1f1d" strokeWidth="0.25" />
            <circle cx="50" cy="50" r="45.5" stroke="#d4af37" strokeWidth="0.1" strokeDasharray="1 1" className="opacity-40" />
            <circle cx="50" cy="50" r="35" stroke="#d4af37" strokeWidth="0.1" strokeDasharray="2 3" className="opacity-25" />
            <circle cx="50" cy="50" r="22" stroke="#1f1f1d" />
            
            {/* Longitude ellipses to draw 3D Globe shape */}
            <ellipse cx="50" cy="50" rx="45" ry="18" stroke="#d4af37" strokeWidth="0.1" className="opacity-30" />
            <ellipse cx="50" cy="50" rx="45" ry="32" stroke="#1f1f1d" />
            <ellipse cx="50" cy="50" rx="18" ry="45" stroke="#d4af37" strokeWidth="0.1" className="opacity-30" />
            <ellipse cx="50" cy="50" rx="32" ry="45" stroke="#1f1f1d" />
            
            {/* Latitude horizontal lines */}
            <line x1="5" y1="50" x2="95" y2="50" stroke="#d4af37" strokeWidth="0.3" className="opacity-40" />
            <line x1="10" y1="35" x2="90" y2="35" stroke="#1f1f1d" />
            <line x1="10" y1="65" x2="90" y2="65" stroke="#1f1f1d" />
            <line x1="20" y1="20" x2="80" y2="20" stroke="#1f1f1d" />
            <line x1="20" y1="80" x2="80" y2="80" stroke="#1f1f1d" />

            {/* Luxury Constellation Nodes / Key VIP locations */}
            {/* Geneva (41, 36) */}
            <circle cx="41" cy="36" r="1.1" fill="#d4af37" stroke="#d4af37" strokeWidth="0.5" className="animate-ping opacity-60" />
            <circle cx="41" cy="36" r="0.75" fill="#d4af37" />
            {/* Monaco (44, 41) */}
            <circle cx="44" cy="41" r="0.75" fill="#d4af37" />
            {/* Kyiv (54, 34) */}
            <circle cx="54" cy="34" r="1.1" fill="#d4af37" stroke="#d4af37" strokeWidth="0.5" className="animate-ping opacity-60" />
            <circle cx="54" cy="34" r="0.75" fill="#d4af37" />
            {/* Liechtenstein (46, 36) */}
            <circle cx="46" cy="36" r="0.6" fill="#1f1f1d" stroke="#d4af37" strokeWidth="0.15" />
            {/* Delaware / New York (23, 41) */}
            <circle cx="23" cy="41" r="0.75" fill="#d4af37" />
            {/* Dubai (68, 52) */}
            <circle cx="68" cy="52" r="0.75" fill="#d4af37" />

            {/* Connection vectors between elite centers */}
            <path d="M 23 41 Q 32 38 41 36" stroke="#d4af37" strokeWidth="0.2" strokeDasharray="1 1.5" className="opacity-95" />
            <path d="M 41 36 L 44 41" stroke="#d4af37" strokeWidth="0.15" className="opacity-80" />
            <path d="M 41 36 Q 47 32 54 34" stroke="#d4af37" strokeWidth="0.25" className="opacity-100" />
            <path d="M 54 34 Q 61 43 68 52" stroke="#d4af37" strokeWidth="0.2" strokeDasharray="0.5 1" className="opacity-85" />
            <path d="M 44 41 Q 56 46 68 52" stroke="#d4af37" strokeWidth="0.15" className="opacity-70" />
          </svg>
        </div>

        {/* Floating City Tags in 3D-space for premium financial hubs */}
        <div className="absolute top-[37%] left-[38%] text-[9px] font-mono tracking-widest text-[#d4af37]/85 uppercase">
          GENÈVE
        </div>
        <div className="absolute top-[33%] left-[58%] text-[9px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">
          KYIV • HQ
        </div>
        <div className="absolute top-[41%] left-[45%] text-[8px] font-mono tracking-widest text-stone-300 uppercase">
          MONACO
        </div>
        <div className="absolute top-[39%] left-[21%] text-[8px] font-mono tracking-widest text-stone-300 uppercase">
          DELAWARE
        </div>
        <div className="absolute top-[54%] left-[71%] text-[8px] font-mono tracking-widest text-stone-300 uppercase">
          DUBAI
        </div>
      </div>

      {/* Hero Welcome Main Block */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 w-full lg:w-[1280px] max-w-[1280px] mx-auto text-center" id="hero_section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-[#d4af37]/20 text-xs text-[#d4af37] tracking-wider uppercase mb-6"
        >
          <Star className="w-3 h-3 fill-current" />
          <span>{language === "RU" ? "МЕЖДУНАРОДНЫЙ ЧАСТНЫЙ КЛУБ" : "International Private Club"}</span>
        </motion.div>

        {/* Logo Text banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="my-4 mb-8"
        >
          <ClubLogo size="lg" idPrefix="hero-logo" />
        </motion.div>

        {/* Double Slogan Localization: EN & RU */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto space-y-2"
        >
          <p className="text-[#d4af37] text-lg sm:text-2xl font-light tracking-widest uppercase">
            {language === "RU" ? "Сэкономь. Развивай бизнес. Живи лучше." : "Save. Develop your business. Live better."}
          </p>
          <p className="text-stone-400 text-xs sm:text-sm font-sans">
            {language === "RU" 
              ? "Привилегированный нетворкинг, эксклюзивные скидки партнеров и защита ваших активов" 
              : "Privileged networking, exclusive partner conditions & asset protection ecosystems"}
          </p>
        </motion.div>

        {/* The Three Core Gold CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-[1280px] max-w-[1280px] mx-auto"
          id="hero_three_ctas"
        >
          {/* 1. Become Member (Free) */}
          <div className="relative group bg-[#0e0e0d] p-5 rounded-xl border border-zinc-800 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col justify-between items-center text-center shadow-lg">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">
                {language === "RU" ? "БАЗОВЫЙ КЛУБ" : "MEMBER LEVEL"}
              </span>
              <h3 className="text-sm font-bold text-stone-200">
                {language === "RU" ? "СТАТЬ УЧАСТНИКОМ" : "BECOME A MEMBER"}
              </h3>
              <p className="text-[11px] text-stone-400 mt-2 min-h-8">
                {language === "RU" 
                  ? "Получите цифровую карту бесплатно, доступ к каталогу скидок и открытому нетворкингу." 
                  : "Get digital club keycard and search premium partner benefits catalog."}
              </p>
            </div>
            <button 
              onClick={() => setActiveSection("MY_CARD")}
              className="mt-4 w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-[#d4af37] text-xs font-semibold rounded border border-[#d4af37]/35 hover:border-[#d4af37]/75 transition-colors uppercase tracking-wider"
            >
              {language === "RU" ? "Получить карту" : "Get Card"}
            </button>
          </div>

          {/* 2. VIP Member ($19.99/mo) */}
          <div className="relative group bg-[#0f0e0d] p-5 rounded-xl border border-[#d4af37]/30 hover:border-[#d4af37]/80 luxury-glow transition-all duration-300 flex flex-col justify-between items-center text-center">
            <span className="absolute -top-2.5 bg-gold-gradient text-black font-mono font-bold text-[8px] tracking-widest uppercase px-3.5 py-0.5 rounded-full shadow-lg">
              {language === "RU" ? "ПОПУЛЯРНО" : "MOST POPULAR"}
            </span>
            <div className="mt-1">
              <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block mb-1">
                {language === "RU" ? "19.99 $ / МЕС" : "$19.99 / MONTH"}
              </span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === "RU" ? "VIP КАРТА" : "VIP MEMBER"}
              </h3>
              <p className="text-[11px] text-stone-300 mt-2 min-h-8">
                {language === "RU" 
                  ? "Консьерж-сервис, закрытые интро, приоритетные мероприятия и максимальный дисконт." 
                  : "Unlock luxury benefits, premium connections matchmaking & business submission."}
              </p>
            </div>
            
            {currentUser.role === UserRole.MEMBER ? (
              <button 
                onClick={simulateVIPSubscriptionPayment}
                className="mt-4 w-full py-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 hover:opacity-90 text-black text-xs font-bold rounded shadow transition-all uppercase tracking-wider scale-105 animate-pulse"
              >
                {language === "RU" ? "Активировать VIP" : "Become a VIP Member"}
              </button>
            ) : (
              <button 
                onClick={() => setActiveSection("BILLING")}
                className="mt-4 w-full py-2 bg-zinc-805 text-stone-400 text-xs font-semibold rounded border border-zinc-700 cursor-not-allowed uppercase tracking-wider"
                disabled
              >
                VIP Verified ✓
              </button>
            )}
          </div>

          {/* 3. Business Partner (Starts $19.99/mo) */}
          <div className="relative group bg-[#0e0e0d] p-5 rounded-xl border border-zinc-800 hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col justify-between items-center text-center shadow-lg">
            <div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-1">
                {language === "RU" ? "БИЗНЕСУ" : "PARTNERS"}
              </span>
              <h3 className="text-sm font-bold text-stone-200">
                {language === "RU" ? "БИЗНЕС-ПАРТНЕР" : "BUSINESS PARTNER"}
              </h3>
              <p className="text-[11px] text-stone-400 mt-2 min-h-8">
                {language === "RU" 
                  ? "Добавьте свою компанию в реестр и публикуйте специальные офферы для участников." 
                  : "Verify company and publish strategic conditions to high-income members."}
              </p>
            </div>
            <button 
              onClick={() => setActiveSection("BILLING")}
              className="mt-4 w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-[#d4af37] text-xs font-semibold rounded border border-[#d4af37]/35 hover:border-[#d4af37]/75 transition-colors uppercase tracking-wider"
            >
              {language === "RU" ? "Добавить бизнес" : "Submit Business"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Luxury Verification Stats */}
      <section className="relative z-10 bg-[#060605] py-10 border-y border-zinc-900/60" id="stats_section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-gold-gradient text-4xl sm:text-5xl font-display font-light leading-none">
                {CLUB_STATS.members}
              </span>
              <span className="text-stone-400 text-xs sm:text-sm font-medium tracking-widest uppercase mt-3">
                REGISTERED MEMBERS
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border-y md:border-y-0 md:border-x border-zinc-900">
              <span className="text-gold-gradient text-4xl sm:text-5xl font-display font-light leading-none">
                {CLUB_STATS.countries}
              </span>
              <span className="text-stone-400 text-xs sm:text-sm font-medium tracking-widest uppercase mt-3">
                SOVEREIGN COUNTRIES
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-gold-gradient text-4xl sm:text-5xl font-display font-light leading-none">
                {CLUB_STATS.partners}
              </span>
              <span className="text-stone-400 text-xs sm:text-sm font-medium tracking-widest uppercase mt-3">
                VERIFIED CORPORATE PARTNERS
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Premium Top Partners Slider Block */}
      <section className="py-20 bg-gradient-to-b from-zinc-950/20 to-[#060605] border-t border-zinc-900/40 relative overflow-hidden" id="top_partners_slider_section">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">
                {language === "RU" ? "ЭЛИТНЫЕ ПРЕДЛОЖЕНИЯ КЛУБА" : "TRUSTED ELITE BRANDS"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mt-1">
                {language === "RU" ? "ТОП ПАРТНЕРЫ KYLYVNYK" : "TOP KYLYVNYK PARTNERS"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-2xl font-sans">
                {language === "RU"
                  ? "Рекомендуемые партнеры мирового уровня с исключительными привилегиями по карте резидента"
                  : "Curated blue-chip collaborations with unprecedented conditions secured for our private club holders"}
              </p>
            </div>
            
            {/* Slider Navigation Counters & Luxury Arrows */}
            <div className="flex items-center gap-4 mt-6 md:mt-0 select-none">
              <span className="text-xs font-mono text-stone-500">
                {(partnerSliderIndex + 1).toString().padStart(2, '0')} <span className="text-stone-800">/</span> {Math.max(1, businesses.filter(b => b.status === BusinessStatus.PUBLISHED).length).toString().padStart(2, '0')}
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const list = businesses.filter(b => b.status === BusinessStatus.PUBLISHED);
                    if (list.length === 0) return;
                    setPartnerSliderIndex((prev) => (prev - 1 + list.length) % list.length);
                  }}
                  className="w-10 h-10 rounded-full border border-zinc-900 hover:border-[#d4af37]/45 bg-zinc-950/80 hover:bg-zinc-900 text-stone-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Previous Partner"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    const list = businesses.filter(b => b.status === BusinessStatus.PUBLISHED);
                    if (list.length === 0) return;
                    setPartnerSliderIndex((prev) => (prev + 1) % list.length);
                  }}
                  className="w-10 h-10 rounded-full border border-zinc-900 hover:border-[#d4af37]/45 bg-zinc-950/80 hover:bg-zinc-900 text-stone-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Next Partner"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Deck Render */}
          <div className="relative w-full overflow-hidden">
            {businesses.filter(b => b.status === BusinessStatus.PUBLISHED).length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-dashed border-zinc-900 bg-zinc-950/40">
                <span className="text-xs text-stone-500 font-mono">
                  {language === "RU" ? "Нет опубликованных партнеров" : "No published corporate partners found."}
                </span>
              </div>
            ) : (
              <div className="relative">
                {/* Horizontal slider viewport */}
                <div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ease-out"
                  id="top_partners_sliding_grid"
                >
                  {/* Standard premium layout showing 3 items starting from the index, looping if necessary */}
                  {(() => {
                    const pubList = businesses.filter(b => b.status === BusinessStatus.PUBLISHED);
                    const cardsToRender = [];
                    for (let i = 0; i < Math.min(3, pubList.length); i++) {
                      const itemIndex = (partnerSliderIndex + i) % pubList.length;
                      cardsToRender.push(pubList[itemIndex]);
                    }
                    
                    return cardsToRender.map((partner, keyId) => {
                      if (!partner) return null;
                      const decorator = slideDecorationForPartners[partner.id] || {
                        image: defaultSliderBizImage,
                        countryCode: partner.country.slice(0, 2).toUpperCase(),
                        rating: "5.0 ★",
                        accent: "from-amber-500/5 to-zinc-950/40"
                      };

                      return (
                        <motion.div
                          key={`${partner.id}-${keyId}`}
                          layout
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.4 }}
                          className="bg-zinc-950/80 border border-zinc-900 hover:border-[#d4af37]/40 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between group h-[420px] relative transition-all duration-300"
                        >
                          {/* Image backdrop with luxury overlay fade */}
                          <div className="h-44 w-full overflow-hidden relative">
                            <img
                              src={decorator.image}
                              alt={partner.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${decorator.accent}`} />
                            
                            {/* Verified Rating Indicator */}
                            <span className="absolute top-3 left-3 bg-zinc-950/90 text-[#d4af37] border border-zinc-800/80 rounded-sm py-0.5 px-2 text-[10px] font-semibold font-mono shadow-md tracking-wider">
                              {decorator.rating}
                            </span>

                            {/* Classy Category Tag */}
                            <span className="absolute bottom-3 left-3 bg-[#d4af37] text-black text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-md">
                              {partner.category}
                            </span>

                            {/* Country badge */}
                            <span className="absolute top-3 right-3 text-white bg-zinc-900/90 border border-zinc-800 rounded py-0.5 px-1.5 text-[9px] font-mono font-bold tracking-widest shadow">
                              {decorator.countryCode}
                            </span>
                          </div>

                          {/* Card Content body */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-1.5 text-stone-500 text-[10px] font-mono tracking-wider">
                                <MapPin className="w-3 h-3 text-amber-500" />
                                <span>{partner.city.toUpperCase()}, {partner.country.toUpperCase()}</span>
                              </div>
                              
                              <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#d4af37] transition-colors leading-tight">
                                {partner.name}
                              </h3>
                              
                              <p className="text-[11px] text-stone-400 mt-2 line-clamp-3 leading-relaxed font-sans">
                                {partner.description}
                              </p>
                            </div>

                            {/* Exquisite special benefit offer highlight */}
                            <div className="bg-amber-950/20 border border-[#d4af37]/15 rounded p-3 mt-3">
                              <span className="text-[9px] font-mono text-[#d4af37] font-semibold tracking-wider block uppercase">
                                {language === "RU" ? "СОЮЗНАЯ ПРИВИЛЕГИЯ:" : "KYLYVNYK PRIVILEGE:"}
                              </span>
                              <span className="text-[10px] text-stone-200 block mt-1 font-semibold line-clamp-2">
                                {partner.specialCondition}
                              </span>
                            </div>

                            {/* Elegant Details Trigger button */}
                            <div className="mt-4 pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {language === "RU" ? "Репутация: " : "Reputation: "}{partner.reputationRequired}+
                              </span>
                              <button
                                onClick={() => onOpenPartnerModal(partner)}
                                className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-white font-mono font-bold tracking-wider border-b border-[#d4af37] hover:border-white pb-0.5 transition-all text-left bg-transparent cursor-pointer"
                              >
                                {language === "RU" ? "ПОДРОБНЕЕ" : "VIEW SPECIAL"}
                                <ArrowRight className="w-3 h-3 text-[#d4af37]" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Club Membership Cards Comparison Block */}
      <section className="py-20 px-4 sm:px-6 w-full max-w-7xl mx-auto border-t border-zinc-900/60" id="club_cards_comparison_section">
        <div className="text-center mb-12">
          <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">
            {language === "RU" ? "ПРИВИЛЕГИИ ЧЛЕНСТВА" : "MEMBERSHIP TIERS"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mt-1">
            {language === "RU" ? "КЛУБНЫЕ КАРТЫ KYLYVNYK" : "KYLYVNYK CLUB CARDS"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-2xl mx-auto font-sans">
            {language === "RU" 
              ? "Выберите уровень доступа, соответствующий вашему стилю жизни и бизнес-целям. Два формата привилегий для успешных людей." 
              : "Select the level of access tailored for your lifestyle and business requirements. Two formats of exquisite privileges."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* 1. Base Club Card (Серебряная / Стандартная) */}
          <div className="bg-[#0b0b0a]/70 border border-zinc-900/80 rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden">
            {/* Subtle background card vector */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-500/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block">
                    {language === "RU" ? "БАЗОВЫЙ ДОСТУП" : "STANDARD TIER"}
                  </span>
                  <h3 className="text-xl font-bold text-stone-200 mt-1">
                    {language === "RU" ? "CLUB CARD" : "CLUB CARD"}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-stone-400">
                  <Star className="w-5 h-5" />
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-zinc-900">
                <span className="text-2xl font-semibold font-mono text-stone-300">
                  {language === "RU" ? "Бесплатно" : "Complimentary"}
                </span>
                <span className="text-xs text-stone-500 ml-2">
                  {language === "RU" ? "/ навсегда" : "/ forever"}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-stone-400 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-200">
                      {language === "RU" ? "Цифровой ID пропуска" : "Sovereign Digital Pass"}
                    </span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {language === "RU" ? "Индивидуальный номер в реестре членов Kylyvnyk." : "Your exclusive verified slot in our digital members registry."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-400 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-200">
                      {language === "RU" ? "Поиск по каталогу" : "Benefits Directory Search"}
                    </span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {language === "RU" ? "Полноценный каталог со скидками и специальными условиями партнеров клуба." : "Explore the full listing of verified businesses with bespoke offline conditions."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-400 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-200">
                      {language === "RU" ? "Базовые скидки" : "Standard Partner Discounts"}
                    </span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {language === "RU" ? "Скидки до 10% в ресторанах, отелях, детейлинге и услугах премиум сегмента." : "Instant savings at top local premium venues upon presenting your digital passport."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-400 text-xs sm:text-sm">
                  <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-stone-200">
                      {language === "RU" ? "Клубные чаты" : "Community Chat Circles"}
                    </span>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {language === "RU" ? "Участие в обсуждениях, нетворкинге и предложениях от резидентов напрямую." : "Access to community-wide text chatrooms to talk and post strategic queries."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setActiveSection("MY_CARD")}
              className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-stone-300 rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-colors"
            >
              {language === "RU" ? "АКТИВИРОВАТЬ БАЗОВУЮ КАРТУ" : "ACTIVATE CLUB CARD"}
            </button>
          </div>

          {/* 2. VIP Club Card (Золотая / Премиальная) */}
          <div className="bg-[#0f0e0c]/90 border border-[#d4af37]/30 rounded-2xl p-8 relative flex flex-col justify-between group overflow-hidden luxury-glow shadow-amber-500/5">
            {/* Elegant luxury visual elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
            <div className="absolute -top-3 right-8 bg-gold-gradient text-black font-mono font-bold text-[8px] tracking-widest uppercase px-3.5 py-1 rounded-sm shadow-xl">
              {language === "RU" ? "ПРЕМИУМ СТАТУС" : "PREMIUM STATUS"}
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">
                    {language === "RU" ? "ПОЛНЫЙ ПРИВИЛЕГИРОВАННЫЙ ДОСТУП" : "DELUXE TIER"}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 uppercase tracking-wide">
                    {language === "RU" ? "VIP CARD" : "VIP CARD"}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/45 flex items-center justify-center text-[#d4af37]">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-[#d4af37]/10">
                <span className="text-2xl font-semibold font-mono text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400">
                  $19.99
                </span>
                <span className="text-xs text-stone-400 ml-2">
                  {language === "RU" ? "/ месяц" : "/ month"}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">
                      {language === "RU" ? "VIP Статус и Золотой Профиль" : "Prestige VIP Identity"}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {language === "RU" ? "Особый статус профиля на платформе и золотая цифровая визитка." : "Golden premium badge for instantly recognizable status at diplomatic venues."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">
                      {language === "RU" ? "Целевой нетворкинг и подбор контактов" : "Targeted Matchmaking & Safe Intros"}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {language === "RU" ? "Право отправлять заявки на интро лично инвесторам, фондам и VIP-членам." : "Request custom connection matches curated by club operators of high standing."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">
                      {language === "RU" ? "Максимальные Специальные Скидки" : "Sovereign Exquisite Offers"}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {language === "RU" ? "Эксклюзивные дисконты до 40% на люкс-услуги (чартеры, консалтинг, виллы)." : "Unlock supreme terms up to 40% off from elite businesses restricted to casual users."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">
                      {language === "RU" ? "Закрытые Мероприятия" : "Closed Physical Networking Gala"}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {language === "RU" ? "Эксклюзивные пропуски на частные ужины инвесторов и презентации клуба." : "Instant reservation access to exclusive club presentations and VIP meetings."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-stone-300 text-xs sm:text-sm">
                  <Check className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-white">
                      {language === "RU" ? "Консьерж-ассистент 24/7" : "VIP Concierge Companion"}
                    </span>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {language === "RU" ? "Личный менеджер в мессенджере для решения любых бизнес и статусных задач." : "Dedicated operator handling complex requests, bookings and resident services."}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {currentUser.role === UserRole.MEMBER ? (
              <button
                onClick={simulateVIPSubscriptionPayment}
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black rounded-xl text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-lg scale-102"
              >
                {language === "RU" ? "ПОЛУЧИТЬ VIP КАРТУ" : "ORDER VIP MEMBERSHIP"}
              </button>
            ) : (
              <button
                onClick={() => setActiveSection("BILLING")}
                className="w-full py-3 bg-zinc-950 text-stone-400 border border-zinc-800 rounded-xl text-xs font-mono font-semibold tracking-widest uppercase cursor-not-allowed"
                disabled
              >
                {language === "RU" ? "ВАШ СТАТУС ВЕРИФИЦИРОВАН: VIP" : "VIP LEVEL VERIFIED ✓"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Partners Corporate Benefit Section */}
      <section className="py-20 bg-zinc-950/40 border-t border-zinc-900/60" id="business_partners_guide_section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">
                {language === "RU" ? "БИЗНЕС-ПАКЕТ КЛУБА" : "B2B COOPERATION"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mt-2 leading-tight">
                {language === "RU" ? "Почему вашему бизнесу выгодно быть партнером?" : "Why should your business become a partner?"}
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans">
                {language === "RU" 
                  ? "Резиденты клуба Kylyvnyk — это состоятельная аудитория, топ-менеджеры, инвесторы и предприниматели. Предлагая им исключительные условия, ваши продукты получают максимальный отклик и сильный сарафанный маркетинг."
                  : "Kylyvnyk residents represent an elite community of high-net-worth investors, sovereign family offices, and entrepreneurs. By offering them curated conditions, you establish long-term brand relationships with high client lifetime value."}
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-[#d4af37]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {language === "RU" ? "Платежеспособная лояльная аудитория" : "Direct Vetted Audience Reach"}
                    </span>
                    <p className="text-xs text-stone-500 mt-1">
                      {language === "RU" ? "Вам не нужно тратить бюджеты на рекламу вслепую — платежеспособные резиденты находят вас напрямую." : "Skip expensive advertising overhead and directly engage qualified luxury consumers."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-[#d4af37]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {language === "RU" ? "Повышение брендовой репутации" : "Sovereign Brand Prestige Integration"}
                    </span>
                    <p className="text-xs text-stone-500 mt-1">
                      {language === "RU" ? "Принадлежность к официальным партнерам союза Kylyvnyk укрепляет авторитет вашего бизнеса." : "Being listed as a verified club partner elevates your brand authority instantly."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0a0a09]/90 border border-zinc-900/80 rounded-2xl p-8 text-left relative overflow-hidden">
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase block mb-6">
                {language === "RU" ? "4 БАЗОВЫХ ШАГА ДЛЯ РАЗМЕЩЕНИЯ В КЛУБЕ" : "HOW TO JOIN & SUBMIT YOUR LISTING"}
              </span>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="text-xs font-mono text-[#d4af37] font-bold bg-[#d4af37]/10 w-6 h-6 rounded flex items-center justify-center shrink-0">1</span>
                  <div>
                    <span className="text-sm font-semibold text-stone-200">
                      {language === "RU" ? "Создайте и заполните профиль" : "Submit Company Profile"}
                    </span>
                    <p className="text-xs text-stone-400 mt-1">
                      {language === "RU" ? "Укажите название, контакты, сферу услуг компании и ссылку на сайт." : "Complete standard company metadata including location, website and description details."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-xs font-mono text-[#d4af37] font-bold bg-[#d4af37]/10 w-6 h-6 rounded flex items-center justify-center shrink-0">2</span>
                  <div>
                    <span className="text-sm font-semibold text-stone-200">
                      {language === "RU" ? "Определите эксклюзивную привилегию" : "Define Custom Exquisite Terms"}
                    </span>
                    <p className="text-xs text-stone-400 mt-1">
                      {language === "RU" ? "Опишите спецусловие или скидку, доступную ТОЛЬКО при предъявлении карты резидента клуба." : "Offer a unique premium value, VIP upgrade or discount reserved exclusively for cardholders."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-xs font-mono text-[#d4af37] font-bold bg-[#d4af37]/10 w-6 h-6 rounded flex items-center justify-center shrink-0">3</span>
                  <div>
                    <span className="text-sm font-semibold text-stone-200">
                      {language === "RU" ? "Пройдите операторский аудит" : "Operator Audit & 2FA Verification"}
                    </span>
                    <p className="text-xs text-stone-400 mt-1">
                      {language === "RU" ? "Служба комплаенса за 24 часа проверит подлинность вашего юридического лица или бренда." : "Every prospective business is evaluated by administrative managers to secure authentic quality."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-xs font-mono text-[#d4af37] font-bold bg-[#d4af37]/10 w-6 h-6 rounded flex items-center justify-center shrink-0">4</span>
                  <div>
                    <span className="text-sm font-semibold text-stone-200">
                      {language === "RU" ? "Автоматическое размещение и трафик" : "Receive Affluent Target Audiences"}
                    </span>
                    <p className="text-xs text-stone-400 mt-1">
                      {language === "RU" ? "Получите пометку Verified, статус Бизнес-Партнера и отображение по всему каталогу." : "Go live in the directory instantly. Start receiving direct, high-value clientele without commission."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-stone-500 font-mono">
                    {language === "RU" ? "Участие:" : "Listing Entry Fee:"}
                  </span>
                  <span className="text-xs font-bold text-white block mt-0.5">
                    {language === "RU" ? "От $19.99/мес (входит в подписку Партнера)" : "From $19.99/mo (Included in Partner plan)"}
                  </span>
                </div>
                
                <button
                  onClick={() => setActiveSection("DIRECTORY")}
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-amber-500 text-black font-semibold text-xs rounded border border-[#d4af37] font-mono tracking-wider transition-colors flex items-center gap-2"
                >
                  {language === "RU" ? "ЗАРЕГИСТРИРОВАТЬ БИЗНЕС" : "LIST YOUR BUSINESS"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Recommended Partners Section (Рекомендованные партнеры + фильтрация по категориям) */}
      <section className="py-20 px-4 sm:px-6 w-full max-w-7xl mx-auto border-t border-zinc-900/60" id="recommended_partners_section">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-8">
          <div>
            <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">CURATED ALLIANCES / РЕКОМЕНДОВАНО КЛУБОМ</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">RECOMMENDED PARTNERS</h2>
            <p className="text-xs text-stone-500 mt-1 font-sans">Hand-vetted premium brands with exclusive terms for active residents</p>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mt-4 lg:mt-0 max-w-full">
            <button
              onClick={() => setRecommendedCategory("ALL")}
              className={`px-3 py-1.5 rounded text-xs transition-all duration-300 font-mono ${
                recommendedCategory === "ALL" 
                  ? "bg-[#d4af37] text-black font-semibold" 
                  : "bg-zinc-950 text-stone-400 hover:text-white border border-zinc-900"
              }`}
            >
              ALL / ВСЕ
            </button>
            {CLUB_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setRecommendedCategory(category)}
                className={`px-3 py-1.5 rounded text-xs transition-all duration-300 font-mono ${
                  recommendedCategory === category 
                    ? "bg-[#d4af37] text-black font-semibold" 
                    : "bg-zinc-950 text-stone-400 hover:text-white border border-zinc-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedPartnersList.length === 0 ? (
            <div className="col-span-full py-12 text-center bg-zinc-950/40 rounded-xl border border-dashed border-zinc-900">
              <span className="text-stone-500 text-xs font-mono block">No active recommendations in this category today / В этой категории пока нет рекомендаций</span>
            </div>
          ) : (
            recommendedPartnersList.map(biz => (
              <div 
                key={biz.id}
                className="bg-[#0b0b0a] border border-zinc-950 rounded-xl p-6 transition-all duration-300 hover:border-[#d4af37]/40 flex flex-col justify-between relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#d4af37]/3 rounded-bl-full pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 py-0.5 px-2 rounded font-mono uppercase">
                      {biz.category}
                    </span>
                    <span className="text-[9px] text-emerald-500 font-mono flex items-center gap-1">
                      <Shield className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#d4af37] transition-colors">{biz.name}</h3>
                  <p className="text-xs text-stone-500 font-mono mt-1">
                    📍 {biz.city}, {biz.country}
                  </p>
                  <p className="text-stone-400 text-xs mt-3 line-clamp-2 leading-relaxed">
                    {biz.description}
                  </p>

                  <div className="mt-5 p-3 bg-zinc-950 rounded border border-zinc-900/60 font-medium relative overflow-hidden">
                    <span className="text-[9px] text-[#d4af37] tracking-wider uppercase block font-mono">EXQUISITE MEMBER COND:</span>
                    <span className="text-xs text-stone-200 mt-1 block">
                      {currentUser.role !== UserRole.MEMBER ? biz.specialCondition : "🔒 Sign Up to Unlock Exquisite Offer"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-stone-500 font-mono block">REPUTATION REQ:</span>
                    <span className="text-xs text-stone-300 font-bold flex items-center gap-1 font-mono">
                      ⭐ {biz.reputationRequired || 0} pts
                    </span>
                  </div>
                  <button 
                    onClick={() => onOpenPartnerModal(biz)}
                    className="py-1.5 px-4 text-xs font-semibold text-[#d4af37] hover:text-black bg-zinc-950 hover:bg-[#d4af37] border border-zinc-800 hover:border-[#d4af37] rounded transition-all duration-300"
                  >
                    View Perk Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* How it Works Module Timeline */}
      <section className="bg-zinc-950/30 py-16 px-4 sm:px-6 w-full border-t border-zinc-900/40" id="works_section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase">STEPS TO SAVINGS</span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white mt-1">HOW IT WORKS</h2>
            <p className="text-xs text-stone-500 mt-2 font-mono">Simple, robust private business networking path</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            
            <div className="relative text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] font-bold text-sm mx-auto flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">Registration</h4>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">Fast signup. Just a phone is needed for basic member catalog search privileges.</p>
            </div>

            <div className="relative text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] font-bold text-sm mx-auto flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">Acquire Card</h4>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">We issue an authentic dynamic QR club identity card inside your secure drawer dashboard.</p>
            </div>

            <div className="relative text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-[#d4af37] font-bold text-sm mx-auto flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">Partner Lookup</h4>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">Search through hand-curated countries, districts, cities, and categories filters.</p>
            </div>

            <div className="relative text-center">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-[#d4af37] text-white bg-gold-gradient font-bold text-sm mx-auto flex items-center justify-center mb-4 text-black shadow-md">
                4
              </div>
              <h4 className="text-sm font-bold text-stone-200 uppercase tracking-wider">Special Terms</h4>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">Offers and closed networking match requests are fully available to club users after direct login verification.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Blog and Insights Journal Section */}
      <section className="bg-zinc-950/25 py-20 px-4 sm:px-6 w-full border-t border-zinc-900/40" id="blog_section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">SOVEREIGN DIARY / БЛОГ И МАТЕРИАЛЫ КЛУБА</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">CLUB INTELLIGENCE JOURNAL</h2>
              <p className="text-xs text-stone-500 mt-1">Strategic briefings and elite lifestyle directions for global citizens</p>
            </div>
            <div className="mt-4 md:mt-0 text-xs text-stone-400 font-mono">
              ⚡ Exclusive to residents
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_BLOG_POSTS.map(post => (
              <div 
                key={post.id}
                className="bg-[#0b0b0a] border border-zinc-950/80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-[#d4af37]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden select-none">
                    <img 
                      src={post.image} 
                      alt={post.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 animate-duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060605] via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] bg-zinc-950/80 text-[#d4af37] border border-[#d4af37]/20 py-0.5 px-2 rounded font-mono font-medium">
                      {post.categoryRu} / {post.categoryEn}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] text-stone-500 font-mono">{post.date} • {post.readTimeRu}</span>
                    <h3 className="text-base font-bold text-white mt-2 leading-snug line-clamp-2 hover:text-[#d4af37] transition-colors">
                      {post.titleRu}
                    </h3>
                    <p className="text-stone-400 text-xs mt-3 line-clamp-3 leading-relaxed">
                      {post.summaryRu}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => setActiveBlogId(post.id)}
                    className="w-full py-2 hover:py-2.5 rounded bg-zinc-950 hover:bg-[#d4af37] border border-zinc-900 text-stone-300 hover:text-black hover:font-bold text-xs font-mono uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Read Briefing / Читать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Overlay Modal */}
      <AnimatePresence>
        {activeBlogId && (() => {
          const post = INITIAL_BLOG_POSTS.find(p => p.id === activeBlogId);
          if (!post) return null;
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#0b0b0a] border border-zinc-900 rounded-2xl max-w-2xl w-full text-stone-100 overflow-hidden relative shadow-2xl my-8"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.titleEn}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0a] via-[#0b0b0a]/40 to-black/60" />
                  
                  <button 
                    onClick={() => setActiveBlogId(null)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-[#d4af37]/20 border border-zinc-800 text-stone-200 hover:text-[#d4af37] flex items-center justify-center transition-colors shadow cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[10px] bg-[#d4af37] text-black font-semibold font-mono px-2 py-0.5 rounded uppercase">
                      {post.categoryRu}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-medium text-white mt-2 leading-snug drop-shadow-md">
                      {post.titleRu}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold text-white font-mono">KYLYVNYK INTELLIGENCE</span>
                        <span className="text-[9px] text-stone-500 font-mono">SOVEREIGN EXPERTS PANEL</span>
                      </div>
                    </div>
                    <span className="text-xs text-stone-500 font-mono">{post.date} • {post.readTimeRu}</span>
                  </div>

                  {/* Dual Language Reading Experience */}
                  <div className="space-y-4 leading-relaxed text-sm text-stone-300 text-left">
                    <p className="font-sans border-l-2 border-[#d4af37] pl-3 italic text-stone-400">
                      &quot;{post.summaryRu}&quot;
                    </p>
                    <hr className="border-zinc-900" />
                    <p className="font-sans whitespace-pre-wrap leading-relaxed text-stone-200 text-sm md:text-base">
                      {post.contentRu}
                    </p>
                    <div className="bg-zinc-950 p-4 rounded border border-zinc-900/40 mt-6 text-left">
                      <span className="text-[10px] text-[#d4af37] font-mono block mb-1">ORIGINAL STRATEGIC BRIEF (EN):</span>
                      <p className="text-xs text-stone-400 font-sans italic whitespace-pre-wrap">{post.contentEn}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-900 flex justify-end">
                    <button 
                      onClick={() => setActiveBlogId(null)}
                      className="px-6 py-2 bg-[#d4af37] hover:bg-amber-500 text-black font-semibold font-mono rounded text-xs uppercase cursor-pointer"
                    >
                      Acknowledge Briefing / Закрыть
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-4 sm:px-6 w-full max-w-5xl mx-auto" id="faq_section">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">COMMUNITY HELPDESK / ВОПРОСЫ И ОТВЕТЫ</span>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-xs text-stone-500 mt-2">Answers regarding sovereign operations, card lookup, and membership terms</p>
        </div>

        <div className="space-y-4 text-left">
          {INITIAL_FAQS.map(faq => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-[#0b0b0a] border border-zinc-950 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left hover:text-[#d4af37] transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="text-sm font-bold text-stone-200 uppercase tracking-wide flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#d4af37] shrink-0" />
                    {faq.qRu}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#d4af37] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-zinc-900/50 bg-[#060605]"
                    >
                      <div className="p-6 font-sans text-xs sm:text-sm text-stone-400 leading-relaxed space-y-3">
                        <p>{faq.aRu}</p>
                        <div className="pt-2 border-t border-zinc-950 text-[11px] text-stone-500">
                          <span className="font-mono text-[9px] text-[#d4af37]/50 block">EN ORIGINAL:</span>
                          <span className="italic">{faq.aEn}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Member Testimonials & Live Guestbook Form Section */}
      <section className="bg-zinc-950/40 py-20 px-4 sm:px-6 w-full border-t border-b border-zinc-900/40" id="testimonials_section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Testimonials Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left">
            <div>
              <span className="text-[10px] text-[#d4af37] font-mono tracking-widest uppercase block">RESIDENT VOICES / ОТЗЫВЫ УЧАСТНИКОВ КЛУБА</span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white mt-1">MEMBER TESTIMONIALS</h2>
              <p className="text-xs text-stone-500 mt-2 mb-8">Unvarnished feedback from validated partners and executive residents globally</p>
              
              <div className="space-y-6">
                {reviews.map(review => (
                  <div 
                    key={review.id}
                    className="bg-[#0b0b0a] border border-zinc-950 p-6 rounded-xl relative shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-sm font-bold text-white font-mono">{review.author}</h4>
                        <span className="text-[10px] text-stone-500 font-mono italic">{review.roleRu}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex gap-0.5 text-[#d4af37]">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-[9px] text-stone-600 mt-1 font-mono">{review.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 font-sans leading-relaxed">
                      &quot;{review.textRu}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Submission Form Right Column */}
          <div className="lg:col-span-5 text-left">
            <div className="bg-[#0b0b0a] border border-[#d4af37]/10 p-6 sm:p-8 rounded-xl relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#d4af37]/3 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-sm font-bold text-stone-200 uppercase tracking-widest">Share Your Experience / Оставить отзыв</h3>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed mb-6 font-sans">
                Active residents are encouraged to leave real feedback. Verified ratings reflect on our trust registry index instantly.
              </p>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newAuthor.trim() || !newText.trim()) return;
                  const addedReview = {
                    id: `rev-${Date.now()}`,
                    author: newAuthor,
                    roleEn: newRole || "Verified Member",
                    roleRu: newRole || "Верифицированный участник",
                    rating: newRating,
                    textEn: newText,
                    textRu: newText,
                    date: new Date().toISOString().split('T')[0]
                  };
                  setReviews([addedReview, ...reviews]);
                  setNewAuthor("");
                  setNewRole("");
                  setNewText("");
                  setNewRating(5);
                }} 
                className="space-y-4 text-left"
              >
                <div>
                  <label className="text-[9px] text-stone-500 font-mono block uppercase mb-1">Your Full Name / Ваше имя:</label>
                  <input 
                    type="text" 
                    required 
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Catherine Dupond"
                    className="w-full bg-black border border-zinc-900 focus:border-[#d4af37]/45 rounded text-xs p-3 text-stone-100 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-stone-500 font-mono block uppercase mb-1">Your Title & Location / Ваша должность:</label>
                  <input 
                    type="text" 
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. VIP Resident, Kyiv"
                    className="w-full bg-black border border-zinc-900 focus:border-[#d4af37]/45 rounded text-xs p-3 text-stone-100 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-stone-500 font-mono block uppercase mb-1">Rating / Поставьте оценку:</label>
                  <div className="flex gap-2 py-1 items-center">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starVal = i+1;
                      const active = starVal <= newRating;
                      return (
                        <button 
                          key={i}
                          type="button" 
                          onClick={() => setNewRating(starVal)}
                          className="focus:outline-none transition-colors cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${active ? 'text-[#d4af37] fill-[#d4af37]' : 'text-stone-700'}`} />
                        </button>
                      );
                    })}
                    <span className="text-stone-400 text-[10px] font-mono ml-2 mt-0.5">{newRating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-500 font-mono block uppercase mb-1">Your Feedback / Ваш отзыв:</label>
                  <textarea 
                    required 
                    rows={4}
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="Write your authentic feedback..."
                    className="w-full bg-black border border-zinc-900 focus:border-[#d4af37]/45 rounded text-xs p-3 text-stone-100 outline-none transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-gold-gradient hover:bg-amber-500 text-black text-xs font-mono font-bold uppercase rounded tracking-widest transition-all shadow cursor-pointer text-center"
                >
                  Publish Statement / Опубликовать отзыв
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Recommended Partners Callout */}
      <section className="py-14 px-4 sm:px-6 w-full max-w-7xl mx-auto text-center" id="recommended_section">
        <div className="bg-[#0b0b0a] border border-zinc-900/80 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-display font-medium text-stone-300">
              Special conditions and corporate VIP discounts are waiting for validated members.
            </h3>
            <p className="text-xs text-stone-500 mt-2 font-mono">
              Register now to visualize the complete verified commercial offerings book.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setActiveSection("DIRECTORY")}
                className="px-6 py-2.5 bg-zinc-950 font-semibold text-xs rounded border border-zinc-800 text-stone-300 hover:text-white hover:border-[#d4af37]/50 uppercase tracking-wider transition-all cursor-pointer"
              >
                Browse directory
              </button>
              <button 
                onClick={() => setActiveSection("MY_CARD")}
                className="px-6 py-2.5 bg-gold-gradient hover:bg-amber-500 text-black font-extrabold text-xs rounded uppercase tracking-widest transition-all shadow-md cursor-pointer"
              >
                Show Card
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance / Disclaimer Footer Banner */}
      <footer className="mt-auto bg-black border-t border-zinc-950 py-12 px-4 sm:px-6 text-center select-none" id="disclaimer_footer">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-center mb-5 scale-95 opacity-90 hover:opacity-100 transition-opacity">
            <ClubLogo size="sm" showText={true} lightText={true} idPrefix="footer-logo" />
          </div>
          <p className="text-[10px] font-mono text-zinc-650 uppercase tracking-widest text-[#d4af37]/40">
            Regulatory Notice & Operational Disclaimers
          </p>
          <div className="text-[11px] text-stone-500 leading-relaxed max-w-4xl mx-auto space-y-2 font-sans">
            <p>
              <strong>KYLYVNYK CLUB</strong> is an independent private international membership platform registered in the United States. 
              The club is NOT an employer, investment asset platform, multilevel marketing (MLM) program, passive income opportunity, or guarantee-of-income system.
            </p>
            <p>
              Special partnership conditions, retail discounts, and exclusive offers are managed and provided directly by independent third-party partners. 
              KYLYVNYK CLUB does not guarantee individual savings, commissions, bonuses, customers generation, or business results.
            </p>
            <p>
              Partners independently direct their facilities and hold absolute liability for their corporate licenses, permits, and sovereign compliance laws. 
              KYLYVNYK CLUB acts as catalog registry only, and does not participate in client-to-partner deals, transaction operations, or active agreements.
            </p>
          </div>
          <div className="pt-6 text-[10px] text-stone-600 font-mono">
            © 2026 KYLYVNYK CLUB Inc. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
};
