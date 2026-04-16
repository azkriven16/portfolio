import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-4">
      <h2 className="mb-6">Experience</h2>

      <div className="space-y-9">
        {experience.map((role) => (
          <div key={`${role.company}-${role.start}`}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-0.5">
              <span style={{ color: "var(--c-text)", fontSize: "0.95rem", fontWeight: 500 }}>
                {role.title}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--c-text-4)" }}>
                {role.start} — {role.end}
              </span>
            </div>

            <p className="mb-3" style={{ color: "var(--c-text-4)", fontSize: "0.88rem" }}>
              {role.company}
              <span className="mx-1.5" style={{ color: "var(--c-border)" }}>·</span>
              {role.location}
            </p>

            <ul className="space-y-2">
              {role.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2.5" style={{ color: "var(--c-text-3)", fontSize: "0.9rem", lineHeight: "1.75" }}>
                  <span className="shrink-0 mt-0.5" style={{ color: "var(--c-text-4)" }}>–</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
