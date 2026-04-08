const contactEmail = String.fromCharCode(
  109,
  97,
  104,
  102,
  117,
  122,
  97,
  114,
  49,
  52,
  56,
  64,
  103,
  109,
  97,
  105,
  108,
  46,
  99,
  111,
  109,
);

export const skillAnalytics = [
  { label: "C / C++", value: 90, note: "Strong fundamentals and problem solving base" },
  { label: "Java", value: 75, note: "Solid OOP and application logic" },
  { label: "JavaScript", value: 72, note: "Frontend logic and interactive UI work" },
  { label: "Python", value: 70, note: "Core language for AI and scripting" },
  { label: "PHP", value: 60, note: "Backend basics and web applications" },
  { label: "Django", value: 58, note: "Backend framework with Python" },
  { label: "Laravel", value: 55, note: "PHP framework fundamentals" },
  { label: "Flutter", value: 50, note: "Mobile app development at a medium level" },
  { label: "Machine Learning", value: 42, note: "Currently learning models and workflows" },
  { label: "Deep Learning", value: 35, note: "Building a stronger foundation step by step" },
];

export const skillFocus = {
  learningNow: ["Machine Learning", "Deep Learning", "NLP basics", "LLM fundamentals"],
  futureGoal: ["AI Engineer", "Generative AI", "Data Science", "LLM / NLP focused development"],
};

export const achievements = [
  {
    title: "University of Rajshahi student",
    text: "8th semester Computer Science and Engineering student building a strong technical foundation.",
  },
  {
    title: "AI-focused direction",
    text: "Learning Machine Learning, Deep Learning, and the foundations behind AI, Generative AI, and LLMs.",
  },
  {
    title: "Adaptive learner",
    text: "Enjoy exploring new technology, learning new stacks, and adapting quickly to fresh tools and workflows.",
  },
];

export const workflow = [
  {
    step: "01",
    title: "Learn",
    text: "Build a clear base in programming, algorithms, and data structures before moving into advanced topics.",
  },
  {
    step: "02",
    title: "Practice",
    text: "Solve problems, write projects, and strengthen understanding through hands-on coding.",
  },
  {
    step: "03",
    title: "Grow",
    text: "Move deeper into AI, Generative AI, data science, NLP, and real-world application building.",
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
    title: "Programming Foundations",
    description: "Strong fundamentals in C, C++, Java, JavaScript, Python, and core CS concepts.",
  },
  {
    title: "Web Development Basics",
    description: "Practical experience with PHP, Django, Laravel, and Flutter at a growing level.",
  },
  {
    title: "AI Learning Path",
    description: "Currently focused on Machine Learning, Deep Learning, LLMs, NLP, and data science.",
  },
];

export const timeline = [
  {
    year: "Current",
    title: "8th semester at University of Rajshahi",
    text: "Studying Computer Science and Engineering while sharpening problem solving and project skills.",
  },
  {
    year: "Now",
    title: "Learning AI and advanced development",
    text: "Exploring Machine Learning, Deep Learning, Generative AI, NLP, and data science workflows.",
  },
];

export const contactItems = [
  { label: "Email", value: contactEmail },
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
    href: `mailto:${contactEmail}?subject=Portfolio%20Inquiry`,
    value: contactEmail,
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