import React from 'react';
import { ArrowUp, Globe, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1c30] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://edge.sitecorecloud.io/linklaterslbf57-linklatersx7ccc-linklatersxf9f5-394d/media/logos/footer-logo-white.svg"
                alt="Linklaters LLP"
                className="h-7 w-auto"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span className="hidden font-serif font-black text-xl tracking-wider text-white">
                LINKLATERS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Inspiring confidence and trust as the #1 global legal team in the world. Advising
              leading financial institutions, sovereign funds, and corporates on cross-border
              sustainable finance, ESG compliance, and green capital transition.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="block font-semibold text-slate-200">Global Headquarters:</span>
              One Silk Street, London EC2Y 8HQ, United Kingdom
            </div>
          </div>

          {/* Col 2: Sustainable Finance Tracker */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Tracker Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#horizon-tracker" className="hover:text-white transition-colors">
                  Upcoming Acts & Milestones
                </a>
              </li>
              <li>
                <a href="#horizon-tracker" className="hover:text-white transition-colors">
                  Past Enacted Regulations
                </a>
              </li>
              <li>
                <a href="#jurisdictions" className="hover:text-white transition-colors">
                  Global Jurisdictional Matrix
                </a>
              </li>
              <li>
                <a href="#key-contacts" className="hover:text-white transition-colors">
                  Key Contacts & Partners
                </a>
              </li>
              <li>
                <a href="#esg-insights" className="hover:text-white transition-colors">
                  Sustainable Futures Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Regimes Covered */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Monitored Regimes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="hover:text-white cursor-default">EU CSRD & CSDDD</span>
              </li>
              <li>
                <span className="hover:text-white cursor-default">EU SFDR & ESMA Fund Names</span>
              </li>
              <li>
                <span className="hover:text-white cursor-default">UK SDR & Anti-Greenwashing</span>
              </li>
              <li>
                <span className="hover:text-white cursor-default">US SEC & CA SB 253/261</span>
              </li>
              <li>
                <span className="hover:text-white cursor-default">MAS Singapore-Asia Taxonomy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-default">Australia AASB S1/S2</span>
              </li>
            </ul>
          </div>

          {/* Col 4: International Offices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Global Hubs
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              London · New York · Frankfurt · Paris · Luxembourg · Singapore · Hong Kong · Tokyo · Dubai · São Paulo · Sydney
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <a
                href="https://www.linklaters.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
              >
                <span>Visit Linklaters.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Linklaters LLP. All rights reserved.
            <span className="block sm:inline sm:ml-2 text-slate-500">
              A limited liability partnership registered in England and Wales with registered number OC326345.
            </span>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
