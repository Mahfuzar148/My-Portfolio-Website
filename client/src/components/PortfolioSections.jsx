import SectionHeading from "./SectionHeading.jsx";
import { ContactIcon } from "./Icons.jsx";

function PortfolioSections({
  skills,
  achievements,
  workflow,
  services,
  projects,
  timeline,
  contactItems,
  contactChannels,
  formData,
  onChange,
  mailtoLink,
  onCopy,
  onSend,
}) {
  return (
    <div className="main-panel">
      <section className="content-block" id="about">
        <SectionHeading
          eyebrow="About"
          title="A focused student with practical full-stack direction"
          description="The page is now arranged like a personal dashboard, with a permanent sidebar and content cards that are easy to scan on desktop and mobile."
        />
        <div className="about-grid">
          <article className="glass-card">
            <h3>Academic background</h3>
            <p>University of Rajshahi, Computer Science and Engineering, final semester / 8th semester.</p>
          </article>
          <article className="glass-card">
            <h3>Design direction</h3>
            <p>
              Dark, premium, and content-first. The layout uses strong contrast, elegant spacing, and crisp section cards.
            </p>
          </article>
          <article className="glass-card">
            <h3>What this site does</h3>
            <p>
              Showcases your introduction, skills, project highlights, experience timeline, and contact details with a polished structure.
            </p>
          </article>
        </div>
      </section>

      <section className="content-block" id="skills">
        <SectionHeading
          eyebrow="Skills"
          title="A balanced stack for frontend, backend, and presentation"
          description="Skills are presented as compact chips so the area stays clean while still making your technical range easy to scan."
        />
        <div className="skill-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="content-block" id="achievements">
        <SectionHeading
          eyebrow="Achievements"
          title="The practical strengths behind the portfolio"
          description="These cards keep the focus on meaningful positioning instead of a long biography, which makes the site easier to read on smaller screens."
        />
        <div className="achievement-grid">
          {achievements.map((item) => (
            <article className="glass-card achievement-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block">
        <SectionHeading
          eyebrow="Workflow"
          title="How projects are built in a professional way"
          description="The process section gives recruiters a sense of structure, not only the final output."
        />
        <div className="workflow-grid">
          {workflow.map((item) => (
            <article className="workflow-card" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block" id="services">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you"
          description="These practical services can be shown to recruiters, startups, or clients when you share the portfolio."
        />
        <div className="service-grid">
          {services.map((service) => (
            <article className="glass-card service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block" id="projects">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work presented like case studies"
          description="Each project includes a preview, a short overview, the challenge, and the result so the section feels more like a professional portfolio than a simple gallery."
        />
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-preview">
                <img src={project.preview} alt={`${project.title} preview`} />
              </div>
              <p className="project-type">{project.type}</p>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>
              <p className="project-detail-label">Challenge</p>
              <p>{project.challenge}</p>
              <p className="project-detail-label">Result</p>
              <p>{project.result}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block" id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="A simple timeline that can grow with you"
          description="This section is intentionally simple now so it can later hold internships, freelance work, teaching assistant work, or club leadership."
        />
        <div className="timeline-list">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.title}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="A clean education section gives recruiters quick context before they review projects and contact details."
        />
        <div className="education-card glass-card">
          <div>
            <h3>University of Rajshahi</h3>
            <p>Computer Science and Engineering</p>
          </div>
          <div>
            <h3>Current status</h3>
            <p>Final semester / 8th semester</p>
          </div>
          <div>
            <h3>Focus</h3>
            <p>Full-stack development, UI implementation, and database-backed applications</p>
          </div>
        </div>
      </section>

      <section className="content-block" id="contact">
        <SectionHeading
          eyebrow="Contact"
          title="Make it easy to reach you"
          description="Contact details are displayed clearly so recruiters, clients, or collaborators can connect quickly. The form sends messages through your mail app when SMTP is not configured."
        />
        <div className="contact-layout">
          <div className="contact-panel">
            <div className="contact-card contact-details">
              {contactItems.map((item) => (
                <div key={item.label}>
                  <small>{item.label}</small>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="contact-actions-grid">
              {contactChannels.map((channel) => (
                <div className="contact-action-card" key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                    className="contact-action-main"
                  >
                    <span className="contact-action-icon">
                      <ContactIcon type={channel.type} />
                    </span>
                    <div>
                      <span>{channel.label}</span>
                      <strong>{channel.text}</strong>
                    </div>
                  </a>
                  <button type="button" className="contact-copy-btn" onClick={() => onCopy(channel.value, channel.label)}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1Zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H10V7h9v14Z" />
                    </svg>
                    <span>Copy</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form className="contact-form">
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={formData.name} onChange={onChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={onChange} required />
            </div>
            <div className="form-row">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" value={formData.subject} onChange={onChange} />
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={formData.message} onChange={onChange} required />
            </div>
            <a
              href={mailtoLink}
              className="btn btn-primary hero-btn"
              onClick={() => onSend()}
            >
              Send Message
            </a>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PortfolioSections;