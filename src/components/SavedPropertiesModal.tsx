import React from 'react';
import { X, Heart, Trash2, MapPin, ArrowRight, Building2, Calendar } from 'lucide-react';
import { Property } from '../types';

interface SavedPropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onToggleSave: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onScheduleTour: (property: Property) => void;
  onClearAllSaved: () => void;
}

export const SavedPropertiesModal: React.FC<SavedPropertiesModalProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onToggleSave,
  onSelectProperty,
  onScheduleTour,
  onClearAllSaved
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="text-sm font-bold text-white">
              Saved Shortlisted Properties ({savedProperties.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {savedProperties.length > 0 && (
              <button
                onClick={onClearAllSaved}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3">
          {savedProperties.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No Saved Properties Yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the heart icon on any property in Taxila, Faisal Hills, or Islamabad to shortlist it for easy comparison.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {savedProperties.map((prop) => (
                <div 
                  key={prop.id}
                  className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 p-2 rounded-xl transition-colors"
                >
                  <div 
                    className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                    onClick={() => {
                      onSelectProperty(prop);
                      onClose();
                    }}
                  >
                    <img
                      src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                      alt={prop.title}
                      className="w-16 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate hover:text-blue-600">
                        {prop.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">{prop.location.society}, {prop.location.city}</span>
                      </div>
                      <div className="text-xs font-extrabold text-blue-700 font-mono mt-0.5">
                        {prop.priceFormatted}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onScheduleTour(prop);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Book Visit</span>
                    </button>

                    <button
                      onClick={() => onToggleSave(prop.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPropertiesModal;
