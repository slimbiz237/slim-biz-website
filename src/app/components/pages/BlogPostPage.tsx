import { Fragment, type ReactNode, useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { NAVY, ORANGE, NAVY_DARK } from "../shared"

type BlogPost = {
  title: string
  date: string
  category: string
  tag: string
  readTime: string
  excerpt: string
  body: string
  author: string
  img?: string
}

function imgUrl(img?: string): string | undefined {
  if (!img) return undefined
  if (img.startsWith("http")) return img
  return `https://images.unsplash.com/${img}?w=700&h=450&fit=crop&auto=format`
}

const REPO = "slimbiz237/slim-biz-website"
const BRANCH = "main"
const FOLDER = "content/blog"
const SITE_URL = "https://slimbizmarketingagency.com"
const SITE_NAME = "SLIM BIZ Marketing Agency"

function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }

      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        const [, label, href] = link
        return href.startsWith("/") ? (
          <Link
            key={index}
            to={href}
            className="underline"
            style={{ color: ORANGE }}
          >
            {label}
          </Link>
        ) : (
          <a
            key={index}
            href={href}
            className="underline"
            style={{ color: ORANGE }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      }

      return <Fragment key={index}>{part}</Fragment>
    })
}

function renderArticleBody(body: string, excerpt: string): ReactNode[] {
  const lines = body.replace(/\r/g, "").split("\n")
  const nodes: ReactNode[] = []
  let index = 0
  let key = 0

  while (index < lines.length) {
    const line = lines[index].trim()
    if (!line) {
      index += 1
      continue
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/)
    if (heading) {
      const Tag = heading[1].length === 2 ? "h2" : "h3"
      nodes.push(
        <Tag
          key={key++}
          className="text-foreground mt-10 mb-4 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: Tag === "h2" ? "1.75rem" : "1.35rem",
          }}
        >
          {renderInline(heading[2])}
        </Tag>,
      )
      index += 1
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2))
        index += 1
      }
      nodes.push(
        <ul
          key={key++}
          className="list-disc pl-6 mb-6 space-y-2 text-foreground"
        >
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>,
      )
      continue
    }

    const paragraph: string[] = []
    while (index < lines.length) {
      const current = lines[index].trim()
      if (!current || /^(#{2,3})\s+/.test(current) || current.startsWith("- "))
        break
      paragraph.push(current)
      index += 1
    }
    const text = paragraph.join(" ")
    if (text && text !== excerpt) {
      nodes.push(
        <p
          key={key++}
          className="text-foreground leading-relaxed mb-6"
          style={{ fontSize: "1.05rem" }}
        >
          {renderInline(text)}
        </p>,
      )
    }
  }

  return nodes
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }
  element.setAttribute("data-article-seo", "true")
  Object.entries(attributes).forEach(([name, value]) =>
    element!.setAttribute(name, value),
  )
}

function useArticleSeo(post: BlogPost | null, slug?: string) {
  useEffect(() => {
    if (!post || !slug) return

    const previousTitle = document.title
    const canonicalUrl = `${SITE_URL}/blog/${encodeURIComponent(slug)}`
    const image = imgUrl(post.img)
    const parsedDate = new Date(post.date)
    const publishedTime = Number.isNaN(parsedDate.getTime())
      ? post.date
      : parsedDate.toISOString()

    document.title = `${post.title} | SLIM BIZ`
    document.documentElement.lang = /[àâçéèêëîïôùûüÿœ]/i.test(
      `${post.title} ${post.excerpt}`,
    )
      ? "fr"
      : "en"

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: post.excerpt,
    })
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "article",
    })
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: post.title,
    })
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: post.excerpt,
    })
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    })
    upsertMeta('meta[property="article:published_time"]', {
      property: "article:published_time",
      content: publishedTime,
    })
    upsertMeta('meta[property="article:author"]', {
      property: "article:author",
      content: post.author,
    })
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: post.title,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: post.excerpt,
    })
    if (image) {
      upsertMeta('meta[property="og:image"]', {
        property: "og:image",
        content: image,
      })
      upsertMeta('meta[name="twitter:image"]', {
        name: "twitter:image",
        content: image,
      })
    }

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.setAttribute("data-article-seo", "true")
    canonical.href = canonicalUrl

    const structuredData = document.createElement("script")
    structuredData.type = "application/ld+json"
    structuredData.setAttribute("data-article-seo", "true")
    structuredData.text = JSON.stringify({
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
    })
    document.head.appendChild(structuredData)

    return () => {
      document.title = previousTitle
      document.head
        .querySelectorAll("[data-article-seo]")
        .forEach((element) => element.remove())
    }
  }, [post, slug])
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  useArticleSeo(post, slug)

  useEffect(() => {
    if (!slug) return
    fetch(
      `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FOLDER}/${slug}.json?t=${Date.now()}`,
    )
      .then((r) => {
        if (!r.ok) throw new Error("not found")
        return r.json()
      })
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div
        className="py-40 text-center text-muted-foreground"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Loading article...
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div
        className="py-40 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-muted-foreground mb-6">Article not found.</p>
        <Link
          to="/blog"
          className="text-sm underline"
          style={{ color: ORANGE }}
        >
          ← Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-0" style={{ background: NAVY_DARK }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div
            className="inline-block text-white text-xs px-3 py-1 mb-4"
            style={{ background: ORANGE, fontFamily: "'Inter', sans-serif" }}
          >
            {post.tag}
          </div>
          <h1
            className="text-3xl lg:text-5xl text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {post.title}
          </h1>
          <div
            className="flex items-center gap-6 text-white/60 text-sm pb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readTime}
            </span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.img && (
        <div className="max-w-4xl mx-auto px-5 lg:px-10 -mt-0">
          <div className="h-72 lg:h-96 overflow-hidden">
            <img
              src={imgUrl(post.img)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <article className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-5 lg:px-10">
          <p
            className="text-muted-foreground text-lg leading-relaxed mb-8 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {post.excerpt}
          </p>
          <div className="border-t border-border mb-8" />
          <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {renderArticleBody(post.body || post.excerpt, post.excerpt)}
          </div>
          <div className="border-t border-border mt-12 pt-8 flex items-center justify-between">
            <span
              className="text-muted-foreground text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Written by{" "}
              <strong style={{ color: "var(--foreground)" }}>
                {post.author}
              </strong>
            </span>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium transition-colors"
              style={{ background: NAVY, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1A2B8A")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
            >
              <ArrowLeft size={14} /> All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
