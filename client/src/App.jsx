import { useState } from "react";
import HeroBanner from "./components/HeroBanner.jsx";
import PortfolioSections from "./components/PortfolioSections.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { ContactIcon } from "./components/Icons.jsx";
import useToast from "./hooks/useToast.js";
import {
  achievements,
  contactChannels,
  contactItems,
  initialFormState,
  navigationItems,
  projects,
  services,
  skills,
  socialLinks,
  timeline,
  workflow,
} from "./data/portfolioData.js";

function App() {
  const [formData, setFormData] = useState(initialFormState);
  const { toast, showToast } = useToast();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCopy = async (value, fieldName) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${fieldName} copied`, value, "success");
    } catch (_error) {
      showToast("Copy failed", `Unable to copy ${fieldName.toLowerCase()} right now.`, "error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      showToast("Message sent", "Your message was submitted to Netlify Forms.", "success");
      setFormData(initialFormState);
    } catch (_error) {
      showToast(
        "Submit failed",
        "Unable to submit the form right now. Check the connection or Netlify form settings.",
        "error",
      );
    }
  };

  return (
    <div className="portfolio-layout">
      <div className="layout-orb layout-orb-one" />
      <div className="layout-orb layout-orb-two" />

      <Sidebar navigationItems={navigationItems} socialLinks={socialLinks} />

      <main className="main-panel">
        <HeroBanner />

        <PortfolioSections
          skills={skills}
          achievements={achievements}
          workflow={workflow}
          services={services}
          projects={projects}
          timeline={timeline}
          contactItems={contactItems}
          contactChannels={contactChannels}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCopy={handleCopy}
        />

        <footer className="footer">
          <p>Md. Mahfuzar Rahman | University of Rajshahi | Computer Science and Engineering</p>
        </footer>
      </main>

      <div className="mobile-contact-bar" aria-label="Quick contact actions">
        {contactChannels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            className="mobile-contact-btn"
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <ContactIcon type={channel.type} />
            <span>{channel.label}</span>
          </a>
        ))}
      </div>

      {toast.visible ? (
        <div className={`toast-shell ${toast.type}`} role="status" aria-live="polite">
          <strong>{toast.title}</strong>
          <p>{toast.message}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
