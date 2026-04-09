import { useEffect, useState } from "react";
import HeroBanner from "./components/HeroBanner.jsx";
import PortfolioSections from "./components/PortfolioSections.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { ContactIcon } from "./components/Icons.jsx";
import useToast from "./hooks/useToast.js";
import {
  achievements,
  codingProfiles,
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
const configuredAnalyticsEndpoint = import.meta.env.VITE_ANALYTICS_API_URL?.trim();
const localAnalyticsEndpoints = Array.from(
  { length: 11 },
  (_value, index) => `http://localhost:${5000 + index}/api/analytics`,
);

const fallbackContactEndpoints = Array.from(
  new Set([
    configuredContactEndpoint,
    ...(import.meta.env.DEV ? localContactEndpoints : ["/.netlify/functions/contact"]),
  ].filter(Boolean)),
);

const fallbackAnalyticsEndpoints = Array.from(
  new Set([
    configuredAnalyticsEndpoint,
    ...(import.meta.env.DEV ? localAnalyticsEndpoints : ["/.netlify/functions/analytics"]),
  ].filter(Boolean)),
);

const contactEmail = contactItems.find((item) => item.label === "Email")?.value || "your-inbox@example.com";

function App() {
  const [formData, setFormData] = useState(initialFormState);
  const [activeCodingPlatform, setActiveCodingPlatform] = useState("GitHub");
  const [codingAnalytics, setCodingAnalytics] = useState({
    status: "loading",
    message: "Loading live coding analytics...",
    updatedAt: null,
    profiles: null,
  });
  const { toast, showToast } = useToast();

  useEffect(() => {
    const parsePlatformFromHash = () => {
      const match = window.location.hash.match(/^#coding\/([^/?#]+)/i);

      if (!match) {
        return null;
      }

      const target = decodeURIComponent(match[1]);
      const normalized = codingProfiles.find((profile) => profile.platform.toLowerCase() === target.toLowerCase());

      return normalized?.platform || null;
    };

    const initialPlatform = parsePlatformFromHash();

    if (initialPlatform) {
      setActiveCodingPlatform(initialPlatform);
    }

    const handleHashChange = () => {
      const nextPlatform = parsePlatformFromHash();

      if (nextPlatform) {
        setActiveCodingPlatform(nextPlatform);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    let active = true;

    const loadAnalytics = async () => {
      let lastError = null;

      for (const endpoint of fallbackAnalyticsEndpoints) {
        try {
          const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
          });

          const result = await response.json().catch(() => ({}));

          if (response.ok && result.ok && result.profiles) {
            if (active) {
              setCodingAnalytics({
                status: result.status || "live",
                message: result.message || "Live analytics loaded.",
                updatedAt: result.updatedAt || null,
                profiles: result.profiles,
              });
            }

            return;
          }

          lastError = result?.message || `Request failed at ${endpoint}`;
        } catch (error) {
          lastError = error?.message || `Network error at ${endpoint}`;
        }
      }

      if (active) {
        setCodingAnalytics({
          status: "error",
          message: lastError || "Unable to load live analytics right now.",
          updatedAt: null,
          profiles: null,
        });
      }
    };

    loadAnalytics();

    return () => {
      active = false;
    };
  }, []);

  const liveCodingProfiles = codingProfiles.filter((profile) => codingAnalytics.profiles?.[profile.platform]?.status === "live");

  const mergedCodingProfiles = codingProfiles.map((profile) => {
    const liveProfile = codingAnalytics.profiles?.[profile.platform];

    return liveProfile ? { ...profile, ...liveProfile } : profile;
  });

  useEffect(() => {
    if (!liveCodingProfiles.length) {
      return;
    }

    const activeIsVisible = liveCodingProfiles.some((profile) => profile.platform === activeCodingPlatform);

    if (!activeIsVisible) {
      setActiveCodingPlatform(liveCodingProfiles[0].platform);
    }
  }, [activeCodingPlatform, liveCodingProfiles]);

  const handleSelectCodingPlatform = (platform) => {
    if (!liveCodingProfiles.some((profile) => profile.platform === platform)) {
      return;
    }

    setActiveCodingPlatform(platform);
    window.history.replaceState(null, "", `#coding/${encodeURIComponent(platform.toLowerCase())}`);
  };

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
            showToast("Message sent", `Your message was sent to ${contactEmail}.`, "success");
            setFormData(initialFormState);
            return;
          }

          lastError = result?.message || `Request failed at ${endpoint}`;
        } catch (error) {
          lastError = error?.message || `Network error at ${endpoint}`;
        }
      }

      throw new Error(lastError || "Submission failed");
    } catch (error) {
      const message = error?.message || "Unable to send the message right now.";
      showToast(
        "Submit failed",
        message,
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
          codingProfiles={mergedCodingProfiles}
          codingAnalyticsState={codingAnalytics}
          activeCodingPlatform={activeCodingPlatform}
          onSelectCodingPlatform={handleSelectCodingPlatform}
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
