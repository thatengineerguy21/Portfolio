import React from 'react';
import '../styles/GraphGlassCard.css';

export const GraphGlassCardContainer = ({ children, className = '' }) => {
  return (
    <div className={`graph-glass-cards-container ${className}`}>
      {children}
    </div>
  );
};

export const GraphGlassCard = React.memo(({
  children,
  className = '',
  contentClassName = '',
  hoverColor,
  spotlightColor,
  style = {},
  ...props
}) => {
  const customStyle = {
    ...style,
    '--hover-border-dim': spotlightColor || hoverColor?.surface || 'rgba(140, 165, 230, 0.15)',
    '--hover-border-bright': hoverColor?.border || spotlightColor || 'rgba(140, 165, 230, 0.35)',
  };

  return (
    <div className={`graph-glass-card ${className}`} style={customStyle} {...props}>
      <div className={`graph-glass-card-content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
});
