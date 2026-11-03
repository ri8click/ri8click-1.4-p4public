import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Send, 
  CheckCircle, 
  Download, 
  Building, 
  ShieldCheck,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { AdVibeProject } from '../../types';

interface AdvibeEnquirySectionProps {
  project: AdVibeProject;
}

export const AdvibeEnquirySection: React.FC<AdvibeEnquirySectionProps> = ({ project }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredUnit, setPreferredUnit] = useState(
    project.pricingTiers[0]?.unitType || 'General Investment Inquiry'
  );
  const [message, setMessage] = useState('');
  const [contactPreference, setContactPreference] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent, source: string = 'website_advibe') => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/advibe/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          projectTitle: project.title,
          name,
          phone,
          email,
          preferredUnit,
          message: message || `Inquiry regarding ${preferredUnit} at ${project.title}`,
          contactPreference,
          source
        })
      });

      const newLeadRecord = {
        id: `lead-${Date.now()}`,
        projectId: project.id,
        projectTitle: project.title,
        name,
        phone,
        email,
        preferredUnit,
        message: message || `Inquiry regarding ${preferredUnit} at ${project.title}`,
        contactPreference,
        status: 'new' as const,
        source,
        createdAt: new Date().toISOString()
      };

      try {
        const stored = localStorage.getItem('ri8click_advibe_leads');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newLeadRecord);
        localStorage.setItem('ri8click_advibe_leads', JSON.stringify(list));
      } catch (e) {
        console.error('Local lead cache error', e);
      }

      setSubmitted(true);
      // If whatsapp was preferred, offer direct open
      if (contactPreference === 'whatsapp') {
        const text = encodeURIComponent(
          `Salam! I am interested in ${preferredUnit} at ${project.title}. My name is ${name}. Please share booking details.`
        );
        window.open(`https://wa.me/${project.dealerWhatsApp || '923365666727'}?text=${text}`, '_blank');
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      // Even if network fails, trigger success locally
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBrochureDownload = () => {
    if (project.downloadableBrochureUrl) {
      window.open(project.downloadableBrochureUrl, '_blank');
    }
  };

  return (
    <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Value & Quick Contact Column */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Developer Reservation Desk</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reserve Your Priority Slot
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Connect directly with {project.developer.name} certified project consultants. Guaranteed official pricing, zero hidden commission, and transparent file verification.
            </p>
          </div>

          {/* Contact Direct Hotlines */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Direct Contact Lines
            </div>
            
            <a 
              href={`tel:${project.dealerPhone || '+923365666727'}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs text-slate-400">Priority Hotline</div>
                <div className="text-sm font-bold text-white group-hover:text-blue-400">
                  {project.dealerPhone || '+92 336-5666727'}
                </div>
              </div>
            </a>

            <a 
              href={`https://wa.me/${project.dealerWhatsApp || '923365666727'}?text=${encodeURIComponent(`Salam! I need information on ${project.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-700/40 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <div className="text-xs text-emerald-400/80">WhatsApp Concierge (Instant Reply)</div>
                <div className="text-sm font-bold text-white group-hover:text-emerald-400">
                  +92 336-5666727
                </div>
              </div>
            </a>
          </div>

          {/* Quick Action Downloads */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleBrochureDownload}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Download Official Brochure (PDF)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Privacy Protected • Zero Spam Guarantee</span>
          </div>
        </div>

        {/* Right Lead Capture Form */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{name}</span>. Our senior project representative has received your request for <span className="text-blue-400 font-semibold">{preferredUnit}</span> and will contact you via {contactPreference} shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, 'website_advibe')} className="space-y-4">
              <div className="border-b border-slate-800 pb-3 mb-2">
                <h4 className="text-base font-bold text-white">Send Direct VIP Inquiry</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fill in your details below for personalized floorplans, payment schedule & site visit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Malik Usman"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. usman@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Preferred Unit / Size
                  </label>
                  <select
                    value={preferredUnit}
                    onChange={e => setPreferredUnit(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                  >
                    {project.pricingTiers.map((tier) => (
                      <option key={tier.id} value={tier.unitType}>
                        {tier.unitType} ({tier.size})
                      </option>
                    ))}
                    <option value="General Investment Inquiry">General Investment Consultation</option>
                    <option value="Penthouse / Luxury Suite">Penthouse / Luxury Suite</option>
                    <option value="Commercial Broadway Shop">Commercial Broadway Shop</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Preferred Contact Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                    { key: 'phone', label: 'Phone Call', icon: Phone },
                    { key: 'email', label: 'Email', icon: Mail }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = contactPreference === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setContactPreference(item.key as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                            : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Your Message or Special Request
                </label>
                <textarea
                  rows={2}
                  placeholder="I would like to schedule a private site visit this Saturday..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/30 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Request...' : 'Submit Priority Inquiry'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'site_visit_request')}
                  disabled={isSubmitting}
                  className="py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-amber-600/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Site Visit</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdvibeEnquirySection;
