import React from 'react';
import { Calendar, Globe2, ShieldCheck, ArrowDown, FileText, ChevronRight } from 'lucide-react';

interface PublicationHeroProps {
  onSelectActType: (type: 'UPCOMING' | 'PAST') => void;
  onOpenPdfModal: () => void;
  totalActsCount: number;
  upcomingCount: number;
}

export const PublicationHero: React.FC<PublicationHeroProps> = ({
  onSelectActType,
  onOpenPdfModal,
  totalActsCount,
  upcomingCount,
}) => {
  return (
    <section className="relative bg-[#0b1c30] text-white overflow-hidden border-b border-slate-800">
      {/* Background Graphic Scrim with Authentic Linklaters Hotlink Image */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://contenthub.linklaters.com/api/public/content/10aa4bfcdb794ba6baec52341b802e10?v=e6d01620"
          alt="Sustainable Finance Architecture"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant CSS fallback gradient
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30] via-[#0b1c30]/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:py-20">
        {/* Editorial Breadcrumb & Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-400 mb-4">
          <span>Thought Leadership</span>
          <span aria-hidden="true">·</span>
          <span>Financial Regulation & ESG</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Bimonthly Global Update
          </span>
        </div>

        {/* Primary Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
            Global Sustainable Finance Tracker
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed mb-6">
            Our Global Sustainable Finance Tracker covers key recent and upcoming regulatory
            developments, across a range of topic areas and jurisdictions.
          </p>
        </div>

        {/* Deep Dive Institutional Paragraph from Linklaters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 border-t border-slate-800/80 mt-6">
          <div className="lg:col-span-8 text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              At Linklaters we have created a dynamic global tracker which provides updates on
              obligations relating to all aspects of sustainable finance for the financial services
              sector. Leveraging our extensive global network and our strategic alliances, we update
              the tracker <strong>every two months</strong> to ensure its relevance and value to our
              financial institution clients within the latest ESG laws, regulations, milestones and
              developments relevant to your sector and jurisdiction.
            </p>
            <p>
              The tracker covers the <strong>UK</strong>, <strong>EU</strong>, the <strong>US</strong>,{' '}
              <strong>Brazil</strong>, key <strong>Asian jurisdictions</strong> (Hong Kong, Singapore,
              Japan), <strong>the UAE</strong>, <strong>Australia</strong> and <strong>South Africa</strong>.
              This broad coverage in one tool provides that hard-to-find snapshot view of the myriad
              sustainable finance touchpoints impacting your institution across its particular global footprint.
            </p>
          </div>

          {/* Quick Metrics & Call to Actions */}
          <div className="lg:col-span-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 rounded-lg p-5">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-700/60">
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Active Acts
                </span>
                <span className="text-2xl font-bold font-mono-numbers text-white">
                  {totalActsCount}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-rose-400 font-medium">
                  Upcoming 2025+
                </span>
                <span className="text-2xl font-bold font-mono-numbers text-rose-300">
                  {upcomingCount}
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Covered Jurisdictions
                </span>
                <span className="text-lg font-semibold text-slate-200">
                  9 Hubs + INT
                </span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Update Frequency
                </span>
                <span className="text-lg font-semibold text-emerald-400">
                  Bimonthly
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row lg:flex-col gap-2">
              <a
                href="#horizon-tracker"
                onClick={() => onSelectActType('UPCOMING')}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors"
              >
                <span>View Upcoming Acts & Deadlines</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenPdfModal}
                className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600/70 rounded transition-colors"
              >
                <span>Download Executive Briefing (PDF)</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Jump Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span className="text-slate-400 font-medium">Quick Filter:</span>
          <button
            onClick={() => {
              onSelectActType('UPCOMING');
              const el = document.getElementById('horizon-tracker');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
          >
            <span>Upcoming Acts ({upcomingCount})</span>
          </button>
          <button
            onClick={() => {
              onSelectActType('PAST');
              const el = document.getElementById('horizon-tracker');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition-colors"
          >
            <span>Past Enacted Milestones ({totalActsCount - upcomingCount})</span>
          </button>
          <a
            href="#jurisdictions"
            className="flex items-center gap-1 px-3 py-1 text-slate-300 hover:text-white transition-colors"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Jurisdictional Matrix</span>
          </a>
          <a
            href="#key-contacts"
            className="flex items-center gap-1 px-3 py-1 text-slate-300 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Key Regulatory Partners</span>
          </a>
        </div>
      </div>
    </section>
  );
};
