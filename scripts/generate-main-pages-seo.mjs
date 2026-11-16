import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const DIST = path.join(ROOT, "dist")
const PAGES = path.join(ROOT, "src", "app", "components", "pages")
const SITE = "https://slimbizmarketingagency.com"

const ROUTES = {
  "/about": "AboutPage.tsx",
  "/services": "ServicesPage.tsx",
  "/portfolio": "PortfolioPage.tsx",
  "/pricing": "PricingPage.tsx",
  "/testimonials": "TestimonialsPage.tsx",
  "/blog": "BlogPage.tsx",
  "/contact": "ContactPage.tsx",
  "/faq": "FAQPage.tsx",
  "/careers": "CareersPage.tsx",
  "/consultation": "ConsultationPage.tsx",
  "/training": "TrainingPage.tsx",
}

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

function readLiteral(source, key) {
  const str = '"((?:[^"\\\\]|\\\\.)*)"'
  const patterns = [
    new RegExp(key + "\\s*=\\s*" + str),
    new RegExp(key + "\\s*=\\s*t\\(\\s*lang\\s*,\\s*" + str),
  ]
  for (const pattern of patterns) {
    const match = source.match(pattern)
    if (match) {
      try {
        return JSON.parse('"' + match[1] + '"')
      } catch {
        return match[1]
      }
    }
  }
  return null
}

function upsert(html, pattern, tag) {
  return pattern.test(html)
    ? html.replace(pattern, () => tag)
    : html.replace("</head>", () => "  " + tag + "\n</head>")
}

function buildPage(template, route, title, description) {
  const url = SITE + route + "/"
  const t = esc(title)
  const d = esc(description)
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, () => "<title>" + t + "</title>")
  html = upsert(html, /<meta\s+name="description"[^>]*>/i, '<meta name="description" content="' + d + '" />')
  html = upsert(html, /<meta\s+property="og:title"[^>]*>/i, '<meta property="og:title" content="' + t + '" />')
  html = upsert(html, /<meta\s+property="og:description"[^>]*>/i, '<meta property="og:description" content="' + d + '" />')
  html = upsert(html, /<meta\s+property="og:url"[^>]*>/i, '<meta property="og:url" content="' + url + '" />')
  html = upsert(html, /<meta\s+name="twitter:title"[^>]*>/i, '<meta name="twitter:title" content="' + t + '" />')
  html = upsert(html, /<meta\s+name="twitter:description"[^>]*>/i, '<meta name="twitter:description" content="' + d + '" />')
  return html.replace("</head>", () => '  <link rel="canonical" href="' + url + '" />\n</head>')
}

async function main() {
  const indexPath = path.join(DIST, "index.html")
  const template = await readFile(indexPath, "utf8")
  let built = 0
  for (const [route, file] of Object.entries(ROUTES)) {
    try {
      const source = await readFile(path.join(PAGES, file), "utf8")
      const title = readLiteral(source, "document\\.title")
      const description = readLiteral(source, "meta\\.content")
      if (!title || !description) {
        console.warn("Main page skipped (title or description not found): " + route)
        continue
      }
      const dir = path.join(DIST, route.slice(1))
      await mkdir(dir, { recursive: true })
      await writeFile(path.join(dir, "index.html"), buildPage(template, route, title, description))
      built++
    } catch (error) {
      console.warn("Main page skipped (" + route + "): " + error.message)
    }
  }

  if (!/rel="canonical"/i.test(template)) {
    await writeFile(
      indexPath,
      template.replace("</head>", () => '  <link rel="canonical" href="' + SITE + '/" />\n</head>'),
    )
  }

  const sitemapPath = path.join(DIST, "sitemap.xml")
  let sitemap = await readFile(sitemapPath, "utf8")
  for (const route of Object.keys(ROUTES)) {
    sitemap = sitemap.split("<loc>" + SITE + route + "</loc>").join("<loc>" + SITE + route + "/</loc>")
  }
  await writeFile(sitemapPath, sitemap)
  console.log("Generated " + built + " crawlable main pages and updated the sitemap.")
}

main().catch((error) => {
  console.warn("Main page SEO step skipped: " + error.message)
})