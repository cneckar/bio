// The people, organizations, works and vulnerabilities on this page, and the
// relationships between them. At build time vite.config.ts -> src/data/graph.ts
// turns this into <meta name="kg:relation"> / <meta name="kg:path"> tags and a
// schema.org + rdf:Statement JSON-LD @graph in <head>, so LLMs and crawlers can
// read the relationships without parsing prose. Nothing here is rendered
// visibly; keep it in sync with the lists in src/App.tsx.
//
// To add a relationship, add any missing entities to ENTITIES and a row to
// RELATIONS (or to the `relations` of a publication / coverage item / CVE).

export const SITE = 'https://crisneckar.vc/';
export const SELF_SOURCE = SITE; // self-reported facts cite this page

export type EntityType =
  | 'Person'
  | 'Organization'
  | 'Corporation'
  | 'EducationalOrganization'
  | 'SoftwareApplication'
  | 'Vulnerability'
  | 'Event'
  | 'Article'
  | 'NewsArticle'
  | 'ScholarlyArticle'
  | 'BlogPosting'
  | 'PresentationDigitalDocument'
  | 'PodcastEpisode'
  | 'VideoObject'
  | 'CreativeWork'
  | 'Thing';

export interface Entity {
  id: string;
  name: string;
  alternateName?: string[];
  type: EntityType;
  url?: string;
  sameAs?: string[];
  description?: string;
  date?: string;
}

// Each predicate has a stable IRI under https://crisneckar.vc/vocab# and, where
// schema.org has an equivalent, the schema.org property used to express it
// natively on the subject or object node of the JSON-LD graph.
export interface Predicate {
  label: string;
  inverse?: string;
  schema?: { prop: string; on: 'subject' | 'object'; role?: string };
}

export const PREDICATES = {
  partnerAt: { label: 'partner at', inverse: 'has partner', schema: { prop: 'worksFor', on: 'subject', role: 'Partner' } },
  boardObserverOf: { label: 'board observer of', inverse: 'has board observer', schema: { prop: 'memberOf', on: 'subject', role: 'Board Observer' } },
  coFounderOf: { label: 'co-founder of', inverse: 'co-founded by', schema: { prop: 'founder', on: 'object' } },
  formerCisoOf: { label: 'former Chief Information Security Officer of', schema: { prop: 'alumniOf', on: 'subject', role: 'Chief Information Security Officer' } },
  formerMemberOf: { label: 'former member of', schema: { prop: 'alumniOf', on: 'subject', role: 'Original member' } },
  formerEmployeeOf: { label: 'former employee of', schema: { prop: 'alumniOf', on: 'subject' } },
  adjunctProfessorAt: { label: 'adjunct professor at', schema: { prop: 'alumniOf', on: 'subject', role: 'Adjunct Professor' } },
  advisoryBoardMemberOf: { label: 'curriculum advisory board member of', schema: { prop: 'memberOf', on: 'subject', role: 'Curriculum Advisory Board Member' } },
  ceoOf: { label: 'CEO of', inverse: 'led by', schema: { prop: 'worksFor', on: 'subject', role: 'Chief Executive Officer' } },
  partOf: { label: 'part of', inverse: 'has part', schema: { prop: 'parentOrganization', on: 'subject' } },
  acquiredBy: { label: 'acquired by', inverse: 'acquirer of' },
  leadInvestorIn: { label: 'lead investor in', inverse: 'funding led by', schema: { prop: 'funder', on: 'object' } },
  investorIn: { label: 'investor in', inverse: 'funded by', schema: { prop: 'funder', on: 'object' } },
  authorOf: { label: 'author of', inverse: 'authored by', schema: { prop: 'author', on: 'object' } },
  contributorTo: { label: 'contributor to', inverse: 'has contributor', schema: { prop: 'contributor', on: 'object' } },
  publishedBy: { label: 'published by', inverse: 'publisher of', schema: { prop: 'publisher', on: 'subject' } },
  presentedAt: { label: 'presented at', schema: { prop: 'recordedAt', on: 'subject' } },
  spokeAt: { label: 'speaker at', schema: { prop: 'performer', on: 'object' } },
  panelistAt: { label: 'panelist at', schema: { prop: 'performer', on: 'object' } },
  organizedBy: { label: 'organized by', schema: { prop: 'organizer', on: 'subject' } },
  interviewedIn: { label: 'interviewed in', schema: { prop: 'about', on: 'object' } },
  profiledIn: { label: 'profiled in', schema: { prop: 'about', on: 'object' } },
  about: { label: 'about', schema: { prop: 'about', on: 'subject' } },
  discovered: { label: 'discovered (credited)', inverse: 'credited to' },
  affects: { label: 'affects' },
  developedBy: { label: 'developed by', inverse: 'developer of', schema: { prop: 'creator', on: 'subject' } },
  investigated: { label: 'led reverse engineering in the investigation of' },
  analyzed: { label: 'analyzed' },
  helpedCreate: { label: 'helped create', schema: { prop: 'contributor', on: 'object' } },
  operatedBy: { label: 'operated by', schema: { prop: 'provider', on: 'subject' } },
  targeted: { label: 'targeted' },
} satisfies Record<string, Predicate>;

export type PredicateKey = keyof typeof PREDICATES;

export interface Relation {
  s: string;
  p: PredicateKey;
  o: string;
  // ISO date (or YYYY-MM / YYYY) the relationship began or was announced.
  date?: string;
  // e.g. "current", "former", "announced; expected to close Q4 2026".
  status?: string;
  // Short qualifier: round, amount, vulnerability class, etc.
  detail?: string;
  // URL of the document that supports the claim.
  source?: string;
}

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

export const ENTITIES: Entity[] = [
  // People
  {
    id: 'cris-neckar',
    name: 'Cris Neckar',
    type: 'Person',
    url: SITE,
    sameAs: [
      'https://www.linkedin.com/in/crisneckar/',
      'https://www.crunchbase.com/person/cris-neckar-a44f',
      'https://www.twobearcapital.com/team/cris-neckar',
      'https://github.com/crisneckar',
    ],
    description: 'Security researcher turned venture investor; original Chrome Security Team; Partner at Two Bear Capital.',
  },
  { id: 'james-winebrenner', name: 'James Winebrenner', type: 'Person', description: 'CEO of Elisity.' },
  { id: 'niccolo-de-masi', name: 'Niccolo de Masi', type: 'Person', description: 'Chairman and CEO of IonQ.' },

  // Organizations
  { id: 'two-bear-capital', name: 'Two Bear Capital', type: 'Organization', url: 'https://www.twobearcapital.com/', description: 'Venture capital firm investing in cybersecurity, advanced technologies, and life sciences.' },
  { id: 'elisity', name: 'Elisity', type: 'Corporation', url: 'https://www.elisity.com/', description: 'Zero Trust identity-based microsegmentation company.' },
  { id: 'ionq', name: 'IonQ', type: 'Corporation', url: 'https://ionq.com/', description: 'Quantum computing and quantum networking company (NYSE: IONQ).' },
  { id: 'allegiscyber', name: 'AllegisCyber Capital', type: 'Organization', url: 'https://allegiscyber.com/' },
  { id: 'atlantic-bridge', name: 'Atlantic Bridge', type: 'Organization', url: 'https://www.abven.com/' },
  { id: 'insight-partners', name: 'Insight Partners', type: 'Organization', url: 'https://www.insightpartners.com/' },
  { id: 'revenium', name: 'Revenium', type: 'Corporation', url: 'https://www.revenium.io/', description: 'AI economics platform.' },
  { id: 'westwave-capital', name: 'WestWave Capital', type: 'Organization' },
  { id: 'qusecure', name: 'QuSecure', type: 'Corporation', url: 'https://www.qusecure.com/', description: 'Post-quantum cryptography company.' },
  { id: 'accenture-ventures', name: 'Accenture Ventures', type: 'Organization' },
  { id: 'binarly', name: 'Binarly', type: 'Corporation', url: 'https://www.binarly.io/', description: 'Software supply chain and firmware security company.' },
  { id: 'dymium', name: 'Dymium', type: 'Corporation', description: 'Zero-trust data security platform.' },
  { id: 'pulsedata', name: 'PulseData AI', alternateName: ['pulseData', 'PulseData'], type: 'Corporation', description: 'New York City healthcare data company working with health systems on chronic kidney disease.' },
  { id: 'bain-capital', name: 'Bain Capital', type: 'Organization', url: 'https://www.baincapital.com/' },
  { id: 'latham-watkins', name: 'Latham & Watkins', type: 'Organization', url: 'https://www.lw.com/' },
  { id: 'spring-labs', name: 'Spring Labs', type: 'Corporation' },
  { id: 'divergent-security', name: 'Divergent Security', type: 'Corporation', description: 'Offensive cybersecurity assessment firm.' },
  { id: 'google', name: 'Google', type: 'Corporation', url: 'https://www.google.com/' },
  { id: 'chrome-security-team', name: 'Google Chrome Security Team', type: 'Organization' },
  { id: 'neohapsis', name: 'Neohapsis', type: 'Corporation' },
  { id: 'cisco', name: 'Cisco Systems', type: 'Corporation', url: 'https://www.cisco.com/' },
  { id: 'depaul', name: 'DePaul University', type: 'EducationalOrganization', url: 'https://www.depaul.edu/' },
  { id: 'heartland', name: 'Heartland Payment Systems', type: 'Corporation' },
  { id: 'nso-group', name: 'NSO Group', type: 'Corporation' },
  { id: 'lookout', name: 'Lookout', type: 'Corporation', url: 'https://www.lookout.com/' },
  { id: 'microsoft', name: 'Microsoft', type: 'Corporation', url: 'https://www.microsoft.com/' },
  { id: 'apple', name: 'Apple', type: 'Corporation', url: 'https://www.apple.com/' },
  { id: 'viabtc', name: 'ViaBTC', type: 'Corporation' },
  { id: 'pillow-maintainers', name: 'Python Pillow project', type: 'Organization', url: 'https://python-pillow.org/' },
  { id: 'ieee', name: 'IEEE', type: 'Organization', url: 'https://www.ieee.org/' },
  { id: 'isc2', name: 'ISC2', type: 'Organization', url: 'https://www.isc2.org/' },
  { id: 'dfrws', name: 'DFRWS', type: 'Organization', url: 'https://dfrws.org/' },
  { id: 'security-weekly', name: 'Security Weekly', type: 'Organization', url: 'https://www.scworld.com/' },
  { id: 'securityweek', name: 'SecurityWeek', type: 'Organization', url: 'https://www.securityweek.com/' },
  { id: 'pr-newswire', name: 'PR Newswire', type: 'Organization', url: 'https://www.prnewswire.com/' },
  { id: 'flathead-beacon', name: 'Flathead Beacon', type: 'Organization', url: 'https://flatheadbeacon.com/' },
  { id: 'security-conversations', name: 'Security Conversations', type: 'Organization', url: 'https://securityconversations.com/' },
  { id: 'hello-whitefish', name: 'Hello Whitefish (podcast)', type: 'Organization' },

  // Events
  { id: 'heartland-breach', name: 'Heartland Payment Systems breach', type: 'Event', date: '2008' },
  { id: 'ieee-quantum-week-2025', name: 'IEEE Quantum Week 2025', type: 'Event', url: 'https://qce.quantum.ieee.org/2025/', date: '2025-09' },
  { id: 'isc2-congress-2023', name: 'ISC2 Security Congress 2023', type: 'Event', date: '2023-10' },
  { id: 'scaling-montana-2024', name: 'Scaling Montana Summit 2024', type: 'Event', url: 'https://scalingmt.org/summit-2024/mainstage/', date: '2024' },
  { id: 'dfrws-2010', name: 'DFRWS USA 2010', type: 'Event', date: '2010' },
  { id: 'bsides-nola-2018', name: 'BSides New Orleans 2018', type: 'Event', date: '2018-05' },
  { id: 'thotcon-0x01', name: 'THOTCON 0x01', type: 'Event', date: '2010-04' },
  { id: 'hacker-halted-2009', name: 'Hacker Halted 2009', type: 'Event', date: '2009-09' },

  // Software, programs, and malware
  { id: 'google-chrome', name: 'Google Chrome', type: 'SoftwareApplication' },
  { id: 'chrome-vrp', name: 'Chrome Vulnerability Reward Program', type: 'CreativeWork' },
  { id: 'pwnium', name: 'Pwnium', type: 'Event', description: 'Google Chrome exploitation competition.' },
  { id: 'pegasus', name: 'Pegasus spyware', type: 'SoftwareApplication' },
  { id: 'trident', name: 'Trident (iOS exploit chain)', type: 'Thing' },
  { id: 'ios', name: 'Apple iOS', type: 'SoftwareApplication' },
  { id: 'apple-webkit', name: 'Apple WebKit', type: 'SoftwareApplication' },
  { id: 'microsoft-windows', name: 'Microsoft Windows', type: 'SoftwareApplication' },
  { id: 'internet-explorer', name: 'Microsoft Internet Explorer', type: 'SoftwareApplication' },
  { id: 'cisco-webex', name: 'Cisco WebEx', type: 'SoftwareApplication' },
  { id: 'python-pillow', name: 'Python Pillow', type: 'SoftwareApplication' },
  { id: 'viabtc-exchange', name: 'ViaBTC Exchange Server – Crypto Currency Trading Backend', type: 'SoftwareApplication' },
];

// ---------------------------------------------------------------------------
// Career, affiliations, deals and facts not tied to a single article
// ---------------------------------------------------------------------------

export const RELATIONS: Relation[] = [
  { s: 'cris-neckar', p: 'partnerAt', o: 'two-bear-capital', status: 'current', source: 'https://www.twobearcapital.com/team/cris-neckar' },
  { s: 'cris-neckar', p: 'boardObserverOf', o: 'elisity', status: 'current', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'boardObserverOf', o: 'revenium', status: 'current', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'boardObserverOf', o: 'binarly', status: 'current', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'boardObserverOf', o: 'qusecure', status: 'current', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'boardObserverOf', o: 'dymium', status: 'current', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'boardObserverOf', o: 'pulsedata', status: 'current', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'formerCisoOf', o: 'spring-labs', status: 'former', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'coFounderOf', o: 'divergent-security', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'formerMemberOf', o: 'chrome-security-team', status: 'former; original member', source: SELF_SOURCE },
  { s: 'chrome-security-team', p: 'partOf', o: 'google' },
  { s: 'cris-neckar', p: 'formerEmployeeOf', o: 'neohapsis', status: 'former', source: SELF_SOURCE },
  { s: 'neohapsis', p: 'acquiredBy', o: 'cisco', status: 'completed' },
  { s: 'cris-neckar', p: 'investigated', o: 'heartland-breach', detail: 'while at Neohapsis', source: SELF_SOURCE },
  { s: 'heartland-breach', p: 'targeted', o: 'heartland' },
  { s: 'cris-neckar', p: 'adjunctProfessorAt', o: 'depaul', status: 'former', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'advisoryBoardMemberOf', o: 'depaul', status: 'former', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'analyzed', o: 'pegasus', detail: 'initial discovery and analysis, with Divergent Security', source: SELF_SOURCE },
  { s: 'pegasus', p: 'developedBy', o: 'nso-group' },
  { s: 'trident', p: 'targeted', o: 'ios', detail: 'zero-day exploit chain used to deliver Pegasus' },
  { s: 'cris-neckar', p: 'helpedCreate', o: 'chrome-vrp', source: SELF_SOURCE },
  { s: 'cris-neckar', p: 'helpedCreate', o: 'pwnium', source: SELF_SOURCE },
  { s: 'chrome-vrp', p: 'operatedBy', o: 'google' },
  { s: 'pwnium', p: 'operatedBy', o: 'google' },
  { s: 'google-chrome', p: 'developedBy', o: 'google' },
  { s: 'apple-webkit', p: 'developedBy', o: 'apple' },
  { s: 'ios', p: 'developedBy', o: 'apple' },
  { s: 'microsoft-windows', p: 'developedBy', o: 'microsoft' },
  { s: 'internet-explorer', p: 'developedBy', o: 'microsoft' },
  { s: 'cisco-webex', p: 'developedBy', o: 'cisco' },
  { s: 'python-pillow', p: 'developedBy', o: 'pillow-maintainers' },
  { s: 'viabtc-exchange', p: 'developedBy', o: 'viabtc' },

  // Elisity funding history
  { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'elisity', date: '2021-06-15', detail: 'co-led $26M Series A with AllegisCyber Capital', source: 'https://www.elisity.com/news/elisity-closes-26-million-funding-round' },
  { s: 'allegiscyber', p: 'leadInvestorIn', o: 'elisity', date: '2021-06-15', detail: 'co-led $26M Series A with Two Bear Capital', source: 'https://www.elisity.com/news/elisity-closes-26-million-funding-round' },
  { s: 'atlantic-bridge', p: 'investorIn', o: 'elisity', detail: 'led $7.5M seed (2018); participated in Series A', source: 'https://www.elisity.com/news/elisity-closes-26-million-funding-round' },
  { s: 'insight-partners', p: 'leadInvestorIn', o: 'elisity', date: '2024-04', detail: 'led $37M Series B', source: 'https://allegiscyber.com/?p=19728' },
];

// ---------------------------------------------------------------------------
// Publications and talks
// ---------------------------------------------------------------------------

export interface Publication {
  id: string;
  type: EntityType;
  title: string;
  date: string; // display string
  isoDate: string;
  venue: string;
  description: string;
  link: string;
  linkText: string;
  relations: Relation[];
}

const ME = 'cris-neckar';

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-pegasus-trident',
    type: 'Article',
    title: 'Technical Analysis of the Pegasus Exploits on iOS (Trident)',
    date: 'Lookout • August 2016',
    isoDate: '2016-08',
    venue: 'lookout',
    description: 'Deep dive into the Trident exploit chain and Pegasus spyware: exploitation primitives, payload staging, and post-exploitation behaviors.',
    link: 'https://info.lookout.com/rs/051-ESQ-475/images/pegasus-exploits-technical-details.pdf',
    linkText: 'Read more',
    relations: [
      { s: ME, p: 'contributorTo', o: 'pub-pegasus-trident' },
      { s: 'pub-pegasus-trident', p: 'publishedBy', o: 'lookout' },
      { s: 'pub-pegasus-trident', p: 'about', o: 'pegasus' },
      { s: 'pub-pegasus-trident', p: 'about', o: 'trident' },
      { s: 'pub-pegasus-trident', p: 'about', o: 'nso-group' },
    ],
  },
  {
    id: 'pub-fuzzing-for-security',
    type: 'BlogPosting',
    title: 'Fuzzing for Security',
    date: 'Chromium Blog • April 2012',
    isoDate: '2012-04',
    venue: 'google',
    description: "Foundational post on Google's scaled fuzzing infrastructure and methodology that later powered ClusterFuzz and thousands of bug discoveries.",
    link: 'https://blog.chromium.org/2012/04/fuzzing-for-security.html',
    linkText: 'Read more',
    relations: [
      { s: ME, p: 'authorOf', o: 'pub-fuzzing-for-security' },
      { s: 'pub-fuzzing-for-security', p: 'publishedBy', o: 'google', detail: 'Chromium Blog' },
      { s: 'pub-fuzzing-for-security', p: 'about', o: 'google-chrome' },
    ],
  },
  {
    id: 'pub-kmem-cache',
    type: 'ScholarlyArticle',
    title: 'Treasure and Tragedy in kmem_cache Mining for Live Forensics Investigation',
    date: 'DFRWS • 2010',
    isoDate: '2010',
    venue: 'dfrws',
    description: 'Research on leveraging Linux kernel slab caches for live forensics—what structures are recoverable, evidentiary value, and pitfalls.',
    link: 'https://dfrws.org/sites/default/files/session-files/2010_USA_paper-treasure_and_tragedy_in_kmem_cache_mining_for_live_forensics_investigation.pdf',
    linkText: 'Read more',
    relations: [
      { s: ME, p: 'authorOf', o: 'pub-kmem-cache' },
      { s: 'pub-kmem-cache', p: 'publishedBy', o: 'dfrws' },
      { s: 'pub-kmem-cache', p: 'presentedAt', o: 'dfrws-2010' },
    ],
  },
  {
    id: 'talk-pii-in-the-sky',
    type: 'PresentationDigitalDocument',
    title: 'PII in the Sky: Maintaining Cloud Control when Access Extends Beyond the Service Edge',
    date: 'ISC² Security Congress • October 2023',
    isoDate: '2023-10',
    venue: 'isc2',
    description: 'Practical patterns for governing identity, access, and data boundaries across multi-tenant cloud and third-party integrations.',
    link: 'https://events.isc2.org/sessions/2602/view',
    linkText: 'Watch/Details',
    relations: [
      { s: ME, p: 'authorOf', o: 'talk-pii-in-the-sky' },
      { s: ME, p: 'spokeAt', o: 'isc2-congress-2023' },
      { s: 'talk-pii-in-the-sky', p: 'presentedAt', o: 'isc2-congress-2023' },
      { s: 'isc2-congress-2023', p: 'organizedBy', o: 'isc2' },
    ],
  },
  {
    id: 'talk-least-privilege',
    type: 'VideoObject',
    title: 'Trading Least Privilege for Security Theater',
    date: 'Enterprise Security Weekly • October 2020',
    isoDate: '2020-10',
    venue: 'security-weekly',
    description: 'A critique of superficial access controls and how to align privilege models with actual threat models and operational realities.',
    link: 'https://www.youtube.com/watch?v=y0j6TdRtCFs',
    linkText: 'Watch talk',
    relations: [
      { s: ME, p: 'interviewedIn', o: 'talk-least-privilege' },
      { s: 'talk-least-privilege', p: 'publishedBy', o: 'security-weekly', detail: 'Enterprise Security Weekly #201' },
    ],
  },
  {
    id: 'talk-smashing-the-blockchain',
    type: 'PresentationDigitalDocument',
    title: 'Smashing the Blockchain',
    date: 'BSides New Orleans • May 2018',
    isoDate: '2018-05',
    venue: 'bsides-nola-2018',
    description: 'Offensive techniques and systemic weaknesses in early blockchain stacks; threat-modeling smart contracts and supporting infra.',
    link: 'https://www.slideshare.net/CrisNeckar/bsides-new-orleans-2018-smashing-the-blockchain',
    linkText: 'Slides',
    relations: [
      { s: ME, p: 'authorOf', o: 'talk-smashing-the-blockchain' },
      { s: ME, p: 'spokeAt', o: 'bsides-nola-2018' },
      { s: 'talk-smashing-the-blockchain', p: 'presentedAt', o: 'bsides-nola-2018' },
    ],
  },
  {
    id: 'talk-forensic-fail',
    type: 'PresentationDigitalDocument',
    title: 'Forensic Fail',
    date: 'THOTCON 0x01 • April 2010',
    isoDate: '2010-04',
    venue: 'thotcon-0x01',
    description: 'Demonstration of how forensic tooling can be subverted—malicious payloads targeting investigator workflows and chain-of-custody risks.',
    link: 'https://www.thotcon.org/archive/0x1presos/08_THOTCON_0x1-Forensic_Fail-Neckar-Ose.pdf',
    linkText: 'Slides',
    relations: [
      { s: ME, p: 'authorOf', o: 'talk-forensic-fail' },
      { s: ME, p: 'spokeAt', o: 'thotcon-0x01' },
      { s: 'talk-forensic-fail', p: 'presentedAt', o: 'thotcon-0x01' },
    ],
  },
  {
    id: 'talk-clock-cycles',
    type: 'PresentationDigitalDocument',
    title: 'So Long, and Thanks For All the Clock Cycles',
    date: 'Hacker Halted • September 2009',
    isoDate: '2009-09',
    venue: 'hacker-halted-2009',
    description: 'Early reflections on exploitation, mitigation, and the changing economics of vulnerability discovery and disclosure.',
    link: 'https://www.nullmethod.com/talk/2009/09/20/hacker-halted-2009/',
    linkText: 'Overview',
    relations: [
      { s: ME, p: 'authorOf', o: 'talk-clock-cycles' },
      { s: ME, p: 'spokeAt', o: 'hacker-halted-2009' },
      { s: 'talk-clock-cycles', p: 'presentedAt', o: 'hacker-halted-2009' },
    ],
  },
];

// ---------------------------------------------------------------------------
// News and media coverage
// ---------------------------------------------------------------------------

export interface Coverage {
  id: string;
  type: EntityType;
  title: string;
  date: string; // display string
  isoDate: string;
  publisher: string;
  description: string;
  link: string;
  linkText: string;
  relations: Relation[];
}

const ELISITY_ACQ = 'https://ionq.com/news/ionq-to-acquire-elisity-to-accelerate-zero-trust-for-the-quantum-era';

export const COVERAGE: Coverage[] = [
  {
    id: 'news-ionq-acquires-elisity',
    type: 'NewsArticle',
    title: 'IonQ to acquire Elisity to accelerate Zero Trust for the quantum era',
    date: 'IonQ Newsroom • October 2026',
    isoDate: '2026-10-12',
    publisher: 'ionq',
    description: 'IonQ agrees to acquire Elisity, a Two Bear Capital portfolio company, in an all-stock transaction valued at up to $1.3B. Expected to close in Q4 2026.',
    link: ELISITY_ACQ,
    linkText: 'Read announcement',
    relations: [
      { s: 'elisity', p: 'acquiredBy', o: 'ionq', date: '2026-10-12', status: 'announced; expected to close Q4 2026, subject to regulatory approval', detail: 'all-stock, valued at up to $1.3B including up to $150M earnout', source: ELISITY_ACQ },
      { s: ME, p: 'boardObserverOf', o: 'elisity', status: 'current', source: SELF_SOURCE },
      { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'elisity', date: '2021-06-15', detail: 'co-led $26M Series A', source: 'https://www.elisity.com/news/elisity-closes-26-million-funding-round' },
      { s: 'james-winebrenner', p: 'ceoOf', o: 'elisity', status: 'current; continues as CEO after closing', source: ELISITY_ACQ },
      { s: 'niccolo-de-masi', p: 'ceoOf', o: 'ionq', status: 'current; Chairman and CEO', source: ELISITY_ACQ },
      { s: 'news-ionq-acquires-elisity', p: 'publishedBy', o: 'ionq' },
      { s: 'news-ionq-acquires-elisity', p: 'about', o: 'elisity' },
      { s: 'news-ionq-acquires-elisity', p: 'about', o: 'ionq' },
    ],
  },
  {
    id: 'news-revenium-seed',
    type: 'NewsArticle',
    title: 'Revenium closes $13.5M seed round led by Two Bear Capital',
    date: 'PR Newswire • November 2025',
    isoDate: '2025-11',
    publisher: 'pr-newswire',
    description: 'Revenium announces a $13.5M seed round led by Two Bear Capital with participation from WestWave Capital to expand its AI economics platform.',
    link: 'https://www.prnewswire.com/news-releases/revenium-closes-13-5-million-seed-round-funding-led-by-two-bear-capital-with-participation-from-westwave-capital-302620790.html',
    linkText: 'Read announcement',
    relations: [
      { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'revenium', date: '2025-11', detail: '$13.5M seed' },
      { s: 'westwave-capital', p: 'investorIn', o: 'revenium', date: '2025-11', detail: '$13.5M seed' },
      { s: ME, p: 'boardObserverOf', o: 'revenium', status: 'current', source: SELF_SOURCE },
      { s: 'news-revenium-seed', p: 'publishedBy', o: 'pr-newswire' },
      { s: 'news-revenium-seed', p: 'about', o: 'revenium' },
    ],
  },
  {
    id: 'talk-ieee-quantum-week-2025',
    type: 'Event',
    title: 'IEEE Quantum Week 2025 - Panel: Bridging the Human Gap in Quantum Readiness',
    date: 'IEEE Quantum Week • September 2025',
    isoDate: '2025-09',
    publisher: 'ieee',
    description: 'Panel discussion on human and institutional readiness for quantum technologies, examining challenges in communication, trust-building, and practical deployment across disciplines.',
    link: 'https://qce.quantum.ieee.org/2025/program/wednesday-schedule/',
    linkText: 'View panel details',
    relations: [
      { s: ME, p: 'panelistAt', o: 'ieee-quantum-week-2025', detail: 'Bridging the Human Gap in Quantum Readiness' },
      { s: 'ieee-quantum-week-2025', p: 'organizedBy', o: 'ieee' },
    ],
  },
  {
    id: 'news-qusecure-series-a',
    type: 'NewsArticle',
    title: 'QuSecure raises additional Series A led by Two Bear Capital',
    date: 'QuSecure Newsroom • February 2025',
    isoDate: '2025-02',
    publisher: 'qusecure',
    description: 'QuSecure expands its Series A to $28M with Two Bear Capital as lead and participation from Accenture Ventures.',
    link: 'https://www.qusecure.com/qusecure-closes-additional-series-a-funding-led-by-two-bear-capital-with-participation-from-accenture/',
    linkText: 'Read announcement',
    relations: [
      { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'qusecure', date: '2025-02', detail: 'Series A extension; Series A total $28M' },
      { s: 'accenture-ventures', p: 'investorIn', o: 'qusecure', date: '2025-02', detail: 'Series A extension' },
      { s: ME, p: 'boardObserverOf', o: 'qusecure', status: 'current', source: SELF_SOURCE },
      { s: 'news-qusecure-series-a', p: 'publishedBy', o: 'qusecure' },
      { s: 'news-qusecure-series-a', p: 'about', o: 'qusecure' },
    ],
  },
  {
    id: 'talk-scaling-montana-2024',
    type: 'Event',
    title: 'Scaling Montana Summit 2024 - Mainstage Speaker',
    date: 'Scaling Montana • 2024',
    isoDate: '2024',
    publisher: 'scaling-montana-2024',
    description: "Cris Neckar spoke at the Scaling Montana Summit 2024 as a mainstage speaker, sharing insights on cybersecurity and the sometimes silly differences between people's perception of hacking and the real thing.",
    link: 'https://scalingmt.org/summit-2024/mainstage/',
    linkText: 'View event details',
    relations: [
      { s: ME, p: 'spokeAt', o: 'scaling-montana-2024', detail: 'mainstage speaker' },
    ],
  },
  {
    id: 'media-security-conversations',
    type: 'PodcastEpisode',
    title: 'Security Conversations: Early days of securing Chrome',
    date: 'Security Conversations • November 2024',
    isoDate: '2024-11',
    publisher: 'security-conversations',
    description: 'Long-form interview on browser security, nation-state ops, and the path from researcher to investor.',
    link: 'https://securityconversations.com/episode/cris-neckar-on-the-early-days-of-securing-chrome-chasing-browser-exploits/',
    linkText: 'Listen',
    relations: [
      { s: ME, p: 'interviewedIn', o: 'media-security-conversations' },
      { s: 'media-security-conversations', p: 'publishedBy', o: 'security-conversations' },
      { s: 'media-security-conversations', p: 'about', o: 'google-chrome' },
    ],
  },
  {
    id: 'news-binarly-seed',
    type: 'NewsArticle',
    title: 'Binarly closes $10.5M seed led by Two Bear Capital',
    date: 'Binarly • March 2024',
    isoDate: '2024-03',
    publisher: 'binarly',
    description: "Funding to scale Binarly's software supply chain and firmware security platform; Two Bear Capital leads the round.",
    link: 'https://www.binarly.io/news/software-supply-chain-security-leader-binarly-closes-10-5-million-financing-led-by-two-bear-capital',
    linkText: 'Read press release',
    relations: [
      { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'binarly', date: '2024-03', detail: '$10.5M financing' },
      { s: ME, p: 'boardObserverOf', o: 'binarly', status: 'current', source: SELF_SOURCE },
      { s: 'news-binarly-seed', p: 'publishedBy', o: 'binarly' },
      { s: 'news-binarly-seed', p: 'about', o: 'binarly' },
    ],
  },
  {
    id: 'news-dymium-funding',
    type: 'NewsArticle',
    title: 'Dymium funding roundup coverage',
    date: 'SecurityWeek • March 2024',
    isoDate: '2024-03',
    publisher: 'securityweek',
    description: 'Launch of a zero-trust data security platform with secure AI chat; Two Bear Capital leads the funding.',
    link: 'https://www.securityweek.com/dymium-snags-7m-to-build-data-security-platform-with-secure-ai-chat/',
    linkText: 'Read coverage',
    relations: [
      { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'dymium', date: '2024-03', detail: '$7M funding' },
      { s: ME, p: 'boardObserverOf', o: 'dymium', status: 'current', source: SELF_SOURCE },
      { s: 'news-dymium-funding', p: 'publishedBy', o: 'securityweek' },
      { s: 'news-dymium-funding', p: 'about', o: 'dymium' },
    ],
  },
  {
    id: 'media-esw-201',
    type: 'PodcastEpisode',
    title: 'Trading Least Privilege for Security Theater',
    date: 'Enterprise Security Weekly (ESW #201) • October 2020',
    isoDate: '2020-10',
    publisher: 'security-weekly',
    description: 'Podcast segment on aligning privilege models with real-world threats and operations.',
    link: 'https://www.scworld.com/podcast-segment/8789-trading-least-privilege-for-security-theater-cris-neckar-esw-201',
    linkText: 'Listen',
    relations: [
      { s: ME, p: 'interviewedIn', o: 'media-esw-201' },
      { s: 'media-esw-201', p: 'publishedBy', o: 'security-weekly' },
    ],
  },
  {
    id: 'media-hello-whitefish',
    type: 'PodcastEpisode',
    title: 'Hello Whitefish: Hacking life & Two Bear Capital',
    date: 'Podcast • February 2024',
    isoDate: '2024-02',
    publisher: 'hello-whitefish',
    description: 'Conversational episode on careers in security, AI, and building in Montana.',
    link: 'https://hellowhitefishmt.podbean.com/e/hello-whitefish-cris-neckar-two-bear-capitol-episode-14/',
    linkText: 'Listen',
    relations: [
      { s: ME, p: 'interviewedIn', o: 'media-hello-whitefish' },
      { s: 'media-hello-whitefish', p: 'publishedBy', o: 'hello-whitefish' },
      { s: 'media-hello-whitefish', p: 'about', o: 'two-bear-capital' },
    ],
  },
  {
    id: 'media-flathead-beacon',
    type: 'NewsArticle',
    title: 'Feature: Hacking into the Flathead',
    date: 'Flathead Beacon • November 2020',
    isoDate: '2020-11-06',
    publisher: 'flathead-beacon',
    description: "Profile of Cris Neckar's path from security researcher to executive and investor in Whitefish, MT.",
    link: 'https://flatheadbeacon.com/2020/11/06/hacking-into-the-flathead/',
    linkText: 'Read story',
    relations: [
      { s: ME, p: 'profiledIn', o: 'media-flathead-beacon' },
      { s: 'media-flathead-beacon', p: 'publishedBy', o: 'flathead-beacon' },
    ],
  },
  {
    id: 'news-pulsedata-series-a',
    type: 'NewsArticle',
    title: 'PulseData AI raises $16.5M Series A co-led by Two Bear Capital',
    date: 'Latham & Watkins • April 2021',
    isoDate: '2021-04-21',
    publisher: 'latham-watkins',
    description: 'pulseData, which works with health systems to improve outcomes for chronic kidney disease patients, raises a $16.5M Series A co-led by Two Bear Capital and Bain Capital.',
    link: 'https://www.lw.com/en/news/latham-watkins-advises-pulsedata-series-a',
    linkText: 'Read announcement',
    relations: [
      { s: 'two-bear-capital', p: 'leadInvestorIn', o: 'pulsedata', date: '2021-04', detail: 'co-led $16.5M Series A with Bain Capital' },
      { s: 'bain-capital', p: 'leadInvestorIn', o: 'pulsedata', date: '2021-04', detail: 'co-led $16.5M Series A with Two Bear Capital' },
      { s: ME, p: 'boardObserverOf', o: 'pulsedata', status: 'current', source: SELF_SOURCE },
      { s: 'news-pulsedata-series-a', p: 'publishedBy', o: 'latham-watkins' },
      { s: 'news-pulsedata-series-a', p: 'about', o: 'pulsedata' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Credited vulnerabilities
// ---------------------------------------------------------------------------

export interface Cve {
  id: string;
  product: string; // entity id
  software: string; // display name
  vuln: string;
  link: string;
}

const cve = (id: string, product: string, vuln: string, link: string): Cve => ({
  id,
  product,
  software: ENTITIES.find(e => e.id === product)!.name,
  vuln,
  link,
});

export const CVES: Cve[] = [
  cve('CVE-2018-17568', 'viabtc-exchange', 'Memory Corruption', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-17568'),
  cve('CVE-2018-17569', 'viabtc-exchange', 'Memory Corruption', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-17569'),
  cve('CVE-2018-17570', 'viabtc-exchange', 'Memory Corruption', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-17570'),
  cve('CVE-2017-6753', 'cisco-webex', 'Remote Command Execution', 'https://tools.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-20170717-webex'),
  cve('CVE-2016-9189', 'python-pillow', 'Memory Corruption', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-9189'),
  cve('CVE-2016-9190', 'python-pillow', 'Memory Corruption', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-9190'),
  cve('CVE-2015-0059', 'microsoft-windows', 'Memory Corruption', 'https://technet.microsoft.com/library/security/dn903755.aspx'),
  cve('CVE-2015-0060', 'microsoft-windows', 'Memory Corruption', 'https://technet.microsoft.com/library/security/dn903755.aspx'),
  cve('CVE-2013-0917', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2013/03/stable-channel-update_26.html'),
  cve('CVE-2013-0896', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2013/02/stable-channel-update_21.html'),
  cve('CVE-2013-0836', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2013/01/stable-channel-update.html'),
  cve('CVE-2013-0834', 'google-chrome', 'Buffer Overflow', 'http://googlechromereleases.blogspot.com/2013/01/stable-channel-update.html'),
  cve('CVE-2013-0833', 'google-chrome', 'Buffer Overflow', 'http://googlechromereleases.blogspot.com/2013/01/stable-channel-update.html'),
  cve('CVE-2013-0832', 'google-chrome', 'Use After Free', 'http://googlechromereleases.blogspot.com/2012/12/stable-channel-update.html'),
  cve('CVE-2012-5143', 'google-chrome', 'Integer Overflow', 'http://googlechromereleases.blogspot.com/2012/12/stable-channel-update.html'),
  cve('CVE-2012-5128', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2012/11/stable-channel-release-and-beta-channel.html'),
  cve('CVE-2012-3605', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT202561'),
  cve('CVE-2012-2893', 'google-chrome', 'Double Free', 'http://googlechromereleases.blogspot.com/2012/09/stable-channel-update_25.html'),
  cve('CVE-2012-2892', 'google-chrome', 'Pop-up Blocker Bypass', 'http://googlechromereleases.blogspot.com/2012/09/stable-channel-update_25.html'),
  cve('CVE-2012-2880', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2012/09/stable-channel-update_25.html'),
  cve('CVE-2012-2523', 'internet-explorer', 'Integer Overflow', 'https://technet.microsoft.com/library/security/ms12-056'),
  cve('CVE-2012-0632', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT202433'),
  cve('CVE-2011-3922', 'google-chrome', 'Buffer Overflow', 'http://googlechromereleases.blogspot.com/2011/12/stable-channel-update.html'),
  cve('CVE-2011-3910', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2011/12/stable-channel-update.html'),
  cve('CVE-2011-3233', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT4981'),
  cve('CVE-2011-2872', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT202433'),
  cve('CVE-2011-2869', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT202433'),
  cve('CVE-2011-2813', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT4981'),
  cve('CVE-2011-2339', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT202349'),
  cve('CVE-2011-1806', 'google-chrome', 'Memory Corruption', 'http://googlechromereleases.blogspot.com/2011/05/stable-channel-update_24.html'),
  cve('CVE-2011-1800', 'google-chrome', 'Multiple Integer Overflows', 'http://googlechromereleases.blogspot.com/2011/05/stable-channel-update.html'),
  cve('CVE-2010-3821', 'apple-webkit', 'Memory Corruption', 'http://support.apple.com/en-us/HT4455'),
  cve('CVE-2010-3805', 'apple-webkit', 'Integer Overflow', 'http://support.apple.com/en-us/HT4455'),
];
