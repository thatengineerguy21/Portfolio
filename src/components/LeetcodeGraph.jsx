import React from 'react';
import { GraphGlassCardContainer, GraphGlassCard } from './GraphGlassCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';

const LeetcodeGraph = React.memo(() => {
  return (
    <section id="leetcode-submissions" className="section-block">
      <h2 className="section-heading">LeetCode Submissions</h2>
      <ScrollReveal>
        <GraphGlassCardContainer className="leetcode-container">
          <GraphGlassCard hoverColor={{ surface: 'rgba(255, 161, 22, 0.12)', border: 'rgba(255, 161, 22, 0.30)' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="https://leetcard.jacoblin.cool/thatengineerguy13?theme=dark&font=Inter&ext=heatmap" 
                alt="LeetCode Stats" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
              />
            </div>
          </GraphGlassCard>
        </GraphGlassCardContainer>
      </ScrollReveal>
    </section>
  );
});

export default LeetcodeGraph;
