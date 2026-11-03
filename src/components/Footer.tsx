import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Settings, 
  Heart,
  Building2,
  Layers,
  Compass,
  Lock
} from 'lucide-react';
import { Ri8ClickLogo } from './Ri8ClickLogo';
import { ConsortiumDivision } from '../types';
import { UserAccount } from '../data/defaultAccounts';

interface FooterProps {
  divisions?: ConsortiumDivision[];
  onSelectNavTab?: (tab: string) => void;
  onOpenAdmin: () => void;
  onSelectSociety?: (society: string) => void;
  currentUser?: UserAccount | null;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  divisions,
  onSelectNavTab,
  onOpenAdmin,
  onSelectSociety,
  currentUser,
  onOpenLogin
}) => {
  const societies = [
    'Faisal Hills Block A',
    'Faisal Hills Block B',
    'Faisal Hills Block C',
    'Faisal Hills Executive Block',
    'Faisal Hills Commercial Broadway',
    'Kohistan Enclave Taxila',
    'B-17 Multi Gardens',
    'Margalla View Society'
  ];

  const handleNav = (tab: string) => {
    if (onSelectNavTab) {
      onSelectNavTab(tab);
    }
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Ri8ClickLogo size="md" showSubtitle={true} variant="light" />
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pakistan&apos;s premier multi-brokerage real estate consortium and technology platform. Vetting, marketing, and closing transactions across Taxila, Faisal Hills, Islamabad, and Rawalpindi with 100% watermark verified property listings.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Head Office: Commercial Broadway, Faisal Hills, GT Road Taxila</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>UAN / WhatsApp: +92 336 5666727</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@ri8click.pk • ceo@ri8click.pk</span>
              </div>
            </div>
          </div>

          {/* Quick Societies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Prime Societies
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {societies.map((soc, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectSociety && onSelectSociety(soc)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {soc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Consortium Divisions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Group Divisions
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {divisions && divisions.length > 0 ? (
                divisions.map((div) => (
                  <li key={div.id}>
                    <button
                      onClick={() => handleNav('consortium')}
                      className="hover:text-white transition-colors text-left"
                    >
                      {div.shortName || div.title}
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li className="hover:text-white transition-colors">Ri8Click Real Estate</li>
                  <li className="hover:text-white transition-colors">Ri8Click Turnkey Construction</li>
                  <li className="hover:text-white transition-colors">Ri8Click UPVC & Aluminium</li>
                  <li className="hover:text-white transition-colors">Ri8Click Technology & AI</li>
                  <li className="hover:text-white transition-colors">Space Capsule Prefab Houses</li>
                </>
              )}
            </ul>
          </div>

          {/* Governance & Console */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Governance
            </h4>
            <p className="text-xs text-slate-400">
              Licensed brokerage members operate under strict verification agreements and digital watermark integrity standards.
            </p>
            <div className="pt-2">
              {currentUser?.role === 'admin' ? (
                <button
                  onClick={onOpenAdmin}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/50 text-amber-300 text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-amber-400" />
                  <span>Super Admin Console</span>
                </button>
              ) : currentUser?.role === 'agency' ? (
                <button
                  onClick={onOpenAdmin}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-blue-500/50 text-blue-300 text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Certified Agent Panel</span>
                </button>
              ) : (
                <button
                  onClick={onOpenLogin || onOpenAdmin}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-2"
                  title="Sign in with certified credentials"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Staff & Agent Portal Sign In</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-slate-900 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} ri8click (Pvt.) Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Watermark Protection Active</span>
            <span>•</span>
            <span>Faisal Hills Commercial Broadway</span>
            <span>•</span>
            <span>Taxila, Punjab</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
