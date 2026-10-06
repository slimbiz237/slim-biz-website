// MARKER-MAKE-KIT-INVOKED
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

// Run immediately at module load — before React mounts — so Google's crawler
// sees the correct tag even during its first-pass HTML + JS render.
(function stripNoindex() {
  document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]').forEach((el) => {
    const content = (el as HTMLMetaElement).content?.toLowerCase() || "";
    if (content.includes("noindex")) el.remove();
  });
  if (!document.querySelector('meta[name="robots"][data-seo]')) {
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "index, follow";
    robots.setAttribute("data-seo", "true");
    document.head.prepend(robots);
    const googlebot = document.createElement("meta");
    googlebot.name = "googlebot";
    googlebot.content = "index, follow";
    googlebot.setAttribute("data-seo", "true");
    document.head.prepend(googlebot);
  }
})();

function useGoogleAnalytics(measurementId: string) {
  useEffect(() => {
    if (document.getElementById("gtag-script")) return;

    const script = document.createElement("script");
    script.id = "gtag-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.id = "gtag-inline";
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(inline);
  }, []);
}

function removeSkipLink() {
  document.querySelectorAll("a, [role='link']").forEach((el) => {
    if (el.textContent?.trim().toLowerCase().includes("skip")) {
      (el as HTMLElement).style.display = "none";
      el.remove();
    }
  });
}

function useRemoveSkipLink() {
  useEffect(() => {
    removeSkipLink();
    const observer = new MutationObserver(() => removeSkipLink());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
}

function fixRobotsIndexing() {
  document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]').forEach((el) => {
    const content = (el as HTMLMetaElement).content?.toLowerCase() || "";
    if (content.includes("noindex")) el.remove();
  });
  if (!document.querySelector('meta[name="robots"][data-custom]')) {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "index, follow";
    meta.setAttribute("data-custom", "true");
    document.head.appendChild(meta);
  }
}

function useFixRobotsIndexing() {
  useEffect(() => {
    fixRobotsIndexing();
    const observer = new MutationObserver(() => fixRobotsIndexing());
    observer.observe(document.head, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useGoogleAnalytics("G-EYH5F9HSV3");
  useRemoveSkipLink();
  useFixRobotsIndexing();
  return <RouterProvider router={router} />;
}