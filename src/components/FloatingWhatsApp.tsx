import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '923365666727',
  defaultMessage = 'Assalam o Alaikum, I am visiting the ri8click Real Estate website and need property assistance.'
}) => {
  const handleClick = () => {
    const text = encodeURIComponent(defaultMessage);
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
      aria-label="Direct WhatsApp Concierge"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
        WhatsApp Desk
      </span>
    </button>
  );
};

export default FloatingWhatsApp;
