// ===== YOUR PORTFOLIO DATA =====
// Edit this file to customize your portfolio content

const portfolioData = {
  // Hero Section
  hero: {
    name: "Omkar Kokate",
    title: "Data Scientist & AI Enthusiast",
    tagline: "Turning raw data into actionable insights and building intelligent systems",
    cta: "View My Work",
    ctaLink: "#projects"
  },

  // About Section
  about: {
    bio: "I'm a Data Scientist passionate about machine learning, deep learning, and generative AI. With experience in building end-to-end ML pipelines and developing RAG-based applications, I help organizations unlock the power of their data. I thrive on solving complex problems and turning them into elegant, scalable solutions.",
    location: "Pune, India",
    email: "kokateomkar27@gmail.com"
  },

  // Skills Section
  skills: [
    { name: "Python" },
    { name: "SQL" },
    { name: "NumPy" },
    { name: "Pandas" },
    { name: "PyTorch" },
    { name: "Machine Learning" },
    { name: "Deep Learning" },
    { name: "Generative AI" },
    { name: "LLMs" },
    { name: "RAG" },
    { name: "Data Visualization" },
    { name: "Git" }
  ],

  // Projects Section
  projects: [
    {
      title: "SeatAlgo - MHT CET College Counselor",
      description: "Developed a web app to predict MHT-CET seat allotment using 3 years of data and Pandas filtering. Processed 100,000+ records across institutes and courses; implemented web scraping from official CET PDFs.",
      tags: ["Python", "Pandas", "NumPy", "Streamlit", "Web Scraping"],
      link: "#"
    },
    {
      title: "Doc & Brain - Hybrid RAG Agent",
      description: "Engineered a Hybrid RAG system routing queries between a Vector DB (Qdrant) for semantic search and SQL for precise analytics. Built an automated ingestion pipeline using LangChain and Pydantic.",
      tags: ["Python", "LangChain", "Gemini API", "Qdrant", "SQLite", "Streamlit"],
      link: "#"
    },
    {
      title: "FinPlan - Smart Investment Portfolio with ML",
      description: "Led the ML module for smart investment recommendations; built a semi-synthetic dataset of 10,000 realistic records. Built a multi-output regression model with MSE of 1.5%.",
      tags: ["Python", "Scikit-learn", "PyTorch", "NumPy", "Pandas"],
      link: "#"
    }
  ],

  // Experience Section
  experience: [
    {
      role: "Data Science Intern",
      company: "Kelp Global",
      period: "Dec 2025 - Present",
      description: "Working on LLMs, RAG systems, data cleaning, and proof-of-concept development to solve real-world problems."
    },
  ],

  // Education Section
  education: [
    {
      degree: "B.E. in Artificial Intelligence and Data Science",
      institution: "Dr. D. Y. Patil Institute of Technology, Pune",
      period: "Nov 2022 - June 2026",
      pointer: "CGPA: 9.61 | Relevant coursework: Data Structures, Machine Learning, DBMS, Deep Learning, Natural Language Processing"
    },
  ],

  // Social Links
  social: {
    github: "https://github.com/KokateOmkar",
    linkedin: "https://www.linkedin.com/in/omkar-kokate-s1232",
    
    twitter: ""
  }
};
