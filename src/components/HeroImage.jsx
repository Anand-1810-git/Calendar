import React from 'react';

// Using a gorgeous Unsplash abstract landscape for desktop aesthetic
const IMAGE_URL = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1400';

export default function HeroImage({ currentDate, selection }) {
    const formatSelectionStr = () => {
        if (selection.start && selection.end) {
            return "Plan your journey";
        }
        if (selection.start) {
            return "Select an end date";
        }
        return "Your next adventure";
    };

    return (
        <div className="hero-section">
            <img src={IMAGE_URL} alt="Hero calendar backdrop" className="hero-image" />
            <div className="hero-overlay">
                <h1 className="hero-title">
                    {currentDate.toLocaleString('default', { month: 'long' })}
                </h1>
                <p className="hero-subtitle">
                    {formatSelectionStr()}
                </p>
            </div>
        </div>
    );
}
