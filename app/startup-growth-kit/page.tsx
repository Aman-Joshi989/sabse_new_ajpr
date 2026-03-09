'use client'

import Head from 'next/head'

export default function StartupGrowthKitPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .startup-kit-wrapper {
          --ink: #0a0a12;
          --cream: #f5f0e8;
          --gold: #e8b84b;
          --gold-light: #f5d47a;
          --teal: #0ecac4;
          --violet: #7c3aed;
          --violet-soft: #ede9fe;
          --rose: #f43f5e;
          --slate: #1e1b4b;
          --card-bg: #ffffff;
          --border: rgba(124,58,237,0.12);

          background: var(--cream);
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          min-height: 100vh;
          padding: 0;
        }

        .startup-kit-wrapper * {
            margin:0; padding:0; box-sizing:border-box;
        }

        /* ── HERO HEADER ── */
        .startup-kit-wrapper .hero {
          background: var(--slate);
          padding: 52px 60px 44px;
          position: relative;
          overflow: hidden;
        }
        .startup-kit-wrapper .hero::before {
          content:'';
          position:absolute; inset:0;
          background: radial-gradient(ellipse 60% 80% at 90% 50%, rgba(14,202,196,.18) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(124,58,237,.22) 0%, transparent 70%);
        }
        .startup-kit-wrapper .hero-inner { position:relative; z-index:1; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        
        .startup-kit-wrapper .badge {
          display:inline-flex; align-items:center; gap:8px;
          background: rgba(14,202,196,.15);
          border: 1px solid rgba(14,202,196,.35);
          color: var(--teal);
          font-size: 11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
          padding: 6px 14px; border-radius:100px; margin-bottom:16px;
        }
        .startup-kit-wrapper .badge span { width:6px; height:6px; border-radius:50%; background:var(--teal); display:inline-block; animation:pulse 1.8s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }

        .startup-kit-wrapper .hero h1 {
          font-family:'Syne', sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          color: #fff;
          line-height: 1.08;
          letter-spacing: -.02em;
        }
        .startup-kit-wrapper .hero h1 em {
          font-style:normal;
          background: linear-gradient(120deg, var(--gold) 0%, var(--teal) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .startup-kit-wrapper .hero-sub {
          color: rgba(255,255,255,.55);
          font-size:15px; font-weight:300; margin-top:12px; max-width:440px; line-height:1.6;
        }

        .startup-kit-wrapper .hero-price {
          text-align:right;
        }
        .startup-kit-wrapper .hero-price .label { color:rgba(255,255,255,.45); font-size:12px; text-transform:uppercase; letter-spacing:.1em; }
        .startup-kit-wrapper .hero-price .tag {
          font-family:'Syne',sans-serif; font-size:13px; font-weight:700;
          color: var(--ink); background: var(--gold); padding:8px 20px; border-radius:8px; margin-top:8px;
          display:inline-block;
        }

        /* ── TAGLINE STRIP ── */
        .startup-kit-wrapper .strip {
          background: var(--gold);
          padding: 12px 60px;
          display:flex; align-items:center; gap:32px; overflow:hidden;
        }
        .startup-kit-wrapper .strip-text {
          font-family:'Syne',sans-serif; font-size:13px; font-weight:700;
          color:var(--ink); text-transform:uppercase; letter-spacing:.08em; white-space:nowrap;
          display:flex; gap:48px;
        }
        .startup-kit-wrapper .strip-text span::before { content:'✦  '; }

        /* ── MAIN GRID ── */
        .startup-kit-wrapper .main { padding: 48px 60px 60px; }

        .startup-kit-wrapper .section-header {
          display:flex; align-items:center; gap:14px; margin-bottom:24px;
        }
        .startup-kit-wrapper .section-icon {
          width:42px; height:42px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; flex-shrink:0;
        }
        .startup-kit-wrapper .section-title {
          font-family:'Syne',sans-serif; font-size:12px; font-weight:700;
          text-transform:uppercase; letter-spacing:.14em; color:var(--violet);
        }
        .startup-kit-wrapper .section-name {
          font-family:'Syne',sans-serif; font-size:20px; font-weight:800; color:var(--ink); line-height:1;
        }

        .startup-kit-wrapper .pillars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .startup-kit-wrapper .pillar {
          background: var(--card-bg);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          position:relative;
          overflow:hidden;
          transition: box-shadow .25s, transform .25s;
        }
        .startup-kit-wrapper .pillar:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(124,58,237,.10); }
        .startup-kit-wrapper .pillar::before {
          content:'';
          position:absolute; top:0; left:0; right:0; height:3px;
          border-radius:20px 20px 0 0;
        }

        .startup-kit-wrapper .p1::before { background: linear-gradient(90deg, var(--violet), var(--teal)); }
        .startup-kit-wrapper .p2::before { background: linear-gradient(90deg, var(--teal), #06b6d4); }
        .startup-kit-wrapper .p3::before { background: linear-gradient(90deg, var(--gold), var(--rose)); }
        .startup-kit-wrapper .p4::before { background: linear-gradient(90deg, var(--rose), var(--violet)); }

        .startup-kit-wrapper .pillar-head { display:flex; align-items:center; gap:10px; margin-bottom:18px; }
        .startup-kit-wrapper .pillar-emoji { font-size:22px; }
        .startup-kit-wrapper .pillar-label {
          font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
          text-transform:uppercase; letter-spacing:.12em;
        }
        .startup-kit-wrapper .p1 .pillar-label { color:var(--violet); }
        .startup-kit-wrapper .p2 .pillar-label { color:var(--teal); }
        .startup-kit-wrapper .p3 .pillar-label { color:#d97706; }
        .startup-kit-wrapper .p4 .pillar-label { color:var(--rose); }

        .startup-kit-wrapper .service-item {
          padding: 11px 14px;
          border-radius:12px;
          margin-bottom:8px;
          cursor:default;
          transition: background .18s;
        }
        .startup-kit-wrapper .service-item:hover { background: var(--violet-soft); }
        .startup-kit-wrapper .service-item:last-child { margin-bottom:0; }

        .startup-kit-wrapper .service-name {
          font-weight:600; font-size:13.5px; color:var(--ink); margin-bottom:3px;
        }
        .startup-kit-wrapper .service-desc {
          font-size:11.5px; color:#6b7280; line-height:1.5;
        }

        /* ── HIGHLIGHT CARDS ── */
        .startup-kit-wrapper .highlights {
          display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;
        }
        .startup-kit-wrapper .hl-card {
          border-radius:20px; padding:28px 32px; position:relative; overflow:hidden;
        }
        .startup-kit-wrapper .hl-dark {
          background: var(--slate);
          color:#fff;
        }
        .startup-kit-wrapper .hl-gold {
          background: var(--gold);
          color:var(--ink);
        }
        .startup-kit-wrapper .hl-card h3 {
          font-family:'Syne',sans-serif; font-size:17px; font-weight:800;
          margin-bottom:8px; line-height:1.2;
        }
        .startup-kit-wrapper .hl-dark h3 { color:#fff; }
        .startup-kit-wrapper .hl-gold h3 { color:var(--ink); }
        .startup-kit-wrapper .hl-card p { font-size:12.5px; line-height:1.6; opacity:.75; }
        .startup-kit-wrapper .hl-dark p { color:rgba(255,255,255,.7); }

        .startup-kit-wrapper .hl-tag {
          display:inline-block; font-size:10px; font-weight:700; letter-spacing:.1em;
          text-transform:uppercase; padding:4px 10px; border-radius:100px; margin-bottom:14px;
        }
        .startup-kit-wrapper .hl-dark .hl-tag { background:rgba(14,202,196,.18); color:var(--teal); }
        .startup-kit-wrapper .hl-gold .hl-tag { background:rgba(10,10,18,.12); color:var(--ink); }

        .startup-kit-wrapper .hl-card .big-icon {
          position:absolute; right:20px; bottom:16px;
          font-size:54px; opacity:.12;
        }

        /* ── BOTTOM MEGA CARD ── */
        .startup-kit-wrapper .mega {
          background: linear-gradient(135deg, var(--slate) 0%, #2d1b69 100%);
          border-radius:20px; padding:32px 40px;
          display:grid; grid-template-columns:1fr auto;
          gap:32px; align-items:center;
          position:relative; overflow:hidden;
        }
        .startup-kit-wrapper .mega::after {
          content:'';
          position:absolute; right:-40px; top:-40px;
          width:220px; height:220px; border-radius:50%;
          background:radial-gradient(circle, rgba(14,202,196,.18) 0%, transparent 70%);
        }
        .startup-kit-wrapper .mega-title {
          font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:6px;
        }
        .startup-kit-wrapper .mega-sub { font-size:13px; color:rgba(255,255,255,.55); margin-bottom:18px; line-height:1.6; }
        .startup-kit-wrapper .mega-pills { display:flex; gap:10px; flex-wrap:wrap; }
        .startup-kit-wrapper .mega-pill {
          background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15);
          color:#fff; font-size:11px; font-weight:500; padding:6px 14px; border-radius:100px;
        }
        .startup-kit-wrapper .mega-right { text-align:center; z-index: 10; position: relative; }
        .startup-kit-wrapper .mega-cta {
          background: linear-gradient(135deg, var(--teal), #06b6d4);
          color:var(--ink); font-family:'Syne',sans-serif; font-weight:700; font-size:13px;
          padding:14px 28px; border-radius:12px; text-decoration:none;
          display:inline-block; letter-spacing:.04em;
        }
        .startup-kit-wrapper .mega-note { font-size:10.5px; color:rgba(255,255,255,.35); margin-top:10px; }

        /* ── FOOTER ── */
        .startup-kit-wrapper .footer {
          padding:20px 60px;
          display:flex; align-items:center; justify-content:space-between;
          border-top:1px solid rgba(0,0,0,.08);
          flex-wrap:wrap; gap:12px;
        }
        .startup-kit-wrapper .footer-brand { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:var(--violet); }
        .startup-kit-wrapper .footer-note { font-size:11px; color:#9ca3af; }

        /* ── UPSELL ROW ── */
        .startup-kit-wrapper .upsell-row {
          display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:20px;
        }
        .startup-kit-wrapper .upsell-card {
          border:1.5px solid var(--border); border-radius:16px; padding:20px;
          background:#fff;
          display:flex; gap:14px; align-items:flex-start;
        }
        .startup-kit-wrapper .upsell-icon {
          width:38px; height:38px; border-radius:10px; background:var(--violet-soft);
          display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;
        }
        .startup-kit-wrapper .upsell-title { font-weight:700; font-size:13px; color:var(--ink); margin-bottom:4px; }
        .startup-kit-wrapper .upsell-desc { font-size:11.5px; color:#6b7280; line-height:1.5; }
        .startup-kit-wrapper .new-chip {
          display:inline-block; font-size:9px; font-weight:700; letter-spacing:.1em;
          text-transform:uppercase; background:var(--rose); color:#fff;
          padding:2px 7px; border-radius:100px; margin-left:6px; vertical-align:middle;
        }

        @media (max-width:900px) {
          .startup-kit-wrapper .pillars { grid-template-columns:1fr 1fr; }
          .startup-kit-wrapper .hero, .startup-kit-wrapper .main, .startup-kit-wrapper .strip, .startup-kit-wrapper .footer { padding-left:24px; padding-right:24px; }
          .startup-kit-wrapper .highlights { grid-template-columns:1fr; }
          .startup-kit-wrapper .upsell-row { grid-template-columns:1fr; }
          .startup-kit-wrapper .mega { grid-template-columns:1fr; }
          .startup-kit-wrapper .mega-right { text-align:left; }
        }

        @media (max-width:640px) {
          .startup-kit-wrapper .pillars { grid-template-columns:1fr; }
          .startup-kit-wrapper .hero { padding: 40px 16px 32px; }
          .startup-kit-wrapper .hero h1 { font-size: 32px; margin-top: 8px; }
          .startup-kit-wrapper .hero-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .startup-kit-wrapper .hero-price { text-align: left; }
          .startup-kit-wrapper .strip { padding: 12px 16px; }
          .startup-kit-wrapper .strip-text { font-size: 11px; gap: 24px; }
          .startup-kit-wrapper .main { padding: 32px 16px 40px; }
          .startup-kit-wrapper .upsell-card { flex-direction: column; align-items: flex-start; }
          .startup-kit-wrapper .mega { padding: 24px 20px; }
          .startup-kit-wrapper .mega-pills { flex-direction: column; }
          .startup-kit-wrapper .mega-pill { text-align: center; }
          .startup-kit-wrapper .mega::after { right: -100px; top: -100px; width: 150px; height: 150px; }
          .startup-kit-wrapper .footer { padding: 20px 16px; flex-direction: column; align-items: flex-start; }
        }
      `}} />

      <div className="startup-kit-wrapper">
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />

        {/* HERO */}
        <div className="hero">
          <div className="hero-inner">
            <div>
              <div className="badge"><span></span> 2025 Edition — AI-First Approach</div>
              <h1>LaunchPad <em>Pro</em><br />Startup Growth Kit</h1>
              <p className="hero-sub">Everything a new-age startup needs — from digital identity to AI-powered growth, managed by real humans who care about your success.</p>
            </div>
            <div className="hero-price">
              <div className="label">All-in-One Package</div>
              <div className="tag">🚀 Budget-Friendly for New Startups</div>
            </div>
          </div>
        </div>

        {/* STRIP */}
        <div className="strip">
          <div className="strip-text">
            <span>AI-Driven Strategies</span>
            <span>Personal Brand Manager</span>
            <span>On-Site Video Production</span>
            <span>Social-First Design</span>
            <span>Mutual Growth Model</span>
            <span>AI-Driven Strategies</span>
            <span>Personal Brand Manager</span>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* 4 PILLARS */}
          <div className="pillars">

            {/* PILLAR 1: Digital Presence */}
            <div className="pillar p1">
              <div className="pillar-head">
                <div className="pillar-emoji">🌐</div>
                <div className="pillar-label">Digital Presence</div>
              </div>
              <div className="service-item">
                <div className="service-name">Ultra-Dynamic Website</div>
                <div className="service-desc">SEO-ready, mobile-first, fast-loading. Modern design that converts visitors.</div>
              </div>
              <div className="service-item">
                <div className="service-name">VPS Cloud Hosting</div>
                <div className="service-desc">Lightning-fast server. 99.9% uptime. DDoS, SSL & Load Balancing included.</div>
              </div>
              <div className="service-item">
                <div className="service-name">SEO — #1 Google</div>
                <div className="service-desc">On-page SEO, keyword mapping & Google Search Console setup.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Policy & Legal Pages</div>
                <div className="service-desc">T&C, Privacy Policy, Cookies — professionally drafted for compliance.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Five-Layer Security</div>
                <div className="service-desc">SSL, JWT, DDoS shield, MD5 encryption & enterprise firewall.</div>
              </div>
            </div>

            {/* PILLAR 2: Social Media & Brand */}
            <div className="pillar p2">
              <div className="pillar-head">
                <div className="pillar-emoji">📲</div>
                <div className="pillar-label">Social & Brand</div>
              </div>
              <div className="service-item">
                <div className="service-name">Social Media Setup & Management</div>
                <div className="service-desc">Instagram, LinkedIn, YouTube Shorts — optimised profiles, bio & highlights.</div>
              </div>
              <div className="service-item">
                <div className="service-name">60 Trend-Led Posts / Year</div>
                <div className="service-desc">Reels, carousels, infographics aligned to viral trends & audience insights.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Google Profile + News Publish</div>
                <div className="service-desc">GMB setup, Search Console & PR articles on Daily Hunt, Inc91, HT Bytes.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Brand Trademark</div>
                <div className="service-desc">Trademark your name & logo in your business class. (Excl. Govt. fee)</div>
              </div>
              <div className="service-item">
                <div className="service-name">Follower Growth: 2k–10k</div>
                <div className="service-desc">Organic growth campaigns + SMM software to track and amplify reach.</div>
              </div>
            </div>

            {/* PILLAR 3: Brand Identity */}
            <div className="pillar p3">
              <div className="pillar-head">
                <div className="pillar-emoji">🎨</div>
                <div className="pillar-label">Brand Identity</div>
              </div>
              <div className="service-item">
                <div className="service-name">Logo, Letterhead & Business Card</div>
                <div className="service-desc">Crafted professionally. Delivered in PNG, JPG, SVG, PDF, EPS.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Full Brand Kit</div>
                <div className="service-desc">Brand guidelines, colour palette, typography, 3D mockups & brand story.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Company Profile (8-Page)</div>
                <div className="service-desc">A premium brochure to impress investors, clients & partners.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Business Email Suite</div>
                <div className="service-desc">5 professional emails @yourcompany.com. Setup + spam filter included.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Annual Maintenance</div>
                <div className="service-desc">1-year AMC — bugs fixed, software updates, zero downtime guarantee.</div>
              </div>
            </div>

            {/* PILLAR 4: AI & Automation */}
            <div className="pillar p4">
              <div className="pillar-head">
                <div className="pillar-emoji">🤖</div>
                <div className="pillar-label">AI & Automation</div>
              </div>
              <div className="service-item">
                <div className="service-name">AI Business Strategy Sessions</div>
                <div className="service-desc">Monthly AI-driven market analysis, competitor insights & growth roadmap.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Custom AI Chatbot</div>
                <div className="service-desc">WhatsApp & website chatbot trained on your business to handle leads 24/7.</div>
              </div>
              <div className="service-item">
                <div className="service-name">Personalised ERP / CRM</div>
                <div className="service-desc">Software tailored to your business — not a generic template. Proposals, billing, HRM.</div>
              </div>
              <div className="service-item">
                <div className="service-name">GST & Invoicing Suite</div>
                <div className="service-desc">Cloud GST-compliant billing, expenses, sales pipeline & client portal.</div>
              </div>
              <div className="service-item">
                <div className="service-name">WhatsApp API Automation</div>
                <div className="service-desc">Automate follow-ups, promotions, reminders & customer journeys via API.</div>
              </div>
            </div>
          </div>

          {/* UPSELL ROW — WHAT COMPETITORS DON'T OFFER */}
          <div className="upsell-row">
            <div className="upsell-card">
              <div className="upsell-icon">🎬</div>
              <div>
                <div className="upsell-title">On-Site Video Production <span className="new-chip">New</span></div>
                <div className="upsell-desc">Our team visits your location to shoot founder stories, product demos, office tours & Reels — studio quality without studio cost.</div>
              </div>
            </div>
            <div className="upsell-card">
              <div className="upsell-icon">🧑‍💼</div>
              <div>
                <div className="upsell-title">Dedicated Growth Mentor <span className="new-chip">New</span></div>
                <div className="upsell-desc">A real human assigned to your startup — weekly check-ins, personalised guidance, and accountability for your milestones.</div>
              </div>
            </div>
            <div className="upsell-card">
              <div className="upsell-icon">📱</div>
              <div>
                <div className="upsell-title">Mobile App (WebApp + APK) <span className="new-chip">New</span></div>
                <div className="upsell-desc">A branded mobile app to showcase your startup, take orders, and engage customers — built as a webapp with APK for Android.</div>
              </div>
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div className="highlights">
            <div className="hl-card hl-dark">
              <div className="hl-tag">🤝 Mutual Growth Promise</div>
              <h3>We grow only when<br />you grow.</h3>
              <p>Unlike agencies that take upfront fees and vanish — our model is built on trust, results, and long-term partnership. Your success is our portfolio.</p>
              <div className="big-icon">🌱</div>
            </div>
            <div className="hl-card hl-gold">
              <div className="hl-tag">⚡ What Others Don't Give</div>
              <h3>AI strategy + human touch + video — all in one kit.</h3>
              <p>Most agencies offer templates. We offer tailored AI strategy sessions, on-site content shoots, a personal mentor, AND custom-built software for your specific business model.</p>
              <div className="big-icon">✦</div>
            </div>
          </div>

          {/* MEGA BOTTOM CTA */}
          <div className="mega">
            <div>
              <div className="mega-title">🚀 LaunchPad Pro — All-In-One Startup Kit</div>
              <div className="mega-sub">One partner. One solution. Every tool, strategy, and human support your startup needs from Day 1 to Scale.</div>
              <div className="mega-pills">
                <div className="mega-pill">✦ Website + App</div>
                <div className="mega-pill">✦ Full Branding</div>
                <div className="mega-pill">✦ Social Media</div>
                <div className="mega-pill">✦ AI Strategy</div>
                <div className="mega-pill">✦ Video Shoot</div>
                <div className="mega-pill">✦ Custom Software</div>
                <div className="mega-pill">✦ Personal Mentor</div>
                <div className="mega-pill">✦ 1 Year AMC</div>
              </div>
            </div>
            <div className="mega-right">
              <a className="mega-cta" href="/contact">Book Free Consultation →</a>
              <div className="mega-note">No commitment · 30-min strategy call</div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="footer">
          <div className="footer-brand">LaunchPad Pro™</div>
          <div className="footer-note">One need. One solution. One partner who stays. · *Govt. fees excluded where applicable</div>
        </div>

      </div>
    </>
  )
}
