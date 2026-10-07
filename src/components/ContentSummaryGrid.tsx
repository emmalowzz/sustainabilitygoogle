import React from 'react';
import { ArrowUpRight, Leaf, Shield, FileCheck, Layers } from 'lucide-react';

export const ContentSummaryGrid: React.FC = () => {
  const capabilities = [
    {
      title: 'Transition Strategies & Net Zero',
      icon: Leaf,
      description:
        'Advising boards and investment committees on formulating, verifying, and disclosing science-based climate transition plans aligned with UK TPT, GFANZ, and EU CSDDD standards.',
    },
    {
      title: 'Sustainable Debt & Green Securitisation',
      icon: Layers,
      description:
        'Structuring debut and benchmark green, social, sustainability, and sustainability-linked bonds (SLBs) under ICMA principles, EU Green Bond Standards, and regional sukuk regimes.',
    },
    {
      title: 'Greenwashing Defence & Regulatory Audits',
      icon: Shield,
      description:
        'Protecting market leaders against misleading sustainability allegations, advertising authority sanctions, and supervisory sweeps by the FCA, ASIC, SEC, and EU national authorities.',
    },
    {
      title: 'Cross-Border Supply Chain Due Diligence',
      icon: FileCheck,
      description:
        'Implementing chain-of-activities diligence, supplier codes of conduct, and double-materiality ESRS auditing to meet rigorous EU CSDDD and CSRD cross-border mandates.',
    },
  ];

  return (
    <section className="py-16 bg-[#f8f9ff] border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#cbd5e1]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a31922] block mb-1">
              Linklaters Practice Areas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
              More About Our ESG Capabilities
            </h2>
          </div>
          <a
            href="https://www.linklaters.com/en/services/environment-social-and-governance"
            target="_blank"
            rel="noreferrer"
            className="text-xs sm:text-sm font-semibold text-[#a31922] hover:underline flex items-center gap-1"
          >
            <span>Explore Full ESG Service Offering</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Featured Card with Authentic Linklaters ESG Thumbnail */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[220px]">
              <img
                src="https://edge.sitecorecloud.io/linklaterslbf57-linklatersx7ccc-linklatersxf9f5-394d/media/images/capabilities/services/esg/esg/esg_thumbnail_900x300.png?h=300&iar=0&w=900"
                alt="Linklaters ESG Capabilities - Modern architecture with green environment"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#a31922] mb-1 block">
                  Environment, Social and Governance
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0b1c30] mb-3">
                  Advising the Global Architecture of Sustainable Capital
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our market leading ESG team is experienced in advising clients on transition strategies,
                  risk management, climate and ESG-related disputes, and green finance instruments across
                  the UK, Europe, Americas, Asia, and Middle East.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-4 text-xs font-semibold">
                <a
                  href="https://www.linklaters.com/en/services/environment-social-and-governance"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#0b1c30] text-white hover:bg-slate-800 rounded transition-colors"
                >
                  Explore Practice
                </a>
                <span className="text-slate-500">Tier 1 Chambers & Legal 500 Ranking</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="bg-white border border-[#e2e8f0] rounded-xl p-5 hover:border-[#cbd5e1] hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#a31922] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
