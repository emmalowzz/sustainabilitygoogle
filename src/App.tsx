/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PublicationHero } from './components/PublicationHero';
import { HorizonTracker } from './components/HorizonTracker';
import { JurisdictionExplorer } from './components/JurisdictionExplorer';
import { ExpertList } from './components/ExpertList';
import { CtaPanel } from './components/CtaPanel';
import { ContentSummaryGrid } from './components/ContentSummaryGrid';
import { Footer } from './components/Footer';
import { ActDetailModal } from './components/ActDetailModal';
import { RegulatoryComparisonModal } from './components/RegulatoryComparisonModal';
import { PdfExportModal } from './components/PdfExportModal';
import { WatchlistModal } from './components/WatchlistModal';

import { TRACKER_ACTS } from './data/trackerData';
import { EXPERTS_DATA } from './data/expertsData';
import { RegulatoryAct, ActType } from './types/tracker';

export default function App() {
  const [activeActType, setActiveActType] = useState<ActType>('UPCOMING');
  const [selectedAct, setSelectedAct] = useState<RegulatoryAct | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);

  // Watchlist stored with safe localStorage fallback
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('linklaters_tracker_watchlist');
      return saved ? JSON.parse(saved) : ['esma-fund-names-phase-in', 'fca-sdr-naming-marketing-rules'];
    } catch {
      return ['esma-fund-names-phase-in', 'fca-sdr-naming-marketing-rules'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('linklaters_tracker_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.warn('Could not persist watchlist to localStorage', e);
    }
  }, [watchlist]);

  const toggleWatchlist = (actId: string) => {
    setWatchlist((prev) =>
      prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    );
  };

  const bookmarkedActs = TRACKER_ACTS.filter((act) => watchlist.includes(act.id));
  const upcomingCount = TRACKER_ACTS.filter((act) => act.actType === 'UPCOMING').length;

  const handleSelectJurisdiction = (jurName: string) => {
    // When a jurisdiction card is clicked, we scroll to the tracker
    const el = document.getElementById('horizon-tracker');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToKeyContacts = () => {
    const el = document.getElementById('key-contacts');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      {/* Top Header Navigation */}
      <Navigation
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistModalOpen(true)}
        onOpenPdfExport={() => setIsPdfModalOpen(true)}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
      />

      <main className="flex-1">
        {/* Publication Hero Banner */}
        <PublicationHero
          onSelectActType={(type) => setActiveActType(type)}
          onOpenPdfModal={() => setIsPdfModalOpen(true)}
          totalActsCount={TRACKER_ACTS.length}
          upcomingCount={upcomingCount}
        />

        {/* The Horizon Regulatory Tracker */}
        <HorizonTracker
          acts={TRACKER_ACTS}
          onSelectAct={(act) => setSelectedAct(act)}
          watchlist={watchlist}
          onToggleWatchlist={toggleWatchlist}
          activeActType={activeActType}
          onChangeActType={(type) => setActiveActType(type)}
          onOpenPdfModal={() => setIsPdfModalOpen(true)}
        />

        {/* Global Jurisdictional Matrix */}
        <JurisdictionExplorer onSelectJurisdiction={handleSelectJurisdiction} />

        {/* Key Contacts (8 Linklaters Experts) */}
        <ExpertList experts={EXPERTS_DATA} />

        {/* ESG Insights CTA Panel */}
        <CtaPanel />

        {/* More About Our ESG Capabilities */}
        <ContentSummaryGrid />
      </main>

      {/* Official Linklaters Footer */}
      <Footer />

      {/* Act Detail Modal */}
      <ActDetailModal
        act={selectedAct}
        onClose={() => setSelectedAct(null)}
        isBookmarked={selectedAct ? watchlist.includes(selectedAct.id) : false}
        onToggleBookmark={toggleWatchlist}
        onContactExpert={scrollToKeyContacts}
      />

      {/* Regulatory Regime Comparison Modal */}
      <RegulatoryComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />

      {/* Printable / PDF Executive Briefing Generator */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        acts={TRACKER_ACTS.filter((a) => a.actType === activeActType)}
        activeActType={activeActType}
      />

      {/* User's Personalized Advisory Watchlist Modal */}
      <WatchlistModal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        bookmarkedActs={bookmarkedActs}
        onRemoveBookmark={toggleWatchlist}
        onSelectAct={(act) => setSelectedAct(act)}
        onOpenPdf={() => setIsPdfModalOpen(true)}
      />
    </div>
  );
}
