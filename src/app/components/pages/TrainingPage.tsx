import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  ArrowRight, CheckCircle, Clock, Users, Star, Award,
  BookOpen, Monitor, Palette, Video, BarChart3, Search,
  Globe, Cpu, Shield, Code, Camera, Send, ChevronDown, ChevronUp,
} from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, TEAM, SectionTag, SectionTagLeft } from "../shared";

// ─── Official course data from SLIMBIZ DIGITAL ACADEMY Price List 2026 ────────
type Track = "Digital Marketing" | "Graphic Design & Motion" | "Video & Photography" | "Web, Tech & AI";

type Course = {
  id: number;
  name: string;
  duration: string;
  price: string;
  priceNum: number;
  track: Track;
  icon: React.ElementType;
  popular?: boolean;
};

const COURSES: Course[] = [
  // Digital Marketing
  { id: 1,  name: "Digital Marketing",              duration: "6 mois",  price: "500 000 FCFA", priceNum: 500000, track: "Digital Marketing",         icon: Globe,    popular: true },
  { id: 2,  name: "Community Management",           duration: "3 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: Users },
  { id: 3,  name: "Social Media Marketing",         duration: "2 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: BarChart3, popular: true },
  { id: 13, name: "SEO / Search Engine Optimization", duration: "2 mois", price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",        icon: Search },
  { id: 14, name: "Google Ads / PPC",               duration: "1 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: Monitor },
  { id: 15, name: "Facebook & Instagram Ads",       duration: "1 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: Users },
  { id: 16, name: "TikTok Marketing",               duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",         icon: Video },
  { id: 17, name: "WhatsApp Business & Marketing",  duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",         icon: Globe },
  { id: 18, name: "Email Marketing",                duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",         icon: BookOpen },
  { id: 19, name: "E-commerce & Dropshipping",      duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",         icon: BarChart3 },
  { id: 20, name: "Amazon / Marketplace Marketing", duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",         icon: Globe },
  { id: 21, name: "Copywriting",                    duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",         icon: BookOpen },
  { id: 22, name: "Content Creation",               duration: "2 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: Palette },
  { id: 23, name: "Personal Branding",              duration: "1 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: Award },
  { id: 24, name: "LinkedIn Marketing",             duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Digital Marketing",         icon: Users },
  { id: 32, name: "AI for Digital Marketing",       duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Digital Marketing",         icon: Cpu },
  { id: 40, name: "Digital Sales",                  duration: "2 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Digital Marketing",         icon: BarChart3 },
  // Graphic Design & Motion
  { id: 4,  name: "Graphic Design",                 duration: "3 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Graphic Design & Motion",   icon: Palette,  popular: true },
  { id: 5,  name: "UI/UX Design",                   duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Graphic Design & Motion",   icon: Monitor },
  { id: 6,  name: "Motion Design",                  duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Graphic Design & Motion",   icon: Video },
  // Video & Photography
  { id: 7,  name: "Video Editing",                  duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Video & Photography",       icon: Video,    popular: true },
  { id: 8,  name: "Audiovisual Production",         duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Video & Photography",       icon: Camera },
  { id: 9,  name: "Digital Photography",            duration: "2 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Video & Photography",       icon: Camera },
  // Web, Tech & AI
  { id: 10, name: "Website Creation",               duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",            icon: Globe },
  { id: 11, name: "WordPress",                      duration: "1 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",            icon: Globe },
  { id: 12, name: "Web Development",                duration: "6 mois",  price: "350 000 FCFA", priceNum: 350000, track: "Web, Tech & AI",            icon: Code },
  { id: 25, name: "Freelancing",                    duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Web, Tech & AI",            icon: BookOpen },
  { id: 26, name: "Virtual Assistant",              duration: "2 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",            icon: Monitor },
  { id: 27, name: "Digital Customer Service",       duration: "2 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",            icon: Users },
  { id: 28, name: "Data Analysis",                  duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",            icon: BarChart3 },
  { id: 29, name: "Professional Microsoft Excel",   duration: "1 mois",  price: "75 000 FCFA",  priceNum: 75000,  track: "Web, Tech & AI",            icon: BarChart3 },
  { id: 30, name: "Power BI",                       duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",            icon: BarChart3 },
  { id: 31, name: "Artificial Intelligence (AI)",   duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",            icon: Cpu,      popular: true },
  { id: 33, name: "ChatGPT & Prompt Engineering",   duration: "1 mois",  price: "100 000 FCFA", priceNum: 100000, track: "Web, Tech & AI",            icon: Cpu },
  { id: 34, name: "No-Code Automation",             duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",            icon: Code },
  { id: 35, name: "Cybersecurity – Introduction",   duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",            icon: Shield },
  { id: 36, name: "Ethical Hacking",                duration: "4 mois",  price: "300 000 FCFA", priceNum: 300000, track: "Web, Tech & AI",            icon: Shield },
  { id: 37, name: "Cloud Computing",                duration: "4 mois",  price: "300 000 FCFA", priceNum: 300000, track: "Web, Tech & AI",            icon: Globe },
  { id: 38, name: "Digital Project Management",     duration: "3 mois",  price: "200 000 FCFA", priceNum: 200000, track: "Web, Tech & AI",            icon: BookOpen },
  { id: 39, name: "CRM & Marketing Automation",     duration: "2 mois",  price: "150 000 FCFA", priceNum: 150000, track: "Web, Tech & AI",            icon: Cpu },
];

const TRACKS: { key: Track; icon: React.ElementType; color: string; desc: string }[] = [
  { key: "Digital Marketing",       icon: BarChart3, color: NAVY,   desc: "From strategy & social to SEO, paid ads, e-commerce, and AI-powered campaigns." },
  { key: "Graphic Design & Motion", icon: Palette,   color: ORANGE, desc: "Graphic design, UI/UX, and motion design for brand, digital, and broadcast." },
  { key: "Video & Photography",     icon: Camera,    color: NAVY,   desc: "Video editing, full audiovisual production, and professional digital photography." },
  { key: "Web, Tech & AI",          icon: Code,      color: ORANGE, desc: "Web creation, development, data analysis, AI, cybersecurity, cloud, and automation." },
];

// ─── Registration form ────────────────────────────────────────────────────────
type RegForm = {
  fullName: string; dob: string; gender: string;
  phone: string; email: string; address: string; occupation: string;
  programmes: string[]; trainingMode: string; batch: string;
  qualification: string; institution: string; previousTraining: string; experience: string;
  objectives: string;
  emergencyName: string; emergencyRelationship: string; emergencyPhone: string;
  paymentMethod: string;
  mobilePhone: string;
  cardName: string; cardNumber: string; cardExpiry: string; cardCVV: string;
  paypalEmail: string;
};

const EMPTY_FORM: RegForm = {
  fullName: "", dob: "", gender: "", phone: "", email: "",
  address: "", occupation: "", programmes: [], trainingMode: "",
  batch: "", qualification: "", institution: "", previousTraining: "",
  experience: "", objectives: "", emergencyName: "",
  emergencyRelationship: "", emergencyPhone: "", paymentMethod: "",
  mobilePhone: "", cardName: "", cardNumber: "", cardExpiry: "", cardCVV: "",
  paypalEmail: "",
};

const PROGRAMMES = ["Digital Marketing", "Graphic Designing", "Community Management", "Audio-Visual Training"];
const MODES = ["In-Person", "Online", "Hybrid"];

type PayMethod = {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  logo: string;
};

const PAY_METHODS: PayMethod[] = [
  { id: "mtn",        label: "MTN Mobile Money",   sublabel: "Cameroun",    color: "#FFC107", logo: "📱" },
  { id: "orange",     label: "Orange Money",        sublabel: "Cameroun",    color: "#FF6600", logo: "📱" },
  { id: "visa",       label: "Visa",                sublabel: "Credit Card", color: "#1A1F71", logo: "💳" },
  { id: "mastercard", label: "Mastercard",          sublabel: "Credit Card", color: "#EB001B", logo: "💳" },
  { id: "paypal",     label: "PayPal",              sublabel: "Online",      color: "#003087", logo: "🅿️" },
  { id: "cash",       label: "Cash",                sublabel: "In-person",   color: "#2E7D32", logo: "💵" },
  { id: "bank",       label: "Bank Transfer",       sublabel: "Virement",    color: "#37474F", logo: "🏦" },
];

function RegistrationForm({ preselect }: { preselect?: string }) {
  const initial = preselect
    ? { ...EMPTY_FORM, programmes: [preselect] }
    : EMPTY_FORM;
  const [form, setForm] = useState<RegForm>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: keyof RegForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const toggleProg = (p: string) => {
    setForm((f) => ({
      ...f,
      programmes: f.programmes.includes(p) ? f.programmes.filter((x) => x !== p) : [...f.programmes, p],
    }));
  };

  const inputCls = "w-full px-4 py-2.5 bg-input-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none transition-colors";

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle size={56} className="mx-auto mb-5" style={{ color: ORANGE }} />
        <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
          Registration Submitted!
        </h3>
        <p className="mb-4" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.65)" }}>
          Thank you, <strong>{form.fullName}</strong>. We'll review your application and contact you within 1–2 working days.
        </p>
        <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>
          Registration Fee: 10,000 FCFA payable on confirmation · {form.paymentMethod || "Payment method to be confirmed"}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await fetch("https://formsubmit.co/ajax/e1ebe916dc46af2e90be5073737b8e7e", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              name: form.fullName,
              email: form.email,
              phone: form.phone,
              programmes: form.programmes.join(", "),
              trainingMode: form.trainingMode,
              batch: form.batch,
              occupation: form.occupation,
              paymentMethod: form.paymentMethod,
              objectives: form.objectives,
              _subject: `New Training Registration — ${form.fullName} — SLIM BIZ Academy`,
              _replyto: form.email,
              _autoresponse: `Dear ${form.fullName},\n\nThank you for registering with SLIM BIZ Digital Academy!\n\nYour application has been received. Our team will review it and contact you within 1–2 working days to confirm your enrolment and payment details.\n\nProgramme(s) selected: ${form.programmes.join(", ")}\nTraining mode: ${form.trainingMode}\n\nRegistration Fee: 10,000 FCFA — payable upon confirmation.\n\nWe look forward to having you in the academy!\n\nWarm regards,\nThe SLIM BIZ Academy Team\n📍 Rond Point Express, Yaoundé, Cameroun\n📞 +237 657 202 002`,
            }),
          });
        } finally {
          setLoading(false);
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="space-y-0"
    >
      {/* Section helper */}
      {(() => {
        const Section = ({ num, title }: { num: string; title: string }) => (
          <div className="px-6 py-3 mb-0" style={{ background: NAVY, color: "#fff" }}>
            <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
              {num}. {title}
            </p>
          </div>
        );

        const Field = ({ label, children }: { label: string; children: ReactNode }) => (
          <div className="grid grid-cols-3 gap-0 border-b border-white/10 items-start">
            <div className="px-4 py-3 text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              {label}
            </div>
            <div className="col-span-2 p-2">{children}</div>
          </div>
        );

        return (
          <>
            {/* Section 1 */}
            <Section num="1" title="Applicant Information" />
            <div className="border border-white/10 mb-px">
              <Field label="Full Name *">
                <input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="e.g. Jean-Paul Mbarga"
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
              </Field>
              <Field label="Date of Birth">
                <input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)}
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }} />
              </Field>
              <Field label="Gender">
                <div className="flex gap-6 py-1">
                  {["Male", "Female"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={() => set("gender", g)} className="accent-orange-500" />
                      <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)" }}>{g}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Telephone / WhatsApp *">
                <input required value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+237 6XX XXX XXX" type="tel"
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
              </Field>
              <Field label="Email Address *">
                <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com"
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
              </Field>
              <Field label="Residential Address">
                <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Quartier, Ville, Cameroun"
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }} />
              </Field>
              <Field label="Occupation / Status">
                <input value={form.occupation} onChange={(e) => set("occupation", e.target.value)} placeholder="Student / Employee / Entrepreneur"
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }} />
              </Field>
            </div>

            {/* Section 2 */}
            <Section num="2" title="Training Programme Selection" />
            <div className="border border-white/10 mb-px">
              <Field label="Programme(s) *">
                <div className="flex flex-wrap gap-3 py-1">
                  {PROGRAMMES.map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.programmes.includes(p)} onChange={() => toggleProg(p)} className="accent-orange-500" />
                      <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)" }}>{p}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Training Mode *">
                <div className="flex gap-6 py-1">
                  {MODES.map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="mode" value={m} checked={form.trainingMode === m} onChange={() => set("trainingMode", m)} className="accent-orange-500" />
                      <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)" }}>{m}</span>
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Preferred Batch / Session">
                <input value={form.batch} onChange={(e) => set("batch", e.target.value)} placeholder="e.g. October 2026 — Morning"
                  className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }} />
              </Field>
            </div>

            {/* Section 3 */}
            <Section num="3" title="Education & Professional Background" />
            <div className="border border-white/10 mb-px">
              {[
                { label: "Highest Qualification", key: "qualification" as keyof RegForm, ph: "e.g. Baccalauréat, BTS, Licence" },
                { label: "Institution",           key: "institution"   as keyof RegForm, ph: "School or University name" },
                { label: "Previous Digital / Creative Training", key: "previousTraining" as keyof RegForm, ph: "Any prior courses or certifications" },
                { label: "Relevant Experience / Skills",         key: "experience"       as keyof RegForm, ph: "Brief overview of relevant skills" },
              ].map(({ label, key, ph }) => (
                <Field key={key} label={label}>
                  <input value={form[key] as string} onChange={(e) => set(key, e.target.value)} placeholder={ph}
                    className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }} />
                </Field>
              ))}
            </div>

            {/* Section 4 */}
            <Section num="4" title="Learning Objectives" />
            <div className="border border-white/10 mb-px">
              <Field label="What do you expect to achieve?">
                <textarea rows={4} required value={form.objectives} onChange={(e) => set("objectives", e.target.value)}
                  placeholder="Describe your goals and how you plan to apply this training…"
                  className={inputCls + " resize-none"} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")} />
              </Field>
            </div>

            {/* Section 5 */}
            <Section num="5" title="Emergency / Alternative Contact" />
            <div className="border border-white/10 mb-px">
              {[
                { label: "Name",         key: "emergencyName"         as keyof RegForm, ph: "Full name" },
                { label: "Relationship", key: "emergencyRelationship" as keyof RegForm, ph: "e.g. Parent, Spouse, Sibling" },
                { label: "Telephone",    key: "emergencyPhone"        as keyof RegForm, ph: "+237 6XX XXX XXX" },
              ].map(({ label, key, ph }) => (
                <Field key={key} label={label}>
                  <input value={form[key] as string} onChange={(e) => set(key, e.target.value)} placeholder={ph}
                    className={inputCls} style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }} />
                </Field>
              ))}
            </div>

            {/* Section 6 */}
            <Section num="6" title="Payment & Registration" />
            <div className="border border-white/10 mb-px">
              {/* Fee notice */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
                <p className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>Registration Fee</p>
                <p className="font-medium" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "1.1rem" }}>10,000 FCFA</p>
              </div>

              {/* Payment method grid */}
              <div className="p-4">
                <p className="text-xs text-white/50 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Select Payment Method *</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PAY_METHODS.map((m) => {
                    const active = form.paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => set("paymentMethod", m.id)}
                        className="flex flex-col items-center gap-1.5 p-3 border text-center transition-all"
                        style={{
                          borderColor: active ? m.color : "rgba(255,255,255,0.12)",
                          background: active ? `${m.color}18` : "rgba(255,255,255,0.03)",
                          boxShadow: active ? `0 0 0 1px ${m.color}` : "none",
                        }}>
                        <span style={{ fontSize: "1.5rem" }}>{m.logo}</span>
                        <span className="text-xs font-medium leading-tight" style={{ fontFamily: "'Inter', sans-serif", color: active ? "#fff" : "rgba(255,255,255,0.65)" }}>{m.label}</span>
                        <span className="text-[10px]" style={{ fontFamily: "'Inter', sans-serif", color: active ? m.color : "rgba(255,255,255,0.35)" }}>{m.sublabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional payment details */}
              {(form.paymentMethod === "mtn" || form.paymentMethod === "orange") && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4">
                  <p className="text-xs text-white/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {form.paymentMethod === "mtn" ? "MTN MoMo" : "Orange Money"} — Phone Number
                  </p>
                  <input
                    value={form.mobilePhone}
                    onChange={(e) => set("mobilePhone", e.target.value)}
                    placeholder="+237 6XX XXX XXX"
                    type="tel"
                    className="w-full px-4 py-2.5 text-sm focus:outline-none"
                    style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = form.paymentMethod === "mtn" ? "#FFC107" : "#FF6600")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                  <p className="text-[10px] mt-1.5 text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                    We will send you a payment prompt to this number upon confirmation of your registration.
                  </p>
                </div>
              )}

              {(form.paymentMethod === "visa" || form.paymentMethod === "mastercard") && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4 space-y-3">
                  <p className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {form.paymentMethod === "visa" ? "Visa" : "Mastercard"} — Card Details
                  </p>
                  <input
                    value={form.cardName}
                    onChange={(e) => set("cardName", e.target.value)}
                    placeholder="Cardholder Name"
                    className="w-full px-4 py-2.5 text-sm focus:outline-none"
                    style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                  />
                  <input
                    value={form.cardNumber}
                    onChange={(e) => set("cardNumber", e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-2.5 text-sm focus:outline-none tracking-widest"
                    style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={form.cardExpiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                        set("cardExpiry", v);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2.5 text-sm focus:outline-none"
                      style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                    />
                    <input
                      value={form.cardCVV}
                      onChange={(e) => set("cardCVV", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="CVV"
                      maxLength={4}
                      type="password"
                      className="w-full px-4 py-2.5 text-sm focus:outline-none"
                      style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                    />
                  </div>
                  <p className="text-[10px] text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                    🔒 Your card details are encrypted and secure. Payment is processed only upon confirmation.
                  </p>
                </div>
              )}

              {form.paymentMethod === "paypal" && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4">
                  <p className="text-xs text-white/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>PayPal — Email Address</p>
                  <input
                    value={form.paypalEmail}
                    onChange={(e) => set("paypalEmail", e.target.value)}
                    placeholder="your@paypal.com"
                    type="email"
                    className="w-full px-4 py-2.5 text-sm focus:outline-none"
                    style={{ fontFamily: "'Inter', sans-serif", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#009cde")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                  <p className="text-[10px] mt-1.5 text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                    We will send a PayPal payment request to this address upon confirmation of your registration.
                  </p>
                </div>
              )}

              {form.paymentMethod === "cash" && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4">
                  <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
                    💵 Cash payment is made in person at our office — <strong style={{ color: "rgba(255,255,255,0.75)" }}>Rond Point Express, Yaoundé</strong>. Our team will contact you to schedule your visit after reviewing your application.
                  </p>
                </div>
              )}

              {form.paymentMethod === "bank" && (
                <div className="px-4 pb-4 border-t border-white/10 pt-4">
                  <p className="text-xs mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>Bank Transfer details will be provided upon confirmation of your registration.</p>
                  <div className="space-y-1.5 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {[
                      { label: "Account Name", value: "SLIM BIZ SARL" },
                      { label: "Bank",         value: "To be confirmed on admission" },
                      { label: "Reference",    value: "Your Full Name + Programme" },
                    ].map((r) => (
                      <div key={r.label} className="flex gap-3">
                        <span className="text-white/35 w-28 shrink-0">{r.label}:</span>
                        <span className="text-white/70">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Declaration */}
              <div className="px-4 py-3 border-t border-white/10">
                <p className="text-xs text-white/45 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I certify that the information provided is accurate and complete. I agree to respect the training rules, schedules and professional standards of SLIM BIZ. I understand that registration is subject to confirmation by SLIM BIZ.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-5">
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 text-white font-medium text-sm tracking-wide transition-colors group disabled:opacity-60"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                {loading ? "Submitting…" : <> Submit Registration <Send size={16} className="group-hover:translate-x-1 transition-transform" /> </>}
              </button>
              <p className="text-center text-xs mt-3" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>
                Registration Fee: 10,000 FCFA · Payable on confirmation of admission
              </p>
            </div>
          </>
        );
      })()}
    </form>
  );
}

// ─── Course card ──────────────────────────────────────────────────────────────
function CourseRow({ course, onEnrol }: { course: Course; onEnrol: (name: string) => void }) {
  const trackColor = (["Digital Marketing", "Video & Photography"] as Track[]).includes(course.track) ? NAVY : ORANGE;

  return (
    <div className="grid grid-cols-12 items-center gap-0 border-b border-border bg-card transition-colors"
      onMouseEnter={(e) => (e.currentTarget.style.background = `${trackColor}08`)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
      <div className="col-span-1 px-4 py-4 text-center">
        <span className="text-xs" style={{ fontFamily: "'Playfair Display', serif", color: "var(--muted-foreground)" }}>
          {String(course.id).padStart(2, "0")}
        </span>
      </div>
      <div className="col-span-1 px-2 py-4 flex justify-center">
        <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${trackColor}15` }}>
          <course.icon size={16} style={{ color: trackColor }} />
        </div>
      </div>
      <div className="col-span-5 px-4 py-4 flex items-center gap-2">
        <span className="text-foreground text-sm leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>{course.name}</span>
        {course.popular && (
          <span className="text-[9px] px-1.5 py-0.5 tracking-widest uppercase text-white shrink-0"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>Hot</span>
        )}
      </div>
      <div className="col-span-2 px-4 py-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Clock size={11} /> {course.duration}
        </span>
      </div>
      <div className="col-span-2 px-4 py-4">
        <span className="text-sm" style={{ fontFamily: "'Playfair Display', serif", color: trackColor }}>{course.price}</span>
      </div>
      <div className="col-span-1 px-4 py-4">
        <button onClick={() => onEnrol(course.name)}
          className="text-xs px-3 py-1.5 text-white transition-colors whitespace-nowrap"
          style={{ background: trackColor, fontFamily: "'Inter', sans-serif" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
          Enrol
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrainingPage() {
  const [activeTrack, setActiveTrack] = useState<Track | "All">("All");
  const [showRegForm, setShowRegForm] = useState(false);
  const [preselect, setPreselect] = useState<string | undefined>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = activeTrack === "All" ? COURSES : COURSES.filter((c) => c.track === activeTrack);

  const handleEnrol = (name: string) => {
    setPreselect(name);
    setShowRegForm(true);
    setTimeout(() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden" style={{ background: NAVY_DARK }}>
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=600&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10" style={{ background: ORANGE }} />
                <p className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>
                  SLIM BIZ Digital Academy · RC/YAO/2025/B/696
                </p>
              </div>
              <h1 className="text-4xl lg:text-5xl text-white mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                40 Courses.<br />
                One Goal:<br />
                <span className="italic" style={{ color: ORANGE }}>Your Digital Success.</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                SLIM BIZ Digital Academy offers professional training in digital marketing, design, video, web and technology — with certification, internship, and personalised coaching. Available in-person, online or hybrid.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { v: "40", l: "Courses" },
                  { v: "10,000 FCFA", l: "Registration fee" },
                  { v: "Certified", l: "Certificate awarded" },
                  { v: "3 modes", l: "In-Person · Online · Hybrid" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem" }}>{s.v}</p>
                    <p className="text-white/45 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => { setShowRegForm(true); document.getElementById("register")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-3 px-7 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
                  style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                  Enrol Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="#courses"
                  className="inline-flex items-center gap-2 px-7 py-4 text-white text-sm border border-white/25 hover:border-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}>
                  View Courses
                </a>
              </div>
            </div>

            {/* Credentials block */}
            <div className="border border-white/10 p-8" style={{ background: "rgba(255,255,255,0.04)" }}>
              <p className="text-xs tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>SLIM BIZ SARL — Official Information</p>
              <div className="space-y-3">
                {[
                  { label: "Company name",  value: "SLIM BIZ SARL" },
                  { label: "Reg. No.",      value: "RC/YAO/2025/B/696" },
                  { label: "VAT No.",       value: "M032517649967A" },
                  { label: "Address",       value: "Rond Point Express, Yaoundé, Cameroun" },
                  { label: "Phone",         value: "+237 657 202 002 / +237 679 965 961" },
                  { label: "Email",         value: "infoslimbiz@gmail.com" },
                  { label: "Website",       value: "slimbizmarketingagency.com" },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-5 gap-3 text-sm border-b pb-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <span className="col-span-2 text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.45)" }}>{item.label}</span>
                    <span className="col-span-3 text-white/85" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</span>
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

      {/* ─── Track tabs ───────────────────────────────────────────────────── */}
      <section className="sticky top-20 z-40 border-b border-border" style={{ background: "var(--background)" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex overflow-x-auto">
          {[{ key: "All" as const, label: "All Courses", count: COURSES.length }, ...TRACKS.map((t) => ({ key: t.key, label: t.key, count: COURSES.filter((c) => c.track === t.key).length }))].map((tab) => {
            const active = activeTrack === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTrack(tab.key)}
                className="flex items-center gap-2 px-5 py-4 text-sm whitespace-nowrap border-b-2 transition-all"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  borderColor: active ? ORANGE : "transparent",
                  color: active ? "var(--foreground)" : "var(--muted-foreground)",
                }}>
                {tab.label}
                <span className="text-xs px-1.5 py-0.5" style={{ background: active ? `${ORANGE}20` : "var(--secondary)", color: active ? ORANGE : "var(--muted-foreground)" }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Course table ─────────────────────────────────────────────────── */}
      <section id="courses" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <SectionTagLeft label="Official Catalogue 2026" />
              <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                {filtered.length} course{filtered.length > 1 ? "s" : ""} available
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Registration fee (all programmes)</p>
              <p className="text-lg" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE }}>10 000 FCFA</p>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 gap-0 border border-border" style={{ background: NAVY_DARK }}>
            <div className="col-span-1 px-4 py-3"><p className="text-[10px] tracking-widest uppercase text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>N°</p></div>
            <div className="col-span-1 px-2 py-3"></div>
            <div className="col-span-5 px-4 py-3"><p className="text-[10px] tracking-widest uppercase text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>Course</p></div>
            <div className="col-span-2 px-4 py-3"><p className="text-[10px] tracking-widest uppercase text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>Duration</p></div>
            <div className="col-span-2 px-4 py-3"><p className="text-[10px] tracking-widest uppercase text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>Price</p></div>
            <div className="col-span-1 px-4 py-3"></div>
          </div>

          <div className="border-x border-b border-border">
            {/* Track groups */}
            {(activeTrack === "All" ? TRACKS.map((t) => t.key) : [activeTrack]).map((track) => {
              const rows = filtered.filter((c) => c.track === track);
              if (!rows.length) return null;
              const tConfig = TRACKS.find((t) => t.key === track)!;
              return (
                <div key={track}>
                  <div className="px-4 py-2.5 flex items-center gap-3" style={{ background: `${tConfig.color}10`, borderBottom: `1px solid var(--border)` }}>
                    <tConfig.icon size={14} style={{ color: tConfig.color }} />
                    <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: tConfig.color }}>{track}</p>
                    <span className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "var(--muted-foreground)" }}>· {rows.length} course{rows.length > 1 ? "s" : ""}</span>
                  </div>
                  {rows.map((c) => <CourseRow key={c.id} course={c} onEnrol={handleEnrol} />)}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span>* Registration fee: 10,000 FCFA (not included in the course price)</span>
            <span>* Certificate + internship + coaching included depending on the programme</span>
            <span>* Available in-person, online or hybrid</span>
          </div>
        </div>
      </section>

      {/* ─── Track descriptions ───────────────────────────────────────────── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="Our 4 Tracks" />
            <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
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
                  <button onClick={() => setActiveTrack(t.key)}
                    className="mt-4 flex items-center justify-center gap-2 py-2.5 text-white text-xs font-medium transition-colors"
                    style={{ background: t.color, fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                    View Courses <ArrowRight size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Why Academy ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTagLeft label="Why SLIM BIZ Academy?" />
              <h2 className="text-3xl text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Training by Practitioners, Not Theorists
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Practice-Based Curriculum",         desc: "Every course is built around what we actually do at SLIM BIZ — not textbooks. You learn the tools and techniques used in our real client campaigns." },
                  { title: "Certificate + Internship + Coaching", desc: "On completing each course, you receive an official SLIM BIZ certificate and benefit from coaching and an internship depending on the programme." },
                  { title: "Flexible Formats",                  desc: "Every course is available in-person (Yaoundé), online, or hybrid — to fit your schedule and location." },
                  { title: "One-Off Registration Fee",          desc: "A single registration fee of 10,000 FCFA (not included in the course price) to formalise your application. Payment by cash, Mobile Money or bank transfer." },
                  { title: "Real Projects, Concrete Portfolio", desc: "You will work on real briefs throughout the course — and leave with a portfolio of authentic work, not just school exercises." },
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
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: ORANGE }} />
                <p className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Beyond the Classroom</p>
              </div>
              <h2 className="text-3xl lg:text-4xl text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Conferences, Seminars & Professional Events
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                SLIM BIZ is open for conferences, seminars, panel discussions, workshops, and all other professional activities of that nature. Whether you need us to organise, co-host, sponsor, or provide speakers for your event — we are ready to collaborate.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { title: "Corporate Conferences", desc: "Full event management — venue, agenda, speakers, branding, and post-event content." },
                  { title: "Professional Seminars & Workshops", desc: "Half-day or full-day sessions led by SLIM BIZ practitioners on digital marketing, branding, and communications." },
                  { title: "Panel Discussions & Keynotes", desc: "Our senior team is available as keynote speakers or panellists at industry events." },
                  { title: "Product Launch Events", desc: "Brand activations, experiential marketing, and launch ceremonies with full media coverage." },
                  { title: "Trade Shows & Exhibitions", desc: "Stand design, staffing, and integrated media support for trade shows and expos." },
                  { title: "Training Days for Companies", desc: "Custom on-site training sessions for corporate teams — tailored to your industry and objectives." },
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
            <div className="border border-border p-8 lg:p-10" style={{ background: NAVY_DARK }}>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>Book SLIM BIZ for Your Event</p>
              <div className="space-y-5 mb-8">
                {[
                  { label: "Event types", value: "Conferences · Seminars · Workshops · Panel discussions · Product launches · Trade shows · Corporate training days" },
                  { label: "Languages", value: "English & French" },
                  { label: "Location", value: "Yaoundé & nationwide · Online available" },
                  { label: "Contact", value: "+237 657 202 002 · infoslimbiz@gmail.com" },
                ].map((item) => (
                  <div key={item.label} className="border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>{item.label}</p>
                    <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <Link to="/consultation"
                className="flex items-center justify-center gap-3 w-full py-4 text-white text-sm font-medium tracking-wide transition-colors"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                Enquire About an Event <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label="FAQ" />
            <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>FAQ — SLIM BIZ Academy</h2>
          </div>
          <div className="space-y-2">
            {[
              { q: "How do I enrol?",                  a: "Fill in the registration form on this page. A registration fee of 10,000 FCFA is due at confirmation. Your application will be reviewed and you will receive a response within 1–2 business days." },
              { q: "Are courses available online?",    a: "Yes. Every course is available in-person (Yaoundé), online or hybrid depending on the programme. Specify your preferred mode in the form." },
              { q: "Do I receive a certificate?",      a: "Yes. On completing your course you receive an official SLIM BIZ Digital Academy certificate. An internship and coaching are also offered depending on the programme conditions." },
              { q: "How does payment work?",           a: "The registration fee (10,000 FCFA) is payable at confirmation. The course fee can be paid by cash, Mobile Money or bank transfer. Payment plans can be discussed." },
              { q: "Can I enrol in multiple courses?", a: "Absolutely. You can select several programmes in the form. Our team will propose a schedule that works for you." },
              { q: "What level do I need to start?",   a: "Most of our courses start from scratch. No technical prerequisites are needed — just motivation and access to a computer or smartphone." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border overflow-hidden">
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

      {/* ─── Registration form ─────────────────────────────────────────────── */}
      <section id="register" className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10">
            <SectionTag label="Official Registration" />
            <h2 className="text-3xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Registration Form — SLIM BIZ Digital Academy</h2>
            <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
              Fill in this form to join the academy. Registration fee: <strong style={{ color: ORANGE }}>10,000 FCFA</strong>
            </p>
          </div>

          {/* Toggle */}
          {!showRegForm ? (
            <div className="text-center">
              <button onClick={() => setShowRegForm(true)}
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm font-medium tracking-wide transition-colors group"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                Open Registration Form <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
              {/* Form header */}
              <div className="p-6 border-b border-white/10" style={{ background: NAVY }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>SLIM BIZ DIGITAL ACADEMY</p>
                    <p className="text-white/55 text-xs mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Digital Marketing · Graphic Designing · Community Management · Audio-Visual Training
                    </p>
                  </div>
                  <button onClick={() => setShowRegForm(false)} className="text-white/40 hover:text-white text-lg transition-colors">✕</button>
                </div>
              </div>
              <div className="p-6">
                <RegistrationForm preselect={preselect} />
              </div>
            </div>
          )}

          {/* Contact strip */}
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Téléphone / WhatsApp", value: "+237 657 202 002\n+237 679 965 961" },
              { label: "Email",                value: "infoslimbiz@gmail.com" },
              { label: "Adresse",              value: "Rond Point Express\nYaoundé-Cameroun" },
            ].map((item) => (
              <div key={item.label} className="p-4 border text-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{item.label}</p>
                <p className="text-white/70 text-xs whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</p>
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
