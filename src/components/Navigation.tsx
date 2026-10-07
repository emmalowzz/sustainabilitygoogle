import React, { useState } from 'react';
import { Bookmark, FileDown, Menu, X, ArrowUpRight, Scale } from 'lucide-react';

interface NavigationProps {
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenPdfExport: () => void;
  onOpenComparison: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  watchlistCount,
  onOpenWatchlist,
  onOpenPdfExport,
  onOpenComparison,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0b1c30] text-white border-b border-[#1e293b] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single Brand element with authentic Linklaters wordmark */}
          <div className="flex items-center gap-4">
            <a
              href="#top"
              className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity"
              aria-label="Linklaters Global Sustainable Finance Tracker"
            >
              <img
                src="https://edge.sitecorecloud.io/linklaterslbf57-linklatersx7ccc-linklatersxf9f5-394d/media/logos/ll_white_logo.svg"
                alt="Linklaters"
                className="h-6 w-auto"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to text if network restricts SVG
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span className="hidden font-serif font-bold text-lg tracking-wider text-white">
                LINKLATERS
              </span>
              <span className="hidden sm:inline-block h-4 w-px bg-slate-600 mx-1" aria-hidden="true" />
              <span className="text-xs tracking-wider uppercase font-semibold text-slate-300 hidden sm:inline-block">
                Sustainable Finance Tracker
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
            <a
              href="#horizon-tracker"
              className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-rose-500"
            >
              Regulatory Acts
            </a>
            <a
              href="#jurisdictions"
              className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-rose-500"
            >
              Jurisdictions
            </a>
            <a
              href="#key-contacts"
              className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-rose-500"
            >
              Key Contacts
            </a>
            <a
              href="#esg-insights"
              className="hover:text-white transition-colors hover:underline underline-offset-8 decoration-rose-500"
            >
              ESG Insights
            </a>
            <button
              onClick={onOpenComparison}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-rose-400" />
              <span>Regime Comparison</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWatchlist}
              className="relative p-2 text-slate-200 hover:text-white rounded hover:bg-slate-800/80 transition-colors"
              title="View Advisory Watchlist"
              aria-label="View Advisory Watchlist"
            >
              <Bookmark className="w-4 h-4" />
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a31922] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-mono-numbers">
                  {watchlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenPdfExport}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors whitespace-nowrap shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF Brief</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0f172a] border-b border-slate-700 px-4 pt-2 pb-4 space-y-3">
          <a
            href="#horizon-tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            Regulatory Acts & Events
          </a>
          <a
            href="#jurisdictions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            Global Jurisdictions
          </a>
          <a
            href="#key-contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            Key Contacts & Lawyers
          </a>
          <a
            href="#esg-insights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            ESG Insights & Blog
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenComparison();
            }}
            className="w-full text-left flex items-center justify-between text-sm font-medium text-slate-200 hover:text-white py-1"
          >
            <span>Regime Comparison Tool</span>
            <Scale className="w-4 h-4 text-rose-400" />
          </button>
          <div className="pt-2 border-t border-slate-700 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdfExport();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-white bg-[#a31922] rounded"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF Brief</span>
            </button>
            <a
              href="https://sustainablefutures.linklaters.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-2 text-xs text-slate-300 hover:text-white bg-slate-800 rounded"
              title="Sustainable Futures Blog"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
