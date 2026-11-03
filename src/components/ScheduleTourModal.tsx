import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';

interface ScheduleTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  isOpen,
  onClose,
  property
}) => {
  if (!isOpen || !property) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Trigger WhatsApp notification for agent
    const text = encodeURIComponent(
      `Assalam o Alaikum, Site Visit Tour Request from ${name} (${phone}) for "${property.title}" in ${property.location.society}, ${property.location.city} on ${date || 'Soonest'} at ${time}. Message: ${message || 'Please confirm tour.'}`
    );
    window.open(`https://wa.me/${(property.agentWhatsApp || property.agentPhone || '923365666727').replace(/[^0-9]/g, '')}?text=${text}`, '_blank');

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Schedule In-Person Site Visit</span>
            </h3>
            <p className="text-[11px] text-slate-400 truncate max-w-sm">
              {property.title} • {property.location.society}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Tour Request Dispatched!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your request has been forwarded to agent <strong>{property.agentName}</strong> ({property.agentCompany}). They will reach out to confirm your slot.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Usman Tariq"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="usman@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Time</label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600"
                  >
                    <option>10:00 AM - Morning</option>
                    <option>11:30 AM - Late Morning</option>
                    <option>02:30 PM - Afternoon</option>
                    <option>04:30 PM - Evening Golden Hour</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Questions or Special Requests</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="e.g. Would like to inspect construction quality & UPVC windows..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white text-slate-900 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm & Send to Agent WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTourModal;
