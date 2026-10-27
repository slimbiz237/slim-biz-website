import { mkdir, readFile, readdir, writeFile } from "node:fs/promises"
import path from "node:path"

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, "content", "blog")
const DIST_DIR = path.join(ROOT, "dist")
const SITE_URL = "https://slimbizmarketingagency.com"
const SITE_NAME = "SLIM BIZ Marketing Agency"

const basePages = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/services", "monthly", "0.9"],
  ["/portfolio", "monthly", "0.8"],
  ["/pricing", "monthly", "0.8"],
  ["/testimonials", "monthly", "0.7"],
  ["/blog", "weekly", "0.9"],
  ["/contact", "yearly", "0.7"],
  ["/faq", "monthly", "0.6"],
  ["/careers", "monthly", "0.6"],
  ["/consultation", "monthly", "0.8"],
  ["/training", "monthly", "0.7"],
]

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function escapeXml(value = "") {
  return escapeHtml(value)
}

function inlineMarkdown(value) {
  return String(value)
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return `<strong>${escapeHtml(part.slice(2, -2))}</strong>`
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        const href = link[2].startsWith("/") ? `${SITE_URL}${link[2]}` : link[2]
        return `<a href="${escapeHtml(href)}">${escapeHtml(link[1])}</a>`
      }
      return escapeHtml(part)
    })
    .join("")
}

function markdownToHtml(markdown, excerpt) {
  const lines = String(markdown || "")
    .replace(/\r/g, "")
    .split("\n")
  const output = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()
    if (!line) {
      index += 1
      continue
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`)
      index += 1
      continue
    }

    if (line.startsWith("- ")) {
      const items = []
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(`<li>${inlineMarkdown(lines[index].trim().slice(2))}</li>`)
        index += 1
      }
      output.push(`<ul>${items.join("")}</ul>`)
      continue
    }

    const paragraph = []
    while (index < lines.length) {
      const current = lines[index].trim()
      if (!current || /^(#{2,3})\s+/.test(current) || current.startsWith("- "))
        break
      paragraph.push(current)
      index += 1
    }
    const text = paragraph.join(" ")
    if (text && text !== excerpt) output.push(`<p>${inlineMarkdown(text)}</p>`)
  }

  return output.join("\n")
}

function isoDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

function dateOnly(value) {
  return isoDate(value)?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)
}

function replaceMeta(html, attribute, name, content) {
  const escaped = escapeHtml(content)
  const pattern = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${name}["'][^>]*>`,
    "i",
  )
  const tag = `<meta ${attribute}="${name}" content="${escaped}">`
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace("</head>", `  ${tag}\n</head>`)
}

function setTitle(html, title) {
  const tag = `<title>${escapeHtml(title)}</title>`
  return /<title>.*?<\/title>/is.test(html)
    ? html.replace(/<title>.*?<\/title>/is, tag)
    : html.replace("</head>", `  ${tag}\n</head>`)
}

function articlePage(template, post, slug) {
  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const image = post.img || undefined
  const publishedTime = isoDate(post.date) ?? post.date
  const language = /[àâçéèêëîïôùûüÿœ]/i.test(`${post.title} ${post.excerpt}`)
    ? "fr"
    : "en"
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: post.category,
    keywords: post.tag,
  }

  const staticArticle = `
    <main data-seo-prerendered="true">
      <article>
        <header>
          <p>${escapeHtml(post.tag)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p><time datetime="${escapeHtml(publishedTime)}">${escapeHtml(post.date)}</time> · ${escapeHtml(post.readTime)} · ${escapeHtml(post.author)}</p>
        </header>
        ${
          image
            ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(post.title)}">`
            : ""
        }
        <p>${escapeHtml(post.excerpt)}</p>
        ${markdownToHtml(post.body, post.excerpt)}
      </article>
    </main>`

  let html = template.replace(/<html(\s[^>]*)?>/i, `<html lang="${language}">`)
  html = setTitle(html, `${post.title} | SLIM BIZ`)
  html = replaceMeta(html, "name", "description", post.excerpt)
  html = replaceMeta(
    html,
    "name",
    "robots",
    "index, follow, max-image-preview:large",
  )
  html = replaceMeta(html, "property", "og:type", "article")
  html = replaceMeta(html, "property", "og:title", post.title)
  html = replaceMeta(html, "property", "og:description", post.excerpt)
  html = replaceMeta(html, "property", "og:url", canonicalUrl)
  html = replaceMeta(html, "property", "article:published_time", publishedTime)
  html = replaceMeta(html, "property", "article:author", post.author)
  html = replaceMeta(html, "name", "twitter:card", "summary_large_image")
  html = replaceMeta(html, "name", "twitter:title", post.title)
  html = replaceMeta(html, "name", "twitter:description", post.excerpt)
  if (image) {
    html = replaceMeta(html, "property", "og:image", image)
    html = replaceMeta(html, "name", "twitter:image", image)
  }
  html = html.replace(
    "</head>",
    `  <link rel="canonical" href="${canonicalUrl}">\n  <script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>\n</head>`,
  )
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${staticArticle}</div>`,
  )
  return html
}

const files = (await readdir(BLOG_DIR))
  .filter((file) => file.endsWith(".json"))
  .sort()
const posts = await Promise.all(
  files.map(async (file) => {
    const contents = await readFile(path.join(BLOG_DIR, file), "utf8")
    return {
      slug: file.slice(0, -5),
      post: JSON.parse(contents.replace(/^\uFEFF/, "")),
    }
  }),
)

const template = await readFile(path.join(DIST_DIR, "index.html"), "utf8")
for (const { slug, post } of posts) {
  const outputDir = path.join(DIST_DIR, "blog", slug)
  await mkdir(outputDir, { recursive: true })
  await writeFile(
    path.join(outputDir, "index.html"),
    articlePage(template, post, slug),
  )
}

const today = new Date().toISOString().slice(0, 10)
const urls = [
  ...basePages.map(([route, frequency, priority]) => ({
    loc: `${SITE_URL}${route}`,
    lastmod: today,
    frequency,
    priority,
  })),
  ...posts.map(({ slug, post }) => ({
    loc: `${SITE_URL}/blog/${slug}`,
    lastmod: dateOnly(post.date),
    frequency: "monthly",
    priority: "0.8",
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, frequency, priority }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`

await writeFile(path.join(DIST_DIR, "sitemap.xml"), sitemap)
console.log(
  `Generated ${posts.length} crawlable blog pages and ${urls.length} sitemap URLs.`,
)
