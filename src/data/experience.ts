export interface Experience {
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    title: "Freelance Web Developer",
    company: "Independent",
    location: "Remote",
    start: "2023",
    end: "Present",
    bullets: [
      "Built and delivered production sites for clients across different industries.",
      "Developed Viafide (viafide.com) — a professional verification platform.",
      "Built Global Talent Portal (globaltalentportal.com) — a talent marketplace connecting employers and candidates.",
      "Developed Ciptax Pro (ciptaxpro.com) — a tax and accounting services site.",
    ],
  },
  {
    title: "Part-time Software Developer",
    company: "Rocketshyft",
    location: "Remote",
    start: "2024",
    end: "2025",
    bullets: [
      "Focused on TypeScript-based frontend development and UI enhancements.",
      "Collaborated with the team to ship polished, performant user interfaces.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company: "Digipay",
    location: "Remote",
    start: "2022",
    end: "2022",
    bullets: [
      "Built React features while collaborating in an Agile team.",
      "Handled task management and sprint planning through Jira.",
    ],
  },
];
