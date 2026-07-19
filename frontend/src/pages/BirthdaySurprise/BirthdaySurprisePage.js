import React, { useState } from 'react';
import EndCreditsPage from './EndCreditsPage';
import './BirthdaySurprisePage.css';

const photoSlots = [
  { title: 'First Memory', caption: 'Drop your favorite photo here.' },
  { title: 'Sweet Moment', caption: 'Add a candid or a cozy selfie.' },
  { title: 'Future Plans', caption: 'Place a photo for your next adventure.' },
  { title: 'Little Details', caption: 'Add a note-worthy snapshot.' },
];

const notes = [
  'You make ordinary days feel magical.',
  'The best memories are the ones we share.',
  'May this year bring you extra joy, comfort, and sparkle.',
];

const quoteList = [
  'STOP BEING A DADDYLESS BOY, WHEN A GREAT DAD IS WITH YOU.',
  'DON\'T BE A GIRL WITH MOODSWINGS, BE A MEN.',
];

const girlList = [
  'GOPIKA',
  'KEERTHANA',
  'ATHIRA',
  'ABHIRAMI {ONGOING}',
];

function BirthdaySurprisePage() {
  const [passcode, setPasscode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHome, setShowHome] = useState(true);
  const [showEndCredits, setShowEndCredits] = useState(false);
  const [photoPositions] = useState([
    { x: Math.random() * 20 - 10, y: Math.random() * 30 - 15 },
    { x: Math.random() * 20 + 10, y: Math.random() * 30 + 15 },
  ]);

  const handleContinue = () => {
    setShowHome(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextAttempts = attempts + 1;

    if (passcode.trim() === '6969') {
      setUnlocked(true);
      setError('');
      setAttempts(nextAttempts);
      return;
    }

    setAttempts(nextAttempts);
    if (nextAttempts >= 2) {
      setError('Hint: Try 6969');
    } else {
      setError('Wrong code. Try again.');
    }
  };

  return (
    <div className="birthday-surprise-page">
      {showHome ? (
        <section className="home-screen">
          <div className="home-card">
            <h1 className="hbd-title">HBD SPECIAL 🎉</h1>
            <p className="hbd-subtitle">A gift made for you</p>
            <div className="circular-photos">
              <div className="circle-photo" style={{ transform: `translate(${photoPositions[0].x}px, ${photoPositions[0].y}px)` }}>
                <img src="/images/birthday/circle1.jpg" alt="Birthday memory" />
              </div>
              <div className="circle-photo" style={{ transform: `translate(${photoPositions[1].x}px, ${photoPositions[1].y}px)` }}>
                <img src="/images/birthday/circle2.jpg" alt="Birthday memory" />
              </div>
            </div>
            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </section>
      ) : !unlocked ? (
        <section className="lock-screen">
          <div className="lock-card">
            <p className="eyebrow">A special birthday surprise</p>
            <h1>Enter passcode</h1>
            <p className="lock-subtitle">Your special code is waiting to unlock this gift.</p>
            <form className="lock-form" onSubmit={handleSubmit}>
              <input
                aria-label="Passcode"
                value={passcode}
                onChange={(event) => setPasscode(event.target.value)}
                maxLength="4"
              />
              <button type="submit">Open surprise</button>
            </form>
            <div className="preview-grid">
              {photoSlots.slice(0, 2).map((slot, index) => (
                <article className="photo-card preview-card" key={slot.title}>
                  <div className="photo-frame">
                    <img
                      className="photo-frame-image"
                      src={index === 0 ? '/images/birthday/photo1.jpg' : '/images/birthday/photo2.jpg'}
                      alt={slot.title}
                    />
                  </div>
                  <p className="preview-caption">{index === 0 ? '🌈' : '💖'}</p>
                </article>
              ))}
            </div>
            {error ? <p className="error-message">{error}</p> : null}
          </div>
        </section>
      ) : showEndCredits ? (
        <EndCreditsPage onBack={() => setShowEndCredits(false)} />
      ) : (
        <div className="surprise-view">
          <header className="hero-card">
            <p className="eyebrow">For my favorite person</p>
            <h1>Happy Birthday, MUTHUMANII ❤️</h1>
            <p>
              This is a tiny digital gift made with love, soft colors, sweet memories, and a little bit of sparkle.
            </p>
          </header>

          <main className="content-stack">
            <section className="photo-section">
              <div className="section-heading">
                <p className="eyebrow">Photo gallery</p>
              </div>
              <p className="gallery-note"><strong>I hope you get a girlfriend this year</strong></p>
              <div className="photo-grid">
                {photoSlots.map((slot, index) => (
                  <article className="photo-card" key={slot.title}>
                    <div className="photo-frame">
                      <img
                        className="photo-frame-image"
                        src={`/images/birthday/gallery${index + 1}.jpg`}
                        alt={slot.title}
                      />
                    </div>
                    <p className="gallery-caption">
                      {index === 0 ? '🌈' : index === 1 ? '💖' : index === 2 ? '🌸' : '✨'}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="girl-list-card">
              <div className="section-heading">
                <p className="eyebrow">Girl list</p>
              </div>
              <div className="girl-list-content">
                {girlList.map((name) => (
                  <div className="girl-name" key={name}>
                    <span className="girl-name-text">{name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="message-card">
              <div className="section-heading">
                <p className="eyebrow">Little love notes</p>
                <h2>Every laugh, every late-night chat, every tiny memory.</h2>
              </div>
              <div className="note-list">
                {notes.map((note) => (
                  <div className="note-item" key={note}>
                    <span>✦</span>
                    <p>{note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="quote-section">
              <div className="section-heading">
                <p className="eyebrow">My quotes</p>
              </div>
              <div className="quote-box-list">
                {quoteList.map((quote) => (
                  <div className="quote-box" key={quote}>
                    <p>{quote}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="elevated-note-card">
              <div className="elevated-note-content">
                <p className="eyebrow">New level, new valiss</p>
                <h2>A fresh chapter, a brighter smile, and a whole lot of love.</h2>
                <p>
                  May this new level bring you confidence, joy, and the kind of peace that feels like home.
                </p>
                <p>
                  I hope you get a girl this year.
                </p>
              </div>
            </section>

            <section className="closing-card">
              <h2>May this year bring you comfort, laughter, and all the beautiful things you deserve.</h2>
              <p>Keep shining, keep smiling, and remember that you are loved more than words can say.</p>
              <div className="signature">With love, your biggest cheerleader</div>
            </section>
            <div className="end-credit-button-wrap">
              <button className="end-credit-btn" onClick={() => setShowEndCredits(true)}>
                View End Credits
              </button>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default BirthdaySurprisePage;
