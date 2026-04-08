import SectionHeading from "./SectionHeading.jsx";
import { ContactIcon } from "./Icons.jsx";

function PortfolioSections({
  skillAnalytics,
  skillFocus,
  achievements,
  workflow,
  services,
  projects,
  timeline,
  contactItems,
  contactChannels,
  formData,
  onChange,
  onSubmit,
  onCopy,
}) {
  return (
    <div className="main-panel">
      <section className="content-block" id="about">
        <SectionHeading
          eyebrow="About"
          title="A focused CSE student building toward AI roles"
          description="The page now highlights your current semester, skills, and long-term goal of working in AI, Generative AI, and data science."
        />
        <div className="about-grid">
          <article className="glass-card">
            <h3>Academic background</h3>
            <p>University of Rajshahi, Department of Computer Science and Engineering, 8th semester.</p>
          </article>
          <article className="glass-card">
            <h3>Technical direction</h3>
            <p>Learning C, C++, Java, JavaScript, Python, PHP, Django, Laravel, Flutter, ML, and DL.</p>
          </article>
          <article className="glass-card">
            <h3>Career direction</h3>
            <p>Targeting AI, Generative AI, data science, LLMs, and NLP while continuing to build real projects.</p>
          </article>
        </div>
      </section>

      <section className="content-block" id="skills">
        <SectionHeading
          eyebrow="Skills"
          title="Skill analytics with current strength, learning, and future goals"
          description="This section shows a visual snapshot of where you are strongest now, what you are learning, and the path you want to grow into."
        />
        <div className="skill-layout">
          <div className="skill-chart-card glass-card">
            <div className="skill-chart-header">
              <div>
                <h3>Strength overview</h3>
                <p>Percentages are self-assessed to give a quick visual reading of your current level.</p>
              </div>
              <span className="skill-chart-badge">Analytics</span>
            </div>
            <div className="skill-chart-list">
              {skillAnalytics.map((item) => (
                <div className="skill-chart-row" key={item.label}>
                  <div className="skill-chart-topline">
                    <strong>{item.label}</strong>
                    <span>{item.value}%</span>
                  </div>
                  <div className="skill-bar-track" aria-hidden="true">
                    <span className="skill-bar-fill" style={{ width: `${item.value}%` }} />
                  </div>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="skill-focus-grid">
            <article className="glass-card skill-focus-card">
              <h3>Now learning</h3>
              <p>These are the areas I am focusing on at the moment.</p>
              <div className="skill-focus-tags">
                {skillFocus.learningNow.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>

            <article className="glass-card skill-focus-card">
              <h3>Future goal</h3>
              <p>These are the directions I want to build my career toward.</p>
              <div className="skill-focus-tags future">
                {skillFocus.futureGoal.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
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
            <p>8th semester</p>
          </div>
          <div>
            <h3>Focus</h3>
            <p>Programming, algorithms, machine learning, deep learning, and AI career preparation</p>
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

          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="visually-hidden" aria-hidden="true">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
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
            <button type="submit" className="btn btn-primary hero-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PortfolioSections;