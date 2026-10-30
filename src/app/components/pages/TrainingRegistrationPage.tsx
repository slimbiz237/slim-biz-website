import { useState, useEffect } from "react";
import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft, CheckCircle, Send } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, SectionTag } from "../shared";

// ─── Form data ────────────────────────────────────────────────────────────────
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

type PayMethod = { id: string; label: string; sublabel: string; color: string; logo: string };

const PAY_METHODS: PayMethod[] = [
  { id: "mtn",        label: "MTN Mobile Money", sublabel: "Cameroun",    color: "#FFC107", logo: "📱" },
  { id: "orange",     label: "Orange Money",     sublabel: "Cameroun",    color: "#FF6600", logo: "📱" },
  { id: "visa",       label: "Visa",             sublabel: "Credit Card", color: "#1A1F71", logo: "💳" },
  { id: "mastercard", label: "Mastercard",       sublabel: "Credit Card", color: "#EB001B", logo: "💳" },
  { id: "paypal",     label: "PayPal",           sublabel: "Online",      color: "#003087", logo: "🅿️" },
  { id: "cash",       label: "Cash",             sublabel: "In-person",   color: "#2E7D32", logo: "💵" },
  { id: "bank",       label: "Bank Transfer",    sublabel: "Virement",    color: "#37474F", logo: "🏦" },
];

// ─── Small UI pieces (defined OUTSIDE the form so inputs keep focus while typing) ──
const FIELD_STYLE = {
  fontFamily: "'Inter', sans-serif",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
} as const;

function Input({ accent = ORANGE, ...props }: InputHTMLAttributes<HTMLInputElement> & { accent?: string }) {
  return (
    <input
      {...props}
      className="w-full px-4 py-2.5 text-sm focus:outline-none transition-colors"
      style={FIELD_STYLE}
      onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
    />
  );
}

function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none"
      style={FIELD_STYLE}
      onFocus={(e) => (e.currentTarget.style.borderColor = ORANGE)}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
    />
  );
}

function FormSection({ num, title }: { num: string; title: string }) {
  return (
    <div className="px-6 py-3 mb-0" style={{ background: NAVY, color: "#fff" }}>
      <p className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
        {num}. {title}
      </p>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-0 border-b border-white/10 items-start">
      <div
        className="px-4 py-3 text-xs"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "rgba(255,255,255,0.6)",
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {label}
      </div>
      <div className="col-span-2 p-2">{children}</div>
    </div>
  );
}

// ─── Registration form ────────────────────────────────────────────────────────
function RegistrationForm({ preselect }: { preselect?: string }) {
  const [form, setForm] = useState<RegForm>(
    preselect ? { ...EMPTY_FORM, programmes: [preselect] } : EMPTY_FORM
  );
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof RegForm, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleProg = (p: string) =>
    setForm((f) => ({
      ...f,
      programmes: f.programmes.includes(p) ? f.programmes.filter((x) => x !== p) : [...f.programmes, p],
    }));

  // Show the course chosen on the training page as a ticked option
  const programmeOptions = preselect && !PROGRAMMES.includes(preselect) ? [preselect, ...PROGRAMMES] : PROGRAMMES;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formsubmit.co/ajax/e1ebe916dc46af2e90be5073737b8e7e", {
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
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("We could not send your registration. Please try again, or call/WhatsApp us on +237 657 202 002.");
    } finally {
      setLoading(false);
    }
  }

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
        <p className="text-xs mb-8" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>
          Registration Fee: 10,000 FCFA payable on confirmation · {form.paymentMethod || "Payment method to be confirmed"}
        </p>
        <Link
          to="/training"
          className="inline-flex items-center gap-2 px-6 py-3 text-white text-sm border border-white/25 hover:border-white transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span>Back to Training</span>
        </Link>
      </div>
    );
  }

  const textFields = (
    rows: { label: string; key: keyof RegForm; ph: string }[]
  ) =>
    rows.map(({ label, key, ph }) => (
      <FormField key={key} label={label}>
        <Input value={form[key] as string} onChange={(e) => set(key, e.target.value)} placeholder={ph} />
      </FormField>
    ));

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* 1 */}
      <FormSection num="1" title="Applicant Information" />
      <div className="border border-white/10 mb-px">
        <FormField label="Full Name *">
          <Input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="e.g. Jean-Paul Mbarga" />
        </FormField>
        <FormField label="Date of Birth">
          <Input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
        </FormField>
        <FormField label="Gender">
          <div className="flex gap-6 py-1">
            {["Male", "Female"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={() => set("gender", g)} className="accent-orange-500" />
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)" }}>{g}</span>
              </label>
            ))}
          </div>
        </FormField>
        <FormField label="Telephone / WhatsApp *">
          <Input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+237 6XX XXX XXX" />
        </FormField>
        <FormField label="Email Address *">
          <Input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@email.com" />
        </FormField>
        <FormField label="Residential Address">
          <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Quartier, Ville, Cameroun" />
        </FormField>
        <FormField label="Occupation / Status">
          <Input value={form.occupation} onChange={(e) => set("occupation", e.target.value)} placeholder="Student / Employee / Entrepreneur" />
        </FormField>
      </div>

      {/* 2 */}
      <FormSection num="2" title="Training Programme Selection" />
      <div className="border border-white/10 mb-px">
        <FormField label="Programme(s) *">
          <div className="flex flex-wrap gap-3 py-1">
            {programmeOptions.map((p) => (
              <label key={p} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.programmes.includes(p)} onChange={() => toggleProg(p)} className="accent-orange-500" />
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)" }}>{p}</span>
              </label>
            ))}
          </div>
        </FormField>
        <FormField label="Training Mode *">
          <div className="flex gap-6 py-1">
            {MODES.map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" value={m} checked={form.trainingMode === m} onChange={() => set("trainingMode", m)} className="accent-orange-500" />
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)" }}>{m}</span>
              </label>
            ))}
          </div>
        </FormField>
        <FormField label="Preferred Batch / Session">
          <Input value={form.batch} onChange={(e) => set("batch", e.target.value)} placeholder="e.g. October 2026 — Morning" />
        </FormField>
      </div>

      {/* 3 */}
      <FormSection num="3" title="Education & Professional Background" />
      <div className="border border-white/10 mb-px">
        {textFields([
          { label: "Highest Qualification", key: "qualification", ph: "e.g. Baccalauréat, BTS, Licence" },
          { label: "Institution", key: "institution", ph: "School or University name" },
          { label: "Previous Digital / Creative Training", key: "previousTraining", ph: "Any prior courses or certifications" },
          { label: "Relevant Experience / Skills", key: "experience", ph: "Brief overview of relevant skills" },
        ])}
      </div>

      {/* 4 */}
      <FormSection num="4" title="Learning Objectives" />
      <div className="border border-white/10 mb-px">
        <FormField label="What do you expect to achieve?">
          <Textarea rows={4} required value={form.objectives} onChange={(e) => set("objectives", e.target.value)}
            placeholder="Describe your goals and how you plan to apply this training…" />
        </FormField>
      </div>

      {/* 5 */}
      <FormSection num="5" title="Emergency / Alternative Contact" />
      <div className="border border-white/10 mb-px">
        {textFields([
          { label: "Name", key: "emergencyName", ph: "Full name" },
          { label: "Relationship", key: "emergencyRelationship", ph: "e.g. Parent, Spouse, Sibling" },
          { label: "Telephone", key: "emergencyPhone", ph: "+237 6XX XXX XXX" },
        ])}
      </div>

      {/* 6 */}
      <FormSection num="6" title="Payment & Registration" />
      <div className="border border-white/10 mb-px">
        <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
          <p className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>Registration Fee</p>
          <p className="font-medium" style={{ fontFamily: "'Playfair Display', serif", color: ORANGE, fontSize: "1.1rem" }}>10,000 FCFA</p>
        </div>

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
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{m.logo}</span>
                  <span className="text-xs font-medium leading-tight" style={{ fontFamily: "'Inter', sans-serif", color: active ? "#fff" : "rgba(255,255,255,0.65)" }}>{m.label}</span>
                  <span className="text-[10px]" style={{ fontFamily: "'Inter', sans-serif", color: active ? m.color : "rgba(255,255,255,0.35)" }}>{m.sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {(form.paymentMethod === "mtn" || form.paymentMethod === "orange") && (
          <div key="pay-mobile" className="px-4 pb-4 border-t border-white/10 pt-4">
            <p className="text-xs text-white/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              {form.paymentMethod === "mtn" ? "MTN MoMo" : "Orange Money"} — Phone Number
            </p>
            <Input
              accent={form.paymentMethod === "mtn" ? "#FFC107" : "#FF6600"}
              value={form.mobilePhone}
              onChange={(e) => set("mobilePhone", e.target.value)}
              placeholder="+237 6XX XXX XXX"
              type="tel"
            />
            <p className="text-[10px] mt-1.5 text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
              We will send you a payment prompt to this number upon confirmation of your registration.
            </p>
          </div>
        )}

        {(form.paymentMethod === "visa" || form.paymentMethod === "mastercard") && (
          <div key="pay-card" className="px-4 pb-4 border-t border-white/10 pt-4 space-y-3">
            <p className="text-xs text-white/50" style={{ fontFamily: "'Inter', sans-serif" }}>
              {form.paymentMethod === "visa" ? "Visa" : "Mastercard"} — Card Details
            </p>
            <Input value={form.cardName} onChange={(e) => set("cardName", e.target.value)} placeholder="Cardholder Name" />
            <Input
              value={form.cardNumber}
              onChange={(e) => set("cardNumber", e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={form.cardExpiry}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                  set("cardExpiry", v);
                }}
                placeholder="MM/YY"
                maxLength={5}
              />
              <Input
                value={form.cardCVV}
                onChange={(e) => set("cardCVV", e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="CVV"
                maxLength={4}
                type="password"
              />
            </div>
            <p className="text-[10px] text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
              🔒 Payment is processed only upon confirmation.
            </p>
          </div>
        )}

        {form.paymentMethod === "paypal" && (
          <div key="pay-paypal" className="px-4 pb-4 border-t border-white/10 pt-4">
            <p className="text-xs text-white/50 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>PayPal — Email Address</p>
            <Input accent="#009cde" value={form.paypalEmail} onChange={(e) => set("paypalEmail", e.target.value)} placeholder="your@paypal.com" type="email" />
            <p className="text-[10px] mt-1.5 text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
              We will send a PayPal payment request to this address upon confirmation of your registration.
            </p>
          </div>
        )}

        {form.paymentMethod === "cash" && (
          <div key="pay-cash" className="px-4 pb-4 border-t border-white/10 pt-4">
            <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
              <span>💵 Cash payment is made in person at our office — </span>
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>Rond Point Express, Yaoundé</strong>
              <span>. Our team will contact you to schedule your visit after reviewing your application.</span>
            </p>
          </div>
        )}

        {form.paymentMethod === "bank" && (
          <div key="pay-bank" className="px-4 pb-4 border-t border-white/10 pt-4">
            <p className="text-xs mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
              Bank Transfer details will be provided upon confirmation of your registration.
            </p>
            <div className="space-y-1.5 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              {[
                { label: "Account Name", value: "SLIM BIZ SARL" },
                { label: "Bank", value: "To be confirmed on admission" },
                { label: "Reference", value: "Your Full Name + Programme" },
              ].map((r) => (
                <div key={r.label} className="flex gap-3">
                  <span className="text-white/35 w-28 shrink-0">{r.label}:</span>
                  <span className="text-white/70">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-3 border-t border-white/10">
          <p className="text-xs text-white/45 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            I certify that the information provided is accurate and complete. I agree to respect the training rules, schedules and professional standards of SLIM BIZ. I understand that registration is subject to confirmation by SLIM BIZ.
          </p>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-5">
        {error && (
          <div className="mb-4 p-4 text-sm" style={{ fontFamily: "'Inter', sans-serif", background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.4)", color: "#fecaca" }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 text-white font-medium text-sm tracking-wide transition-colors group disabled:opacity-60"
          style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.background = ORANGE_HVR)}
          onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}
        >
          {loading ? (
            <span key="sending">Submitting…</span>
          ) : (
            <span key="idle" className="flex items-center gap-3">
              <span>Submit Registration</span>
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
        <p className="text-center text-xs mt-3" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.4)" }}>
          Registration Fee: 10,000 FCFA · Payable on confirmation of admission
        </p>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrainingRegistrationPage() {
  const [params] = useSearchParams();
  const course = params.get("course") || undefined;

  useEffect(() => {
    document.title = "Register for a Course | SLIM BIZ Digital Academy";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Register online for digital marketing, design, video, web and AI training at SLIM BIZ Digital Academy in Yaoundé, Cameroon.";
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen pt-36 pb-20" style={{ background: NAVY_DARK }}>
      <div className="max-w-4xl mx-auto px-5 lg:px-10">
        <Link
          to="/training"
          className="inline-flex items-center gap-2 mb-8 text-sm text-white/60 hover:text-white transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <ArrowLeft size={16} />
          <span>Back to courses</span>
        </Link>

        <div className="text-center mb-10">
          <SectionTag label="Official Registration" />
          <h1 className="text-3xl text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Registration Form — SLIM BIZ Digital Academy
          </h1>
          <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>
            <span>Fill in this form to join the academy. Registration fee: </span>
            <strong style={{ color: ORANGE }}>10,000 FCFA</strong>
          </p>
          {course && (
            <p className="mt-4 text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.75)" }}>
              <span>Selected course: </span>
              <strong style={{ color: ORANGE }}>{course}</strong>
            </p>
          )}
        </div>

        <div className="border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="p-6 border-b border-white/10" style={{ background: NAVY }}>
            <p className="text-white font-medium" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>SLIM BIZ DIGITAL ACADEMY</p>
            <p className="text-white/55 text-xs mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
              Digital Marketing · Graphic Designing · Community Management · Audio-Visual Training
            </p>
          </div>
          <div className="p-6">
            <RegistrationForm key={course ?? "none"} preselect={course} />
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { label: "Téléphone / WhatsApp", value: "+237 657 202 002\n+237 679 965 961" },
            { label: "Email", value: "info@slimbizmarketingagency.com" },
            { label: "Adresse", value: "Rond Point Express\nYaoundé-Cameroun" },
          ].map((item) => (
            <div key={item.label} className="p-4 border text-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{item.label}</p>
              <p className="text-white/70 text-xs whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
