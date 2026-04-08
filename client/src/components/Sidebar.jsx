import { SidebarIcon } from "./Icons.jsx";

function Sidebar({ navigationItems, socialLinks }) {
  return (
    <aside className="sidebar-panel">
      <div className="sidebar-shell">
        <div className="sidebar-profile">
          <div className="avatar-frame">
            <img className="avatar-core" src="/images/mahfuz.png" alt="Md. Mahfuzar Rahman" />
          </div>
          <div className="sidebar-copy">
            <h1>Md. Mahfuzar Rahman</h1>
            <p>8th semester Computer Science and Engineering student at the University of Rajshahi.</p>
          </div>
        </div>

        <div className="sidebar-socials" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="social-chip"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href} className="sidebar-link">
              <span className="sidebar-link-icon">
                <SidebarIcon type={item.icon} />
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-highlight">
          <span className="sidebar-highlight-label">Now focusing on</span>
          <strong>Machine Learning, Deep Learning, Generative AI, data science, and practical problem solving.</strong>
          <div className="sidebar-stats">
            <div>
              <strong>CSE</strong>
              <span>Background</span>
            </div>
            <div>
              <strong>AI</strong>
              <span>Career goal</span>
            </div>
          </div>
        </div>

        <div className="sidebar-gallery">
          <img src="/project-previews/book-store-app.svg" alt="Book Store App preview" />
          <img src="/project-previews/bookstore-website.svg" alt="Bookstore Website preview" />
          <img src="/project-previews/youtube-player.svg" alt="YouTube Video Player preview" />
        </div>

        <div className="sidebar-actions">
          <a href="/resume.pdf" className="btn btn-primary sidebar-btn" download>
            Download Resume
          </a>
          <a href="#contact" className="btn btn-outline-light sidebar-btn">
            Contact Me
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;