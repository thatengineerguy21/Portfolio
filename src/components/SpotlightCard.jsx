import { memo } from 'react';
import './SpotlightCard.css';

const SpotlightCard = memo(({ children, className = '', spotlightColor, style = {}, ...props }) => {
  const customStyle = {
    ...style,
    '--hover-border-dim': spotlightColor || 'rgba(140, 165, 230, 0.15)',
    '--hover-border-bright': spotlightColor || 'rgba(140, 165, 230, 0.35)',
  };

  return (
    <div className={`card-spotlight ${className}`} style={customStyle} {...props}>
      {children}
    </div>
  );
});

export default SpotlightCard;