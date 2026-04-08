function HeroBanner() {
  return (
    <header className="hero-banner" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Portfolio / Dashboard Style</p>
        <h2>A premium sidebar layout for a clean personal portfolio.</h2>
        <p className="lead-copy">
          This version keeps your information in a strong left sidebar, while the main area uses elegant cards,
          previews, and clear spacing so every section feels intentional.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary hero-btn">
            View Projects
          </a>
          <a href="#contact" className="btn btn-outline-light hero-btn">
            Get In Touch
          </a>
        </div>
      </div>

      <div className="hero-panel-card">
        <p className="card-label">Profile Snapshot</p>
        <h3>University of Rajshahi</h3>
        <p>
          Final semester student with interest in frontend design, backend APIs, and database-backed web apps.
        </p>
        <div className="hero-mini-grid">
          <div>
            <strong>Focused</strong>
            <span>Responsive layouts</span>
          </div>
          <div>
            <strong>Built for</strong>
            <span>Clients & recruiters</span>
          </div>
          <div>
            <strong>Style</strong>
            <span>Dark glass UI</span>
          </div>
          <div>
            <strong>Stack</strong>
            <span>React + Node</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;