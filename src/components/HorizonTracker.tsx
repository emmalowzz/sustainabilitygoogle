import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  MapPin,
  Filter,
  X,
  FileDown,
  Bookmark,
  ChevronDown,
  ArrowUpDown,
  RotateCcw,
  SlidersHorizontal,
  Table as TableIcon,
  Clock,
  Globe,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { RegulatoryAct, ActType, FilterState, ViewMode } from '../types/tracker';

interface HorizonTrackerProps {
  acts: RegulatoryAct[];
  onSelectAct: (act: RegulatoryAct) => void;
  watchlist: string[];
  onToggleWatchlist: (actId: string) => void;
  activeActType: ActType;
  onChangeActType: (type: ActType) => void;
  onOpenPdfModal: () => void;
}

export const HorizonTracker: React.FC<HorizonTrackerProps> = ({
  acts,
  onSelectAct,
  watchlist,
  onToggleWatchlist,
  activeActType,
  onChangeActType,
  onOpenPdfModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<FilterState['sortOption']>('date-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Extract unique topic list
  const allTopics = useMemo(() => {
    const set = new Set<string>();
    acts.forEach((a) => a.topics.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [acts]);

  // Extract unique jurisdictions list
  const allJurisdictions = useMemo(() => {
    const set = new Set<string>();
    acts.forEach((a) => set.add(a.jurisdiction));
    return Array.from(set).sort();
  }, [acts]);

  // Extract unique statuses
  const allStatuses = useMemo(() => {
    const set = new Set<string>();
    acts.forEach((a) => set.add(a.status));
    return Array.from(set).sort();
  }, [acts]);

  // Filter & Sort
  const filteredActs = useMemo(() => {
    return acts
      .filter((act) => {
        // Tab filter: UPCOMING vs PAST
        if (act.actType !== activeActType) return false;

        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchesTitle = act.title.toLowerCase().includes(q);
          const matchesSummary = act.summary.toLowerCase().includes(q);
          const matchesDetailed = act.detailedAnalysis.toLowerCase().includes(q);
          const matchesJurisdiction = act.jurisdiction.toLowerCase().includes(q);
          const matchesRegulator = act.regulator.toLowerCase().includes(q);
          const matchesTopics = act.topics.some((t) => t.toLowerCase().includes(q));
          if (
            !matchesTitle &&
            !matchesSummary &&
            !matchesDetailed &&
            !matchesJurisdiction &&
            !matchesRegulator &&
            !matchesTopics
          ) {
            return false;
          }
        }

        // Topic filter
        if (selectedTopics.length > 0) {
          const hasTopic = act.topics.some((t) => selectedTopics.includes(t));
          if (!hasTopic) return false;
        }

        // Jurisdiction filter
        if (selectedJurisdictions.length > 0) {
          if (!selectedJurisdictions.includes(act.jurisdiction)) return false;
        }

        // Status filter
        if (selectedStatuses.length > 0) {
          if (!selectedStatuses.includes(act.status)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'date-asc') {
          return a.dateIso.localeCompare(b.dateIso);
        } else if (sortOption === 'date-desc') {
          return b.dateIso.localeCompare(a.dateIso);
        } else if (sortOption === 'jurisdiction-asc') {
          return a.jurisdiction.localeCompare(b.jurisdiction);
        } else if (sortOption === 'topic-asc') {
          const topA = a.topics[0] || '';
          const topB = b.topics[0] || '';
          return topA.localeCompare(topB);
        } else if (sortOption === 'latest-updated') {
          return b.lastUpdated.localeCompare(a.lastUpdated);
        }
        return 0;
      });
  }, [
    acts,
    activeActType,
    searchTerm,
    selectedTopics,
    selectedJurisdictions,
    selectedStatuses,
    sortOption,
  ]);

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedTopics.length > 0 ||
    selectedJurisdictions.length > 0 ||
    selectedStatuses.length > 0;

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTopics([]);
    setSelectedJurisdictions([]);
    setSelectedStatuses([]);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleJurisdiction = (jur: string) => {
    setSelectedJurisdictions((prev) =>
      prev.includes(jur) ? prev.filter((j) => j !== jur) : [...prev, jur]
    );
  };

  return (
    <section id="horizon-tracker" className="py-12 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tracker Search Header Section */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#e2e8f0]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#a31922]">
                  Horizon Regulatory Tracker
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-xs text-slate-500 font-mono-numbers">
                  Last Updated: 15 February 2025
                </span>
              </div>
              <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
                Our dedicated Sustainable Finance tracker covers key <strong>recent and upcoming</strong>{' '}
                financial regulatory developments, across a range of topic areas and global jurisdictions.
              </p>
            </div>

            {/* Quick Action: PDF Export & Watchlist Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenPdfModal}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0b1c30] bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded transition-colors whitespace-nowrap"
              >
                <FileDown className="w-4 h-4 text-[#a31922]" />
                <span>Download as PDF</span>
              </button>
            </div>
          </div>

          {/* Search Input Container */}
          <div className="pt-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by topic, jurisdiction, directive name (e.g. CSRD, SDR, Greenwashing, MAS, CSDDD)..."
                className="w-full pl-11 pr-10 py-3 text-sm bg-slate-50 border border-[#cbd5e1] focus:bg-white focus:border-[#a31922] focus:ring-1 focus:ring-[#a31922] rounded-lg text-slate-900 placeholder:text-slate-400 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Act Type Switcher & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Upcoming Acts vs Past Acts Segmented Buttons (Matching Linklaters Horizon_UpcomingActs / Horizon_PastActs) */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg max-w-fit">
            <button
              onClick={() => onChangeActType('UPCOMING')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeActType === 'UPCOMING'
                  ? 'bg-[#a31922] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              Upcoming Acts & Milestones
            </button>
            <button
              onClick={() => onChangeActType('PAST')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeActType === 'PAST'
                  ? 'bg-[#0b1c30] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
              }`}
            >
              Past Enacted Acts
            </button>
          </div>

          {/* View Modes & Filter Toggles */}
          <div className="flex items-center flex-wrap gap-2">
            {/* View Switcher */}
            <div className="flex items-center gap-1 p-1 bg-white border border-[#e2e8f0] rounded-md shadow-xs text-xs">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  viewMode === 'table'
                    ? 'bg-slate-100 font-semibold text-[#0b1c30]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Table View (Authentic Linklaters Grid)"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-slate-100 font-semibold text-[#0b1c30]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Timeline View"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </button>
              <button
                onClick={() => setViewMode('jurisdictions')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  viewMode === 'jurisdictions'
                    ? 'bg-slate-100 font-semibold text-[#0b1c30]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Regional Cards View"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Regional</span>
              </button>
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                hasActiveFilters
                  ? 'bg-rose-50 border-rose-200 text-[#a31922]'
                  : 'bg-white border-[#cbd5e1] text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {(selectedTopics.length > 0 ||
                selectedJurisdictions.length > 0 ||
                selectedStatuses.length > 0) && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#a31922] text-white text-[10px] font-bold rounded-full font-mono-numbers">
                  {selectedTopics.length + selectedJurisdictions.length + selectedStatuses.length}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="sort-select" className="sr-only">Sort Acts</label>
              <ArrowUpDown className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as FilterState['sortOption'])}
                className="pl-8 pr-8 py-1.5 text-xs font-medium bg-white border border-[#cbd5e1] rounded-md text-slate-700 hover:bg-slate-50 focus:ring-1 focus:ring-[#a31922] cursor-pointer"
              >
                <option value="date-asc">Date (Earliest to Latest)</option>
                <option value="date-desc">Date (Latest to Earliest)</option>
                <option value="jurisdiction-asc">Jurisdiction (A to Z)</option>
                <option value="topic-asc">Topic (A to Z)</option>
                <option value="latest-updated">Recently Updated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Drawer / Expandable Tray */}
        {showFilterDrawer && (
          <div className="bg-white border border-[#cbd5e1] rounded-xl p-5 mb-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Filter Parameters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-1 text-xs text-rose-700 hover:text-rose-900 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* Jurisdiction Facet */}
              <div>
                <span className="block font-semibold text-slate-900 mb-2">Jurisdiction</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {allJurisdictions.map((jur) => {
                    const isSelected = selectedJurisdictions.includes(jur);
                    return (
                      <button
                        key={jur}
                        onClick={() => toggleJurisdiction(jur)}
                        className={`w-full text-left px-2.5 py-1 rounded transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-900 text-white font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{jur}</span>
                        {isSelected && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic Facet */}
              <div>
                <span className="block font-semibold text-slate-900 mb-2">Topic Area</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {allTopics.map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`w-full text-left px-2.5 py-1 rounded transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-900 text-white font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{topic}</span>
                        {isSelected && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Facet */}
              <div>
                <span className="block font-semibold text-slate-900 mb-2">Implementation Status</span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {allStatuses.map((st) => {
                    const isSelected = selectedStatuses.includes(st);
                    return (
                      <button
                        key={st}
                        onClick={() => {
                          setSelectedStatuses((prev) =>
                            prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
                          );
                        }}
                        className={`w-full text-left px-2.5 py-1 rounded transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-900 text-white font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{st}</span>
                        {isSelected && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="font-mono-numbers text-slate-800">{filteredActs.length}</strong>{' '}
              of <strong className="font-mono-numbers text-slate-800">{acts.length}</strong> regulatory acts
            </span>
            <span aria-hidden="true">·</span>
            <span>Mode: {activeActType === 'UPCOMING' ? 'Upcoming Milestones' : 'Past Acts'}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: AUTHENTIC 4-COLUMN TABLE VIEW (TOPIC | DATE | JURISDICTION | UPDATE) */}
        {/* ========================================================================= */}
        {viewMode === 'table' && (
          <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden">
            {/* Table Header Row */}
            <div className="hidden lg:grid grid-cols-12 bg-[#f8fafc] border-b border-[#cbd5e1] text-[11px] font-bold uppercase tracking-wider text-slate-600 px-6 py-3.5">
              <div className="col-span-3">Topic</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Jurisdiction</div>
              <div className="col-span-5">Update & Legal Analysis</div>
            </div>

            {/* Table Body */}
            {filteredActs.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <p className="text-base font-semibold text-slate-800 mb-1">
                  No regulatory acts matched your current filter criteria.
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Try clearing topic or jurisdiction filters or searching with alternative keywords.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#a31922] rounded hover:bg-[#85131a] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#e2e8f0]">
                {filteredActs.map((act) => {
                  const isBookmarked = watchlist.includes(act.id);
                  return (
                    <article
                      key={act.id}
                      onClick={() => onSelectAct(act)}
                      className="group p-5 lg:px-6 lg:py-4.5 hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
                        {/* Column 1: Topic */}
                        <div className="lg:col-span-3">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#a31922] transition-colors leading-snug mb-1">
                            {act.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                            {act.topics.map((t, idx) => (
                              <React.Fragment key={t}>
                                <span>{t}</span>
                                {idx < act.topics.length - 1 && (
                                  <span aria-hidden="true" className="text-slate-300">
                                    ·
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Date */}
                        <div className="lg:col-span-2 flex items-center gap-2 text-xs text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold font-mono-numbers text-slate-800">
                            {act.date}
                          </span>
                        </div>

                        {/* Column 3: Jurisdiction & Regulator */}
                        <div className="lg:col-span-2 text-xs">
                          <div className="flex items-center gap-1.5 font-medium text-slate-900">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{act.jurisdiction}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 block pl-5 truncate">
                            {act.regulator}
                          </span>
                        </div>

                        {/* Column 4: Update & Legal Analysis */}
                        <div className="lg:col-span-5 flex items-start justify-between gap-4">
                          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
                            <p className="line-clamp-2 text-slate-700">{act.summary}</p>
                            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                              <span className="font-medium text-slate-800">
                                Status: {act.status}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span
                                className={`font-medium ${
                                  act.impactLevel === 'Critical'
                                    ? 'text-rose-700'
                                    : act.impactLevel === 'High'
                                    ? 'text-amber-700'
                                    : 'text-emerald-700'
                                }`}
                              >
                                Impact: {act.impactLevel}
                              </span>
                            </div>
                          </div>

                          {/* Interactive Row Controls */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWatchlist(act.id);
                              }}
                              className={`p-1.5 rounded transition-colors ${
                                isBookmarked
                                  ? 'text-[#a31922] bg-rose-50'
                                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                              }`}
                              title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
                              aria-label="Toggle Watchlist"
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </button>
                            <span className="text-slate-400 group-hover:text-[#a31922] group-hover:translate-x-0.5 transition-all">
                              <ChevronRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CHRONOLOGICAL TIMELINE VIEW */}
        {/* ========================================================================= */}
        {viewMode === 'timeline' && (
          <div className="relative border-l-2 border-slate-300 ml-4 md:ml-8 pl-6 md:pl-8 space-y-8 py-4">
            {filteredActs.map((act) => {
              const isBookmarked = watchlist.includes(act.id);
              return (
                <div key={act.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-[#a31922] shadow-xs group-hover:scale-125 transition-transform" />

                  <div
                    onClick={() => onSelectAct(act)}
                    className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-xs hover:border-[#cbd5e1] hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-numbers text-xs font-bold text-[#a31922] bg-rose-50 px-2.5 py-0.5 rounded">
                          {act.date}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {act.jurisdiction} · {act.regulator}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">
                        Status: {act.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#a31922] transition-colors mb-2">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {act.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2 text-slate-500">
                        <span>Topics: {act.topics.join(', ')}</span>
                      </div>
                      <span className="text-[#a31922] font-semibold flex items-center gap-1 group-hover:underline">
                        <span>View Full Briefing</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: REGIONAL CARDS VIEW */}
        {/* ========================================================================= */}
        {viewMode === 'jurisdictions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJurisdictions.map((jur) => {
              const jurActs = filteredActs.filter((a) => a.jurisdiction === jur);
              if (jurActs.length === 0) return null;
              return (
                <div
                  key={jur}
                  className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden flex flex-col"
                >
                  <div className="bg-[#0b1c30] text-white p-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">{jur}</h3>
                      <span className="text-xs text-slate-300">
                        {jurActs.length} active tracker items
                      </span>
                    </div>
                    <MapPin className="w-5 h-5 text-rose-400" />
                  </div>

                  <div className="p-4 divide-y divide-slate-100 flex-1 space-y-3">
                    {jurActs.map((act) => (
                      <div
                        key={act.id}
                        onClick={() => onSelectAct(act)}
                        className="pt-3 first:pt-0 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-mono-numbers font-semibold text-[#a31922]">
                            {act.date}
                          </span>
                          <span>{act.status}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#a31922] transition-colors line-clamp-2">
                          {act.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                          {act.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
