import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { describe, it, expect, vi } from 'vitest';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;

describe('Navbar Component', () => {
  it('renders the navbar with breadcrumbs and links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Check if basic links are present
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    
    // Check if initial breadcrumbs are present
    expect(screen.getByText('~')).toBeInTheDocument();
    expect(screen.getByText('thatengineerguy')).toBeInTheDocument();
    expect(screen.getByText('portfolio')).toBeInTheDocument();
  });
});
