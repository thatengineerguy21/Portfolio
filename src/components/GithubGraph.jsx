import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { GraphGlassCardContainer, GraphGlassCard } from './GraphGlassCard';
import ScrollReveal from './ScrollReveal';
import '../styles/Sections.css';

const GithubGraph = React.memo(() => {
  return (
    <section id="github-contributions" className="section-block">
      <h2 className="section-heading">GitHub Contributions</h2>
      <ScrollReveal>
        <GraphGlassCardContainer className="github-container">
          <GraphGlassCard hoverColor={{ surface: 'rgba(108, 198, 68, 0.12)', border: 'rgba(108, 198, 68, 0.30)' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <GitHubCalendar 
                username="thatengineerguy21" 
                colorScheme="dark"
                fontSize={14}
                blockSize={14}
                blockMargin={5}
              />
            </div>
          </GraphGlassCard>
        </GraphGlassCardContainer>
      </ScrollReveal>
    </section>
  );
});

export default GithubGraph;
