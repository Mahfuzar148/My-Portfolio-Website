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
  skillAnalytics,
  skillFocus,
  socialLinks,
  timeline,
  workflow,
} from "./data/portfolioData.js";

const configuredContactEndpoint = import.meta.env.VITE_CONTACT_API_URL?.trim();
const localContactEndpoints = Array.from({ length: 11 }, (_value, index) => `http://localhost:${5000 + index}/api/contact`);

const fallbackContactEndpoints = Array.from(
  new Set([
    configuredContactEndpoint,
    ...(import.meta.env.DEV ? localContactEndpoints : ["/.netlify/functions/contact"]),
    ...(import.meta.env.DEV ? ["/.netlify/functions/contact"] : localContactEndpoints),
  ].filter(Boolean)),
);

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
      let lastError = null;

      for (const endpoint of fallbackContactEndpoints) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const result = await response.json().catch(() => ({}));

          if (response.ok && result.ok) {
            showToast("Message sent", "Your message was sent to mahfuzar148@gmail.com.", "success");
            setFormData(initialFormState);
            return;
          }

          lastError = result?.message || `Request failed at ${endpoint}`;
        } catch (error) {
          lastError = error?.message || `Network error at ${endpoint}`;
        }
      }

      throw new Error(lastError || "Submission failed");
    } catch (_error) {
      showToast(
        "Submit failed",
        "Unable to send the message right now. Check SMTP settings, the Netlify Function, and the local server.",
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
          skillAnalytics={skillAnalytics}
          skillFocus={skillFocus}
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
