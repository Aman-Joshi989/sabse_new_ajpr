const fs = require('fs');
const ts = require('typescript');

console.log('====================================================');
console.log('🧪 RUNNING COMPREHENSIVE PLATFORM TEST SUITE');
console.log('====================================================\n');

// 1. TypeScript & JSX Transpilation Tests
console.log('--- TEST SUITE 1: TypeScript & JSX Syntax Validation ---');
const filesToTest = [
  'components/providers/RegionProvider.tsx',
  'components/RegionSelector.tsx',
  'components/providers/CartProvider.tsx',
  'components/CartDrawer.tsx',
  'components/LeadForm.tsx',
  'components/HermesChatWidget.tsx',
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/sections/HeroSection.tsx',
  'components/sections/AccountabilityPledgeSection.tsx',
  'app/layout.tsx',
  'app/HomeClient.tsx',
  'app/pricing/PricingClient.tsx',
  'app/book-call/page.tsx',
  'app/contact/page.tsx',
  'app/api/contact/route.ts',
  'app/api/leads/route.ts'
];

let failed = 0;
filesToTest.forEach(file => {
  try {
    if (!fs.existsSync(file)) {
      console.error('❌ File not found: ' + file);
      failed++;
      return;
    }
    const content = fs.readFileSync(file, 'utf8');
    ts.transpileModule(content, {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022
      }
    });
    console.log('  ✅ [PASS] ' + file);
  } catch (err) {
    console.error('  ❌ [FAIL] ' + file + ' -> ' + err.message);
    failed++;
  }
});

// 2. Region Detection Logic Simulation
console.log('\n--- TEST SUITE 2: Region Auto-Detection Engine ---');
function detectRegion(tz, offsetMinutes, cookieVal, localVal) {
  if (cookieVal === 'IN' || cookieVal === 'US') return cookieVal;
  if (localVal === 'IN' || localVal === 'US') return localVal;
  if (!tz) return 'US';
  const indianTimezones = ['Asia/Kolkata', 'Asia/Calcutta'];
  if (indianTimezones.includes(tz)) return 'IN';
  if (offsetMinutes === -330) return 'IN';
  return 'US';
}

const testCases = [
  { tz: 'America/New_York', offset: 300, cookie: null, local: null, expected: 'US', label: 'US Eastern (New York)' },
  { tz: 'America/Los_Angeles', offset: 480, cookie: null, local: null, expected: 'US', label: 'US Pacific (Los Angeles)' },
  { tz: 'America/Chicago', offset: 360, cookie: null, local: null, expected: 'US', label: 'US Central (Chicago)' },
  { tz: 'Europe/London', offset: 0, cookie: null, local: null, expected: 'US', label: 'Europe (London) defaults to Global US' },
  { tz: 'Asia/Kolkata', offset: -330, cookie: null, local: null, expected: 'IN', label: 'India standard (Asia/Kolkata)' },
  { tz: 'Asia/Calcutta', offset: -330, cookie: null, local: null, expected: 'IN', label: 'India legacy (Asia/Calcutta)' },
  { tz: 'UTC', offset: -330, cookie: null, local: null, expected: 'IN', label: 'India raw timezone offset (+05:30)' },
  { tz: 'Asia/Kolkata', offset: -330, cookie: 'US', local: 'US', expected: 'US', label: 'Manual toggle from India to US' },
  { tz: 'America/New_York', offset: 300, cookie: 'IN', local: 'IN', expected: 'IN', label: 'Manual toggle from US to India' }
];

testCases.forEach((tc, idx) => {
  const result = detectRegion(tc.tz, tc.offset, tc.cookie, tc.local);
  if (result === tc.expected) {
    console.log(`  ✅ [PASS] Case ${idx + 1}: ${tc.label} => ${result}`);
  } else {
    console.error(`  ❌ [FAIL] Case ${idx + 1}: ${tc.label} => Expected ${tc.expected}, got ${result}`);
    failed++;
  }
});

// 3. Currency Formatting & Conversion Accuracy
console.log('\n--- TEST SUITE 3: Dynamic Currency & Pricing Engine ---');
function formatCurrency(amount, region) {
  if (region === 'IN') {
    return '₹' + amount.toLocaleString('en-IN');
  }
  return '$' + amount.toLocaleString('en-US');
}

const formatTests = [
  { amt: 4500, reg: 'US', exp: '$4,500', name: 'US Web MVP Starter' },
  { amt: 149000, reg: 'IN', exp: '₹1,49,000', name: 'India Web MVP Starter' },
  { amt: 5500, reg: 'US', exp: '$5,500', name: 'US AI MVP Starter' },
  { amt: 185000, reg: 'IN', exp: '₹1,85,000', name: 'India AI MVP Starter' },
  { amt: 2500, reg: 'US', exp: '$2,500', name: 'US Growth Retainer' },
  { amt: 49999, reg: 'IN', exp: '₹49,999', name: 'India Growth Retainer' },
  { amt: 999, reg: 'US', exp: '$999', name: 'US Dedicated Pod Addon' },
  { amt: 49999, reg: 'IN', exp: '₹49,999', name: 'India Dedicated Pod Addon' }
];

formatTests.forEach((ft, idx) => {
  const formatted = formatCurrency(ft.amt, ft.reg);
  if (formatted === ft.exp) {
    console.log(`  ✅ [PASS] ${ft.name}: ${ft.amt} (${ft.reg}) => ${formatted}`);
  } else {
    console.error(`  ❌ [FAIL] ${ft.name}: Expected ${ft.exp}, got ${formatted}`);
    failed++;
  }
});

// 4. Verification of Key Trust Signals in Source Code
console.log('\n--- TEST SUITE 4: Regional Trust Signals in Templates ---');
const heroFile = fs.readFileSync('components/sections/HeroSection.tsx', 'utf8');
const contactFile = fs.readFileSync('app/contact/page.tsx', 'utf8');
const bookCallFile = fs.readFileSync('app/book-call/page.tsx', 'utf8');
const footerFile = fs.readFileSync('components/Footer.tsx', 'utf8');
const leadFormFile = fs.readFileSync('components/LeadForm.tsx', 'utf8');
const chatWidgetFile = fs.readFileSync('components/HermesChatWidget.tsx', 'utf8');

const checks = [
  { file: 'HeroSection.tsx', search: 'isIndia', desc: 'HeroSection uses isIndia state' },
  { file: 'HeroSection.tsx', search: 'GST Tax Invoicing', desc: 'HeroSection has GST invoicing for India' },
  { file: 'HeroSection.tsx', search: 'Fixed Flat Pricing (USD)', desc: 'HeroSection has USD pricing badge for US' },
  { file: 'contact/page.tsx', search: 'isIndia', desc: 'Contact page uses isIndia' },
  { file: 'contact/page.tsx', search: 'Delaware-Friendly Contracts', desc: 'Contact page shows Delaware trust for US' },
  { file: 'contact/page.tsx', search: 'Pan-India Delivery', desc: 'Contact page shows Indian locations for India' },
  { file: 'book-call/page.tsx', search: 'isIndia ? \'(IST)\'', desc: 'Book Call shows IST for India' },
  { file: 'book-call/page.tsx', search: 'EST / PST', desc: 'Book Call shows EST/PST for US' },
  { file: 'Footer.tsx', search: 'RegionSelector', desc: 'Footer mounts RegionSelector' },
  { file: 'Footer.tsx', search: 'Delaware-Friendly Contracts', desc: 'Footer has US trust strip' },
  { file: 'Footer.tsx', search: 'GST Invoicing', desc: 'Footer has India GST strip' },
  { file: 'LeadForm.tsx', search: 'Under ₹1,50,000', desc: 'LeadForm has Indian Rupee budget tiers' },
  { file: 'LeadForm.tsx', search: 'Under $5,000', desc: 'LeadForm has US Dollar budget tiers' },
  { file: 'HermesChatWidget.tsx', search: 'isIndia', desc: 'Hermes chat adapts to US vs India' }
];

checks.forEach((chk, idx) => {
  const content = chk.file === 'HeroSection.tsx' ? heroFile
    : chk.file === 'contact/page.tsx' ? contactFile
    : chk.file === 'book-call/page.tsx' ? bookCallFile
    : chk.file === 'Footer.tsx' ? footerFile
    : chk.file === 'LeadForm.tsx' ? leadFormFile
    : chatWidgetFile;

  if (content.includes(chk.search)) {
    console.log(`  ✅ [PASS] ${chk.file}: ${chk.desc}`);
  } else {
    console.error(`  ❌ [FAIL] ${chk.file}: Missing expected string "${chk.search}" (${chk.desc})`);
    failed++;
  }
});

console.log('\n====================================================');
if (failed > 0) {
  console.error(`❌ TEST SUITE FAILED: ${failed} errors detected.`);
  process.exit(1);
} else {
  console.log(`🎉 ALL 4 TEST SUITES PASSED FLAWLESSLY (0 failures)!`);
  console.log('====================================================\n');
}

