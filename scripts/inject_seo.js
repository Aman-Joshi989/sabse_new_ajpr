const fs = require("fs");
const path = require("path");

const seoData = {
    "app/blog/page.tsx": {
        title: "AJPR World Blog | Insights on AI, SEO & Software Engineering",
        description: "Read expert strategies and insights on custom software development, AI automation, generative engine optimization (GEO), and scaling your digital growth.",
        url: "https://ajprworld.com/blog"
    },
    "app/services/page.tsx": {
        title: "Premium Technology Services | Software, AI & DevOps | AJPR World",
        description: "We engineer growth. Explore our premium services including custom web development, SaaS product engineering, AI voice agents, and technical SEO.",
        url: "https://ajprworld.com/services"
    },
    "app/contact/page.tsx": {
        title: "Contact AJPR World | Book a Strategy Session with Our Experts",
        description: "Ready to scale? Contact our engineering and legal teams to discuss custom software development, AI swarm orchestration, and compliance consulting.",
        url: "https://ajprworld.com/contact"
    },
    "app/privacy/page.tsx": {
        title: "Privacy Policy | AJPR World",
        description: "Review the AJPR World Privacy Policy to understand how we collect, use, and protect your data while delivering premium software and AI solutions.",
        url: "https://ajprworld.com/privacy"
    },
    "app/terms/page.tsx": {
        title: "Terms of Service | AJPR World",
        description: "Read the Terms of Service for AJPR World. Review our guidelines for services, intellectual property, acceptable use, and secure digital partnerships.",
        url: "https://ajprworld.com/terms"
    },
    "app/startup-growth-kit/page.tsx": {
        title: "LaunchPad Pro: All-In-One Startup Growth Kit | AJPR World",
        description: "Accelerate your launch with the LaunchPad Pro Startup Growth Kit. Get the essential digital infrastructure, software, and tools to scale your business instantly.",
        url: "https://ajprworld.com/startup-growth-kit"
    },
    "app/aman-joshi/page.tsx": {
        title: "Aman Joshi | Founder & Systems Architect at AJPR World",
        description: "Meet Aman Joshi, Founder of AJPR World. Partnering with high-growth startups to build robust digital infrastructures, automate workflows, and integrate AI.",
        url: "https://ajprworld.com/aman-joshi"
    },
    "app/careers/page.tsx": {
        title: "Careers at AJPR World | Build Autonomous AI & Software Systems",
        description: "Join AJPR World's elite team of systems engineers, AI automation specialists, and legal professionals. Discover our active openings and build the future.",
        url: "https://ajprworld.com/careers"
    },
    "app/demo-ruflo/page.tsx": {
        title: "RuFlo V3 Swarm Simulator | Interactive AI Agent Demo | AJPR World",
        description: "Experience the future of automation. Watch the RuFlo V3 multi-agent swarm achieve consensus, write code, and perform security audits in real-time.",
        url: "https://ajprworld.com/demo-ruflo"
    },
    "app/book-call/page.tsx": {
        title: "Book a 30-Minute Strategy Session | AJPR World",
        description: "Schedule a 30-minute discovery call to discuss your business goals, software needs, and AI automation requirements with the AJPR World team.",
        url: "https://ajprworld.com/book-call"
    }
};

const metadataTemplate = (data) => `
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: \`${data.title}\`,
  description: \`${data.description.replace(/`/g, '\\`')}\`,
  alternates: {
    canonical: '${data.url}',
  },
  openGraph: {
    title: \`${data.title}\`,
    description: \`${data.description.replace(/`/g, '\\`')}\`,
    url: '${data.url}',
    type: 'website',
    images: ['https://ajprworld.com/og-image.jpg']
  }
};
`;

Object.entries(seoData).forEach(([file, data]) => {
    const filePath = path.join(__dirname, "..", file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, "utf8");

        if (!content.includes("export const metadata") && !content.includes("export async function generateMetadata")) {
            const lines = content.split("\\n");
            let lastImportIdx = -1;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim().startsWith("import ")) {
                    lastImportIdx = i;
                }
            }

            const metaCode = metadataTemplate(data);

            if (content.includes("import { Metadata } from 'next'")) {
                content = content.replace("import { Metadata } from 'next'", "");
            }
            if (content.includes("import type { Metadata } from 'next'")) {
                content = content.replace("import type { Metadata } from 'next'", "");
            }
            if (content.includes("import { type Metadata } from 'next'")) {
                content = content.replace("import { type Metadata } from 'next'", "");
            }

            const cleanLines = content.split("\\n");
            lastImportIdx = -1;
            for (let i = 0; i < cleanLines.length; i++) {
                if (cleanLines[i].trim().startsWith("import ")) {
                    lastImportIdx = i;
                }
            }

            cleanLines.splice(lastImportIdx + 1, 0, metaCode);
            fs.writeFileSync(filePath, cleanLines.join("\\n"));
        } else {
            console.log(\`⚠️ Skipped \${file} (metadata already exists)\`);
        }
    } else {
        console.log(\`❌ File not found: \${file}\`);
    }
})
