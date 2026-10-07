import React from 'react';
import { ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';

export const CtaPanel: React.FC = () => {
  return (
    <section id="esg-insights" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Authentic Linklaters CTA Panel with Hotlinked Nature / Butterfly Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#e2e8f0]">
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lllp-p-001.sitecorecontenthub.cloud/api/public/content/73c4cd84ec4d449b87cd4429dc26c42b?v=bd6dca26"
              alt="Sustainable Futures Nature Focus"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Contrast Gradient Scrim to ensure WCAG AA legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30]/95 via-[#0b1c30]/85 to-[#0b1c30]/60" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-white">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Linklaters Thought Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              ESG Insights
            </h2>
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-8">
              Visit our <strong>Sustainable Futures Blog</strong>, for commentary and news from our
              dedicated ESG lawyers around the globe, covering transition planning, greenwashing
              scrutiny, and emerging statutory benchmarks.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://sustainablefutures.linklaters.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded-lg transition-colors shadow-sm"
              >
                <span>Explore Sustainable Futures</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://www.linklaters.com/en/insights/thought-leadership/sustainable-futures"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <span>Browse ESG Publications</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
