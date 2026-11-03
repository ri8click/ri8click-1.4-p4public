import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-22 left-6 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-slate-700 shadow-md transition-all hover:-translate-y-0.5"
      aria-label="Scroll back to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};

export default ScrollToTop;
