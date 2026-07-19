import React from 'react';
import './BirthdaySurprisePage.css';

function EndCreditsPage({ onBack }) {
  return (
    <section className="end-credit-page">
      <div className="end-credit-card">
        <p className="eyebrow">Final Thanks</p>
        <h1>poyi umb</h1>
        <p className="end-credit-text">
          A warm celebration created with love, memories, and a little bit of sparkle.
        </p>
        <div className="end-credit-highlight">
          <span>Made by</span>
          <strong>Aswinn</strong>
        </div>
        <p className="end-credit-subtext">
          Thank you for being the reason this gift feels so special.
        </p>
        <button className="end-credit-btn" onClick={onBack}>
          Back to surprise
        </button>
      </div>
    </section>
  );
}

export default EndCreditsPage;
