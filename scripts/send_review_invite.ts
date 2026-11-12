import { config } from 'dotenv';
config({ path: '.env.local' });

function parseArgs(argv: string[]) {
  const out: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--send') {
      out.send = true;
    } else if (arg.startsWith('--') && i + 1 < argv.length) {
      out[arg.slice(2)] = argv[++i];
    }
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const to = typeof args.to === 'string' ? args.to.trim() : '';
  const clientName = typeof args.name === 'string' ? args.name.trim() : '';
  const companyName = typeof args.company === 'string' ? args.company.trim() : undefined;
  const projectType = typeof args.project === 'string' ? args.project.trim() : undefined;
  const shouldSend = Boolean(args.send);

  if (!to || !clientName) {
    console.error(
      'Usage: npx tsx scripts/send_review_invite.ts --to client@company.com --name "Client Name" [--company "Company"] [--project "Next.js Platform"] [--send]'
    );
    console.error('Note: Runs in dry-run preview mode unless --send is passed.');
    process.exit(1);
  }

  const whatsappText = [
    `Hi ${clientName}! Hope business is going great${companyName ? ` at ${companyName}` : ''}.`,
    `If you have 60 seconds, could you drop an honest review of our work${projectType ? ` on ${projectType}` : ''}?`,
    `Google Search: https://www.google.com/search?q=AJPR+World+Haldwani+reviews`,
    `Direct Feedback Hub: https://ajprworld.com/reviews`,
    `Appreciate it! — Aman Joshi, AJPR World`,
  ].join('\n');

  console.log('\n--- WHATSAPP REVIEW INVITE (READY TO PASTE) ---');
  console.log(whatsappText);
  console.log('----------------------------------------------\n');

  if (!shouldSend) {
    console.log('[DRY RUN] Email preview prepared for:', { to, clientName, companyName, projectType });
    console.log('Re-run with --send to deliver this invitation via configured AJPR World email provider.');
    return;
  }

  const { sendClientReviewInviteEmail } = await import('../lib/email/contact-mailer');
  const res = await sendClientReviewInviteEmail({
    to,
    clientName,
    companyName,
    projectType,
  });
  console.log('Invite dispatch result:', res);
}

main().catch((err) => {
  console.error('Review invite script error:', err);
  process.exit(1);
});
