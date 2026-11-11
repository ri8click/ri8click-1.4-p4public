import React from 'react';
import {
  Building2,
  HardHat,
  Maximize,
  Cpu,
  Layers,
  ArrowUpRight,
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ConsortiumDivision } from '../types';

interface ConsortiumShowcaseProps {
  divisions: ConsortiumDivision[];
  onSelectDivisionContact: (division: ConsortiumDivision) => void;
  onNavigateDivisionLink?: (division: ConsortiumDivision) => void;
}

export const ConsortiumShowcase: React.FC<ConsortiumShowcaseProps> = ({
  divisions,
  onSelectDivisionContact,
  onNavigateDivisionLink
}) => {
  const iconMap: Record<string, any> = {
    Building2,
    HardHat,
    Maximize,
    Cpu,
    Layers
  };

  const handleImageOrCardClick = (div: ConsortiumDivision) => {
    if (onNavigateDivisionLink && div.linkUrl) {
      onNavigateDivisionLink(div);
      return;
    }
    const url = (div.linkUrl || '').trim();
    if (!url) return;

    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, div.linkTarget || '_blank', 'noopener,noreferrer');
    } else if (url.startsWith('#')) {
      const el = document.getElementById(url.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="consortium-section"
      className="py-16 bg-slate-100 text-slate-900 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Corporate Consortium Structure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            ri8click Group of Companies
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            From premier real estate transactions to turnkey construction, European-standard UPVC systems, PropTech AI software, and prefabricated smart pods.
          </p>
        </div>

        {/* Divisions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map(div => {
            const Icon = iconMap[div.iconName] || Building2;
            const hasLink = Boolean(div.linkUrl && div.linkUrl.trim());

            return (
              <div
                key={div.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Clickable Image Header */}
                <div
                  onClick={() => hasLink && handleImageOrCardClick(div)}
                  className={`relative aspect-[16/9] overflow-hidden bg-slate-900 ${
                    hasLink ? 'cursor-pointer' : ''
                  }`}
                  title={
                    hasLink
                      ? `Click to open ${div.shortName} (${div.linkUrl})`
                      : div.title
                  }
                >
                  <img
                    src={div.image}
                    alt={div.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-white/10">
                    {div.badge}
                  </div>

                  {hasLink && (
                    <div className="absolute top-3 right-3 bg-blue-600/90 hover:bg-blue-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-md transition-transform group-hover:scale-105">
                      <span>Explore Feature</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                    <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">{div.shortName}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      onClick={() => hasLink && handleImageOrCardClick(div)}
                      className={`text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors ${
                        hasLink ? 'cursor-pointer' : ''
                      }`}
                    >
                      {div.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {div.description}
                    </p>

                    {/* Capabilities list */}
                    <div className="space-y-1.5 pt-2">
                      {div.capabilities.slice(0, 3).map((cap, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-[11.5px] text-slate-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Division Stats & Contact */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500 min-w-0">
                      <span className="block font-bold text-slate-900 truncate">
                        {div.contactPerson}
                      </span>
                      <span>{div.contactPhone}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {hasLink && (
                        <button
                          type="button"
                          onClick={() => handleImageOrCardClick(div)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onSelectDivisionContact(div)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConsortiumShowcase;
