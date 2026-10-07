import React from 'react';
import { X, Bookmark, Trash2, Calendar, MapPin, ChevronRight, FileDown } from 'lucide-react';
import { RegulatoryAct } from '../types/tracker';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedActs: RegulatoryAct[];
  onRemoveBookmark: (id: string) => void;
  onSelectAct: (act: RegulatoryAct) => void;
  onOpenPdf: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  bookmarkedActs,
  onRemoveBookmark,
  onSelectAct,
  onOpenPdf,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0b1c30] text-white p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#a31922] text-white rounded">
              <Bookmark className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Advisory Watchlist</h2>
              <p className="text-xs text-slate-300">
                {bookmarkedActs.length} saved sustainable finance obligations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {bookmarkedActs.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-800 mb-1">
                Your watchlist is currently empty
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the bookmark icon on any regulatory act in the tracker table to save it to your personalized advisory digest.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedActs.map((act) => (
                <div
                  key={act.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-lg transition-colors flex items-start justify-between gap-4"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectAct(act);
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-mono-numbers font-semibold text-[#a31922] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {act.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {act.jurisdiction}
                      </span>
                      <span>·</span>
                      <span>{act.status}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 hover:text-[#a31922] transition-colors leading-snug">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {act.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      onClick={() => onRemoveBookmark(act.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-700 rounded transition-colors"
                      title="Remove from Watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectAct(act);
                      }}
                      className="p-1.5 text-[#a31922] hover:bg-rose-50 rounded transition-colors"
                      title="View Details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarkedActs.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500">
              Ready to print or share your customized watchlist?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenPdf();
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export Watchlist as PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
