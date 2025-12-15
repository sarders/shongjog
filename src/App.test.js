import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { MemoryRouter } from 'react-router-dom';

// Mock IntersectionObserver
beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

test('renders Shongjog title', () => {
    render(
        <MemoryRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </MemoryRouter>
    );
    const titleElements = screen.getAllByText(/Shongjog/i);
    expect(titleElements.length).toBeGreaterThan(0);
});
