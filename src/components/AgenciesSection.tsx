import React from 'react';
import { Users, ShieldCheck, MapPin, Phone, MessageCircle, Star, PlusCircle, Building2 } from 'lucide-react';
import { AgencyAccount, Property } from '../types';

interface AgenciesSectionProps {
  agencies: AgencyAccount[];
  properties: Property[];
  onOpenRegisterAgency: () => void;
  onFilterByAgency: (agencyId: string) => void;
}

export const AgenciesSection: React.FC<AgenciesSectionProps> = ({
  agencies,
  properties,
  onOpenRegisterAgency,
  onFilterByAgency,
}) => {
  return (
    <section id="agents-section" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Multi-Agent Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Top Certified Agencies & Real Estate Specialists
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Connect directly with verified brokers and area specialists in <strong className="text-slate-900 font-semibold">Taxila, Faisal Hills</strong>, 
              Rawalpindi, and Islamabad with complete post-verification accountability.
            </p>
          </div>

          <button
            onClick={onOpenRegisterAgency}
            className="self-start md:self-auto px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-2 shadow-2xs"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            <span>Join Multi-Agent Network</span>
          </button>
        </div>

        {/* Agencies Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agencies.map((agency) => {
            const agencyPropsCount = properties.filter(p => p.agencyId === agency.id).length || agency.totalPosts;

            return (
              <div
                key={agency.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 hover:border-slate-300 transition-all duration-200 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Avatar & Verification Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={agency.avatar}
                        alt={agency.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {agency.companyName}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium">{agency.name}</p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span>{agency.city} • {agency.primarySociety}</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-semibold uppercase rounded-md shrink-0">
                      Verified
                    </span>
                  </div>

                  {/* Quota & Listings Stats */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Listings</span>
                      <span className="text-xs font-bold text-slate-900">{agencyPropsCount} Active</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Rating</span>
                      <span className="text-xs font-bold text-slate-900 flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{agency.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(`Assalam o Alaikum ${agency.name}, I am contacting you via ri8click regarding properties in ${agency.city}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${agency.phone}`}
                    className="p-2 rounded-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onFilterByAgency(agency.id)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Listings
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AgenciesSection;
