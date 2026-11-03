import React from 'react';

interface WatermarkBadgeProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showVerifiedText?: boolean;
  className?: string;
}

export const WatermarkBadge: React.FC<WatermarkBadgeProps> = () => {
  // "Watermark Verified" badge removed from property & banner images as requested
  return null;
};

export default WatermarkBadge;
