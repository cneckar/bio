import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExternalLink, Download, Mail, Linkedin, PresentationIcon } from 'lucide-react';
import { COVERAGE, CVES, PREDICATES, PUBLICATIONS, type Relation } from './data/knowledge';
import { ENTITY_MAP, relationsForItem } from './data/graph';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<BioPage />} />
      </Routes>
    </Router>
  );
}

// The entity relationships an item documents, e.g.
// "Elisity → acquired by → IonQ". Same data as the kg:relation meta tags.
function Relations({ item }: { item: { link: string; relations: Relation[] } }) {
  const rels = relationsForItem(item);
  if (rels.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1 text-xs text-gray-500" aria-label="Relationships">
      {rels.map((r) => (
        <li key={`${r.s}|${r.p}|${r.o}`}>
          {ENTITY_MAP.get(r.s)!.name} <span className="text-gray-400">→ {PREDICATES[r.p].label} →</span>{' '}
          {ENTITY_MAP.get(r.o)!.name}
          {r.status && <span className="text-gray-400"> ({r.status})</span>}
        </li>
      ))}
    </ul>
  );
}

function BioPage() {
  const [vulnPage, setVulnPage] = React.useState(1);
  const [pubPage, setPubPage] = React.useState(1);
  const [coveragePage, setCoveragePage] = React.useState(1);
  const vulnPerPage = 10;
  const pubPerPage = 4;
  const coveragePerPage = 4;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here if you want
      console.log('Text copied');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-zinc-100">Public profile and press resources</p>
            <div className="hidden md:flex space-x-8" role="navigation" aria-label="Section navigation">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="About Cris Neckar at Two Bear Capital"
              >
                About Cris Neckar
              </button>
              <button 
                onClick={() => scrollToSection('publications')}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Research publications and technical analysis by Cris Neckar"
              >
                Publications
              </button>
              <button 
                onClick={() => scrollToSection('media')}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Media resources and press materials for Cris Neckar"
              >
                Press & Media Resources
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="pt-24 pb-16 bg-gradient-to-br from-zinc-800 to-zinc-900" aria-labelledby="hero-heading">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 id="hero-heading" className="text-5xl font-bold text-white mb-6 leading-tight">
              Cris Neckar
              </h1>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                  Investor, Entrepreneur, Director, Advisor, Hacker, and Researcher.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/crisneckar/" 
                  className="inline-flex items-center px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all"
                >
                  <img src="/img/li.png" alt="LinkedIn" className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
                <a 
                  href="https://www.crunchbase.com/person/cris-neckar-a44f" 
                  className="inline-flex items-center px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all"
                >
                  <img src="/img/cb.png" alt="Crunchbase" className="w-5 h-5 mr-2" />
                  Crunchbase
                </a>
                <a 
                  href="https://www.twobearcapital.com/team/cris-neckar" 
                  className="inline-flex items-center px-6 py-3 border border-zinc-700 text-zinc-300 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all"
                >
                  <img src="/img/tbc.png" alt="Two Bear Capital" className="w-5 h-5 mr-2" />
                  Two Bear Capital
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-300 rounded-2xl flex items-center justify-center">
                <img 
                  src="./img/cn5.jpg" 
                  alt="Professional headshot"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" aria-labelledby="about-heading" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 id="about-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">About</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-lg leading-relaxed mb-6">
              Cris Neckar is a Partner at Two Bear Capital, where he invests in Cybersecurity, advanced technologies, 
              and the intersection of tech and life sciences. A 20-year veteran of the information security industry, 
              Cris has led groundbreaking work in vulnerability research, offensive security, and incident response.
              He serves as a board observer at Binarly, Dymium, Elisity, PulseData AI, QuSecure, and Revenium.
              In October 2026, IonQ agreed to acquire Elisity.
              </p>
              <p className="text-lg leading-relaxed mb-6">
              He previously served as Chief Information Security Officer for Spring Labs, leveraging decentralized 
              technology to solve complex problems in data sovereignty and security. As co-founder of Divergent Security, 
              he pioneered continuous offensive assessment services and played a pivotal role in the initial discovery 
              and analysis of NSO Group’s Pegasus spyware.
              </p>
              <p className="text-lg leading-relaxed mb-6">
              Earlier in his career, Cris was one of the original members of Google’s Chrome Security Team, contributing 
              to advancements in browser hardening, attack mitigation, automated vulnerability discovery, and the exposure 
              of nation-state campaigns - work that helped lay the foundation for Google’s Project Zero, and Open Source 
              Software Security Team. He began his career at Neohapsis (now Cisco Systems), where he led the reverse 
              engineering effort during the investigation of the Heartland Payment Systems breach, then the largest breach 
              in history.
              </p>
              <p className="text-lg leading-relaxed mb-6">
              Cris’s research is widely cited in the security community, and he has spoken at major technical conferences 
              around the world. He has also served as a Curriculum Advisory Board member and Adjunct Professor at DePaul 
              University, developing one of the first graduate-level courses in application security assessment and exploit 
              development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications & Coverage */}
      <section id="publications" aria-labelledby="publications-heading" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="publications-heading" className="text-3xl font-bold text-gray-900 mb-12 text-center">Publications & Coverage</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Publications</h3>
              <div className="space-y-4">
                {PUBLICATIONS
                .slice((pubPage - 1) * pubPerPage, pubPage * pubPerPage)
                .map((pub) => (
                  <div key={pub.id} id={pub.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-2">{pub.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{pub.date}</p>
                    <p className="text-gray-600">{pub.description}</p>
                    <Relations item={pub} />
                    <a href={pub.link} target="_blank" rel="noopener" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mt-2">
                      {pub.linkText} <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {Math.min((pubPage - 1) * pubPerPage + 1, PUBLICATIONS.length)} - {Math.min(pubPage * pubPerPage, PUBLICATIONS.length)} of {PUBLICATIONS.length} publications
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPubPage(p => Math.max(1, p - 1))}
                      disabled={pubPage === 1}
                      className={`px-3 py-1 rounded ${
                        pubPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPubPage(p => Math.min(Math.ceil(PUBLICATIONS.length / pubPerPage), p + 1))}
                      disabled={pubPage >= Math.ceil(PUBLICATIONS.length / pubPerPage)}
                      className={`px-3 py-1 rounded ${
                        pubPage >= Math.ceil(PUBLICATIONS.length / pubPerPage)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Media Coverage</h3>
              <div className="space-y-4">
                {COVERAGE
                .slice((coveragePage - 1) * coveragePerPage, coveragePage * coveragePerPage)
                .map((coverage) => (
                  <div key={coverage.id} id={coverage.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-gray-900 mb-2">{coverage.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{coverage.date}</p>
                    <p className="text-gray-600">{coverage.description}</p>
                    <Relations item={coverage} />
                    <a href={coverage.link} target="_blank" rel="noopener" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 mt-2">
                      {coverage.linkText} <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {Math.min((coveragePage - 1) * coveragePerPage + 1, COVERAGE.length)} - {Math.min(coveragePage * coveragePerPage, COVERAGE.length)} of {COVERAGE.length} articles
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCoveragePage(p => Math.max(1, p - 1))}
                      disabled={coveragePage === 1}
                      className={`px-3 py-1 rounded ${
                        coveragePage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCoveragePage(p => Math.min(Math.ceil(COVERAGE.length / coveragePerPage), p + 1))}
                      disabled={coveragePage >= Math.ceil(COVERAGE.length / coveragePerPage)}
                      className={`px-3 py-1 rounded ${
                        coveragePage >= Math.ceil(COVERAGE.length / coveragePerPage)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Vulnerabilities */}
      <section id="vulnerabilities" aria-labelledby="vulnerabilities-heading" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="vulnerabilities-heading" className="text-3xl font-bold text-gray-900 mb-12 text-center">Selected Vulnerability Disclosures</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-900">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold border-b">CVE ID</th>
                  <th className="py-3 px-4 text-left font-semibold border-b">Software</th>
                  <th className="py-3 px-4 text-left font-semibold border-b">Vulnerability</th>
                  <th className="py-3 px-4 text-left font-semibold border-b">Details</th>
                </tr>
              </thead>
              <tbody>
                {CVES
                .slice((vulnPage - 1) * vulnPerPage, vulnPage * vulnPerPage)
                .map((cve) => (
                  <tr key={cve.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{cve.id}</td>
                    <td className="py-2 px-4">{cve.software}</td>
                    <td className="py-2 px-4">{cve.vuln}</td>
                    <td className="py-2 px-4">
                      <a href={cve.link} target="_blank" rel="noopener" className="text-emerald-500 hover:text-emerald-400">
                        View {cve.id} Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {Math.min((vulnPage - 1) * vulnPerPage + 1, CVES.length)} - {Math.min(vulnPage * vulnPerPage, CVES.length)} of {CVES.length} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setVulnPage(p => Math.max(1, p - 1))}
                  disabled={vulnPage === 1}
                  className={`px-3 py-1 rounded ${
                    vulnPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setVulnPage(p => Math.min(Math.ceil(CVES.length / vulnPerPage), p + 1))}
                  disabled={vulnPage >= Math.ceil(CVES.length / vulnPerPage)}
                  className={`px-3 py-1 rounded ${
                    vulnPage >= Math.ceil(CVES.length / vulnPerPage)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Media Resources */}
      <section id="media" aria-labelledby="media-heading" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="media-heading" className="text-3xl font-bold text-gray-900 mb-12 text-center">Media Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Biography Versions</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Short Bio (50 words)</h4>
                    <button 
                      onClick={() => copyToClipboard("Cris Neckar is a Partner at Two Bear Capital, investing in cybersecurity and advanced technology. A 20-year security veteran, he has led groundbreaking vulnerability research, co-founded Divergent Security, served as CISO of Spring Labs, and was an original member of Google's Chrome Security Team uncovering nation-state and criminal campaigns.")}
                      className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    Cris Neckar is a Partner at Two Bear Capital, investing in cybersecurity and advanced technology. A 20-year 
                    security veteran, he has led groundbreaking vulnerability research, co-founded Divergent Security, served 
                    as CISO of Spring Labs, and was an original member of Google's Chrome Security Team uncovering nation-state 
                    and criminal campaigns.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Medium Bio (100 words)</h4>
                    <button 
                      onClick={() => copyToClipboard("Cris Neckar is a Partner at Two Bear Capital, investing in cybersecurity, advanced technologies, and the intersection of tech and life sciences. A 20-year veteran of the information security industry, he has served as CISO of Spring Labs, co-founded Divergent Security, and was an original member of Google's Chrome Security Team, where his work helped lay the foundation for Project Zero. Cris has led investigations into major breaches, including the Heartland Payment Systems incident and the discovery of NSO Group's Pegasus spyware. He frequently speaks at leading security conferences and has taught graduate-level courses on application security and exploit development.")}
                      className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                  Cris Neckar is a Partner at Two Bear Capital, investing in cybersecurity, advanced technologies, and the 
                  intersection of tech and life sciences. A 20-year veteran of the information security industry, he has served 
                  as CISO of Spring Labs, co-founded Divergent Security, and was an original member of Google's Chrome Security 
                  Team, where his work helped lay the foundation for Project Zero. Cris has led investigations into major breaches, 
                  including the Heartland Payment Systems incident and the discovery of NSO Group's Pegasus spyware. He frequently 
                  speaks at leading security conferences and has taught graduate-level courses on application security and exploit 
                  development.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Long Form Bio</h4>
                    <button 
                      onClick={() => copyToClipboard("Cris Neckar is a Partner at Two Bear Capital, an advisor to a diverse set of startups, and a veteran of more than two decades in the information security industry. He invests at the intersection of cybersecurity, advanced technologies, and life sciences, bringing deep technical expertise to high-impact opportunities.\n\nPrior to joining Two Bear Capital, Cris served as Chief Information Security Officer at Spring Labs, where he built comprehensive security, compliance, and product security programs for a decentralized data tokenization platform. He co-founded Divergent Security, a top-tier offensive cybersecurity assessment firm, pioneering continuous security assessment methodologies and leading investigations into some of the world's most significant breaches—including the initial discovery and analysis of NSO Group's Pegasus spyware.\n\nEarlier in his career, Cris was one of the original members of Google's Chrome Security Team, where his work in browser hardening, automated vulnerability discovery, and incident response helped lay the foundation for Google's Project Zero and the Open Source Software Security Team. He also led breach investigations at Neohapsis (now Cisco Systems), including the Heartland Payment Systems compromise.\n\nCris's research has resulted in public advisories for remotely exploitable vulnerabilities in Microsoft Windows, Internet Explorer, Chrome, Cisco WebEx, and court-approved law enforcement investigative tools. He co-created the Chrome Vulnerability Rewards Program, a model adopted across the industry. In addition to frequent speaking engagements at top security conferences, Cris has contributed to academia as a curriculum advisory board member and adjunct professor at DePaul University's cybersecurity graduate program, developing and teaching one of the first graduate-level courses on application assessment and exploit development.")}
                      className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    <p className="text-gray-600 leading-relaxed text-sm">Cris Neckar is a Partner at Two Bear Capital, an advisor to a diverse set of startups, and a 
                    veteran of more than two decades in the information security industry. He invests at the intersection of cybersecurity, 
                    advanced technologies, and life sciences, bringing deep technical expertise to high-impact opportunities.</p>
                    <p className="text-gray-600 leading-relaxed text-sm">Prior to joining Two Bear Capital, Cris served as Chief Information Security Officer at Spring Labs, where he built 
                      comprehensive security, compliance, and product security programs for a decentralized data tokenization platform. He 
                      co-founded Divergent Security, a top-tier offensive cybersecurity assessment firm, pioneering continuous security assessment 
                      methodologies and leading investigations into some of the world’s most significant breaches—including the initial discovery 
                      and analysis of NSO Group’s Pegasus spyware.</p>
                    <p className="text-gray-600 leading-relaxed text-sm">Earlier in his career, Cris was one of the original members of Google’s Chrome Security Team, where his work in browser 
                      hardening, automated vulnerability discovery, and incident response helped lay the foundation for Google’s Project Zero 
                      and the Open Source Software Security Team. He also led breach investigations at Neohapsis (now Cisco Systems), including 
                      the Heartland Payment Systems compromise.</p>
                    <p className="text-gray-600 leading-relaxed text-sm">Cris’s research has resulted in public advisories for remotely exploitable vulnerabilities in Microsoft Windows, Internet 
                      Explorer, Chrome, Cisco WebEx, and court-approved law enforcement investigative tools. He contributed to creation of the Chrome Vulnerability 
                      Rewards Program, and the Pwnium exploitation competition, a model adopted across the industry. In addition to frequent speaking engagements at top security conferences, 
                      Cris has contributed to academia as a curriculum advisory board member and adjunct professor at DePaul University’s cybersecurity 
                      graduate program, developing and teaching one of the first graduate-level courses on application assessment and exploit development.</p>
                  </p>
                  <a
                    href="/files/Cris-Neckar-1-Pager-Bio.pdf"  
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
                  >
                  <button className="text-emerald-500 hover:text-emerald-400 text-sm mt-2">Download 1-Pager Bio</button>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Media Assets</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-4">Headshots Approved for Media Use</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <a 
                      href="/img/cn.jpg" 
                      download
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src="/img/cn.jpg" 
                        alt="Default Casual Headshot"
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <a 
                      href="/img/cn1.jpg" 
                      download
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src="/img/cn1.jpg" 
                        alt="Default Formal Headshot"
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <a 
                      href="/img/cn2.webp" 
                      download
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src="/img/cn2.webp" 
                        alt="Casual Headshot"
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <a 
                      href="/img/cn4.jpg" 
                      download
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src="/img/cn4.jpg" 
                        alt="Action Shot"
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <a 
                      href="/img/cn5.jpg" 
                      download
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src="/img/cn5.jpg" 
                        alt="Personal Touch"
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <a 
                      href="/img/ai.jpg" 
                      download
                      className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img 
                        src="/img/ai.jpg" 
                        alt="Approved AI Headshot"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                  <a
                    href="/files/media.zip"  
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
                  >
                  <button className="inline-flex items-center text-emerald-500 hover:text-emerald-400">
                    <Download className="w-4 h-4 mr-1" />
                    Download High-Res Images
                  </button></a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-3">Speaking Topics</h4>
                  <ul className="space-y-2 text-gray-600 text-sm mb-4">
                    <li>• Cybersecurity Trends</li>
                    <li>• Post-Quantum Cryptography</li>
                    <li>• Supply Chain Security</li>
                    <li>• Cybersecurity Incidents</li>
                    <li>• Vulnerability Research</li>
                    <li>• Browser Security</li>
                    <li>• Zero-Trust Architectures</li>
                    <li>• Venture Capital in Cybersecurity</li>
                    <li>• Building Security Startups</li>
                    <li>• Emerging Threat Landscapes</li>
                  </ul>
                  <a
                    href="/files/Cris-Neckar-1-Pager-Bio.pdf"  
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
                  >
                  <button className="inline-flex items-center text-emerald-500 hover:text-emerald-400">
                    <Download className="w-4 h-4 mr-1" />
                    Download Speaker Sheet
                  </button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
              <p className="text-gray-300 mb-6">
              From venture bets to browser exploits - if you’ve got something interesting, I’d love to hear about it.
              </p>
              <a 
                href="mailto:cris+bio@twobearcapital.com" 
                className="inline-flex items-center text-emerald-500 hover:text-emerald-400"
              >
                <Mail className="w-5 h-5 mr-2" />
                cris@twobearcapital.com
              </a>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/cris-neckar/" 
                  className="bg-zinc-800 p-3 rounded-lg hover:bg-emerald-900/50 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.twobearcapital.com/contact" 
                  className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors group relative"
                  title="Pitch Me"
                >
                  <PresentationIcon className="w-6 h-6" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Pitch Me
                  </span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="mb-2">&copy; 2025 Cris Neckar</p>
            <p className="text-sm">
              Content licensed under{' '}
              <a
                href="/license.html"
                className="text-emerald-500 hover:text-emerald-400"
                rel="license"
              >
                CC BY 4.0
              </a>
            </p>
            <p className="text-sm mt-2 text-gray-500">
              Machine-readable data: everything on this page is also available as plain text
              (<a href="/llms.txt" className="text-emerald-500 hover:text-emerald-400">llms.txt</a>,{' '}
              <a href="/llms-full.txt" className="text-emerald-500 hover:text-emerald-400">llms-full.txt</a>)
              and through an optional, read-only{' '}
              <a href="/.well-known/mcp.json" className="text-emerald-500 hover:text-emerald-400">MCP server</a>.
              It serves the same self-published information, with a source link for each claim. No authentication required.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;