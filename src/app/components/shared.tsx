import ceoImg from "@/imports/Mbuntum_gilbert_neng-1.webp";
import lizethImg from "@/imports/Lizeth_Kemji-1.webp";
import digitalMediaDirectorImg from "@/imports/Mepipyou_Nouguep_Nadyane_Paola-1.webp";
import developerImg from "@/imports/Yofende_Louis_Kogah-1.webp";
const projectWriterImg = "https://raw.githubusercontent.com/slimbiz237/slim-biz-website/main/src/imports/menda_promis_new.jpg.jpg";
import pamelaJamesImg from "@/imports/31e4f30c-45fb-4042-b295-e6eaedca3b10-1.webp";
import rinaKnowlesImg from "@/imports/1234567-1.webp";
import pageHeroBg from "@/imports/image.webp";
import {
  Megaphone, MousePointer2, Target, Search, Mail, Monitor,
  Palette, Video, GraduationCap, Users,
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

// Small round avatar with initials (used when we have no photo)
function initialsAvatar(name: string): string {
  const letters = name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>` +
    `<rect width='100' height='100' fill='#1E34A0'/>` +
    `<text x='50' y='63' font-size='38' text-anchor='middle' fill='white' font-family='Arial, sans-serif'>${letters}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ─── Services data ─────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    icon: MousePointer2,
    title: "Social Media & Community Management",
    color: NAVY,
    desc: "We run your social media pages day to day: content, posting, replies and reporting, so your brand stays active and your community keeps growing.",
    details: ["Page set-up & content calendar", "Content creation & posting", "Comment & message replies", "Community growth & engagement", "Regular performance reports"],
  },
  {
    icon: Target,
    title: "Digital Advertising",
    color: ORANGE,
    desc: "Paid campaigns on Facebook, Instagram, Google, TikTok and LinkedIn, planned, launched and optimised to bring you enquiries and sales.",
    details: ["Facebook & Instagram Ads", "Google Ads (Search & Display)", "TikTok & LinkedIn campaigns", "Audience targeting & retargeting", "Budget tracking & optimisation"],
  },
  {
    icon: Monitor,
    title: "Website Design & Development",
    color: NAVY,
    desc: "Fast, mobile-friendly websites that present your business clearly and make it easy for customers to contact you.",
    details: ["Website design & structure", "WordPress & custom development", "Mobile-friendly layouts", "Contact forms & WhatsApp links", "Basic SEO set-up"],
  },
  {
    icon: Palette,
    title: "Brand Identity & Graphic Design",
    color: ORANGE,
    desc: "Logos, brand guidelines and visuals that make your business look professional and consistent everywhere your customers see it.",
    details: ["Logo & brand guidelines", "Flyers, posters & banners", "Social media visuals", "Business cards & print materials", "Roll-ups & exhibition banners"],
  },
  {
    icon: Video,
    title: "Video, Photo & Content Production",
    color: NAVY,
    desc: "Short videos, ad spots, photo shoots and written content that tell your story and give your pages something worth watching.",
    details: ["Ad spots & short videos", "Corporate videos", "Motion design & animation", "Professional photo shoots", "Copywriting & content"],
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    color: ORANGE,
    desc: "Technical and on-page SEO that helps customers find you on Google and brings in qualified visitors.",
    details: ["SEO audit", "Keyword research", "On-page optimisation", "Local SEO", "Content strategy"],
  },
  {
    icon: Mail,
    title: "Email Marketing & Newsletters",
    color: NAVY,
    desc: "Newsletters and email flows that keep your customers informed and bring them back.",
    details: ["Newsletter design & sending", "Email copywriting", "Audience lists & segmentation", "Automation flows", "Performance reporting"],
  },
  {
    icon: GraduationCap,
    title: "Training & Coaching",
    color: ORANGE,
    desc: "SLIM BIZ Digital Academy offers 40 practical courses in digital marketing, design, video, web and AI, in person, online or hybrid, with a certificate.",
    details: ["Digital marketing & social media", "Graphic design & video editing", "Web development & AI", "Certificate on completion", "In-person, online or hybrid"],
  },
  {
    icon: Megaphone,
    title: "Events, Conferences & Seminars",
    color: NAVY,
    desc: "End-to-end support for conferences, seminars, product launches and brand activations, from concept to execution.",
    details: ["Event concept & strategy", "Conference & seminar organisation", "Venue sourcing & logistics", "Speaker & panel coordination", "Brand activation & experiential marketing", "Live coverage & post-event content", "Trade shows & exhibition stands"],
  },
  {
    icon: Users,
    title: "Recruitment & Talent Support",
    color: ORANGE,
    desc: "We help businesses find and shortlist the right people, for our own team and for our clients.",
    details: ["Role definition & job descriptions", "Candidate sourcing", "Screening & shortlisting", "Training for new hires through the Academy"],
  },
];

// ─── Stats (only facts we can back up) ────────────────────────────────────────
export const STATS = [
  { value: "40",      label: "Academy Courses" },
  { value: "3",       label: "Training Formats" },
  { value: "4.5/5",   label: "Sortlist Rating" },
  { value: "EN & FR", label: "Languages" },
];

// ─── Portfolio (real clients; add more when you have permission) ──────────────
export const PORTFOLIO = [
  {
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=500&fit=crop&auto=format",
    title: "Carilux Beauty Cosmetics",
    category: "Skincare & Beauty · Social media, ads & web",
    result: "Active client",
    tags: ["Social", "Digital"],
    client: "Carilux Beauty Cosmetics",
    year: "Current client",
    desc: "We manage social media community management, website development and paid advertising for this beauty and skincare brand.",
    metrics: [
      { label: "Social media community management", value: "✓" },
      { label: "Website development", value: "✓" },
      { label: "Paid advertising", value: "✓" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&auto=format",
    title: "Berline Cosmetic Canada",
    category: "Skincare & Beauty · Social media, ads & web",
    result: "Active client",
    tags: ["Social", "Digital"],
    client: "Berline Cosmetic Canada",
    year: "Current client",
    desc: "We manage social media community management, website development and paid advertising for this beauty and skincare brand.",
    metrics: [
      { label: "Social media community management", value: "✓" },
      { label: "Website development", value: "✓" },
      { label: "Paid advertising", value: "✓" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop&auto=format",
    title: "Miss Shasha Organic Skincare",
    category: "Skincare & Beauty · Social media, ads & web",
    result: "Active client",
    tags: ["Social", "Digital"],
    client: "Miss Shasha Organic Skincare",
    year: "Current client",
    desc: "We manage social media community management, website development and paid advertising for this organic skincare brand.",
    metrics: [
      { label: "Social media community management", value: "✓" },
      { label: "Website development", value: "✓" },
      { label: "Paid advertising", value: "✓" },
    ],
  },
];

// ─── Testimonials (real Google reviews, shown word for word) ──────────────────
export const TESTIMONIALS = [
  {
    name: "Carilux Cosmetics",
    role: "Google review",
    avatar: initialsAvatar("Carilux Cosmetics"),
    quote: "La meilleure agence! ma marque Carilux Cosmétiques est aujourd'hui reconnue partout au Cameroun grâce aux partenariat entre nous et slim biz Équipe pro, créative et efficace. Je recommande à 100%.",
    rating: 5,
    company: "Carilux Cosmetics",
    result: "Google review",
  },
  {
    name: "Princess Olive",
    role: "Google review · Former digital marketing student",
    avatar: initialsAvatar("Princess Olive"),
    quote: "Congratulations to the CEO of this project who happens to be my digital marketing lecturer in 2022, I trust your expertise and experience",
    rating: 5,
    company: "Princess Olive",
    result: "Google review",
  },
];

// ─── Blog posts (homepage preview) ─────────────────────────────────────────────
export const BLOG_POSTS = [
  {
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=450&fit=crop&auto=format",
    tag: "Media",
    category: "Media",
    date: "October 14, 2026",
    readTime: "5 min read",
    title: "Why the Best Campaigns Are Built for Both TV and TikTok",
    excerpt: "TV builds trust and reach, while TikTok builds speed and conversation. Discover why the strongest brand campaigns no longer choose between them.",
    author: "SLIM BIZ Editorial Team",
    authorImg: initialsAvatar("SLIM BIZ"),
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: "What services does SLIM BIZ offer?",
    a: "We run social media and community management, paid advertising (Facebook, Instagram, Google, TikTok, LinkedIn), website design and development, graphic design, video and photo production, SEO and email marketing. We also run a training academy, organise events and help businesses recruit staff.",
    category: "General",
  },
  {
    q: "Do you build websites?",
    a: "Yes. We design and develop websites, including WordPress sites, that are fast, mobile-friendly and built to help customers contact you. See the Pricing page for starting prices.",
    category: "Services",
  },
  {
    q: "Do you run ads for clients?",
    a: "Yes. We plan, launch and manage ads on Facebook, Instagram, Google, TikTok and LinkedIn. The ad budget itself is paid separately and goes entirely to the ad platforms.",
    category: "Services",
  },
  {
    q: "Can you help us recruit staff?",
    a: "Yes. We help businesses define the role, find candidates and shortlist the best ones. Tell us who you need to hire through a free consultation.",
    category: "Services",
  },
  {
    q: "Do you offer training?",
    a: "Yes. SLIM BIZ Digital Academy offers 40 courses in digital marketing, design, video, web and AI, in person, online or hybrid, with a certificate on completion. The registration fee is 10,000 FCFA.",
    category: "General",
  },
  {
    q: "Which businesses do you work with?",
    a: "We work with small and growing businesses, including beauty and skincare brands. If you're not sure we're the right fit, book a free consultation and we'll tell you honestly.",
    category: "General",
  },
  {
    q: "How do you decide which channels to use?",
    a: "We start from your goals, your customers and your budget, then recommend the channels most likely to work for you, whether that's social media, ads, a website or a mix. We'll also tell you what is not worth spending money on.",
    category: "Strategy",
  },
  {
    q: "How do you report on results?",
    a: "You receive a performance report on a schedule that depends on your package: monthly, every two weeks or weekly. Each report covers the numbers that matter to your goals, such as reach, messages, leads and sales.",
    category: "Reporting",
  },
  {
    q: "How much do your packages cost?",
    a: "Monthly packages start from 100,000 FCFA, excluding ad budget and VAT. The Pricing page lists each package and the add-on services available individually.",
    category: "Pricing",
  },
  {
    q: "Is there a minimum contract?",
    a: "We ask for an initial 3-month commitment. After that, the arrangement continues month to month with 30 days' notice to leave.",
    category: "Pricing",
  },
  {
    q: "How long does it take to see results?",
    a: "Paid ads can bring first messages and visits within days. Growing a social media community and Google visibility takes longer, usually a few months of steady work. We set clear expectations with you at the start.",
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
    bio: "Founder of SLIM BIZ SARL, leading the agency's marketing, advertising and training work in Cameroun.",
    linkedin: "#",
  },
  {
    name: "Nathalie Essono",
    role: "Community Manager",
    img: lizethImg,
    bio: "Manages client social media pages, plans content and keeps online communities active and engaged.",
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
    bio: "Specialist in paid social and digital media planning. Leads SLIM BIZ digital media strategy across platforms.",
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
    bio: "Developer building the websites and digital tools that power SLIM BIZ and its clients.",
    linkedin: "#",
  },
];

// ─── Open positions ───────────────────────────────────────────────────────────
// Not hiring right now. The Careers page has its own OPEN_ROLES list.
export const JOBS: { title: string; department: string; type: string; location: string; desc: string }[] = [];

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
