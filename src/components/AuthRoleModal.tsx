import React from 'react';
import {
  X,
  ShieldCheck,
  User,
  Check,
  PlusCircle,
  Settings,
  Edit3
} from 'lucide-react';
import { AgencyAccount } from '../types';
import { UserAccount } from '../data/defaultAccounts';
import { resolvePakistanAgentAvatar } from './AgenciesSection';

interface AuthRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: 'admin' | 'agency' | 'customer';
  currentAgency: AgencyAccount;
  allAgencies?: AgencyAccount[];
  agencies?: AgencyAccount[];
  allUsers?: UserAccount[];
  currentUser?: UserAccount | null;
  onSelectRole: (role: 'admin' | 'agency' | 'customer') => void;
  onSelectAgency?: (agencyId: string) => void;
  onOpenAdminHub?: () => void;
  onOpenPostProperty?: () => void;
  onOpenProfileTab?: () => void;
}

export const AuthRoleModal: React.FC<AuthRoleModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentAgency,
  allAgencies,
  agencies,
  onSelectRole,
  onSelectAgency,
  onOpenAdminHub,
  onOpenPostProperty,
  onOpenProfileTab
}) => {
  if (!isOpen) return null;

  const agencyList = allAgencies || agencies || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Switch Active User Role &amp; Authority</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Select Super Admin, Certified Agency User, or Visitor Mode
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* 1. Super Admin Option */}
          <div
            onClick={() => {
              onSelectRole('admin');
              onClose();
            }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              currentRole === 'admin'
                ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black shrink-0">
                SA
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>1. Super Admin Console</span>
                  <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded">
                    Master Access
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Full privileges: Hero Portfolio Deck, user roles &amp; photos, video virtual tours, quotas &amp; CMS blocks.
                </div>
              </div>
            </div>

            {currentRole === 'admin' && (
              <Check className="w-5 h-5 text-blue-600 shrink-0" />
            )}
          </div>

          {/* Quick Actions */}
          {(currentRole === 'admin' || currentRole === 'agency') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {onOpenAdminHub && (
                <button
                  onClick={onOpenAdminHub}
                  className="py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Hub</span>
                </button>
              )}
              {onOpenProfileTab && (
                <button
                  onClick={onOpenProfileTab}
                  className="py-2 px-3 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile/Photo</span>
                </button>
              )}
              {onOpenPostProperty && (
                <button
                  onClick={onOpenPostProperty}
                  className="py-2 px-3 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Post Property</span>
                </button>
              )}
            </div>
          )}

          {/* 2. Certified Brokerage Accounts */}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-1">
            2. Certified Agency Users ({agencyList.length})
          </div>

          <div className="space-y-2">
            {agencyList.map((agency, idx) => {
              const isSelected =
                currentRole === 'agency' && currentAgency.id === agency.id;
              const cleanAvatar = resolvePakistanAgentAvatar(
                agency.avatar || agency.logo,
                `${agency.id} ${agency.name} ${agency.companyName}`,
                idx
              );

              return (
                <div
                  key={agency.id}
                  onClick={() => {
                    onSelectRole('agency');
                    if (onSelectAgency) {
                      onSelectAgency(agency.id);
                    }
                    onClose();
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cleanAvatar}
                      alt={agency.name}
                      className="w-9 h-9 rounded-full object-cover object-top border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                        <span>{agency.companyName}</span>
                        {agency.verified && (
                          <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[10.5px] text-slate-500 truncate">
                        {agency.name} • {agency.primarySociety}, {agency.city} • Limit:{' '}
                        {agency.postLimit} ads
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* 3. Visitor / Customer Mode */}
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-1">
            3. Public Visitor / Customer Role
          </div>

          <div
            onClick={() => {
              onSelectRole('customer');
              onClose();
            }}
            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              currentRole === 'customer'
                ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Visitor / Buyer Browsing Mode
                </div>
                <div className="text-[11px] text-slate-500">
                  Experience the website as a public visitor or property buyer.
                </div>
              </div>
            </div>

            {currentRole === 'customer' && (
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRoleModal;
