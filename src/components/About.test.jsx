import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';

// Mock dependencies
vi.mock('../assets/documents/Vedant_Chaudhari_DYPCOE.pdf', () => ({ default: 'mock-resume.pdf' }));
vi.mock('../assets/icons/download-file.svg', () => ({ default: 'mock-icon.svg' }));
vi.mock('../assets/images/profile-casual.jpg', () => ({ default: 'mock-profile.jpg' }));
vi.mock('../assets/icons/locationpin.svg', () => ({ default: 'mock-location.svg' }));

// Mock ParallaxImage since it might use dynamics.js which is complex for jsdom
vi.mock('./ParallaxImage', () => ({
  default: () => <div data-testid="parallax-image-mock">Parallax Image</div>
}));

describe('About Component', () => {
  it('renders the about section with name and resume link', () => {
    render(<About />);
    
    // Check main headings
    expect(screen.getAllByText('Vedant Chaudhari')[0]).toBeInTheDocument();
    
    // Check for the mock image component
    expect(screen.getByTestId('parallax-image-mock')).toBeInTheDocument();
    
    // Check resume download link
    const downloadLink = screen.getByText('Download Resume').closest('a');
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute('href', 'mock-resume.pdf');
    expect(downloadLink).toHaveAttribute('download', 'Vedant_Chaudhari_Resume.pdf');
  });
});
