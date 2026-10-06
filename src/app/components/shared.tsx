import ceoImg from "@/imports/Mbuntum_gilbert_neng-1.png";
import lizethImg from "@/imports/Lizeth_Kemji-1.png";
import digitalMediaDirectorImg from "@/imports/Mepipyou_Nouguep_Nadyane_Paola-1.png";
import developerImg from "@/imports/Yofende_Louis_Kogah-1.png";
import projectWriterImg from "@/imports/menda_promise.jpg";
import pamelaJamesImg from "@/imports/31e4f30c-45fb-4042-b295-e6eaedca3b10-1.png";
import rinaKnowlesImg from "@/imports/1234567-1.png";
import pageHeroBg from "@/imports/image.png";
import techCorpImg from "@/imports/slimbiz.png";
import linkedInBlogImg from "@/imports/WhatsApp_Image_2026-09-24_at_16.22.57-1.jpeg";
import {
  Megaphone, Target, Globe, MousePointer2, PenTool, BarChart3,
  Search, Mail, Monitor,
} from "lucide-react";
export { ceoImg, digitalMediaDirectorImg, developerImg };

// ─── Brand palette ────────────────────────────────────────────────────────────
export const NAVY      = "#1E34A0";
export const ORANGE    = "#E8622A";
export const NAVY_DARK = "#121F6B";
export const NAVY_MID  = "#1A2B8A";
export const ORANGE_HVR = "#D0501B";

// ─── Nav links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services" },
  { label: "Portfolio",    href: "/portfolio" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog",         href: "/blog" },
  { label: "FAQ",          href: "/faq" },
  { label: "Careers",      href: "/careers" },
  { label: "Contact",      href: "/contact" },
];

// ─── Services data ─────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    icon: Megaphone,
    title: "Brand Strategy & Positioning",
    color: ORANGE,
    desc: "We build distinctive brand identities and go-to-market strategies that cut through the noise — from positioning to messaging to visual identity systems.",
    details: ["Brand audit & competitive analysis", "Brand architecture & naming", "Visual identity systems", "Brand guidelines & playbooks", "Go-to-market strategy"],
  },
  {
    icon: Target,
    title: "Digital Advertising",
    color: NAVY,
    desc: "Performance-driven campaigns across Google, Meta, LinkedIn, TikTok, and programmatic networks. We combine creative excellence with data-driven optimization.",
    details: ["Google Ads (Search, Display, YouTube)", "Meta & Instagram Ads", "LinkedIn & TikTok Campaigns", "Programmatic Display", "Retargeting & remarketing"],
  },
  {
    icon: Globe,
    title: "Traditional Advertising",
    color: ORANGE,
    desc: "TV, radio, print, outdoor (OOH), and transit advertising. We plan, create, and buy media that reaches your audience where they live, work, and travel.",
    details: ["TV commercials & placement", "Radio production & buying", "Print advertising (press, magazine)", "Outdoor & billboard campaigns", "Transit & transit advertising"],
  },
  {
    icon: MousePointer2,
    title: "Social Media & Content",
    color: NAVY,
    desc: "From strategy to content production to community management — we build social presences that engage audiences and drive measurable business outcomes.",
    details: ["Social media strategy", "Content creation & production", "Community management", "Influencer partnerships", "Social listening & analytics"],
  },
  {
    icon: PenTool,
    title: "Creative Production",
    color: ORANGE,
    desc: "Full-service creative studio: TV commercials, radio spots, digital video, photography, copywriting, and print design. Award-winning craft, on time and on budget.",
    details: ["TV & digital video production", "Photography & art direction", "Copywriting & content strategy", "Print & packaging design", "Motion graphics & animation"],
  },
  {
    icon: BarChart3,
    title: "Marketing Analytics",
    color: NAVY,
    desc: "Cross-channel attribution, audience research, campaign measurement, and CRO. We turn complex data into clear insights that inform smarter decisions.",
    details: ["Campaign tracking & reporting", "Cross-channel attribution", "Audience research & segmentation", "Conversion rate optimization", "Monthly performance dashboards"],
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    color: ORANGE,
    desc: "Technical SEO, on-page optimization, and content strategy that builds organic visibility and drives qualified traffic that converts.",
    details: ["Technical SEO audit & fixes", "Keyword research & strategy", "On-page optimization", "Link building", "Local SEO"],
  },
  {
    icon: Mail,
    title: "Email Marketing",
    color: NAVY,
    desc: "Automated flows, newsletters, and lifecycle campaigns that nurture leads, retain customers, and drive measurable revenue.",
    details: ["Email strategy & planning", "Campaign design & copywriting", "Automation & drip flows", "A/B testing & optimization", "List hygiene & segmentation"],
  },
  {
    icon: Monitor,
    title: "Website Design & Development",
    color: ORANGE,
    desc: "Conversion-focused websites that look stunning, load fast, and are built to generate leads and sales — not just impressions.",
    details: ["UX strategy & wireframing", "Visual design & branding", "Frontend development", "CMS integration", "Performance & SEO optimization"],
  },
  {
    icon: Megaphone,
    title: "Events, Conferences & Seminars",
    color: NAVY,
    desc: "End-to-end event management for corporate conferences, professional seminars, product launches, trade shows, and brand activations — from concept to execution.",
    details: ["Event concept & strategy", "Conference & seminar organisation", "Venue sourcing & logistics", "Speaker & panel coordination", "Brand activation & experiential marketing", "Live coverage & post-event content", "Trade shows & exhibition stands"],
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: "800+",   label: "Campaigns Launched" },
  { value: "90B FCFA+", label: "Media Spend Managed" },
  { value: "150+",   label: "Brands Served" },
  { value: "12+",    label: "Years in Business" },
];

// ─── Portfolio ─────────────────────────────────────────────────────────────────
export const PORTFOLIO = [
  {
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=700&h=500&fit=crop&auto=format",
    title: "National Bank — Integrated Campaign",
    category: "Financial Services · TV + Digital + OOH",
    result: "12M reach delivered",
    tags: ["Branding", "TV", "Digital"],
    client: "National Bank of Cameroun",
    year: "2025",
    desc: "A fully integrated brand campaign spanning TV, outdoor, and digital channels to reposition the bank for a younger, mobile-first generation.",
    metrics: [
      { label: "Brand awareness lift", value: "+47%" },
      { label: "Digital engagement rate", value: "8.2%" },
      { label: "New account openings", value: "+28%" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=500&fit=crop&auto=format",
    title: "NovaSkin — Product Launch",
    category: "Beauty & Skincare · Social + Influencer + Retail",
    result: "8.5M FCFA first-month sales",
    tags: ["Launch", "Social", "Influencer"],
    client: "NovaSkin Cosmetics",
    year: "2025",
    desc: "End-to-end brand and launch campaign for a premium African skincare brand entering the regional market via social, influencer partnerships, and retail activations.",
    metrics: [
      { label: "First-month sales", value: "1.7B FCFA" },
      { label: "Influencer reach", value: "4.8M" },
      { label: "Retail stockists gained", value: "120" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=700&h=500&fit=crop&auto=format",
    title: "AutoNation — TV Commercial Series",
    category: "Automotive · Broadcast + Radio + Digital",
    result: "6M impressions generated",
    tags: ["TV", "Radio", "Automotive"],
    client: "AutoNation Group",
    year: "2024",
    desc: "A 6-spot TV commercial series combined with radio and digital pre-roll to drive showroom foot traffic for the region's largest automotive dealer.",
    metrics: [
      { label: "Showroom traffic lift", value: "+42%" },
      { label: "TV GRPs delivered", value: "1,200" },
      { label: "Radio spots aired", value: "480" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop&auto=format",
    title: "UrbanFit — OOH Campaign",
    category: "Fitness · OOH + Transit + Social",
    result: "15M FCFA revenue in 90 days",
    tags: ["OOH", "Social", "Fitness"],
    client: "UrbanFit Gyms",
    year: "2024",
    desc: "A bold outdoor campaign across 85 locations in Yaoundé and Douala, paired with geo-targeted social ads for a new gym chain launch.",
    metrics: [
      { label: "New memberships", value: "10,000" },
      { label: "OOH locations", value: "85" },
      { label: "Cost per acquisition", value: "10,500 FCFA" },
    ],
  },
  {
    img: techCorpImg,
    title: "TechCorp — B2B Lead Generation",
    category: "Technology · LinkedIn + Print + Events",
    result: "7.2M FCFA pipeline generated",
    tags: ["B2B", "LinkedIn", "Events"],
    client: "TechCorp Africa",
    year: "2025",
    desc: "A cohesive B2B campaign combining LinkedIn thought leadership, industry trade press, and conference sponsorships to generate enterprise pipeline.",
    metrics: [
      { label: "Pipeline generated", value: "6.4B FCFA" },
      { label: "Qualified leads", value: "340" },
      { label: "Cost per lead", value: "48,750 FCFA" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&h=500&fit=crop&auto=format",
    title: "Artisan Foods — Rebrand & Launch",
    category: "FMCG · Brand Strategy + Packaging + Media",
    result: "9.8M FCFA revenue growth",
    tags: ["Branding", "FMCG", "Packaging"],
    client: "Artisan Foods Ltd",
    year: "2024",
    desc: "Complete rebrand, packaging redesign, and national launch campaign for a beloved local food brand entering modern retail channels.",
    metrics: [
      { label: "Retail listings gained", value: "450" },
      { label: "Revenue growth (YoY)", value: "+83%" },
      { label: "Brand recall score", value: "71%" },
    ],
  },
];

// ─── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director, National Bank",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&auto=format",
    quote: "SLIM BIZ orchestrated our largest brand campaign across TV, outdoor, and digital. The integrated approach delivered a 47% lift in unaided brand awareness — the best result we've seen in five years.",
    rating: 5,
    company: "National Bank",
    result: "+47% brand awareness",
  },
  {
    name: "Marcus Chen",
    role: "CEO, AutoNation Group",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
    quote: "Their broadcast creative was stunning, and they managed the entire media buy across TV, radio, and digital. Showroom traffic increased 42% during the campaign window.",
    rating: 5,
    company: "AutoNation Group",
    result: "+42% showroom visits",
  },
  {
    name: "Amara Osei-Bonsu",
    role: "Founder, NovaSkin",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format",
    quote: "They built our brand from scratch and launched it across social, influencer partnerships, and in-store. We hit 1.7B FCFA in first-month sales. SLIM BIZ doesn't just think creative — they think commercial.",
    rating: 5,
    company: "NovaSkin Cosmetics",
    result: "1.7B FCFA first-month sales",
  },
  {
    name: "David Okafor",
    role: "VP Marketing, TechCorp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
    quote: "We needed a B2B campaign that worked across LinkedIn, industry print, and event sponsorships. SLIM BIZ delivered a cohesive multi-channel strategy that generated 6.4B FCFA in qualified pipeline.",
    rating: 5,
    company: "TechCorp Africa",
    result: "6.4B FCFA pipeline generated",
  },
  {
    name: "Fatima Ndongo",
    role: "Brand Manager, Artisan Foods",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&auto=format",
    quote: "The rebrand they delivered was transformational. From the new packaging to the launch campaign, every touchpoint felt premium and consistent. We went from niche to national in 6 months.",
    rating: 5,
    company: "Artisan Foods Ltd",
    result: "450 new retail listings",
  },
  {
    name: "James Bekele",
    role: "CEO, UrbanFit Gyms",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    quote: "The outdoor campaign they designed stopped people in their tracks. Combined with geo-targeted social ads, we signed up 10,000 members in 90 days. ROI was exceptional.",
    rating: 5,
    company: "UrbanFit Gyms",
    result: "10K memberships in 90 days",
  },
];

// ─── Blog posts ────────────────────────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=700&h=450&fit=crop&auto=format",
    tag: "Advertising Strategy",
    category: "Strategy",
    date: "May 22, 2026",
    readTime: "6 min read",
    title: "Why the Best Campaigns Are Built for Both TV and TikTok",
    excerpt: "Integrated campaigns that work across traditional and digital channels deliver 3× better brand lift. Here's how we plan them from the ground up.",
    author: "SLIM BIZ Strategy Team",
    authorImg: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&h=60&fit=crop&auto=format",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop&auto=format",
    tag: "Media Buying",
    category: "Media",
    date: "May 8, 2026",
    readTime: "7 min read",
    title: "The Outdoor Advertising Renaissance: OOH Is Back (And It's Digital)",
    excerpt: "Programmatic DOOH, geofencing, and real-time creative are transforming outdoor advertising. We break down what's working in 2026.",
    author: "Media Planning Desk",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format",
  },
  {
    img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&h=450&fit=crop&auto=format",
    tag: "Brand Strategy",
    category: "Branding",
    date: "April 18, 2026",
    readTime: "8 min read",
    title: "How to Build a Brand Campaign That Drives Both Awareness and Conversion",
    excerpt: "Brand marketing doesn't have to sacrifice performance. Our framework for creating campaigns that build long-term equity while driving short-term results.",
    author: "Creative Strategy Team",
    authorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&auto=format",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=450&fit=crop&auto=format",
    tag: "Digital Marketing",
    category: "Digital",
    date: "April 2, 2026",
    readTime: "5 min read",
    title: "The Death of Third-Party Cookies: What African Marketers Need to Know",
    excerpt: "As browser vendors eliminate third-party tracking, here's how to future-proof your audience targeting strategy using first-party data and contextual signals.",
    author: "Digital Analytics Team",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format",
  },
  {
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&h=450&fit=crop&auto=format",
    tag: "FMCG Marketing",
    category: "Strategy",
    date: "March 14, 2026",
    readTime: "9 min read",
    title: "Launching an FMCG Brand in Cameroun: A Practical Playbook",
    excerpt: "Market entry, distribution strategy, and media planning for consumer brands targeting Camerounian and Central African markets — lessons from our portfolio.",
    author: "SLIM BIZ Strategy Team",
    authorImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&auto=format",
  },
  {
    img: linkedInBlogImg,
    tag: "B2B Marketing",
    category: "Digital",
    date: "February 28, 2026",
    readTime: "6 min read",
    title: "LinkedIn Advertising in Africa: Why It's Underused and How to Win",
    excerpt: "LinkedIn CPCs in West and Central Africa are 40–60% lower than Europe. Here's how B2B brands can leverage this underserved channel for pipeline generation.",
    author: "Digital Analytics Team",
    authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format",
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "What types of campaigns does SLIM BIZ create?",
    a: "We handle everything from full-scale brand campaigns (TV, outdoor, print, digital, social) to targeted performance campaigns (PPC, social ads, programmatic). Most clients work with us on integrated campaigns that combine traditional and digital channels for maximum impact.",
    category: "General",
  },
  {
    q: "Do you produce TV commercials and broadcast content in-house?",
    a: "Yes. Our creative studio handles everything: concept development, scripting, casting, filming, post-production, and media placement. We've produced award-winning commercials for TV, radio, cinema, and digital platforms.",
    category: "Services",
  },
  {
    q: "Can you manage our media buying across all channels?",
    a: "Absolutely. We plan and buy across TV, radio, outdoor (OOH/DOOH), print, digital display, paid social, search, and programmatic. Centralized buying means tighter budget control and better cross-channel optimization.",
    category: "Services",
  },
  {
    q: "What industries does SLIM BIZ work with?",
    a: "We've delivered campaigns across FMCG, automotive, financial services, retail, hospitality, healthcare, technology, and government sectors. Our strategic frameworks adapt to your market, audience, and business model.",
    category: "General",
  },
  {
    q: "How do you measure campaign effectiveness?",
    a: "We track both brand metrics (awareness, recall, consideration) and performance metrics (traffic, leads, sales, ROAS). Every client gets a custom dashboard and bi-weekly reports tied to the business objectives we agreed at kickoff.",
    category: "Reporting",
  },
  {
    q: "What's your approach to traditional vs. digital advertising?",
    a: "We believe the best campaigns leverage both. Traditional builds mass reach and brand authority; digital allows precision targeting and real-time optimization. We integrate them from the start so creative, messaging, and timing work in lockstep.",
    category: "Strategy",
  },
  {
    q: "What's the minimum budget to work with SLIM BIZ?",
    a: "We work with clients from a minimum monthly retainer of FCFA 500,000 for focused digital services, up to multi-million-franc integrated campaigns. We're transparent about what we can realistically deliver at any budget level.",
    category: "Pricing",
  },
  {
    q: "How long does it take to see results?",
    a: "Performance campaigns (PPC, paid social) can generate results within days. Brand campaigns typically show measurable shifts in awareness within 4–8 weeks. We set clear expectations at the start based on your objectives and budget.",
    category: "General",
  },
  {
    q: "Do you offer long-term retainer agreements?",
    a: "Yes. Most of our clients are on 6–12 month retainer agreements, which allows us to act as a true strategic partner rather than a one-off supplier. Retainer clients also benefit from priority access to our creative and strategy teams.",
    category: "Pricing",
  },
  {
    q: "What makes SLIM BIZ different from other agencies in Cameroun?",
    a: "We're one of the few agencies in the region with genuine end-to-end capabilities: brand strategy, creative production, TV/radio/OOH buying, digital advertising, and analytics — all under one roof, with senior account leadership on every client.",
    category: "General",
  },
];

// ─── Team members ─────────────────────────────────────────────────────────────
export const TEAM = [
  {
    name: "Mbuntum Gilbert Neng",
    role: "Founder & CEO",
    img: ceoImg,
    imgPosition: "object-[center_30%]",
    bio: "Founder of SLIM BIZ SARL, driving 360° marketing and advertising excellence across Cameroun and Central Africa.",
    linkedin: "#",
  },
  {
    name: "Nathalie Essono",
    role: "Community Manager",
    img: lizethImg,
    bio: "Award-winning creative with 12 years in TV, digital, and brand identity. Cannes Lions finalist 2023.",
    linkedin: "#",
  },
  {
    name: "Pamela James",
    role: "Head of Communications",
    img: pamelaJamesImg,
    bio: "Shapes brand voice and drives strategic communications that connect, convert, and leave lasting impact.",
    linkedin: "#",
  },
  {
    name: "Menda Promis",
    role: "Project Writer",
    img: projectWriterImg,
    bio: "Crafts compelling project narratives and documentation that bring client visions to life with clarity and precision.",
    linkedin: "#",
  },
  {
    name: "Nouguep Nadyane Paola",
    role: "Digital Media Director",
    img: digitalMediaDirectorImg,
    bio: "Specialist in programmatic, paid social, and data-driven media planning. Leads SLIM BIZ digital media strategy across all platforms.",
    linkedin: "#",
  },
  {
    name: "Rina Knowles",
    role: "Brand Ambassador",
    img: rinaKnowlesImg,
    bio: "The face of SLIM BIZ, bringing energy and authenticity to every campaign and client-facing activation.",
    linkedin: "#",
  },
  {
    name: "Yofende Louis Kogah",
    role: "Developer",
    img: developerImg,
    bio: "Full-stack developer building the digital infrastructure that powers SLIM BIZ campaigns — from web platforms to marketing automation.",
    linkedin: "#",
  },
];

// ─── Open positions ───────────────────────────────────────────────────────────
export const JOBS = [
  {
    title: "Senior Digital Media Planner",
    department: "Digital Media",
    type: "Full-time",
    location: "Yaoundé, Cameroun",
    desc: "Lead media planning and buying for 3–5 major accounts across paid search, paid social, and programmatic channels.",
  },
  {
    title: "Creative Copywriter",
    department: "Creative",
    type: "Full-time",
    location: "Yaoundé or Remote",
    desc: "Craft compelling copy for TV scripts, digital ads, social content, and brand guidelines. French and English required.",
  },
  {
    title: "Account Manager",
    department: "Client Services",
    type: "Full-time",
    location: "Yaoundé, Cameroun",
    desc: "Own client relationships, campaign coordination, and reporting for a portfolio of mid-market clients.",
  },
  {
    title: "Motion Graphics Designer",
    department: "Creative Production",
    type: "Full-time",
    location: "Yaoundé, Cameroun",
    desc: "Create motion graphics, animated social content, and video post-production assets for campaigns across all channels.",
  },
  {
    title: "SEO & Content Specialist",
    department: "Digital",
    type: "Full-time / Contract",
    location: "Remote",
    desc: "Drive organic growth for clients through technical SEO, content strategy, and analytics. Strong French & English writing required.",
  },
  {
    title: "Marketing Intern",
    department: "Strategy",
    type: "Internship (6 months)",
    location: "Yaoundé, Cameroun",
    desc: "Support the strategy team with research, campaign analysis, and client presentations. Great for final-year students.",
  },
];

// ─── Shared section header ────────────────────────────────────────────────────
export function SectionTag({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <div className="h-px w-10" style={{ background: ORANGE }} />
      <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{label}</p>
      <div className="h-px w-10" style={{ background: ORANGE }} />
    </div>
  );
}

export function SectionTagLeft({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-10" style={{ background: ORANGE }} />
      <p className="text-xs tracking-[0.3em] uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{label}</p>
    </div>
  );
}

// Page hero banner (for inner pages)
export function PageHero({ tag, title, subtitle, dark = true }: { tag: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: "clamp(260px, 40vw, 460px)" }}>
      <div className="absolute inset-0">
        <img
          src={pageHeroBg}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(18,31,107,0.88) 0%, rgba(18,31,107,0.70) 60%, rgba(18,31,107,0.50) 100%)" }} />
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />
      <div className="relative w-full max-w-7xl mx-auto px-5 lg:px-10 text-center py-20 pt-28 sm:pt-32 lg:pt-36">
        <SectionTag label={tag} />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h1>
        {subtitle && (
          <p className="text-white/65 max-w-xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
