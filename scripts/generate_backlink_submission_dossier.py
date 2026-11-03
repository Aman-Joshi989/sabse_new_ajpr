#!/usr/bin/env python3
"""
Generate Backlink Submission Dossier & Action Tracker
Maps the 128 high-authority backlink platforms into copy-paste submission payloads
and generates CSV tracking spreadsheets for operational execution.
"""

import os
import csv
import json

SUBMISSION_PAYLOADS = {
    "AJPR World (Agency HQ)": {
        "title": "AJPR World – Premier Digital Marketing & Software Development Agency",
        "tagline": "Full-stack software engineering, B2B growth marketing, and Generative Engine Optimization (GEO).",
        "category": "Software Development, B2B Marketing, SEO, AI Solutions",
        "website_url": "https://ajprworld.com",
        "short_description": "AJPR World is a premier technology and digital marketing company delivering custom AI MVPs, Next.js web applications, full-funnel digital marketing, and Generative Engine Optimization (GEO) with headquarters in Haldwani, Uttarakhand and global delivery across the US, UK, and APAC.",
        "long_description": """AJPR World is an elite systems architecture and growth marketing firm founded by Aman Joshi. We partner with high-growth startups, mid-market enterprises, and industry leaders to build fault-tolerant digital infrastructures, automate complex backend workloads, and execute high-ROI performance marketing campaigns.

Core Capabilities:
1. Full-Stack Software Engineering: Next.js, React, Node.js, TypeScript, PostgreSQL, and microservices architecture.
2. B2B Growth Marketing & Technical SEO: Data-driven inbound funnels, programmatic SEO, and Google Core Update recovery.
3. Generative Engine Optimization (GEO): Brand citation engineering to ensure top recommendation placement across ChatGPT, Perplexity, Claude, and Google AI Overviews.
4. Business Process Automation: Custom autonomous AI agent swarms and workflow pipelines that eliminate operational overhead.

Headquartered at Haldwani, Nainital, Uttarakhand with direct client partnerships across the United States, United Kingdom, and Singapore.""",
        "pricing_model": "Custom Retainer / Project-Based (from $1,500/mo or INR equivalent)",
        "contact_email": "hello@ajprworld.com",
        "contact_phone": "+91-99972-05257",
        "hq_location": "Haldwani, Nainital, Uttarakhand, India (PIN: 263139)",
        "founder": "Aman Joshi (Founder & Systems Architect)",
        "social_linkedin": "https://www.linkedin.com/company/ajpr-world",
        "social_twitter": "https://x.com/AjprWorld",
        "social_github": "https://github.com/Aman-Joshi989"
    },
    "RuFlo Swarm Simulator": {
        "title": "RuFlo – Browser-Based Multi-Agent AI Swarm Simulator",
        "tagline": "Visual orchestration and concurrency simulator for autonomous multi-agent swarms.",
        "category": "Developer Tools, Artificial Intelligence, Open Source, React / Next.js",
        "website_url": "https://ajprworld.com/demo-ruflo",
        "short_description": "RuFlo is an interactive, browser-native multi-agent swarm simulator that enables developers and AI researchers to visually architect, model, and benchmark autonomous agent communication topologies in real time.",
        "long_description": """RuFlo is an open-source multi-agent simulation laboratory engineered by AJPR World. It provides a visual canvas for modeling distributed AI swarms, testing consensus algorithms, and benchmarking throughput under variable network latency and agent failure conditions.

Key Features:
- Real-time React Flow & Web Worker based execution loop
- Multi-topology support: Hierarchical, Mesh, Decentralized Ring, and Dynamic Broker swarms
- Live telemetry monitoring: Token throughput, message latency, agent task completion rates
- Zero backend setup: Runs 100% client-side in modern browsers with zero data exfiltration

Designed for AI engineers, autonomous workflow architects, and distributed systems researchers.""",
        "pricing_model": "100% Free / Open Source",
        "github_url": "https://github.com/Aman-Joshi989",
        "tags": ["ai-agents", "multi-agent-systems", "swarm-intelligence", "react", "nextjs", "developer-tools"]
    },
    "Free Technical Audit Tool": {
        "title": "AJPR World Free Technical SEO & Security Audit Suite",
        "tagline": "Instant enterprise diagnostic tool for Core Web Vitals, Schema.org compliance, and AI search readiness.",
        "category": "SEO Tools, Performance Analytics, Security, Free Web Tools",
        "website_url": "https://ajprworld.com/free-audit",
        "short_description": "Get a comprehensive 360-degree audit of any website in seconds: Core Web Vitals, Schema.org validation, mobile responsiveness, HTTP security headers, and Generative Engine Optimization (GEO) citation score.",
        "long_description": """The AJPR World Diagnostic Suite is a high-speed website auditing engine tailored for technical marketers, developers, and agency executives. It executes deep synthetic audits across five foundational vectors:

1. Performance & Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
2. Schema & Entity Graph: Validates LocalBusiness, Organization, Article, and Service JSON-LD schema against Schema.org standards.
3. Security & SSL Headers: Inspects HSTS, Content-Security-Policy, X-Frame-Options, and TLS configurations.
4. Generative Engine Optimization (GEO): Benchmarks how easily LLMs like Perplexity and ChatGPT can extract and cite page content.
5. Actionable Roadmap: Generates a prioritized engineering checklist to fix bottlenecks within 48 hours.""",
        "pricing_model": "Free (No credit card or login required)",
        "tags": ["seo-audit", "performance", "schema-markup", "security-check", "geo", "core-web-vitals"]
    },
    "WebFX / Agency Alternatives": {
        "title": "AJPR World – High-Performance WebFX & Web Tonic Alternative",
        "tagline": "Transparent pricing, direct senior engineer access, and zero bloated long-term lock-ins.",
        "category": "Agency Comparison, B2B Growth, Technical Marketing",
        "website_url": "https://ajprworld.com/compare/webfx-alternatives",
        "short_description": "A modern, transparent alternative to legacy digital marketing agencies. Senior-level systems architects and growth engineers instead of junior account managers, with public pricing and no 12-month lock-in contracts.",
        "long_description": """Frustrated by legacy agency models with opaque pricing, junior account handoffs, and 12-month lock-in retainers? AJPR World delivers an agile, engineering-first partnership:

Why Teams Choose AJPR World over Legacy Competitors:
- Direct Engineer Access: Work directly with senior systems architects and technical growth specialists.
- Transparent Retainers: Public pricing benchmarks with clear monthly deliverables and zero hidden fees.
- Modern Technology: Full-stack Next.js, Headless CMS, Edge Caching, and GEO Citation engineering instead of dated WordPress templates.
- Speed of Execution: Bi-weekly sprint deployments and real-time dashboard progress tracking.""",
        "pricing_model": "Fixed Monthly Retainers & Sprints (No Lock-In)",
        "tags": ["webfx-alternative", "webtonic-alternative", "b2b-growth-marketing", "transparent-seo-agency"]
    },
    "Founder & Research Hub": {
        "title": "2026 US & Global Agency Retainer Pricing Study – AJPR World",
        "tagline": "Comprehensive benchmark study analyzing 214 agencies across SEO, PPC, and Custom Engineering retainers.",
        "category": "Market Research, Industry Reports, B2B Pricing",
        "website_url": "https://ajprworld.com/research/agency-pricing-report",
        "short_description": "Independent data report breaking down real retainer rates, hourly billing models, deliverable benchmarks, and ROI metrics across 200+ digital agencies in 2026.",
        "long_description": """The 2026 Agency Pricing Report by AJPR World is an empirical study examining current retainer economics across SEO, custom software engineering, PPC advertising, and Generative Engine Optimization (GEO).

Key Findings:
- Median monthly SEO retainer ranges between $2,500 and $7,500 for mid-market B2B brands.
- Over 68% of enterprise decision-makers now evaluate GEO citation readiness when selecting an agency.
- Performance-based milestone pricing models outpaced fixed retainers in client retention by 34%.

Authored by Aman Joshi and the AJPR Systems Intelligence Group.""",
        "pricing_model": "Free Open Research Report",
        "tags": ["agency-pricing-report", "seo-costs", "b2b-retainer-benchmark", "market-research"]
    }
}

def load_catalog():
    # Read the TS catalog file and parse basic fields
    catalog_path = os.path.join(os.path.dirname(__file__), "..", "lib", "backlinks-catalog.ts")
    sources = []
    with open(catalog_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Simple parse based on catalog structure
    import re
    blocks = re.findall(r'\{\s*id:\s*(\d+),\s*name:\s*(?:"([^"]+)"|\'([^\']+)\'),\s*dr:\s*(\d+),\s*tier:\s*[\'"]([^\'"]+)[\'"],\s*url:\s*[\'"]([^\'"]+)[\'"],\s*submissionUrl:\s*[\'"]([^\'"]+)[\'"],\s*category:\s*[\'"]([^\'"]+)[\'"],\s*pricing:\s*[\'"]([^\'"]+)[\'"],\s*recommendedAsset:\s*[\'"]([^\'"]+)[\'"],\s*targetUrl:\s*[\'"]([^\'"]+)[\'"],\s*recommendedAnchor:\s*[\'"]([^\'"]+)[\'"],\s*priority:\s*[\'"]([^\'"]+)[\'"]\s*\}', content)
    
    for b in blocks:
        name = b[1] if b[1] else b[2]
        sources.append({
            "id": int(b[0]),
            "name": name,
            "dr": int(b[3]),
            "tier": b[4],
            "url": b[5],
            "submissionUrl": b[6],
            "category": b[7],
            "pricing": b[8],
            "recommendedAsset": b[9],
            "targetUrl": b[10],
            "recommendedAnchor": b[11],
            "priority": b[12]
        })
    return sources

def generate_csv_tracker(sources):
    out_csv = os.path.join(os.path.dirname(__file__), "..", "public", "backlinks_execution_tracker.csv")
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "ID", "Rank", "Platform Name", "Domain Rating (DR)", "Tier", "Category", 
            "Platform URL", "Direct Submission Link", "Optimal AJPR Asset", 
            "Target Landing Page URL", "Recommended Anchor Text", "Priority", 
            "Status (Pending / In-Review / Live / Verified)", "Live Profile Link", "Date Submitted", "Notes"
        ])
        for s in sources:
            writer.writerow([
                s["id"],
                f"#{s['id']}",
                s["name"],
                s["dr"],
                s["tier"],
                s["category"],
                s["url"],
                s["submissionUrl"],
                s["recommendedAsset"],
                s["targetUrl"],
                s["recommendedAnchor"],
                s["priority"],
                "Pending",
                "",
                "",
                f"Use payload for '{s['recommendedAsset']}'"
            ])
    print(f"Generated CSV tracker at: {out_csv}")

def generate_json_dossier(sources):
    out_json = os.path.join(os.path.dirname(__file__), "..", "public", "backlinks_submission_dossier.json")
    data = {
        "metadata": {
            "total_platforms": len(sources),
            "generated_for": "AJPR World (ajprworld.com)",
            "average_dr": round(sum(s['dr'] for s in sources) / max(1, len(sources)), 1),
            "assets_covered": list(SUBMISSION_PAYLOADS.keys())
        },
        "payloads": SUBMISSION_PAYLOADS,
        "sources": sources
    }
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Generated JSON submission dossier at: {out_json}")

if __name__ == "__main__":
    sources = load_catalog()
    print(f"Loaded {len(sources)} backlink platforms from catalog.")
    generate_csv_tracker(sources)
    generate_json_dossier(sources)
