import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  it('renders the navbar with breadcrumbs and links', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    );
    
    // Check if basic links are present
    expect(screen.getAllByText('Projects')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Career')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Skills')[0]).toBeInTheDocument();
    
    // Check if initial breadcrumbs are present
    expect(screen.getByText('~')).toBeInTheDocument();
    expect(screen.getByText('thatengineerguy')).toBeInTheDocument();
    expect(screen.getByText('portfolio')).toBeInTheDocument();
  });
});
