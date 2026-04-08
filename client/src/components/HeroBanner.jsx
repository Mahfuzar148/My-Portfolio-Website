function HeroBanner() {
  return (
    <header className="hero-banner" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Portfolio / Profile Overview</p>
        <h2>Building toward AI, Generative AI, and data science.</h2>
        <p className="lead-copy">
          I am a Computer Science and Engineering student at the University of Rajshahi, now in my 8th semester.
          I work with programming, problem solving, and modern web development while learning Machine Learning and
          Deep Learning.
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
        <div className="hero-photo-shell">
          <img src="/images/mahfuz.png" alt="Md. Mahfuzar Rahman" />
        </div>
        <p className="card-label">Profile Snapshot</p>
        <h3>Md. Mahfuzar Rahman</h3>
        <p>
          Student of the University of Rajshahi, Department of Computer Science and Engineering, currently in 8th
          semester.
        </p>
        <div className="hero-mini-grid">
          <div>
            <strong>Learning</strong>
            <span>Machine Learning & Deep Learning</span>
          </div>
          <div>
            <strong>Goal</strong>
            <span>AI / Generative AI / Data Science</span>
          </div>
          <div>
            <strong>Strength</strong>
            <span>Algorithms & Data Structures</span>
          </div>
          <div>
            <strong>Tools</strong>
            <span>C, C++, Java, Python, PHP, Django, Laravel, Flutter</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeroBanner;