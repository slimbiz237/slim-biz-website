import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  Menu, X, Phone, Mail, MapPin, MessageCircle,
  Facebook, Instagram, Linkedin, Globe, ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/Business_logo-1.jpg";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, NAVY_MID, SERVICES } from "./shared";
import { LanguageProvider, useLang, type Lang } from "@/app/contexts/LanguageContext";

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Services",     href: "/services" },
  { label: "Portfolio",    href: "/portfolio" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Training",     href: "/training" },
  { label: "Blog",         href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact",      href: "/contact" },
];

const MOBILE_EXTRA_LINKS = [
  { label: "FAQ",     href: "/faq" },
  { label: "Careers", href: "/careers" },
];

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="flex items-center overflow-hidden border border-white/25"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {(["en", "fr"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2.5 py-1.5 text-[10px] font-medium tracking-widest uppercase transition-colors"
          style={{
            background: lang === l ? ORANGE : "transparent",
            color: lang === l ? "#fff" : "rgba(255,255,255,0.6)",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const imgH = size === "sm" ? "h-8" : size === "lg" ? "h-14" : "h-10";
  return (
    <Link to="/" className="flex items-center gap-3 select-none">
      <ImageWithFallback src={logoSrc} alt="SLIM BIZ logo" className={`${imgH} w-auto object-contain`} />
      <div className="text-left">
        <p className="font-bold leading-none tracking-wide" style={{ fontFamily: "'Playfair Display', serif", color: "inherit" }}>SLIM BIZ</p>
        <p className="text-[10px] tracking-[0.25em] uppercase leading-none mt-0.5" style={{ color: ORANGE }}>SARL</p>
      </div>
    </Link>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `${NAVY_DARK}F5` : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? `0 2px 24px ${NAVY_DARK}30` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16 lg:h-20">
        <div className="text-white"><Logo /></div>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="px-3.5 py-2 text-sm tracking-wide transition-colors duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isActive(l.href) ? ORANGE : "rgba(255,255,255,0.8)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = isActive(l.href) ? ORANGE : "rgba(255,255,255,0.8)")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangToggle />
          <Link
            to="/consultation"
            className="px-5 py-2.5 text-white text-sm font-medium tracking-wide transition-colors duration-200 inline-block"
            style={{ fontFamily: "'Inter', sans-serif", background: ORANGE }}
            onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}
          >
            Free Consultation
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LangToggle />
          <button className="text-white p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: NAVY_DARK }} className="lg:hidden border-t border-white/10">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="block w-full text-left px-6 py-3.5 text-sm tracking-wide border-b border-white/5 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif", color: isActive(l.href) ? ORANGE : "rgba(255,255,255,0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = isActive(l.href) ? ORANGE : "rgba(255,255,255,0.8)")}
            >
              {l.label}
            </Link>
          ))}
          {MOBILE_EXTRA_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="block w-full text-left px-6 py-3.5 text-sm tracking-wide border-b border-white/5 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif", color: isActive(l.href) ? ORANGE : "rgba(255,255,255,0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = isActive(l.href) ? ORANGE : "rgba(255,255,255,0.8)")}
            >
              {l.label}
            </Link>
          ))}
          <div className="px-6 py-4">
            <Link
              to="/consultation"
              className="block w-full py-3 text-white text-sm font-medium tracking-wide text-center"
              style={{ fontFamily: "'Inter', sans-serif", background: ORANGE }}
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#0A1240", color: "rgba(255,255,255,0.55)" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-5 text-white"><Logo size="sm" /></div>
            <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Full-service marketing & advertising agency based in Yaoundé, Cameroun — delivering integrated campaigns across TV, radio, outdoor, digital, and social channels.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook,  href: "https://www.facebook.com/slimbizsarl" },
                { Icon: Linkedin,  href: "https://www.linkedin.com/company/slim-bizllc/" },
                { Icon: Instagram, href: "https://www.instagram.com/slimbizllc/" },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border transition-colors duration-200"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = ""; }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Navigation</p>
            <ul className="space-y-3">
              {[
                { label: "Home",              href: "/" },
                { label: "About Us",          href: "/about" },
                { label: "Services",          href: "/services" },
                { label: "Portfolio",         href: "/portfolio" },
                { label: "Training Academy",  href: "/training" },
                { label: "Blog",              href: "/blog" },
                { label: "Testimonials",      href: "/testimonials" },
                { label: "FAQ",               href: "/faq" },
                { label: "Careers",           href: "/careers" },
                { label: "Contact",           href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Services</p>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link to="/services" className="text-sm transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs tracking-[0.2em] uppercase font-medium mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>Contact</p>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Rond Point Express\nYaoundé, Cameroun" },
                { icon: Phone,  text: "+237 657 202 002\n+237 679 965 961" },
                { icon: Mail,   text: "infoslimbiz@gmail.com" },
                { icon: Globe,  text: "www.slimbizmarketingagency.com" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex gap-3 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <Icon size={14} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />
                  <span className="whitespace-pre-line">{text}</span>
                </div>
              ))}
              {/* Google Reviews badge */}
              <a href="https://share.google/pnzloYYmIlCC0jjwv" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-2 px-3 py-2 border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
                <span className="text-[11px] font-bold" style={{ fontFamily: "'Inter', sans-serif", color: "#4285F4" }}>G</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill="#E8622A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <span className="text-white/60 text-[10px]" style={{ fontFamily: "'Inter', sans-serif" }}>5.0 · Google Reviews</span>
              </a>
            </div>
            <div className="mt-6">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-xs font-medium tracking-wide transition-colors"
                style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}
              >
                Free Consultation <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 SLIM BIZ SARL · RC/YAO/2025/B/696 · N° TVA M032517649967A · slimbizmarketingagency.com. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            {["Privacy Policy", "Cookie Policy", "Terms of Service"].map((l) => (
              <a key={l} href="#" className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a href="https://wa.me/237657202002" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center shadow-lg transition-transform hover:scale-110"
      style={{ background: "#25D366" }} title="Chat on WhatsApp">
      <MessageCircle size={26} className="text-white fill-white" />
    </a>
  );
}

function LayoutInner() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function Layout() {
  return (
    <LanguageProvider>
      <LayoutInner />
    </LanguageProvider>
  );
}
