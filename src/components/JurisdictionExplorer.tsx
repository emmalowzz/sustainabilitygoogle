import React from 'react';
import { Globe2, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { JURISDICTIONS_DATA } from '../data/jurisdictionsData';
import { JurisdictionSummary } from '../types/tracker';

interface JurisdictionExplorerProps {
  onSelectJurisdiction: (jurisdictionName: string) => void;
}

export const JurisdictionExplorer: React.FC<JurisdictionExplorerProps> = ({
  onSelectJurisdiction,
}) => {
  return (
    <section id="jurisdictions" className="py-16 bg-white border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#cbd5e1]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a31922] block mb-1">
              Multi-Jurisdictional Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
              Global Jurisdictional Matrix
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Click on any jurisdiction to isolate relevant ESG acts, local statutory obligations,
            and enforcement milestones across our international footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JURISDICTIONS_DATA.map((jur: JurisdictionSummary) => (
            <div
              key={jur.code}
              onClick={() => {
                onSelectJurisdiction(jur.name);
                const el = document.getElementById('horizon-tracker');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl p-6 hover:border-[#cbd5e1] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header with Flag & Stats */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={jur.name}>
                      {jur.flagEmoji}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#a31922] transition-colors">
                      {jur.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono-numbers font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {jur.activeActsCount} Acts
                  </span>
                </div>

                {/* Key Regulators */}
                <div className="text-xs text-slate-500 mb-2 flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{jur.regulators.join(', ')}</span>
                </div>

                {/* Frameworks */}
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Core Regimes
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {jur.primaryFrameworks.map((fw) => (
                      <span
                        key={fw}
                        className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Focus Theme */}
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{jur.keyTheme}"
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-[#a31922]">
                <span>Filter Tracker to {jur.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
