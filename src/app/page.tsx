import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blogs")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .home-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
        }

        /* ── Hero ── */
        .hero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 2rem 3rem;
        }

        .hero-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d4af64;
          font-weight: 500;
          margin-bottom: 1rem;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 700;
          line-height: 1.0;
          margin: 0 0 1.5rem;
          animation: fadeUp 0.7s 0.1s ease both;
        }

        .hero-title em {
          font-style: italic;
          font-weight: 400;
        }

        .hero-sub {
          font-size: 1rem;
          color: #7a6e5e;
          font-weight: 300;
          max-width: 40ch;
          line-height: 1.7;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        .hero-divider {
          width: 60px;
          height: 2px;
          background: #d4af64;
          margin: 2.5rem 0;
          animation: expandWidth 0.8s 0.3s ease both;
        }

        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to   { width: 60px; opacity: 1; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Section header ── */
        .section-header {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem 2rem;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        .section-title {
          font-family: 'Cormorant Garant', serif;
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .section-link {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4af64;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }

        .section-link:hover { opacity: 0.7; }

        /* ── Blog grid ── */
        .blog-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem 6rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr; }
          .hero { padding: 3rem 1.5rem 2rem; }
          .section-header { padding: 0 1.5rem 1.5rem; }
          .blog-grid { padding: 0 1.5rem 4rem; }
        }

        /* ── Blog card ── */
        .blog-card {
          display: block;
          text-decoration: none;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 3/4;
          background: #1a1a1a;
          animation: fadeUp 0.7s ease both;
        }

        .blog-card:nth-child(1) { animation-delay: 0.35s; }
        .blog-card:nth-child(2) { animation-delay: 0.45s; }
        .blog-card:nth-child(3) { animation-delay: 0.55s; }

        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .blog-card:hover .blog-card-img {
          transform: scale(1.05);
        }

        /* Fallback when no image */
        .blog-card-no-img {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garant', serif;
          font-size: 4rem;
          color: rgba(212,175,100,0.2);
          font-weight: 700;
          font-style: italic;
        }

        /* Gradient overlay */
        .blog-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.92) 0%,
            rgba(0,0,0,0.5) 40%,
            rgba(0,0,0,0.1) 70%,
            transparent 100%
          );
          transition: opacity 0.3s ease;
        }

        .blog-card:hover .blog-card-overlay {
          opacity: 0.85;
        }

        /* Card content */
        .blog-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
        }

        .blog-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.75rem;
        }

        .blog-card-tag {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4af64;
          font-weight: 500;
          background: rgba(212,175,100,0.15);
          border: 1px solid rgba(212,175,100,0.3);
          padding: 0.2rem 0.5rem;
          border-radius: 2px;
        }

        .blog-card-title {
          font-family: 'Cormorant Garant', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #f5f0e8;
          line-height: 1.2;
          margin: 0 0 0.5rem;
        }

        .blog-card-date {
          font-size: 0.7rem;
          color: rgba(245,240,232,0.45);
          letter-spacing: 0.1em;
          font-weight: 300;
        }

        /* Arrow indicator */
        .blog-card-arrow {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border: 1px solid rgba(212,175,100,0.4);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4af64;
          font-size: 0.85rem;
          opacity: 0;
          transform: translateY(4px);
          transition: all 0.3s ease;
        }

        .blog-card:hover .blog-card-arrow {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Empty state ── */
        .empty-state {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 2rem 6rem;
          font-family: 'Cormorant Garant', serif;
          font-size: 1.2rem;
          font-style: italic;
          color: #7a6e5e;
        }
      `}</style>

      <div className="home-root">
        {/* Hero */}
        <section className="hero">
          <p className="hero-eyebrow">Portfolio & Blog</p>
          <h1 className="hero-title">
            Hey, I&apos;m <em>Euger</em>
          </h1>
          <p className="hero-sub">
            Developer and writer. I build things for the web and occasionally
            write about it.
          </p>
          <div className="hero-divider" />
        </section>

        {posts && posts.length > 0 ? (
          <>
            <div className="section-header">
              <h2 className="section-title">Latest Posts</h2>
              <Link href="/blog" className="section-link">
                View all →
              </Link>
            </div>

            <div className="blog-grid">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                >
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="blog-card-img"
                    />
                  ) : (
                    <div className="blog-card-no-img">
                      {post.title.charAt(0)}
                    </div>
                  )}

                  <div className="blog-card-overlay" />

                  <div className="blog-card-arrow">↗</div>

                  <div className="blog-card-content">
                    {post.tags?.length > 0 && (
                      <div className="blog-card-tags">
                        {post.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="blog-card-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-date">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">No posts yet — check back soon.</div>
        )}
      </div>
    </>
  );
}
