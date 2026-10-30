import { useState, useEffect } from "react";
import type { ElementType } from "react";
import { Link } from "react-router";
import {
  ArrowRight, CheckCircle, Clock, Users, Award,
  BookOpen, Monitor, Palette, Video, BarChart3, Search,
  Globe, Cpu, Shield, Code, Camera, ChevronDown, ChevronUp,
} from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, TEAM, SectionTag, SectionTagLeft } from "../shared";

// ─── Types ────────────────────────────────────────────────────────────────────
type Track = "Digital Marketing" | "Graphic Design & Motion" | "Video & Photography" | "Web, Tech & AI";

type Course = {
  id: number;
  name: string;
  duration: string;
  price: string;
  priceNum: number;
  track: Track;
  icon: ElementType;
  popular?: boolean;
  img?: string; // optional: Unsplash photo id, e.g. "photo-1586125674857-4eb86880905d"
};

const REGISTER_PATH = "/training/register";

// ─── Images ───────────────────────────────────────────────────────────────────
// Each track has a small pool of photos. A course uses the pool by its id,
// or its own `img` if you set one. If a photo fails to load, the card shows
// a coloured panel with the course icon instead, so nothing ever looks broken.
const TRACK_IMAGES: Record<Track, string[]> = {
  "Digital Marketing": [
    "photo-1460925895917-afdab827c52f",
    "photo-1551288049-bebda4e38f71",
    "photo-1611162617213-7d7a39e9b1d7",
    "photo-1586125674857-4eb86880905d",
  ],
  "Graphic Design & Motion": [
    "photo-1561070791-2526d30994b5",
    "photo-1558655146-9f40138edfeb",
  ],
  "Video & Photography": [
    "photo-1516035069371-29a1b244cc32",
    "photo-1492691527719-9d1e07e534b4",
    "photo-1536240478700-b869070f9279",
  ],
  "Web, Tech & AI": [
    "photo-1498050108023-c5249f4df085",
    "photo-1555066931-4365d14bab8c",
    "photo-1677442136019-21780ecad995",
    "photo-1550751827-4bd374c3f58b",
  ],
};

function courseImage(c: Course): string {
  const id = c.img ?? TRACK_IMAGES[c.track][c.id % TRACK_IMAGES[c.track].length];
  return `https://images.unsplash.com/${id}?w=640&h=400&fit=crop&auto=format`;
}

// ─── Official course data from SLIMBIZ DIGITAL ACADEMY Price List 2026 ────────
const COURSES: Course[] = [
  // Digital Marketing
  { id: 1,  name: "Digital Marketing",                duration: "6 mois", price: "500 000 FCFA", priceNum: 500000, track: "Digital Marketing",       icon: Globe,     popular: true },
  { id: 2,  name: "Community Management",             duration: "3 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: Users },
  { id: 3,  name: "Social Media Marketing",           duration: "2 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: BarChart3, popular: true },
  { id: 13, name: "SEO / Search Engine Optimization", duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",       icon: Search },
  { id: 14, name: "Google Ads / PPC",                 duration: "1 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: Monitor,   img: "photo-1586125674857-4eb86880905d" },
  { id: 15, name: "Facebook & Instagram Ads",         duration: "1 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: Users },
  { id: 16, name: "TikTok Marketing",                 duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",       icon: Video },
  { id: 17, name: "WhatsApp Business & Marketing",    duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",       icon: Globe },
  { id: 18, name: "Email Marketing",                  duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",       icon: BookOpen },
  { id: 19, name: "E-commerce & Dropshipping",        duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",       icon: BarChart3 },
  { id: 20, name: "Amazon / Marketplace Marketing",   duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",       icon: Globe },
  { id: 21, name: "Copywriting",                      duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",       icon: BookOpen },
  { id: 22, name: "Content Creation",                 duration: "2 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: Palette },
  { id: 23, name: "Personal Branding",                duration: "1 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: Award },
  { id: 24, name: "LinkedIn Marketing",               duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",       icon: Users },
  { id: 32, name: "AI for Digital Marketing",         duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",       icon: Cpu },
  { id: 40, name: "Digital Sales",                    duration: "2 mois", price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",       icon: BarChart3 },
  // Graphic Design & Motion
  { id: 4,  name: "Graphic Design",                   duration: "3 mois", price: "150 000 FCFA", priceNum: 150000, track: "Graphic Design & Motion", icon: Palette,   popular: true },
  { id: 5,  name: "UI/UX Design",                     duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Graphic Design & Motion", icon: Monitor },
  { id: 6,  name: "Motion Design",                    duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Graphic Design & Motion", icon: Video },
  // Video & Photography
  { id: 7,  name: "Video Editing",                    duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Video & Photography",     icon: Video,     popular: true },
  { id: 8,  name: "Audiovisual Production",           duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Video & Photography",     icon: Camera },
  { id: 9,  name: "Digital Photography",              duration: "2 mois", price: "100 000 FCFA", priceNum: 100000, track: "Video & Photography",     icon: Camera },
  // Web, Tech & AI
  { id: 10, name: "Website Creation",                 duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",          icon: Globe },
  { id: 11, name: "WordPress",                        duration: "1 mois", price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",          icon: Globe },
  { id: 12, name: "Web Development",                  duration: "6 mois", price: "350 000 FCFA", priceNum: 350000, track: "Web, Tech & AI",          icon: Code },
  { id: 25, name: "Freelancing",                      duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Web, Tech & AI",          icon: BookOpen },
  { id: 26, name: "Virtual Assistant",                duration: "2 mois", price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",          icon: Monitor },
  { id: 27, name: "Digital Customer Service",         duration: "2 mois", price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",          icon: Users },
  { id: 28, name: "Data Analysis",                    duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",          icon: BarChart3 },
  { id: 29, name: "Professional Microsoft Excel",     duration: "1 mois", price: "75 000 FCFA",  priceNum: 75000,  track: "Web, Tech & AI",          icon: BarChart3 },
  { id: 30, name: "Power BI",                         duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",          icon: BarChart3 },
  { id: 31, name: "Artificial Intelligence (AI)",     duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",          icon: Cpu,       popular: true },
  { id: 33, name: "ChatGPT & Prompt Engineering",     duration: "1 mois", price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",          icon: Cpu },
  { id: 34, name: "No-Code Automation",               duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",          icon: Code },
  { id: 35, name: "Cybersecurity – Introduction",     duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",          icon: Shield },
  { id: 36, name: "Ethical Hacking",                  duration: "4 mois", price: "300 000 FCFA", priceNum: 300000, track: "Web, Tech & AI",          icon: Shield },
  { id: 37, name: "Cloud Computing",                  duration: "4 mois", price: "300 000 FCFA", priceNum: 300000, track: "Web, Tech & AI",          icon: Globe },
  { id: 38, name: "Digital Project Management",       duration: "3 mois", price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",          icon: BookOpen },
  { id: 39, name: "CRM & Marketing Automation",       duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",          icon: Cpu },
];

const TRACKS: { key: Track; icon: ElementType; color: string; desc: string }[] = [
  { key: "Digital Marketing",       icon: BarChart3, color: NAVY,   desc: "From strategy & social to SEO, paid ads, e-commerce, and AI-powered campaigns." },
  { key: "Graphic Design & Motion", icon: Palette,   color: ORANGE, desc: "Graphic design, UI/UX, and motion design for brand, digital, and broadcast." },
  { key: "Video & Photography",     icon: Camera,    color: NAVY,   desc: "Video editing, full audiovisual production, and professional digital photography." },
  { key: "Web, Tech & AI",          icon: Code,      color: ORANGE, desc: "Web creation, development, data analysis, AI, cybersecurity, cloud, and automation." },
];

const trackColor = (t: Track) => TRACKS.find((x) => x.key === t)!.color;

// ─── Course card ──────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: Course }) {
  const [imgFailed, setImgFailed] = useState(false);
  const color = trackColor(course.track);

  return (
    <article
      className="flex flex-col bg-card border border-border overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-40 lg:h-44 overflow-hidden" style={{ background: `${color}` }}>
        {!imgFailed ? (
          <img
            src={courseImage(course)}
            alt={course.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${NAVY_DARK})` }}>
            <course.icon size={44} className="text-white/80" />
          </div>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,18,64,0.55), transparent 55%)" }} />
        {course.popular && (
          <span className="absolute top-3 left-3 text-[10px] px-2 py-1 tracking-widest uppercase text-white"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>
            Popular
          </span>
        )}
        <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.15em] uppercase text-white/90"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          {course.track}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-foreground leading-snug mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem" }}>
          {course.name}
        </h3>

        <div className="flex items-center justify-between text-sm mb-5">
          <span className="flex items-center gap-1.5 text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Clock size={14} /> <span>{course.duration}</span>
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", color, fontSize: "1rem" }}>{course.price}</span>
        </div>

        {/* Enrol button, always under the card content */}
        <Link
          to={`${REGISTER_PATH}?course=${encodeURIComponent(course.name)}`}
          className="mt-auto flex items-center justify-center gap-2 w-full py-3.5 text-white text-sm font-medium tracking-wide transition-colors group"
          style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
          onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}
        >
          <span>Enrol Now</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrainingPage() {
  const [activeTrack, setActiveTrack] = useState<Track | "All">("All");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Digital Marketing & Tech Training in Cameroon | SLIM BIZ Digital Academy";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "40 professional courses in digital marketing, design, video, web development and AI in Yaoundé, Cameroon. In-person, online or hybrid, with certificate.";
  }, []);

  const filtered = COURSES.filter((c) => {
    const inTrack = activeTrack === "All" || c.track === activeTrack;
    const inSearch = query.trim() === "" || c.name.toLowerCase().includes(query.trim().toLowerCase());
    return inTrack && inSearch;
  });

  const showCourses = () => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-16 overflow-hidden" style={{ background: NAVY_DARK }}>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 shrink-0" style={{ background: ORANGE }} />
                <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>
                  SLIM BIZ Digital Academy · RC/YAO/2025/B/696
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                40 Courses.<br />
                One Goal:<br />
                <span className="italic" style={{ color: ORANGE }}>Your Digital Success.</span>
              </h1>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                SLIM BIZ Digital Academy offers professional training in digital marketing, design, video, web and technology — with certification, internship, and personalised coaching. Available in-person, online or hybrid.
              </p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-5 sm:gap-6 mb-8">
                {[
                  { v: "40", l: "Courses" },
                  { v: "10,000 FCFA", l: "Registration fee" },
                  { v: "Certified", l: "Certificate awarded" },
                  { v: "3 modes", l: "In-Person · Online · Hybrid" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem" }}>{s.v}</p>
                    <p className="text-white/45 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to={REGISTER_PATH}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
                  style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                  <span>Enrol Now</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-white text-sm border border-white/25 hover:border-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span>View Courses</span>
                </a>
              </div>
            </div>

            {/* Credentials block */}
            <div className="border border-white/10 p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>SLIM BIZ SARL — Official Information</p>
              <div className="space-y-3">
                {[
                  { label: "Company name",  value: "SLIM BIZ SARL" },
                  { label: "Reg. No.",      value: "RC/YAO/2025/B/696" },
                  { label: "VAT No.",       value: "M032517649967A" },
                  { label: "Address",       value: "Rond Point Express, Yaoundé, Cameroun" },
                  { label: "Phone",         value: "+237 657 202 002 / +237 679 965 961" },
                  { label: "Email",         value: "info@slimbizmarketingagency.com" },
                  { label: "Website",       value: "slimbizmarketingagency.com" },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-5 gap-3 text-sm border-b pb-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <span className="col-span-2 text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }}>{item.label}</span>
                    <span className="col-span-3 text-white/85 break-words" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 border-l-4" style={{ borderColor: ORANGE, background: "rgba(255,255,255,0.03)" }}>
                <p className="text-xs italic" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(255,255,255,0.7)" }}>
                  "Empowering Skills, Building Careers, Creating Opportunities"
                </p>
                <p className="text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>— SLIM BIZ Digital Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Track tabs (scroll sideways on mobile) ───────────────────────── */}
      <section className="sticky top-16 lg:top-20 z-40 border-b border-border" style={{ background: "var(--background)" }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-10 flex overflow-x-auto">
          {[{ key: "All" as const, label: "All Courses", count: COURSES.length }, ...TRACKS.map((t) => ({ key: t.key, label: t.key, count: COURSES.filter((c) => c.track === t.key).length }))].map((tab) => {
            const active = activeTrack === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTrack(tab.key)}
                className="flex items-center gap-2 px-4 sm:px-5 py-4 text-sm whitespace-nowrap border-b-2 transition-all shrink-0"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  borderColor: active ? ORANGE : "transparent",
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                }}>
                <span>{tab.label}</span>
                <span className="text-xs px-1.5 py-0.5" style={{ background: active ? `${ORANGE}20` : "var(--secondary)", color: active ? ORANGE : "var(--muted-foreground)" }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Course cards ─────────────────────────────────────────────────── */}
      <section id="courses" className="py-14 sm:py-20 bg-background scroll-mt-32">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
            <div>
              <SectionTagLeft label="Official Catalogue 2026" />
              <h2 className="text-2xl sm:text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                {filtered.length} course{filtered.length !== 1 ? "s" : ""} available
              </h2>
              <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Registration fee for all programmes: <strong style={{ color: ORANGE }}>10,000 FCFA</strong> (not included in the course price)
              </p>
            </div>
            <div className="relative w-full lg:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a course..."
                className="w-full pl-11 pr-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = NAVY)}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
              <p>No course found.</p>
              <button onClick={() => { setQuery(""); setActiveTrack("All"); }} className="underline mt-2" style={{ color: ORANGE }}>
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span>* Certificate + internship + coaching included depending on the programme</span>
            <span>* Available in-person, online or hybrid</span>
          </div>
        </div>
      </section>

      {/* ─── Track descriptions ───────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10 sm:mb-12">
            <SectionTag label="Our 4 Tracks" />
            <h2 className="text-2xl sm:text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              Choose Your Track
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRACKS.map((t) => {
              const count = COURSES.filter((c) => c.track === t.key).length;
              const cheapest = Math.min(...COURSES.filter((c) => c.track === t.key).map((c) => c.priceNum));
              return (
                <div key={t.key} className="bg-card border border-border p-6 flex flex-col transition-all duration-300"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${t.color}50`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}>
                  <div className="w-12 h-12 flex items-center justify-center mb-5" style={{ background: `${t.color}12`, border: `1px solid ${t.color}25` }}>
                    <t.icon size={22} style={{ color: t.color }} />
                  </div>
                  <h3 className="text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}>{t.key}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: "'Inter', sans-serif" }}>{t.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>{count} course{count > 1 ? "s" : ""}</span>
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: t.color }}>
                      From {cheapest.toLocaleString("en-GB")} FCFA
                    </span>
                  </div>
                  <button onClick={() => { setActiveTrack(t.key); setQuery(""); showCourses(); }}
                    className="mt-4 flex items-center justify-center gap-2 py-3 text-white text-xs font-medium transition-colors"
                    style={{ background: t.color, fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                    <span>View Courses</span> <ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Why Academy ──────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionTagLeft label="Why SLIM BIZ Academy?" />
              <h2 className="text-2xl sm:text-3xl text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Training by Practitioners, Not Theorists
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Practice-Based Curriculum",           desc: "Every course is built around what we actually do at SLIM BIZ — not textbooks. You learn the tools and techniques used in our real client campaigns." },
                  { title: "Certificate + Internship + Coaching", desc: "On completing each course, you receive an official SLIM BIZ certificate and benefit from coaching and an internship depending on the programme." },
                  { title: "Flexible Formats",                    desc: "Every course is available in-person (Yaoundé), online, or hybrid — to fit your schedule and location." },
                  { title: "One-Off Registration Fee",            desc: "A single registration fee of 10,000 FCFA (not included in the course price) to formalise your application. Payment by cash, Mobile Money or bank transfer." },
                  { title: "Real Projects, Concrete Portfolio",   desc: "You will work on real briefs throughout the course — and leave with a portfolio of authentic work, not just school exercises." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center" style={{ background: ORANGE, borderRadius: "2px" }}>
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{item.title}</p>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs tracking-[0.25em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Your Trainers</p>
              {TEAM.slice(0, 4).map((m) => (
                <div key={m.name} className="flex items-center gap-4 p-4 border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
                  <img src={m.img} alt={m.name} className="w-12 h-12 rounded-full object-cover object-top bg-muted shrink-0" style={{ border: `2px solid ${ORANGE}40` }} />
                  <div>
                    <p className="text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{m.name}</p>
                    <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{m.role}</p>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Events & Conferences ─────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: ORANGE }} />
                <p className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Beyond the Classroom</p>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Conferences, Seminars & Professional Events
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                SLIM BIZ is open for conferences, seminars, panel discussions, workshops, and all other professional activities of that nature. Whether you need us to organise, co-host, sponsor, or provide speakers for your event — we are ready to collaborate.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { title: "Corporate Conferences",              desc: "Full event management — venue, agenda, speakers, branding, and post-event content." },
                  { title: "Professional Seminars & Workshops",  desc: "Half-day or full-day sessions led by SLIM BIZ practitioners on digital marketing, branding, and communications." },
                  { title: "Panel Discussions & Keynotes",       desc: "Our senior team is available as keynote speakers or panellists at industry events." },
                  { title: "Product Launch Events",              desc: "Brand activations, experiential marketing, and launch ceremonies with full media coverage." },
                  { title: "Trade Shows & Exhibitions",          desc: "Stand design, staffing, and integrated media support for trade shows and expos." },
                  { title: "Training Days for Companies",        desc: "Custom on-site training sessions for corporate teams — tailored to your industry and objectives." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 p-4 border border-border bg-secondary">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: ORANGE }} />
                    <div>
                      <p className="text-foreground text-sm font-medium mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{item.title}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-border p-6 sm:p-8 lg:p-10" style={{ background: NAVY_DARK }}>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Book SLIM BIZ for Your Event</p>
              <div className="space-y-5 mb-8">
                {[
                  { label: "Event types", value: "Conferences · Seminars · Workshops · Panel discussions · Product launches · Trade shows · Corporate training days" },
                  { label: "Languages",   value: "English & French" },
                  { label: "Location",    value: "Yaoundé & nationwide · Online available" },
                  { label: "Contact",     value: "+237 657 202 002 · info@slimbizmarketingagency.com" },
                ].map((item) => (
                  <div key={item.label} className="border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>{item.label}</p>
                    <p className="text-white text-sm leading-relaxed break-words" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <Link to="/consultation"
                className="flex items-center justify-center gap-3 w-full py-4 text-white text-sm font-medium tracking-wide transition-colors"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                <span>Enquire About an Event</span> <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10 sm:mb-12">
            <SectionTag label="FAQ" />
            <h2 className="text-2xl sm:text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>FAQ — SLIM BIZ Academy</h2>
          </div>
          <div className="space-y-2">
            {[
              { q: "How do I enrol?",                  a: "Click “Enrol Now” on any course card, then fill in the registration form. A registration fee of 10,000 FCFA is due at confirmation. Your application will be reviewed and you will receive a response within 1–2 business days." },
              { q: "Are courses available online?",    a: "Yes. Every course is available in-person (Yaoundé), online or hybrid depending on the programme. Specify your preferred mode in the form." },
              { q: "Do I receive a certificate?",      a: "Yes. On completing your course you receive an official SLIM BIZ Digital Academy certificate. An internship and coaching are also offered depending on the programme conditions." },
              { q: "How does payment work?",           a: "The registration fee (10,000 FCFA) is payable at confirmation. The course fee can be paid by cash, Mobile Money or bank transfer. Payment plans can be discussed." },
              { q: "Can I enrol in multiple courses?", a: "Absolutely. You can select several programmes in the form. Our team will propose a schedule that works for you." },
              { q: "What level do I need to start?",   a: "Most of our courses start from scratch. No technical prerequisites are needed — just motivation and access to a computer or smartphone." },
            ].map((item, i) => (
              <div key={item.q} className="bg-card border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${ORANGE}08`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <span className="text-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{item.q}</span>
                  <span style={{ color: ORANGE, flexShrink: 0 }}>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t border-border">
                    <p className="text-muted-foreground text-sm leading-relaxed pt-4" style={{ fontFamily: "'Inter', sans-serif" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Register CTA ─────────────────────────────────────────────────── */}
      <section id="register" className="py-14 sm:py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <SectionTag label="Official Registration" />
          <h2 className="text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Join SLIM BIZ Digital Academy?
          </h2>
          <p className="text-sm mb-8" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
            <span>Registration fee: </span>
            <strong style={{ color: ORANGE }}>10,000 FCFA</strong>
          </p>
          <Link to={REGISTER_PATH}
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
            <span>Open Registration Form</span> <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Téléphone / WhatsApp", value: "+237 657 202 002\n+237 679 965 961" },
              { label: "Email",                value: "info@slimbizmarketingagency.com" },
              { label: "Adresse",              value: "Rond Point Express\nYaoundé-Cameroun" },
            ].map((item) => (
              <div key={item.label} className="p-4 border text-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{item.label}</p>
                <p className="text-white/70 text-xs whitespace-pre-line break-words" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-4 text-xs text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
            MARKETING 360 · PUBLICITÉ · COMMUNICATION · FORMATION — slimbizmarketingagency.com
          </p>
        </div>
      </section>
    </>
  );
}
