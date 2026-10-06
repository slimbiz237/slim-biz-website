import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, X, ArrowRight, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { NAVY, ORANGE, NAVY_DARK, ORANGE_HVR, SectionTag, PageHero } from "../shared";
import { useLang, t } from "@/app/contexts/LanguageContext";

const PACKAGES = [
  {
    id: "starter",
    name: "STARTER",
    tagline: { en: "Ideal for SMEs & startups", fr: "Idéal pour les TPE & startups" },
    price: "100 000",
    color: NAVY,
    popular: false,
    features: [
      { en: "Manage 2 social networks (Facebook + Instagram)", fr: "Gestion de 2 réseaux sociaux (Facebook + Instagram)", included: true },
      { en: "8 posts/month (text + visuals)", fr: "8 publications/mois (texte + visuels)", included: true },
      { en: "Basic visual content creation", fr: "Création de contenu visuel basique (Canva)", included: true },
      { en: "1 monthly performance report", fr: "1 rapport mensuel de performance", included: true },
      { en: "Comment & message responses", fr: "Réponses aux commentaires & messages", included: true },
      { en: "Advertising campaigns (Ads)", fr: "Campagnes publicitaires (Ads)", included: false },
      { en: "Google Ads / SEO management", fr: "Gestion Google Ads / SEO", included: false },
      { en: "Newsletter / Email Marketing", fr: "Newsletter / Email Marketing", included: false },
      { en: "Professional video creation", fr: "Création vidéo professionnelle", included: false },
      { en: "TV / Radio / OOH Advertising", fr: "TV / Radio / Affichage OOH", included: false },
      { en: "Dedicated account manager", fr: "Account manager dédié", included: false },
    ],
  },
  {
    id: "business",
    name: "BUSINESS",
    tagline: { en: "For growing businesses", fr: "Pour les PME en croissance" },
    price: "200 000",
    color: NAVY,
    popular: false,
    features: [
      { en: "Manage 3 social networks (FB + IG + LinkedIn)", fr: "Gestion de 3 réseaux sociaux (FB + IG + LinkedIn)", included: true },
      { en: "12 posts/month + stories", fr: "12 publications/mois + stories", included: true },
      { en: "Professional visual content creation", fr: "Création de contenu visuel professionnel", included: true },
      { en: "Basic Ads management (Facebook & Instagram)", fr: "Gestion basique des Ads (Facebook & Instagram)", included: true },
      { en: "Monthly newsletter (Email Marketing)", fr: "Newsletter mensuelle (Email Marketing)", included: true },
      { en: "Bi-monthly performance report", fr: "Rapport bi-mensuel de performance", included: true },
      { en: "Basic SEO (on-page optimisation)", fr: "SEO de base (optimisation on-page)", included: true },
      { en: "Advanced Google Ads / SEA", fr: "Google Ads / SEA avancé", included: false },
      { en: "Professional video creation", fr: "Création vidéo professionnelle", included: false },
      { en: "TV / Radio / OOH Advertising", fr: "TV / Radio / Affichage OOH", included: false },
      { en: "Dedicated account manager", fr: "Account manager dédié", included: false },
    ],
  },
  {
    id: "growth",
    name: "GROWTH",
    tagline: { en: "For ambitious brands", fr: "Pour les marques ambitieuses" },
    price: "300 000",
    color: ORANGE,
    popular: true,
    features: [
      { en: "Manage 4 social networks (FB + IG + LinkedIn + TikTok)", fr: "Gestion de 4 réseaux sociaux (FB + IG + LinkedIn + TikTok)", included: true },
      { en: "16 posts/month + stories + reels", fr: "16 publications/mois + stories + reels", included: true },
      { en: "Full visual & graphic content creation", fr: "Création de contenu visuel & graphique complet", included: true },
      { en: "Full Facebook Ads + Google Ads management", fr: "Gestion complète Facebook Ads + Google Ads", included: true },
      { en: "Full SEO (technical + content + local)", fr: "SEO complet (technique + contenu + local)", included: true },
      { en: "2 newsletters/month (Email Marketing)", fr: "2 newsletters/mois (Email Marketing)", included: true },
      { en: "Weekly report + analytics dashboard", fr: "Rapport hebdomadaire + tableau de bord analytics", included: true },
      { en: "1 short video/month (30–60 s)", fr: "1 vidéo courte/mois (30–60 s)", included: true },
      { en: "TV / Radio / OOH Advertising", fr: "TV / Radio / Affichage OOH", included: false },
      { en: "Influencer management", fr: "Gestion influenceurs", included: false },
      { en: "Dedicated account manager", fr: "Account manager dédié", included: true },
    ],
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    tagline: { en: "For market leaders", fr: "Pour les leaders du marché" },
    price: "500 000",
    color: NAVY,
    popular: false,
    features: [
      { en: "All social platforms (full management)", fr: "Toutes les plateformes sociales (gestion complète)", included: true },
      { en: "20+ posts/month + stories + reels + shorts", fr: "20+ publications/mois + stories + reels + shorts", included: true },
      { en: "Full-service content production (photo + video)", fr: "Production de contenu full-service (photo + vidéo)", included: true },
      { en: "Full Ads management (FB + Google + TikTok + LinkedIn)", fr: "Gestion complète Ads (Facebook + Google + TikTok + LinkedIn)", included: true },
      { en: "Advanced SEO + editorial content strategy", fr: "SEO avancé + stratégie de contenu éditoriale", included: true },
      { en: "Unlimited email marketing + automation", fr: "Email marketing illimité + automation", included: true },
      { en: "Weekly report + custom dashboard", fr: "Rapport hebdomadaire + dashboard personnalisé", included: true },
      { en: "Influencer partnership management", fr: "Gestion des partenariats influenceurs", included: true },
      { en: "Full brand strategy", fr: "Stratégie de marque complète", included: true },
      { en: "TV / Radio / OOH Advertising", fr: "TV / Radio / Affichage OOH", included: false },
      { en: "Dedicated senior account manager", fr: "Account manager senior dédié", included: true },
    ],
  },
];

const COMP_FEATURES = {
  en: ["Social networks managed", "Posts / month", "Facebook & Instagram Ads", "Google Ads (SEA)", "SEO", "Email Marketing", "Video creation", "Performance report", "Dedicated Account Manager", "TV / Radio / OOH"],
  fr: ["Réseaux sociaux gérés", "Publications / mois", "Facebook & Instagram Ads", "Google Ads (SEA)", "SEO", "Email Marketing", "Création vidéo", "Rapport de performance", "Account Manager dédié", "TV / Radio / OOH"],
};

const COMP_DATA: Record<string, (string | boolean)[]> = {
  starter:      ["2",   "8",            false, false, "Basic",    "—",         false,  "Monthly",    false, false],
  business:     ["3",   "12 + stories", true,  false, "On-page",  "1×/mo",     false,  "Bi-monthly", false, false],
  growth:       ["4",   "16 + reels",   true,  true,  "Full",     "2×/mo",     "1/mo", "Weekly",     true,  false],
  professional: ["All", "20+",          true,  true,  "Advanced", "Unlimited", true,   "Weekly",     true,  false],
};

const PRICING_FAQS = [
  {
    en: { q: "Are ad budgets included in the retainer fees?", a: "No. Retainer fees cover agency services (strategy, creative, management, reporting). Ad budgets (Facebook, Google, etc.) are billed separately and go 100% to the ad platforms." },
    fr: { q: "Les budgets publicitaires sont-ils inclus dans les honoraires ?", a: "Non. Les honoraires couvrent les services de l'agence. Les budgets Ads sont facturés séparément et vont intégralement aux régies." },
  },
  {
    en: { q: "Can I upgrade or downgrade my package?", a: "Yes. We review packages quarterly. Most clients start on BUSINESS or GROWTH, then move to PROFESSIONAL as their campaigns scale." },
    fr: { q: "Peut-on changer de formule en cours de contrat ?", a: "Oui. Nous révisons les formules à chaque fin de trimestre. La plupart des clients commencent par BUSINESS ou GROWTH, puis évoluent vers PROFESSIONAL." },
  },
  {
    en: { q: "Is there a minimum contract length?", a: "We ask for an initial 3-month commitment. After that, packages are month-to-month with 30 days notice to exit." },
    fr: { q: "Y a-t-il un engagement minimum ?", a: "Nous demandons un engagement initial de 3 mois. Passé cette période, la collaboration est reconductible mois par mois avec préavis de 30 jours." },
  },
  {
    en: { q: "Do you work on one-off projects?", a: "Yes — for a TV commercial, brand identity, or product launch we can work on a project basis. Contact us for a custom quote." },
    fr: { q: "Travaillez-vous sur des projets ponctuels ?", a: "Oui, pour des projets spécifiques — un spot TV, une identité visuelle, un lancement de produit — nous proposons des devis au projet." },
  },
  {
    en: { q: "Is VAT included in your prices?", a: "Prices are listed excl. VAT. Applicable VAT is added per Cameroonian tax law (SLIM BIZ VAT No.: M032517649967A)." },
    fr: { q: "La TVA est-elle incluse dans vos tarifs ?", a: "Nos tarifs sont indiqués hors taxes (HT). La TVA applicable s'ajoute selon les dispositions légales camerounaises (N° TVA : M032517649967A)." },
  },
];

export default function PricingPage() {
  const { lang } = useLang();
  const [showComparison, setShowComparison] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <PageHero
        tag={t(lang, "360° Pricing 2026", "Tarifs 360° 2026")}
        title={t(lang, "Clear Packages for Every Ambition", "Des Formules Claires pour Chaque Ambition")}
        subtitle={t(lang,
          "5 SLIM BIZ 360° packages — from SME to enterprise. Fixed pricing, no surprises. Excl. ad budget & VAT.",
          "5 packages SLIM BIZ 360° — de la TPE au grand compte. Tarifs fixes, sans surprise. Hors budget médias et TVA."
        )}
      />

      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <SectionTag label="SLIM BIZ 360° Packages" />
            <h2 className="text-3xl lg:text-4xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t(lang, "Choose Your Plan", "Choisissez Votre Formule")}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
              {t(lang,
                "All plans include strategy, content creation, social media management, and reporting. Ad budget not included.",
                "Toutes les formules incluent stratégie, création, pilotage des réseaux et reporting. Hors budget publicitaire."
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className="relative flex flex-col border overflow-hidden"
                style={{
                  borderColor: pkg.popular ? ORANGE : "var(--border)",
                  background: "var(--card)",
                  boxShadow: pkg.popular ? `0 0 0 2px ${ORANGE}` : "none",
                }}>
                {pkg.popular && (
                  <div className="py-1.5 text-center text-[10px] tracking-widest uppercase text-white"
                    style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}>
                    {t(lang, "Most Popular", "Le Plus Populaire")}
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", color: pkg.color }}>
                    {pkg.name}
                  </p>
                  <p className="text-muted-foreground text-xs mb-5 leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {t(lang, pkg.tagline.en, pkg.tagline.fr)}
                  </p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-foreground leading-none" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem" }}>
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      FCFA/{t(lang, "mo", "mois")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {t(lang, "Excl. ad budget & VAT", "Hors budget Ads & TVA")}
                  </p>
                  <Link to="/consultation"
                    className="block w-full text-center py-3 text-sm font-medium tracking-wide transition-opacity mb-6"
                    style={{ fontFamily: "'Inter', sans-serif", background: pkg.popular ? ORANGE : NAVY, color: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                    {t(lang, "Get Started", "Démarrer")}
                  </Link>
                  <ul className="space-y-2.5 flex-1">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {f.included
                          ? <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: ORANGE }} />
                          : <X size={14} className="mt-0.5 shrink-0 opacity-30 text-muted-foreground" />}
                        <span className={`text-xs leading-snug ${f.included ? "text-foreground/80" : "text-muted-foreground opacity-50"}`}
                          style={{ fontFamily: "'Inter', sans-serif" }}>
                          {t(lang, f.en, f.fr)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="border border-border p-8 lg:p-12 relative overflow-hidden" style={{ background: NAVY_DARK }}>
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: ORANGE }} />
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>ENTERPRISE</p>
                <h3 className="text-white mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
                  {t(lang, "Custom Package — Built Around You", "Formule Sur-Mesure — Pour les Grands Comptes")}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)" }}>
                  {t(lang,
                    "For businesses with complex multi-channel needs, large media budgets, or multi-market campaigns. We build a fully bespoke retainer covering TV, radio, OOH, full-service digital, complete creative production and senior strategic leadership.",
                    "Pour les entreprises avec des besoins multi-canaux complexes, de gros budgets médias ou des campagnes multi-marchés. Retainer entièrement personnalisé incluant TV, radio, affichage, digital full-service, production créative et pilotage stratégique senior."
                  )}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    { en: "Unlimited media budget management", fr: "Budget médias illimité géré" },
                    { en: "Multi-market campaigns", fr: "Campagnes multi-marchés" },
                    { en: "Dedicated senior team", fr: "Équipe senior dédiée" },
                    { en: "TV / Radio / OOH Advertising", fr: "TV / Radio / Affichage OOH" },
                    { en: "Full audiovisual production", fr: "Production audiovisuelle complète" },
                    { en: "Monthly executive reporting", fr: "Reporting exécutif mensuel" },
                    { en: "Quarterly brand strategy review", fr: "Revue stratégique trimestrielle" },
                  ].map((f) => (
                    <div key={f.en} className="flex items-center gap-2">
                      <CheckCircle size={13} style={{ color: ORANGE }} />
                      <span className="text-white/70 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>{t(lang, f.en, f.fr)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-white/50 text-sm mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{t(lang, "Starting from", "À partir de")}</p>
                <p className="text-white mb-0.5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}>750 000 FCFA</p>
                <p className="text-white/35 text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{t(lang, "up to 1,500,000+ FCFA/month", "jusqu'à 1 500 000+ FCFA/mois")}</p>
                <p className="text-white/30 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>{t(lang, "Excl. media budget & VAT", "Hors budget médias & TVA")}</p>
                <Link to="/consultation"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-medium transition-colors"
                  style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
                  {t(lang, "Discuss Your Needs", "Discuter de vos besoins")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Comparison toggle */}
          <div className="text-center mt-10">
            <button onClick={() => setShowComparison(!showComparison)}
              className="flex items-center gap-2 mx-auto text-sm"
              style={{ color: ORANGE, fontFamily: "'Inter', sans-serif" }}>
              {showComparison ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showComparison
                ? t(lang, "Hide comparison table", "Masquer le tableau comparatif")
                : t(lang, "Show full comparison table", "Afficher le tableau comparatif complet")}
            </button>
          </div>

          {showComparison && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <thead>
                  <tr style={{ background: NAVY_DARK }}>
                    <th className="text-left p-4 text-white/60 font-normal text-xs">{t(lang, "Feature", "Fonctionnalité")}</th>
                    {PACKAGES.map((p) => (
                      <th key={p.id} className="p-4 text-center font-medium text-xs"
                        style={{ color: p.popular ? ORANGE : "#fff" }}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMP_FEATURES[lang].map((feat, i) => (
                    <tr key={feat} style={{ background: i % 2 === 0 ? "var(--secondary)" : "var(--card)" }}>
                      <td className="p-4 text-foreground/80 text-xs">{feat}</td>
                      {PACKAGES.map((p) => {
                        const val = COMP_DATA[p.id][i];
                        return (
                          <td key={p.id} className="p-4 text-center text-xs text-foreground/70">
                            {typeof val === "boolean"
                              ? (val
                                ? <CheckCircle size={15} className="mx-auto" style={{ color: ORANGE }} />
                                : <X size={15} className="mx-auto text-muted-foreground opacity-30" />)
                              : val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Add-on services */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label={t(lang, "Add-On Services", "Services Additionnels")} />
            <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t(lang, "On-Demand Services", "Prestations à la Demande")}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              {t(lang,
                "In addition to your monthly plan, these services are available individually or in volume.",
                "En complément de votre package mensuel, ces prestations sont disponibles à l'unité ou en volume."
              )}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                cat: { en: "Graphic Design", fr: "Création Graphique" },
                items: [
                  { en: "Logo + brand guidelines", fr: "Logo + charte graphique", price: "From 150,000 FCFA" },
                  { en: "Flyer / Poster (1 format)", fr: "Flyer / Affiche (1 format)", price: "From 25,000 FCFA" },
                  { en: "Roll-up / Exhibition banner", fr: "Roll-up / Banner expo", price: "From 30,000 FCFA" },
                  { en: "Business cards (250 copies)", fr: "Carte de visite (250 ex.)", price: "From 35,000 FCFA" },
                ],
              },
              {
                cat: { en: "Video & Production", fr: "Vidéo & Production" },
                items: [
                  { en: "Ad spot (30 s)", fr: "Spot publicitaire (30 s)", price: "From 300,000 FCFA" },
                  { en: "Corporate video (2–3 min)", fr: "Vidéo corporate (2–3 min)", price: "From 500,000 FCFA" },
                  { en: "Motion design / animation", fr: "Motion design / animation", price: "From 150,000 FCFA" },
                  { en: "Professional photo shoot", fr: "Reportage photo professionnel", price: "From 100,000 FCFA" },
                ],
              },
              {
                cat: { en: "Digital & Web", fr: "Digital & Web" },
                items: [
                  { en: "WordPress website (5 pages)", fr: "Site WordPress (5 pages)", price: "From 300,000 FCFA" },
                  { en: "Full SEO audit", fr: "Audit SEO complet", price: "From 100,000 FCFA" },
                  { en: "Ads management (1 campaign)", fr: "Gestion Ads (1 campagne)", price: "From 75,000 FCFA/mo" },
                  { en: "Monthly newsletter (design + send)", fr: "Newsletter mensuelle (design + envoi)", price: "From 50,000 FCFA" },
                ],
              },
            ].map((block) => (
              <div key={block.cat.en} className="bg-card border border-border p-6">
                <p className="text-foreground text-sm font-medium mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t(lang, block.cat.en, block.cat.fr)}
                </p>
                <ul className="space-y-3">
                  {block.items.map((item) => (
                    <li key={item.en} className="flex justify-between gap-3 text-xs border-b border-border pb-2.5 last:border-0 last:pb-0">
                      <span className="text-foreground/80" style={{ fontFamily: "'Inter', sans-serif" }}>{t(lang, item.en, item.fr)}</span>
                      <span className="shrink-0" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-xs text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t(lang,
              "All prices are indicative and may vary by project complexity. Custom quotes available on request.",
              "Tous les tarifs sont indicatifs et peuvent varier selon la complexité du projet. Devis sur demande."
            )}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20" style={{ background: NAVY_DARK }}>
        <div className="max-w-5xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-10">
            <SectionTag label={t(lang, "Commercial Terms", "Conditions Commerciales")} />
            <h2 className="text-3xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t(lang, "How It Works", "Comment Ça Marche")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", en: { title: "Free consultation", desc: "30-minute call to understand your goals and identify the right plan." }, fr: { title: "Consultation gratuite", desc: "30 min d'échange pour comprendre vos objectifs et identifier la formule adaptée." } },
              { num: "02", en: { title: "Quote & proposal", desc: "We send you a detailed proposal with a 3-month action plan." }, fr: { title: "Devis & proposition", desc: "Nous vous soumettons une proposition commerciale détaillée avec le plan d'action sur 3 mois." } },
              { num: "03", en: { title: "Sign & onboard", desc: "Contract signed, first month paid, full creative brief within 48 hours." }, fr: { title: "Signature & onboarding", desc: "Signature du contrat, paiement du premier mois, et brief créatif complet en 48 h." } },
              { num: "04", en: { title: "Launch & manage", desc: "Live in 7 days. Regular reporting and a monthly strategy review." }, fr: { title: "Lancement & pilotage", desc: "Go live en 7 jours. Reporting régulier et réunion mensuelle pour réviser la stratégie." } },
            ].map((step) => (
              <div key={step.num} className="border p-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: `${ORANGE}50` }}>{step.num}</p>
                <p className="text-white text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{t(lang, step.en.title, step.fr.title)}</p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)" }}>{t(lang, step.en.desc, step.fr.desc)}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border border-white/10 p-6">
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: ORANGE }}>
              {t(lang, "General Terms", "Conditions Générales")}
            </p>
            <ul className="space-y-2">
              {[
                { en: "Minimum commitment: 3 months. Monthly renewal with 30 days notice.", fr: "Engagement minimal : 3 mois. Reconduction mensuelle avec préavis de 30 jours." },
                { en: "Payment: monthly advance at the start of each month by cash, Mobile Money or bank transfer.", fr: "Paiement : avance mensuelle au début de chaque mois par cash, Mobile Money ou virement bancaire." },
                { en: "Ad budgets not included in fees — billed separately based on actual spend.", fr: "Budgets publicitaires non inclus dans les honoraires — facturés séparément selon consommation réelle." },
                { en: "Prices excl. VAT — applicable VAT added per law (SLIM BIZ VAT No.: M032517649967A).", fr: "Tarifs HT — TVA en sus selon dispositions légales en vigueur (N° TVA SLIM BIZ : M032517649967A)." },
                { en: "All content created remains SLIM BIZ property until fees are paid in full.", fr: "Tous les contenus créés restent propriété de SLIM BIZ jusqu'au solde complet des honoraires." },
              ].map((cond) => (
                <li key={cond.en} className="flex items-start gap-3 text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)" }}>
                  <span style={{ color: ORANGE, flexShrink: 0 }}>—</span>
                  {t(lang, cond.en, cond.fr)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-12">
            <SectionTag label={t(lang, "Pricing FAQ", "Questions sur les tarifs")} />
            <h2 className="text-3xl text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t(lang, "Common Questions", "Questions Fréquentes")}
            </h2>
          </div>
          <div className="space-y-2">
            {PRICING_FAQS.map((item, i) => (
              <div key={i} className="bg-card border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${ORANGE}08`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <span className="text-foreground text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {t(lang, item.en.q, item.fr.q)}
                  </span>
                  <span style={{ color: ORANGE, flexShrink: 0 }}>
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 border-t border-border">
                    <p className="text-muted-foreground text-sm leading-relaxed pt-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {t(lang, item.en.a, item.fr.a)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <h2 className="text-3xl text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t(lang, "Not sure which plan to choose? Let's talk.", "Pas sûr de quelle formule choisir ? Parlons-en.")}
          </h2>
          <p className="text-white/70 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            {t(lang,
              "Book a free 30-minute consultation. We will honestly advise which plan fits your needs — or build you a custom quote.",
              "Réservez une consultation gratuite de 30 minutes. Nous vous conseillons honnêtement sur la formule adaptée — ou sur un devis sur mesure."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/consultation"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white text-sm tracking-wide transition-colors"
              style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = ORANGE_HVR)}
              onMouseLeave={(e) => (e.currentTarget.style.background = ORANGE)}>
              {t(lang, "Free Consultation", "Consultation Gratuite")} <ArrowRight size={16} />
            </Link>
            <a href="tel:+237657202002"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/40 text-white text-sm tracking-wide hover:border-white transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              <Phone size={16} /> +237 657 202 002
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
