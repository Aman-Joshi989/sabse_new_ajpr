# AJPR WORLD — LinkedIn Page Growth Program (2026 Master Plan)

> **Target Entity**: AJPR World (`urn:li:organization:107565213`)  
> **Personal Anchor**: Aman Joshi (Founder & Systems Architect)  
> **Offer Wedge**: The $1,500 48-Hour Diagnostic Audit (`https://ajprworld.com/audit`)  
> **Core Objective**: Establish AJPR World as the premier engineering-led growth partner, converting cold executive traffic into diagnostic audit pipeline without ad spend.

---

## 1. The Core Problem with Company Pages

LinkedIn's algorithm suppresses Company Page organic reach:
- Average company page post reaches **< 2% of followers**.
- Executive decision-makers follow **people, not logos**.

### The Solution: The "Dual-Distribution Loop"
```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. AJPR World Company Page posts authoritative teardown or carousel    │
│    (Tags Aman Joshi in the copy / first comment)                       │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Aman Joshi immediately comments & reposts with founder commentary  │
│    (Triggers personal network algorithm reach)                         │
├────────────────────────────────────────────────────────────────────────┤
│ 3. First-Comment Link Strategy drives high-intent clicks               │
│    (No outbound links in post body = 0 algorithmic reach penalty)      │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Readers land on https://ajprworld.com/audit                        │
│    (Conversion to $1,500 Diagnostic Audit)                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 4 Content Pillars

### Pillar 1: Contrarian Agency Economics & Engineering Leverage
- **Theme**: Why traditional retainers ($10k/mo) fail, exposing vanity metrics (impressions, slide decks) vs automated engineering leverage.
- **Audience**: CEOs, CFOs, CMOs tired of burning capital.
- **Asset**: Multi-slide PDF carousel breaking down the "Agency Trap".

### Pillar 2: Generative Engine Optimization (GEO) & AI Search
- **Theme**: How to rank in ChatGPT, Perplexity, and Google AI Overviews using entity authority, double E-E-A-T schemas, and answer blocks.
- **Audience**: B2B tech founders whose traffic is shifting to LLMs.
- **Asset**: Technical comparison diagrams and GEO checklist.

### Pillar 3: Programmatic SEO & Sub-150ms Web Engineering
- **Theme**: Launching 150+ programmatic landing pages in Next.js 16 with 99+ Core Web Vitals instead of waiting 6 months on WordPress.
- **Audience**: Growth leaders, VPs of Marketing, Technical Founders.
- **Asset**: Architecture blueprints and PageSpeed comparison benchmarks.

### Pillar 4: The 48-Hour Diagnostic Audit & Risk Reversal
- **Theme**: De-risking 6-figure enterprise sales by leading with a low-friction diagnostic wedge ($1,500 audit).
- **Audience**: B2B consultants, agency owners, corporate buyers.
- **Asset**: Audit scorecard preview and 90-day roadmap templates.

---

## 3. Weekly Publishing Schedule

| Day | Time | Pillar | Format | Call to Action |
| :--- | :--- | :--- | :--- | :--- |
| **Monday** | 08:15 AM EST | Contrarian Economics / Strategy | Teardown + Carousel | 48-Hour Diagnostic Audit |
| **Wednesday** | 08:15 AM EST | Technical Deep-Dive / GEO | Data breakdown + Schema | GEO Guide / Site Audit |
| **Friday** | 08:15 AM EST | Engineering Showcase / Speed | Code breakdown + Benchmarks | Case Studies |

---

## 4. CLI & API Execution Tools

### CLI Commands:
```bash
# 1. Check token health & expiration
npx tsx scripts/linkedin_growth_publisher.ts --status

# 2. Generate 1-click LinkedIn Authorization URL
npx tsx scripts/linkedin_growth_publisher.ts --auth-url

# 3. List all scheduled growth posts
npx tsx scripts/linkedin_growth_publisher.ts --list

# 4. Preview a specific post with its carousel
npx tsx scripts/linkedin_growth_publisher.ts --preview 0

# 5. Publish Post #0 directly to AJPR World Company Page
npx tsx scripts/linkedin_growth_publisher.ts --publish 0 --target company

# 6. Publish to both Company Page and Founder Profile
npx tsx scripts/linkedin_growth_publisher.ts --publish 0 --target both
```

### Next.js API Endpoints:
- `GET /api/linkedin/growth` — Returns system status, token health, and queued posts.
- `POST /api/linkedin/growth` — Triggers instant publishing of any post (`{ "postIndex": 0, "target": "company" }`).
- `GET /api/cron/linkedin-engagement` — Automated weekly cron runner.

