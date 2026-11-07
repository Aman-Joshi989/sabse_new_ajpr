#!/usr/bin/env tsx
/**
 * AJPR WORLD LINKEDIN PAGE GROWTH PROGRAM — CLI EXECUTOR
 * 
 * Usage:
 *   npx tsx scripts/linkedin_growth_publisher.ts --status
 *   npx tsx scripts/linkedin_growth_publisher.ts --auth-url
 *   npx tsx scripts/linkedin_growth_publisher.ts --code <AUTHORIZATION_CODE>
 *   npx tsx scripts/linkedin_growth_publisher.ts --list
 *   npx tsx scripts/linkedin_growth_publisher.ts --preview 0
 *   npx tsx scripts/linkedin_growth_publisher.ts --publish 0 --target company
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { Pool } from 'pg';
import { 
  AJPR_GROWTH_POSTS, 
  checkLinkedInTokenHealth, 
  executeGrowthPublish 
} from '../lib/linkedin-growth-engine';
import { AJPR_BENCHMARK_REPORT } from '../lib/linkedin-pages-api';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || '--status';

  console.log('\n=============================================================');
  console.log('   🚀 AJPR WORLD LINKEDIN PAGE GROWTH PROGRAM (v2026)');
  console.log('   Company Target: urn:li:organization:107565213 (AJPR World)');
  console.log('=============================================================\n');

  if (command === '--status' || command === '-s') {
    console.log('🔍 Checking LinkedIn OAuth Token Health...\n');
    const health = await checkLinkedInTokenHealth();
    
    if (health.connected && !health.expired) {
      console.log('✅ TOKEN STATUS: ACTIVE & READY TO PUBLISH');
      console.log(`   Days Remaining: ~${health.daysRemaining} days`);
      console.log(`   Expires At:     ${health.expiresAt}`);
    } else if (health.hasToken && health.expired) {
      console.log('⚠️ TOKEN STATUS: EXPIRED');
      console.log(`   Expired On:     ${health.expiresAt}`);
      console.log('\n👉 Run with --auth-url to generate a fresh 1-click authorization link:');
      console.log('   npx tsx scripts/linkedin_growth_publisher.ts --auth-url');
    } else {
      console.log('❌ TOKEN STATUS: NOT FOUND');
      console.log('   No LinkedIn token found in the database table `social_tokens`.');
      console.log('\n👉 Run with --auth-url to generate a 1-click authorization link.');
    }
  }

  else if (command === '--auth-url' || command === '-a') {
    const clientId = process.env.LINKEDIN_CLIENT_ID || '86fx9twqsa15jt';
    const redirectLocal = 'http://localhost:3000/api/auth/linkedin/callback';
    const redirectProd = 'https://ajprworld.com/api/auth/linkedin/callback';
    const redirectTools = 'https://www.linkedin.com/developers/tools/oauth/redirect';

    const scopeBasic = encodeURIComponent('w_member_social openid profile email');
    const scopeFull = encodeURIComponent('w_member_social w_organization_social r_organization_social openid profile email');
    const state = 'ajpr_growth_' + Date.now();

    console.log('🔑 1-CLICK AUTHORIZATION URLS FOR AJPR WORLD:\n');
    
    console.log('1. [RECOMMENDED] Production Authorization (via ajprworld.com):');
    console.log(`   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectProd)}&state=${state}&scope=${scopeFull}\n`);

    console.log('2. [LOCAL] Localhost Dev Authorization (port 3000):');
    console.log(`   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectLocal)}&state=${state}&scope=${scopeFull}\n`);

    console.log('3. [MANUAL] LinkedIn Developer Tool Redirect (Copy-paste code directly):');
    console.log(`   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectTools)}&state=${state}&scope=${scopeFull}\n`);

    console.log('💡 Note: If your LinkedIn Developer App does not have the Community Management API product enabled, replace scope with basic share:');
    console.log(`   https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectProd)}&state=${state}&scope=${scopeBasic}\n`);
  }

  else if (command === '--code' || command === '-c') {
    const code = args[1];
    if (!code) {
      console.error('❌ Please provide the code: npx tsx scripts/linkedin_growth_publisher.ts --code <AUTHORIZATION_CODE>');
      process.exit(1);
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const databaseUrl = process.env.DATABASE_URL;

    // Detect redirect URI used or allow passing --redirect
    const redirectUri = args[2] || 'https://ajprworld.com/api/auth/linkedin/callback';

    console.log('🔄 Exchanging authorization code for a 60-day access token...');
    
    try {
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code.trim(),
          client_id: clientId!,
          client_secret: clientSecret!,
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.access_token) {
        console.log('✅ Access Token successfully generated from LinkedIn!');
        
        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: { rejectUnauthorized: false }
        });

        const query = `
          INSERT INTO social_tokens (platform, access_token, refresh_token, expires_at)
          VALUES ($1, $2, $3, NOW() + make_interval(secs := $4))
          ON CONFLICT (platform)
          DO UPDATE SET 
            access_token = EXCLUDED.access_token,
            refresh_token = COALESCE(EXCLUDED.refresh_token, social_tokens.refresh_token),
            expires_at = EXCLUDED.expires_at,
            created_at = NOW();
        `;
        
        await pool.query(query, [
          'linkedin', 
          tokenData.access_token, 
          tokenData.refresh_token || null, 
          tokenData.expires_in || 5184000
        ]);
        
        await pool.end();
        console.log('🎉 Token permanently saved in PostgreSQL! The AJPR World growth engine is live.');
      } else {
        console.error('❌ LinkedIn API returned error:', tokenData);
      }
    } catch (err: any) {
      console.error('❌ Failed to exchange token:', err.message);
    }
  }

  else if (command === '--list' || command === '-l') {
    console.log('📋 CURATED GROWTH CONTENT QUEUE:\n');
    AJPR_GROWTH_POSTS.forEach((p, idx) => {
      console.log(`[#${idx}] Day: ${p.dayOfWeek} @ ${p.suggestedTime}`);
      console.log(`     Pillar:   ${p.pillarTitle}`);
      console.log(`     Theme:    "${p.theme}"`);
      console.log(`     Carousel: "${p.carousel.title}" (${p.carousel.slides.length} slides)`);
      console.log(`     CTA:      ${p.callToAction}\n`);
    });
  }

  else if (command === '--preview' || command === '-p') {
    const idx = parseInt(args[1] || '0', 10);
    const post = AJPR_GROWTH_POSTS[idx] || AJPR_GROWTH_POSTS[0];

    console.log(`\n================== PREVIEW POST #${idx} ==================`);
    console.log(`Pillar:       ${post.pillarTitle}`);
    console.log(`Theme:        ${post.theme}`);
    console.log(`Schedule:     ${post.dayOfWeek} at ${post.suggestedTime}\n`);
    console.log('--- POST BODY ---');
    console.log(post.body);
    console.log('\n--- HASHTAGS ---');
    console.log(post.hashtags.join(' '));
    console.log('\n--- FIRST COMMENT (Outbound Link Strategy) ---');
    console.log(post.firstComment);
    console.log('\n--- CAROUSEL SLIDE DECK ---');
    post.carousel.slides.forEach(s => {
      console.log(`  Slide ${s.slideNumber}: [${s.headline}] - ${s.subheadline}`);
      if (s.bullets) s.bullets.forEach(b => console.log(`     • ${b}`));
      if (s.takeaway) console.log(`     ↳ ${s.takeaway}`);
    });
    console.log('========================================================\n');
  }

  else if (command === '--publish') {
    const idx = parseInt(args[1] || '0', 10);
    const targetIdx = args.indexOf('--target');
    const target = (targetIdx !== -1 ? args[targetIdx + 1] : 'company') as 'company' | 'person' | 'both';

    console.log(`📡 Executing publication for Post #${idx} to target: "${target}"...\n`);
    const res = await executeGrowthPublish({ postIndex: idx, target });

    if (res.success) {
      console.log('🎉 SUCCESSFULLY PUBLISHED TO LINKEDIN!');
      console.log(`   Theme:         "${res.postTheme}"`);
      console.log(`   Target:        ${res.publishedTo}`);
      console.log('\n💬 ACTION REQUIRED: Post this First Comment immediately for maximum algorithmic reach:');
      console.log(res.firstComment);
      console.log('\nDetails:', res.data);
    } else {
      console.error('❌ Failed to publish to LinkedIn:');
      console.error(res.error);
    }
  }

  else if (command === '--analytics' || command === '-an') {
    console.log('📊 AJPR WORLD — PAGES DATA PORTABILITY API REPORT:\n');
    const r = AJPR_BENCHMARK_REPORT;
    console.log(`Company:       ${r.companyName} (${r.vanityName})`);
    console.log(`Target URN:    urn:li:organization:${r.companyId}`);
    console.log(`Website:       ${r.websiteUrl}`);
    console.log(`Followers:     ${r.followers.total.toLocaleString()} (+${r.followers.weeklyGain}/week, ${r.followers.organicPercent}% organic)`);
    console.log(`30d Metrics:   ${r.metricsSummary.totalImpressions30d.toLocaleString()} impressions | ${r.metricsSummary.averageEngagementRate}% avg engagement | ${r.metricsSummary.totalPostClicks30d} clicks\n`);
    
    console.log('🎯 Executive Seniority Demographics:');
    r.demographics.seniority.forEach(s => {
      console.log(`   • ${s.category.padEnd(30)}: ${s.percentage}% (${s.count} members)`);
    });

    console.log('\n🏢 Target Industries:');
    r.demographics.industries.forEach(i => {
      console.log(`   • ${i.category.padEnd(30)}: ${i.percentage}% (${i.count} members)`);
    });

    console.log('\n📍 Top Buyer Metros:');
    r.demographics.topMetros.forEach(m => {
      console.log(`   • ${m.category.padEnd(30)}: ${m.percentage}% (${m.count} members)`);
    });
    console.log('\n');
  }

  else if (command === '--export-posts' || command === '-ep') {
    console.log('📑 HISTORICAL POSTS & PERFORMANCE ARCHIVE:\n');
    AJPR_BENCHMARK_REPORT.recentPosts.forEach((post, i) => {
      console.log(`[#${i + 1}] ${post.theme}`);
      console.log(`     Pillar:     ${post.pillar}`);
      console.log(`     Published:  ${post.publishedAt}`);
      console.log(`     Reach:      ${post.impressions.toLocaleString()} imp (${post.uniqueViews.toLocaleString()} unique)`);
      console.log(`     Engagement: ${post.engagementRate}% (${post.reactions} likes, ${post.comments} comments, ${post.shares} shares)`);
      console.log(`     Clicks:     ${post.clicks} (CTR: ${post.ctr}%)\n`);
    });
  }

  else {
    console.log('Available options:');
    console.log('  --status         Check current OAuth token health');
    console.log('  --auth-url       Generate 1-click LinkedIn Authorization URL');
    console.log('  --code <code>    Exchange authorization code for token');
    console.log('  --analytics      Pages Data Portability API demographics & reach');
    console.log('  --export-posts   Export post engagement metrics & history');
    console.log('  --list           List queued growth posts');
    console.log('  --preview <idx>  Preview a specific post and carousel deck');
    console.log('  --publish <idx>  Publish post to LinkedIn (--target company|person|both)');
  }
}

main().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});

