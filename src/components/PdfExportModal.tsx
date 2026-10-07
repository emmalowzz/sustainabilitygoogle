import React from 'react';
import { X, Printer, FileDown, CheckCircle } from 'lucide-react';
import { RegulatoryAct } from '../types/tracker';
import { EXPERTS_DATA } from '../data/expertsData';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  acts: RegulatoryAct[];
  activeActType: 'UPCOMING' | 'PAST';
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  acts,
  activeActType,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Control Bar */}
        <div className="bg-[#0b1c30] text-white p-4 px-6 flex items-center justify-between border-b border-slate-800 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileDown className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-bold text-white">
              Institutional Briefing Generator (PDF / Print)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Preview */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-slate-900 print:p-0">
          {/* Header Brand */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6 mb-8">
            <div>
              <div className="text-2xl font-serif font-black tracking-wider text-[#0b1c30] mb-1">
                LINKLATERS
              </div>
              <h1 className="text-xl font-bold text-[#a31922]">
                Global Sustainable Finance Regulatory Briefing
              </h1>
              <p className="text-xs text-slate-500 font-mono-numbers mt-1">
                Bimonthly Executive Briefing · Report Generated:{' '}
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-bold text-slate-800 block">Linklaters LLP</span>
              <span>Financial Regulation & ESG Group</span>
              <span className="block">London · New York · Paris · Singapore</span>
            </div>
          </div>

          {/* Scope Intro */}
          <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <strong>Executive Scope:</strong> This briefing provides a structured regulatory digest of{' '}
            {activeActType === 'UPCOMING' ? 'upcoming implementation milestones and phase-in dates' : 'enacted landmark sustainable finance rules'}{' '}
            impacting financial institutions across the United Kingdom, European Union, United States, Asia-Pacific, Middle East, and Latin America.
          </div>

          {/* Acts Table in Print View */}
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-300 mb-4">
              Digest of Tracked Regulatory Milestones ({acts.length} Items)
            </h2>

            <div className="space-y-4">
              {acts.map((act, idx) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded border border-slate-200 bg-white break-inside-avoid"
                >
                  <div className="flex items-start justify-between gap-3 text-xs mb-1.5">
                    <div>
                      <span className="font-bold text-[#0b1c30] text-sm">
                        {idx + 1}. {act.title}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {act.jurisdiction} · {act.regulator} · Topics: {act.topics.join(', ')}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono-numbers font-bold text-[#a31922] block">
                        {act.date}
                      </span>
                      <span className="text-[10px] text-slate-500">Status: {act.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mt-2">
                    {act.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Contacts Section */}
          <div className="border-t border-slate-300 pt-6 mb-8 break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Key Linklaters Regulatory Contacts
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {EXPERTS_DATA.slice(0, 4).map((exp) => (
                <div key={exp.id} className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="font-bold text-slate-900 block">{exp.name}</span>
                  <span className="text-[11px] text-slate-600 block line-clamp-1">{exp.jobTitle}</span>
                  <span className="text-[11px] text-slate-500">{exp.officeLocation}</span>
                  <span className="text-[11px] text-[#a31922] block mt-1">{exp.email}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-4 leading-relaxed">
            © {new Date().getFullYear()} Linklaters LLP. This briefing is intended for institutional clients of Linklaters and provides an overview of legal developments only. It does not constitute formal legal advice. For detailed advice on your institution’s specific obligations, please contact your usual Linklaters advisor.
          </div>
        </div>
      </div>
    </div>
  );
};
