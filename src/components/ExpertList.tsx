import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronRight, X, GraduationCap, Briefcase, BookOpen, User } from 'lucide-react';
import { ExpertContact } from '../types/tracker';

interface ExpertListProps {
  experts: ExpertContact[];
}

export const ExpertList: React.FC<ExpertListProps> = ({ experts }) => {
  const [selectedExpert, setSelectedExpert] = useState<ExpertContact | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'works'>('overview');

  return (
    <section id="key-contacts" className="py-16 bg-white border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Linklaters Key Contacts */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#cbd5e1]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#a31922] block mb-1">
              Global Financial Regulation & ESG Group
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0b1c30]">
              Key Contacts
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Our market-leading regulatory lawyers guide financial institutions through complex,
            multi-jurisdictional ESG obligations and strategic transition plans.
          </p>
        </div>

        {/* 8 Expert Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((exp) => (
            <div
              key={exp.id}
              onClick={() => {
                setSelectedExpert(exp);
                setActiveTab('overview');
              }}
              className="group bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl overflow-hidden hover:border-[#cbd5e1] hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              {/* Photo Header */}
              <div className="relative aspect-4/3 bg-slate-200 overflow-hidden">
                <img
                  src={exp.imageSrc}
                  alt={exp.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to placeholder avatar
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    {exp.officeLocation}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#a31922] transition-colors leading-tight mb-1">
                    {exp.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {exp.jobTitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <a
                      href={`mailto:${exp.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:text-[#a31922] rounded hover:bg-white transition-colors"
                      title={exp.email}
                      aria-label="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`tel:${exp.phone.replace(/[^0-9+]/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:text-[#a31922] rounded hover:bg-white transition-colors"
                      title={exp.phone}
                      aria-label="Call Phone"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <span className="text-xs font-semibold text-[#a31922] flex items-center gap-0.5 group-hover:underline">
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Detail Modal with Tabs (Overview, Experience, Education, Works) */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-6">
            {/* Modal Header */}
            <div className="bg-[#0b1c30] text-white p-6 flex items-start gap-4 justify-between border-b border-slate-800">
              <div className="flex items-center gap-4">
                <img
                  src={selectedExpert.imageSrc}
                  alt={selectedExpert.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/80 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedExpert.termsOfAddress} {selectedExpert.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-snug">
                    {selectedExpert.jobTitle}
                  </p>
                  <p className="text-xs text-rose-300 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {selectedExpert.officeLocation}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedExpert(null)}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close profile"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-medium">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-[#a31922] text-[#a31922] font-bold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'experience'
                    ? 'border-[#a31922] text-[#a31922] font-bold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                  activeTab === 'education'
                    ? 'border-[#a31922] text-[#a31922] font-bold bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Education
              </button>
              {selectedExpert.publishedWorks && (
                <button
                  onClick={() => setActiveTab('works')}
                  className={`flex-1 py-3 text-center border-b-2 transition-colors ${
                    activeTab === 'works'
                      ? 'border-[#a31922] text-[#a31922] font-bold bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Publications
                </button>
              )}
            </div>

            {/* Modal Tab Content */}
            <div className="p-6 max-h-80 overflow-y-auto text-xs text-slate-700 leading-relaxed space-y-4">
              {activeTab === 'overview' && (
                <div>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {selectedExpert.overview}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                    <div>
                      <span className="block font-semibold text-slate-900 mb-0.5">Direct Email</span>
                      <a
                        href={`mailto:${selectedExpert.email}`}
                        className="text-[#a31922] hover:underline"
                      >
                        {selectedExpert.email}
                      </a>
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-900 mb-0.5">Telephone</span>
                      <a
                        href={`tel:${selectedExpert.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-slate-700 font-mono-numbers"
                      >
                        {selectedExpert.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-2.5">
                  <span className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Notable Sustainable Finance Experience
                  </span>
                  <ul className="space-y-2">
                    {selectedExpert.experience.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-100">
                        <span className="text-[#a31922] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-2.5">
                  <span className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Qualifications & Admissions
                  </span>
                  <ul className="space-y-2">
                    {selectedExpert.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-100">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'works' && selectedExpert.publishedWorks && (
                <div className="space-y-2.5">
                  <span className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Thought Leadership & Briefings
                  </span>
                  <ul className="space-y-2">
                    {selectedExpert.publishedWorks.map((work, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded border border-slate-100">
                        <BookOpen className="w-4 h-4 text-[#a31922] shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{work}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <a
                href={`mailto:${selectedExpert.email}?subject=Inquiry regarding Sustainable Finance Tracker`}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#a31922] hover:bg-[#85131a] rounded transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact {selectedExpert.name.split(' ')[0]} Directly</span>
              </a>
              <button
                onClick={() => setSelectedExpert(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
