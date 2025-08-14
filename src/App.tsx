import React from 'react';
import { ExternalLink, Download, Mail, Linkedin } from 'lucide-react';

function App() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Your Name</h1>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('publications')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Publications
              </button>
              <button 
                onClick={() => scrollToSection('media')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Media Resources
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Building the Future Through Strategic Investment
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Investor, entrepreneur, and thought leader focused on transformative technologies 
                and sustainable business models that drive meaningful change.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Crunchbase
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Two Bear Capital
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-300 rounded-2xl flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                  alt="Professional headshot"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-xl leading-relaxed mb-6">
                With over a decade of experience in venture capital and strategic investments, 
                I focus on identifying and supporting companies that are reshaping industries 
                through innovation and sustainable practices.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                My investment philosophy centers on backing exceptional founders who are building 
                scalable solutions to complex global challenges. I have a particular interest in 
                enterprise software, fintech, and climate technology sectors.
              </p>
              <p className="text-lg leading-relaxed">
                Prior to my investment career, I founded and successfully exited two technology 
                companies, giving me unique insight into the entrepreneurial journey from both 
                sides of the table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications & Coverage */}
      <section id="publications" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Publications & Coverage</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Articles</h3>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">The Future of Climate Tech Investing</h4>
                  <p className="text-gray-600 text-sm mb-3">TechCrunch • March 2024</p>
                  <p className="text-gray-600">Analysis of emerging trends in climate technology investments and market opportunities.</p>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2">
                    Read more <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">Building Resilient Startups</h4>
                  <p className="text-gray-600 text-sm mb-3">Harvard Business Review • January 2024</p>
                  <p className="text-gray-600">Strategies for entrepreneurs to build sustainable, profitable businesses in uncertain times.</p>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2">
                    Read more <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Media Coverage</h3>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">Featured on Bloomberg Tech</h4>
                  <p className="text-gray-600 text-sm mb-3">Bloomberg • February 2024</p>
                  <p className="text-gray-600">Discussion on the state of venture capital and emerging investment trends.</p>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2">
                    Watch interview <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">Forbes 30 Under 30 Alumni</h4>
                  <p className="text-gray-600 text-sm mb-3">Forbes • 2019</p>
                  <p className="text-gray-600">Recognized for contributions to venture capital and entrepreneurship.</p>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-2">
                    Read profile <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Media Resources */}
      <section id="media" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Media Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Biography Versions</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Short Bio (50 words)</h4>
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Investor and entrepreneur with 10+ years in venture capital. Partner at Two Bear Capital, 
                    focusing on enterprise software and climate tech. Previously founded two successful startups. 
                    Featured in Forbes 30 Under 30.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Medium Bio (100 words)</h4>
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    A seasoned investor and entrepreneur with over a decade of experience in venture capital, 
                    specializing in enterprise software, fintech, and climate technology. As a Partner at Two Bear Capital, 
                    they manage a portfolio of 50+ companies with $500M+ in assets under management. Previously founded 
                    and successfully exited two technology companies. Regular contributor to TechCrunch and Harvard Business Review, 
                    and featured speaker at major industry conferences. Recognized in Forbes 30 Under 30 for contributions to 
                    venture capital and entrepreneurship.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Long Bio (200+ words)</h4>
                    <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    A distinguished investor and entrepreneur with over a decade of transformative experience in venture capital, 
                    specializing in enterprise software, fintech, and climate technology investments. As a Partner at Two Bear Capital, 
                    they lead investment strategies for a diverse portfolio of 50+ companies, managing over $500M in assets under management 
                    and achieving 12 successful exits to date...
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm mt-2">Read full bio</button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Media Assets</h3>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-4">Professional Headshots</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <img 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
                      alt="Professional headshot 1"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <img 
                      src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
                      alt="Professional headshot 2"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                    <Download className="w-4 h-4 mr-1" />
                    Download High-Res Images
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-3">Speaking Topics</h4>
                  <ul className="space-y-2 text-gray-600 text-sm mb-4">
                    <li>• The Future of Venture Capital</li>
                    <li>• Climate Tech Investment Opportunities</li>
                    <li>• Building Resilient Startups</li>
                    <li>• Enterprise Software Trends</li>
                    <li>• Sustainable Business Models</li>
                  </ul>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-700">
                    <Download className="w-4 h-4 mr-1" />
                    Download Speaker Sheet
                  </button>
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
                Interested in discussing investment opportunities, speaking engagements, 
                or media inquiries? I'd love to hear from you.
              </p>
              <a 
                href="mailto:contact@yourname.com" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                <Mail className="w-5 h-5 mr-2" />
                contact@yourname.com
              </a>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ExternalLink className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;