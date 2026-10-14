// Turns src/data/knowledge.ts into machine-readable relationship formats.
// Pure functions with no DOM access, so both the page and the build
// (vite.config.ts) can import them.

import {
  COVERAGE,
  CVES,
  ENTITIES,
  PREDICATES,
  PUBLICATIONS,
  RELATIONS,
  SITE,
  type Entity,
  type Predicate,
  type Relation,
} from './knowledge.ts';

export const VOCAB = `${SITE}vocab#`;
export const ROOT = 'cris-neckar';

export const iri = (id: string) => `${SITE}#${id}`;

// ---------------------------------------------------------------------------
// Assemble entities and relations
// ---------------------------------------------------------------------------

function collectEntities(): Map<string, Entity> {
  const all: Entity[] = [
    ...ENTITIES,
    ...PUBLICATIONS.map(p => ({ id: p.id, name: p.title, type: p.type, url: p.link, date: p.isoDate, description: p.description })),
    ...COVERAGE.map(c => ({ id: c.id, name: c.title, type: c.type, url: c.link, date: c.isoDate, description: c.description })),
    ...CVES.map(c => ({
      id: c.id,
      name: c.id,
      type: 'Vulnerability' as const,
      url: c.link,
      sameAs: [`https://nvd.nist.gov/vuln/detail/${c.id}`, `https://www.cve.org/CVERecord?id=${c.id}`],
      description: `${c.vuln} in ${c.software}`,
    })),
  ];
  const map = new Map<string, Entity>();
  for (const e of all) if (!map.has(e.id)) map.set(e.id, e);
  return map;
}

function collectRelations(): Relation[] {
  const withSource = (rels: Relation[], source: string) => rels.map(r => ({ source, ...r }));
  const all: Relation[] = [
    ...RELATIONS,
    ...COVERAGE.flatMap(c => withSource(c.relations, c.link)),
    ...PUBLICATIONS.flatMap(p => withSource(p.relations, p.link)),
    ...CVES.flatMap(c => [
      { s: ROOT, p: 'discovered' as const, o: c.id, detail: c.vuln, source: c.link },
      { s: c.id, p: 'affects' as const, o: c.product, source: c.link },
    ]),
  ];
  // The same fact can be listed in several places (e.g. a career fact repeated
  // on the news item that mentions it). Keep one, merging qualifiers.
  const byKey = new Map<string, Relation>();
  for (const r of all) {
    const key = `${r.s}|${r.p}|${r.o}`;
    const prev = byKey.get(key);
    byKey.set(key, prev ? { ...r, ...stripUndefined(prev) } : r);
  }
  return [...byKey.values()];
}

function stripUndefined<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

export const ENTITY_MAP = collectEntities();
export const ALL_RELATIONS = collectRelations();

for (const r of ALL_RELATIONS) {
  for (const id of [r.s, r.o]) {
    if (!ENTITY_MAP.has(id)) throw new Error(`knowledge graph: unknown entity "${id}" in ${r.s} ${r.p} ${r.o}`);
  }
}

const name = (id: string) => ENTITY_MAP.get(id)!.name;
const pred = (r: Relation): Predicate => PREDICATES[r.p];

// ---------------------------------------------------------------------------
// Human-readable forms
// ---------------------------------------------------------------------------

export interface Path {
  hops: Relation[];
}

// Two-hop chains starting at Cris Neckar through an organization, e.g.
// Cris Neckar -board observer of-> Elisity -acquired by-> IonQ.
export function paths(): Path[] {
  const orgTypes = new Set(['Organization', 'Corporation', 'EducationalOrganization']);
  const out: Path[] = [];
  for (const first of ALL_RELATIONS) {
    if (first.s !== ROOT || !orgTypes.has(ENTITY_MAP.get(first.o)!.type)) continue;
    for (const second of ALL_RELATIONS) {
      if (second.s === first.o && second.o !== ROOT) out.push({ hops: [first, second] });
    }
  }
  return out;
}

export const relationText = (r: Relation) => `${name(r.s)} | ${pred(r).label} | ${name(r.o)}`;

export const pathText = (p: Path) =>
  [name(p.hops[0].s), ...p.hops.map(h => `-${pred(h).label}-> ${name(h.o)}`)].join(' ');

function qualifiers(r: Relation): string[] {
  const q: string[] = [];
  if (r.date) q.push(`date: ${r.date}`);
  if (r.status) q.push(`status: ${r.status}`);
  if (r.detail) q.push(`detail: ${r.detail}`);
  if (r.source) q.push(`source: ${r.source}`);
  return q;
}

export const relationLine = (r: Relation) => [relationText(r), ...qualifiers(r)].join(' | ');

// Relations to show on a page card: everything sourced from that item, plus
// the item's own explicit relations, minus bookkeeping like publishedBy.
export function relationsForItem(item: { link: string; relations: Relation[] }): Relation[] {
  const hidden = new Set(['publishedBy', 'about']);
  return ALL_RELATIONS.filter(
    r => !hidden.has(r.p) && (r.source === item.link || item.relations.some(i => i.s === r.s && i.p === r.p && i.o === r.o)),
  );
}

// ---------------------------------------------------------------------------
// Plain text (/relationships.txt and llms consumers)
// ---------------------------------------------------------------------------

export function buildText(): string {
  const lines = [
    '# Cris Neckar — entity relationships',
    '#',
    `# Machine-readable list of the relationships between the people, organizations,`,
    `# publications, news and vulnerabilities on ${SITE}`,
    '# Format: subject | predicate | object | qualifier: value | ...',
    '# Qualifiers: date (ISO), status, detail, source (URL supporting the claim).',
    `# The same data as JSON-LD (schema.org + rdf:Statement): ${SITE}relationships.jsonld`,
    '',
    '## Paths (two-hop chains from Cris Neckar)',
    '',
    ...paths().map(pathText),
    '',
    '## Relations',
    '',
    ...ALL_RELATIONS.map(relationLine),
    '',
  ];
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

type Node = Record<string, unknown>;

const SCHEMA_TYPE: Partial<Record<Entity['type'], string>> = { Vulnerability: 'Thing' };

export function buildJsonLd(): Node {
  const nodes = new Map<string, Node>();
  for (const e of ENTITY_MAP.values()) {
    const node: Node = { '@id': iri(e.id), '@type': SCHEMA_TYPE[e.type] ?? e.type, name: e.name };
    if (e.type === 'Vulnerability') {
      node.additionalType = 'https://www.wikidata.org/wiki/Q631425'; // software vulnerability
      node.identifier = e.id;
    }
    if (e.alternateName) node.alternateName = e.alternateName;
    if (e.url) node.url = e.url;
    if (e.sameAs) node.sameAs = e.sameAs;
    if (e.description) node.description = e.description;
    if (e.date) node[e.type === 'Event' ? 'startDate' : 'datePublished'] = e.date;
    nodes.set(e.id, node);
  }

  // Express each relation natively in schema.org where a property exists.
  for (const r of ALL_RELATIONS) {
    const s = pred(r).schema;
    if (!s) continue;
    const [holder, target] = s.on === 'subject' ? [r.s, r.o] : [r.o, r.s];
    const ref = { '@id': iri(target) };
    let value: Node = ref;
    if (s.role) {
      value = { '@type': 'OrganizationRole', roleName: s.role, [s.prop]: ref };
      if (r.date) value.startDate = r.date;
      if (r.status) value.description = r.status;
    }
    const node = nodes.get(holder)!;
    node[s.prop] = [...((node[s.prop] as Node[] | undefined) ?? []), value];
  }

  const vocab = Object.entries(PREDICATES).map(([key, p]: [string, Predicate]) => ({
    '@id': `${VOCAB}${key}`,
    '@type': 'rdf:Property',
    'rdfs:label': p.label,
    ...(p.inverse ? { 'cnv:inverseLabel': p.inverse } : {}),
    ...(p.schema ? { 'cnv:schemaOrgProperty': { '@id': `https://schema.org/${p.schema.prop}` } } : {}),
  }));

  // Every relation also as an explicit, reified triple with its qualifiers.
  const statements = ALL_RELATIONS.map(r => ({
    '@type': 'rdf:Statement',
    'rdf:subject': { '@id': iri(r.s) },
    'rdf:predicate': { '@id': `${VOCAB}${r.p}` },
    'rdf:object': { '@id': iri(r.o) },
    'rdfs:label': relationText(r),
    ...(r.date ? { 'cnv:date': r.date } : {}),
    ...(r.status ? { 'cnv:status': r.status } : {}),
    ...(r.detail ? { 'cnv:detail': r.detail } : {}),
    ...(r.source ? { 'cnv:source': { '@id': r.source } } : {}),
  }));

  return {
    '@context': [
      'https://schema.org',
      {
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        cnv: VOCAB,
      },
    ],
    '@graph': [...nodes.values(), ...statements, ...vocab],
  };
}

// ---------------------------------------------------------------------------
// HTML (<head> meta tags and pre-rendered crawler text)
// ---------------------------------------------------------------------------

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function buildHeadHtml(): string {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c');
  return [
    '<!-- Entity relationships, generated from src/data/knowledge.ts at build time. -->',
    `<meta name="kg:format" content="kg:relation = subject | predicate | object | qualifier: value ...; kg:path = two-hop chain from Cris Neckar. Full data: ${SITE}relationships.jsonld and ${SITE}relationships.txt" />`,
    `<link rel="alternate" type="application/ld+json" title="Entity relationships (JSON-LD)" href="${SITE}relationships.jsonld" />`,
    `<link rel="alternate" type="text/plain" title="Entity relationships (text)" href="${SITE}relationships.txt" />`,
    ...paths().map(p => `<meta name="kg:path" content="${esc(pathText(p))}" />`),
    ...ALL_RELATIONS.map(r => `<meta name="kg:relation" content="${esc(relationLine(r))}" />`),
    `<script type="application/ld+json">\n${json}\n</script>`,
  ].join('\n    ');
}

export function buildBodyHtml(): string {
  return [
    '<h2>Relationships</h2>',
    '<ul>',
    ...paths().map(p => `  <li>${esc(pathText(p))}</li>`),
    ...ALL_RELATIONS.map(r => `  <li>${esc(relationLine(r))}</li>`),
    '</ul>',
  ].join('\n        ');
}
