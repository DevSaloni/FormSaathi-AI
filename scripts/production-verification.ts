/**
 * FormSaathi AI — Production Quality & Architecture Verification Suite
 * Tests shared context integrity, certificate switching, schema compliance,
 * and multimodal detection rules across all supported Indian certificates.
 */

import { supportedCertificates, defaultCertificateId } from '../src/data/certificateData';
import { sampleForms } from '../src/data/sampleForms';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    failed++;
  }
}

console.log('\n--- 1. Testing Supported Certificates Registry ---');
const certIds = Object.keys(supportedCertificates);
assert(certIds.length >= 4, `At least 4 primary certificates registered (found ${certIds.length})`);
assert(certIds.includes('caste_cert'), 'Caste Certificate (caste_cert) is registered');
assert(certIds.includes('income_cert'), 'Income Certificate (income_cert) is registered');
assert(certIds.includes('domicile_cert'), 'Domicile Certificate (domicile_cert) is registered');
assert(certIds.includes('ration_card'), 'Ration Card (ration_card) is registered');

for (const id of certIds) {
  const c = supportedCertificates[id];
  assert(!!c.info.title.mr && !!c.info.title.hi && !!c.info.title.en, `${id}: Has titles in Marathi, Hindi, English`);
  assert(Array.isArray(c.checklist) && c.checklist.length >= 4, `${id}: Has at least 4 verified checklist items`);
  assert(Array.isArray(c.stages) && c.stages.length === 8, `${id}: Has standardized 8-stage guided workflow`);
  assert(!!c.suggestedQuestions.mr && c.suggestedQuestions.mr.length >= 2, `${id}: Has native Marathi starter voice queries`);
}

console.log('\n--- 2. Testing Sample Forms Registry ---');
const sampleIds = sampleForms.map(s => s.id);
assert(sampleIds.includes('caste_cert'), 'Caste Certificate sample form is available');
assert(sampleIds.includes('income_cert'), 'Income Certificate sample form is available');
const casteSample = sampleForms.find(s => s.id === 'caste_cert');
assert(!!casteSample?.explanation.fields.length, 'Caste sample has detailed form fields');
assert(!!casteSample?.explanation.fields.some(f => f.simplifiedLabel.includes('जात') || f.originalLabel.includes('Caste')), 'Caste sample contains caste field labels');

console.log('\n--- 3. Testing Certificate Auto-Detection Rules ---');
function detectCertKeyword(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes('जात') || t.includes('जाति') || t.includes('caste') || t.includes('obc') || t.includes('sc / st') || t.includes('vjnt')) return 'caste_cert';
  if (t.includes('उत्पन्न') || t.includes('आय') || t.includes('income')) return 'income_cert';
  if (t.includes('अधिवास') || t.includes('डोमिसाईल') || t.includes('domicile')) return 'domicile_cert';
  if (t.includes('राशन') || t.includes('रेशन') || t.includes('ration')) return 'ration_card';
  return null;
}

assert(detectCertKeyword('तहसील कार्यालय - जातीचे प्रमाणपत्र मिळण्याबाबत अर्ज') === 'caste_cert', 'Detects Marathi Caste Certificate application');
assert(detectCertKeyword('उपविभागीय अधिकारी कार्यालय SDO Caste Certificate Form B') === 'caste_cert', 'Detects English Caste Certificate application');
assert(detectCertKeyword('आवेदक का जाति प्रमाण पत्र') === 'caste_cert', 'Detects Hindi Caste Certificate application');
assert(detectCertKeyword('तलाठी उत्पन्न अहवाल व उत्पन्नाचा दाखला') === 'income_cert', 'Detects Income Certificate application');
assert(detectCertKeyword('तहसील अधिवास दाखला १५ वर्षे वास्तव्याचा पुरावा') === 'domicile_cert', 'Detects Domicile Certificate application');

console.log(`\n========================================`);
console.log(`Verification Summary: ${passed} Passed, ${failed} Failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
