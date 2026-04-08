export const skills = [
  "HTML5",
  "CSS3",
  "Bootstrap",
  "Tailwind CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "MySQL",
  "REST APIs",
  "Responsive Design",
  "Git",
];

export const achievements = [
  {
    title: "Final-semester Computer Science student",
    text: "University of Rajshahi with a focus on practical software and web development.",
  },
  {
    title: "Full-stack direction",
    text: "Building with React, Node.js, Express, and MySQL for production-style web apps.",
  },
  {
    title: "Responsive UI mindset",
    text: "Designing for mobile-first layouts, readable hierarchy, and strong presentation.",
  },
];

export const workflow = [
  {
    step: "01",
    title: "Discover",
    text: "Understand goals, content, and the audience before building the visual structure.",
  },
  {
    step: "02",
    title: "Design",
    text: "Create a clean layout, section system, and visual hierarchy that feels modern.",
  },
  {
    step: "03",
    title: "Develop",
    text: "Implement reusable components, responsive spacing, and backend integration.",
  },
];

export const projects = [
  {
    title: "Book Store App",
    type: "Frontend Project",
    summary:
      "A polished book discovery and catalog experience built to highlight clean layout structure and smooth browsing.",
    challenge: "Present books clearly while keeping the UI simple and easy to scan.",
    result: "Created a compact interface that supports fast browsing and clean product presentation.",
    tags: ["React", "UI Design", "Tailwind CSS"],
    preview: "/project-previews/book-store-app.svg",
  },
  {
    title: "Bookstore Website",
    type: "Responsive Website",
    summary:
      "A bookstore landing experience inspired by e-commerce product pages and modern editorial layouts.",
    challenge: "Make the storefront feel trustworthy, organized, and responsive on all screen sizes.",
    result: "Delivered a structured shopping-style layout with strong visual hierarchy.",
    tags: ["HTML", "Bootstrap", "JavaScript"],
    preview: "/project-previews/bookstore-website.svg",
  },
  {
    title: "YouTube Video Player",
    type: "Web Application",
    summary:
      "A media-focused interface built to demonstrate dynamic content handling and playback-oriented layout design.",
    challenge: "Design a video-first interface that keeps controls and content easy to understand.",
    result: "Built a usable media layout that demonstrates interaction flow and content presentation.",
    tags: ["Python", "Django", "Frontend Logic"],
    preview: "/project-previews/youtube-player.svg",
  },
];

export const services = [
  {
    title: "Responsive Website Design",
    description:
      "Clean, mobile-first layouts that look polished on desktop, tablet, and phone.",
  },
  {
    title: "React Frontend Development",
    description:
      "Modern component-based interfaces with smooth structure, reuse, and scalability.",
  },
  {
    title: "Node.js + MySQL Backend",
    description:
      "API-driven applications with structured data flow, validation, and persistence.",
  },
];

export const timeline = [
  {
    year: "Current",
    title: "Final Semester at University of Rajshahi",
    text: "Focused on Computer Science and Engineering while building practical full-stack web projects.",
  },
  {
    year: "Now",
    title: "Portfolio and project development",
    text: "Improving design, coding, and presentation skills for professional opportunities.",
  },
];

export const contactItems = [
  { label: "Email", value: "mahfuzar148@gmail.com" },
  { label: "Phone", value: "01571319833" },
  { label: "GitHub", value: "github.com/Mahfuzar148" },
  { label: "LinkedIn", value: "linkedin.com/in/md-mahfuzar-baa369262" },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Mahfuzar148" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-mahfuzar-baa369262" },
  { label: "Resume", href: "/resume.pdf" },
];

export const contactChannels = [
  {
    label: "Email",
    href: "mailto:mahfuzar148@gmail.com?subject=Portfolio%20Inquiry",
    value: "mahfuzar148@gmail.com",
    type: "email",
    text: "Send a direct email",
  },
  {
    label: "Call",
    href: "tel:+8801796141806",
    value: "01796141806",
    type: "call",
    text: "Call me now",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801796141806?text=Hello%20Md.%20Mahfuzar%20Rahman%2C%20I%20found%20your%20portfolio.",
    value: "01796141806",
    type: "whatsapp",
    text: "Start WhatsApp chat",
  },
  {
    label: "Telegram",
    href: "https://t.me/Mahfuzar48",
    value: "@Mahfuzar48",
    type: "telegram",
    text: "Message on Telegram",
  },
];

export const navigationItems = [
  { label: "Home", href: "#home", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Skills", href: "#skills", icon: "skills" },
  { label: "Projects", href: "#projects", icon: "project" },
  { label: "Experience", href: "#experience", icon: "timeline" },
  { label: "Contact", href: "#contact", icon: "mail" },
];

export const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const contactEmailRecipient = "mahfuzar148@gmail.com";

export function buildMailtoLink({ name, email, subject, message }) {
  const mailSubject = encodeURIComponent(subject?.trim() || "Portfolio Inquiry");
  const mailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  );

  return `mailto:${contactEmailRecipient}?subject=${mailSubject}&body=${mailBody}`;
}