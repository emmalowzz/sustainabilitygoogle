import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Bookmark,
  Share2,
  Printer,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { RegulatoryAct } from '../types/tracker';

interface ActDetailModalProps {
  act: RegulatoryAct | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onContactExpert: () => void;
}

export const ActDetailModal: React.FC<ActDetailModalProps> = ({
  act,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onContactExpert,
}) => {
  if (!act) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-[#0b1c30] text-white p-6 flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2">
              <span>{act.jurisdiction}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>{act.regulator}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span className="text-slate-300">
                {act.actType === 'UPCOMING' ? 'Upcoming Milestone' : 'Enacted Regulation'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {act.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(act.id)}
              className={`p-2 rounded transition-colors ${
                isBookmarked
                  ? 'bg-[#a31922] text-white'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
              title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
              aria-label="Bookmark act"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Print Briefing"
              aria-label="Print Briefing"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-800">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div>
              <span className="block text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                Target Date
              </span>
              <span className="font-bold text-slate-900 font-mono-numbers text-sm flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {act.date}
              </span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                Current Status
              </span>
              <span className="font-bold text-slate-900">{act.status}</span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                Regulatory Impact
              </span>
              <span
                className={`font-bold inline-flex items-center gap-1 ${
                  act.impactLevel === 'Critical'
                    ? 'text-[#a31922]'
                    : act.impactLevel === 'High'
                    ? 'text-amber-700'
                    : 'text-emerald-700'
                }`}
              >
                {act.impactLevel === 'Critical' && <AlertTriangle className="w-3 h-3" />}
                {act.impactLevel}
              </span>
            </div>
            <div>
              <span className="block text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                Last Verified
              </span>
              <span className="font-semibold text-slate-700 font-mono-numbers">
                {act.lastUpdated}
              </span>
            </div>
          </div>

          {/* Overview & Analysis */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#a31922]" />
              Regulatory Summary & Context
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {act.summary}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] mb-2">
              Detailed Legal Breakdown
            </h3>
            <div className="text-sm text-slate-700 leading-relaxed space-y-3 bg-white p-4 border border-slate-200 rounded-lg">
              <p>{act.detailedAnalysis}</p>
            </div>
          </div>

          {/* Key Obligations Checklist */}
          {act.keyObligations.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Key Compliance Obligations
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {act.keyObligations.map((obl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded border border-slate-100">
                    <span className="font-bold text-emerald-700 font-mono-numbers mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="leading-relaxed">{obl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Affected Financial Sectors */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b1c30] mb-2 flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-600" />
              Impacted Market Participants & Sectors
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {act.affectedSectors.map((sec) => (
                <span
                  key={sec}
                  className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded font-medium"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {/* Linklaters Strategic Takeaway */}
          {act.strategicTakeaways.length > 0 && (
            <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#a31922] mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#a31922]" />
                Linklaters Strategic Counsel Takeaway
              </h3>
              <ul className="space-y-2 text-xs text-slate-800 leading-relaxed">
                {act.strategicTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#a31922] font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Directives */}
          {act.relatedDirectives && act.relatedDirectives.length > 0 && (
            <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 mr-2">Governing Frameworks:</span>
              <span>{act.relatedDirectives.join(' · ')}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Need bespoke advice on this regulatory requirement?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactExpert();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors whitespace-nowrap"
            >
              <span>Consult Linklaters Partner</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
