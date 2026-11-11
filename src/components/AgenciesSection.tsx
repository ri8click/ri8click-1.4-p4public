import React, { useRef, useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  PlusCircle,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { AgencyAccount, Property } from '../types';
import { PAKISTAN_AGENT_AVATARS } from '../data/defaultAccounts';

interface AgenciesSectionProps {
  agencies: AgencyAccount[];
  properties: Property[];
  onOpenRegisterAgency: () => void;
  onFilterByAgency: (agencyId: string) => void;
  canEditAgencies?: boolean;
  onUpdateAgencies?: (agencies: AgencyAccount[]) => void;
}

const LEGACY_FOREIGN_AVATAR_IDS = [
  '1560250097-0b93528c311a',
  '1573496359142-b8d87734a5a2',
  '1580489944761-15a19d654956',
  '1534528741775-53994a69daeb',
  '1500648767791-00dcc994a43e',
  '1472099645785-5658abf4ff4e',
  '1633332755192-727a05c4013d'
];

export const PAKISTAN_AVATAR_POOL = [
  PAKISTAN_AGENT_AVATARS.malikZeeshan,
  PAKISTAN_AGENT_AVATARS.chaudhryBilal,
  PAKISTAN_AGENT_AVATARS.engrHarisFarooq,
  PAKISTAN_AGENT_AVATARS.hajiAslamKhan,
  PAKISTAN_AGENT_AVATARS.mianAhmed,
  PAKISTAN_AGENT_AVATARS.tariqMehmood,
  PAKISTAN_AGENT_AVATARS.adminPrincipal
];

export function resolvePakistanAgentAvatar(
  avatarUrl?: string,
  agencyIdOrName?: string,
  idx = 0
): string {
  const trimmed = (avatarUrl || '').trim();

  // Always preserve uploaded photos (/uploads/... or data:image/...) and valid custom URLs
  if (
    trimmed.startsWith('/uploads/') ||
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  const isForeignOrEmpty =
    !trimmed ||
    LEGACY_FOREIGN_AVATAR_IDS.some(foreignId => trimmed.includes(foreignId));

  if (!isForeignOrEmpty && trimmed) {
    return trimmed;
  }

  const key = (agencyIdOrName || '').toLowerCase();
  if (key.includes('agency-1') || key.includes('zeeshan') || key.includes('mairaj')) {
    return PAKISTAN_AGENT_AVATARS.malikZeeshan;
  }
  if (key.includes('agency-2') || key.includes('bilal') || key.includes('sadat')) {
    return PAKISTAN_AGENT_AVATARS.chaudhryBilal;
  }
  if (key.includes('agency-3') || key.includes('haris') || key.includes('beacon')) {
    return PAKISTAN_AGENT_AVATARS.engrHarisFarooq;
  }
  if (
    key.includes('agency-4') ||
    key.includes('aslam') ||
    key.includes('jahangir') ||
    key.includes('kohistan')
  ) {
    return PAKISTAN_AGENT_AVATARS.hajiAslamKhan;
  }
  if (key.includes('sapphire') || key.includes('mian') || key.includes('athar')) {
    return PAKISTAN_AGENT_AVATARS.mianAhmed;
  }

  return PAKISTAN_AVATAR_POOL[idx % PAKISTAN_AVATAR_POOL.length];
}

async function uploadAgentPhotoToServer(dataUrl: string, fileName: string): Promise<string> {
  try {
    const res = await fetch('/api/media/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl, fileName })
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.url) return data.url;
    }
  } catch {
    // Fallback to inline DataURL
  }
  return dataUrl;
}

export const AgenciesSection: React.FC<AgenciesSectionProps> = ({
  agencies,
  properties,
  onOpenRegisterAgency,
  onFilterByAgency,
  canEditAgencies = false,
  onUpdateAgencies
}) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [uploadingAgencyId, setUploadingAgencyId] = useState<string | null>(null);

  const handleUploadSpecialistPhoto = (agencyId: string, file?: File) => {
    if (!file || !onUpdateAgencies) return;
    setUploadingAgencyId(agencyId);
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 600;
        let width = img.width;
        let height = img.height;
        if (width > height && width > MAX_SIZE) {
          height = Math.round((height * MAX_SIZE) / width);
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round((width * MAX_SIZE) / height);
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        const permanentUrl = await uploadAgentPhotoToServer(dataUrl, file.name);
        const updated = agencies.map(ag =>
          ag.id === agencyId
            ? { ...ag, logo: permanentUrl, avatar: permanentUrl }
            : ag
        );
        onUpdateAgencies(updated);
        setUploadingAgencyId(null);
      };
      img.onerror = () => setUploadingAgencyId(null);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => setUploadingAgencyId(null);
    reader.readAsDataURL(file);
  };

  return (
    <section id="agents-section" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Verified Pakistan National Multi-Agent Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top Certified Agencies &amp; Real Estate Specialists
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Connect directly with verified Pakistani real estate specialists and regional directors in{' '}
              <strong className="text-slate-900 font-semibold">Taxila, Faisal Hills</strong>,
              Rawalpindi, Islamabad, and Lahore with complete RDA/CDA verification accountability.
            </p>
          </div>

          <button
            onClick={onOpenRegisterAgency}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>Manage / Register Agency</span>
          </button>
        </div>

        {/* Agencies Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agencies.map((agency, idx) => {
            const agencyPropsCount = properties.filter(
              p => p.agencyId === agency.id && p.status !== 'pending'
            ).length;
            const resolvedAvatar = resolvePakistanAgentAvatar(
              agency.avatar || agency.logo,
              `${agency.id} ${agency.name} ${agency.companyName || ''}`,
              idx
            );

            return (
              <div
                key={agency.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Specialist Portrait & Verification Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative group shrink-0">
                        <img
                          key={resolvedAvatar}
                          src={resolvedAvatar}
                          alt={agency.name}
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              PAKISTAN_AVATAR_POOL[idx % PAKISTAN_AVATAR_POOL.length];
                          }}
                          className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-blue-600/30 shadow-sm"
                        />
                        {canEditAgencies && onUpdateAgencies && (
                          <>
                            <input
                              ref={el => {
                                fileInputRefs.current[agency.id] = el;
                              }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={e =>
                                handleUploadSpecialistPhoto(agency.id, e.target.files?.[0])
                              }
                            />
                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[agency.id]?.click()}
                              disabled={uploadingAgencyId === agency.id}
                              className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                              title="Upload Specialist Photo (Auto-Updates All Agent Ads)"
                            >
                              <Camera className="w-3 h-3" />
                            </button>
                          </>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">
                          {agency.companyName || agency.name}
                        </h3>
                        <p className="text-xs text-blue-700 font-bold truncate">
                          {agency.name}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                          <span className="truncate">
                            {agency.city} • {agency.primarySociety || 'Pakistan Region'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase rounded-md shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>PK Certified</span>
                    </span>
                  </div>

                  {/* Quota & Listings Stats */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Active Portfolio
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">
                        {agencyPropsCount} Verified Ads
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Regional Trust
                      </span>
                      <span className="text-xs font-extrabold text-slate-900 flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{agency.rating} / 5.0</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${(agency.whatsapp || '923365666727').replace(
                      /[^0-9]/g,
                      ''
                    )}?text=${encodeURIComponent(
                      `Assalam o Alaikum ${agency.name}, I am contacting you via ri8click regarding properties in ${agency.city}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${agency.phone}`}
                    className="p-2.5 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                    title="Call Specialist"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onFilterByAgency(agency.id)}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                  >
                    View Ads
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
