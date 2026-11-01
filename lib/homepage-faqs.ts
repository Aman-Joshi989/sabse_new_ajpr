export interface HomepageFaq {
  question: string;
  answer: string;
}

export const HOMEPAGE_FAQS: HomepageFaq[] = [
  {
    question: "How fast can you start and ship our software?",
    answer: "We initiate scoping within 24 to 48 hours of your architecture call. Standard web applications and AI MVPs are engineered and deployed to production in 2 to 4 weeks using structured weekly sprint milestones."
  },
  {
    question: "Who actually writes the code? Do you outsource to junior devs?",
    answer: "Zero outsourcing to junior contractors. All systems architecture, frontend Next.js code, database schemas, and AI agent pipelines are directly built by senior practitioners with full architectural accountability and weekly staging previews."
  },
  {
    question: "Do I own 100% of the code and intellectual property?",
    answer: "Yes, 100%. Upon completion and delivery, all GitHub repositories, source code, database schemas, API keys, and deployment credentials are fully transferred to your company. Zero vendor lock-in or recurring IP licensing."
  },
  {
    question: "How do your costs compare to hiring full-time US engineers or traditional agencies?",
    answer: "Hiring a senior US engineer costs $160k–$220k/yr salary plus $40k+ in benefits, equity, and recruitment fees, taking 3–6 months to hire. Traditional agencies charge $15k–$30k/month in account-management overhead. AJPR World delivers senior engineering at 70% lower overall cost with zero long-term commitments."
  },
  {
    question: "What happens after launch? Do you provide maintenance and ongoing support?",
    answer: "Every build comes with a guaranteed 30-day post-launch warranty covering bug fixes and performance tuning. Afterward, you can transition into our Dedicated Engineering Pod for ongoing feature velocity or pause anytime with zero penalties."
  }
];

