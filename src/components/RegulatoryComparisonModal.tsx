import React, { useState } from 'react';
import { X, Scale, Check, AlertCircle, HelpCircle } from 'lucide-react';

interface RegulatoryComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegulatoryComparisonModal: React.FC<RegulatoryComparisonModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const comparisonData = [
    {
      feature: 'Governing Architecture',
      eu: 'EU SFDR (Articles 6, 8, 9) & EU Taxonomy Regulation (EU 2020/852)',
      uk: 'UK SDR (PS23/16) & FCA Anti-Greenwashing Rule (FG24/3)',
      us: 'SEC Climate Rules (Release 33-11275) & California SB 253/261',
      sg: 'MAS Guidelines & Singapore-Asia Multi-Sector Taxonomy',
    },
    {
      feature: 'Fund Labelling / Classification Model',
      eu: 'Disclosure-based classification (Article 8: Light Green, Article 9: Dark Green/Sustainable Objective)',
      uk: '4 Voluntary Intent-based Labels (Sustainability Focus, Improvers, Impact, Mixed Goals)',
      us: 'Enhanced ESG Fund Disclosures (Proposed) + SEC Names Rule (80% policy requirement)',
      sg: 'Disclosure Guidelines for Retail ESG Funds & MAS SFG Taxonomy traffic light alignment',
    },
    {
      feature: 'Quantitative Asset Thresholds for Names',
      eu: 'ESMA Guidelines: Min. 80% investments meeting characteristics + CTB/PAB fossil fuel exclusions',
      uk: 'FCA Naming Rules: Min. 70% assets meeting sustainability standard; prohibition on "impact" unless labelled',
      us: 'SEC Names Rule: 80% investment policy for terms suggesting investment focus or ESG factors',
      sg: 'Min. two-thirds (67%) net asset value in accordance with the fund’s stated ESG strategy',
    },
    {
      feature: 'Scope 3 Greenhouse Gas Reporting',
      eu: 'Mandatory under CSRD / ESRS E1 if material across the value chain',
      uk: 'Phased in under SDR entity disclosures; required for transition plans under TPT',
      us: 'Dropped in final federal SEC rule; strictly mandatory under California SB 253 from 2027',
      sg: 'Mandatory phase-in for listed issuers starting FY 2026',
    },
    {
      feature: 'Anti-Greenwashing Enforcement Trigger',
      eu: 'National competent authorities (BaFin, AMF, CSSF) + EU Green Claims Directive proposals',
      uk: 'Standalone binding rule (ESG 4.3.1R) in force 31 May 2024 covering all FCA-authorised firms',
      us: 'SEC Climate and ESG Task Force enforcement actions under Section 17(a) & Rule 10b-5',
      sg: 'MAS supervisory inspections and SGX RegCo sustainability review sweeps',
    },
    {
      feature: 'Transition Finance Treatment',
      eu: 'EU Taxonomy Amber tier in discussion; Climate Transition Benchmark exclusions apply',
      uk: 'Dedicated "Sustainability Improvers" label specifically designed for decarbonisation pipelines',
      us: 'No dedicated federal transition label; rely on customary materiality definitions',
      sg: 'World-first taxonomy technical criteria for early managed coal power phase-out',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-5xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0b1c30] text-white p-6 flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1">
              <Scale className="w-4 h-4" />
              <span>Multi-Jurisdictional Cross-Walk</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Comparative Analysis: Global Sustainable Regimes
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Reconciling European Union, United Kingdom, United States, and Singapore frameworks for institutional portfolio managers.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto">
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-700">
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/5 border-r border-slate-200">
                    Dimension
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/5 border-r border-slate-200 text-[#0b1c30]">
                    European Union 🇪🇺
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/5 border-r border-slate-200 text-[#a31922]">
                    United Kingdom 🇬🇧
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/5 border-r border-slate-200 text-[#0b1c30]">
                    United States 🇺🇸
                  </th>
                  <th className="p-3.5 font-bold uppercase tracking-wider text-[11px] w-1/5 text-[#0b1c30]">
                    Singapore 🇸🇬
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-semibold text-slate-900 border-r border-slate-200 bg-slate-50/50">
                      {row.feature}
                    </td>
                    <td className="p-3.5 text-slate-700 border-r border-slate-200 leading-relaxed">
                      {row.eu}
                    </td>
                    <td className="p-3.5 text-slate-700 border-r border-slate-200 leading-relaxed bg-rose-50/20">
                      {row.uk}
                    </td>
                    <td className="p-3.5 text-slate-700 border-r border-slate-200 leading-relaxed">
                      {row.us}
                    </td>
                    <td className="p-3.5 text-slate-700 leading-relaxed">
                      {row.sg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">
              Linklaters Advisory Note on Cross-Border Interoperability:
            </span>
            Financial institutions operating across London, Frankfurt, New York, and Singapore must avoid assuming equivalence. For instance, an EU SFDR Article 8 fund does not automatically satisfy UK SDR "Sustainability Focus" or "Improvers" labels without explicit evidence of 70% intentionality and robust stewardship frameworks. Contact Linklaters partners for tailored portfolio audits.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors"
          >
            Close Comparison Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
