import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "fr";

const LanguageContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const apply = () => {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = lang === "fr" ? "fr" : "";
        select.dispatchEvent(new Event("change"));
        return true;
      }
      return false;
    };

    if (!apply()) {
      const timer = setInterval(() => { if (apply()) clearInterval(timer); }, 200);
      setTimeout(() => clearInterval(timer), 5000);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function t(lang: Lang, en: string, fr: string): string {
  return lang === "fr" ? fr : en;
}
