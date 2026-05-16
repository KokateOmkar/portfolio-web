// ===== YOUR PORTFOLIO DATA =====
// Edit this file to customize your portfolio content

const portfolioData = {
  // Hero Section
  hero: {
    name: "Omkar Kokate",
    title: "Data Sciene and AI/ML",
    tagline: "Turning raw data into actionable insights and building intelligent systems",
    cta: "View My Work",
    ctaLink: "#projects",
    photo: "images/Panda-profile.jpg"
  },

  // About Section
  about: {
    bio: "Data Science & AI practitioner with a strong statistical foundation. Certified by Stanford Online (ML/DL) and Google Cloud, I leverage Python, SQL, and Generative AI to solve complex challenges with data-driven solutions.",
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
      title: "AgroGen — Agentic AI Agricultural Advisory System",
      description: "Data-focused RAG pipeline and on-device LLM inference. Includes multimodal prompts for vision-based disease detection and multilingual LLM support (Hindi/Marathi/English)",
      image: "images/agrogen-farmer.png",
      tags: ["RAG", "Embeddings", "Local LLM", "Multimodal","Web search", "Multilingual"],
      link: "#"
    },
    {
      title: "Doc & Brain - Hybrid RAG Agent",
      description: "Engineered a Hybrid RAG system routing queries between a Vector DB (Qdrant) for semantic search and SQL for precise analytics. Built an automated ingestion pipeline using LangChain and Pydantic.",
      image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "LangChain", "Gemini API", "Qdrant", "SQLite", "Streamlit"],
      link: "#"
    },
    {
      title: "FinPlan - Smart Investment Portfolio with ML",
      description: "Led the ML module for smart investment recommendations; built a semi-synthetic dataset of 10,000 realistic records. Built a multi-output regression model with MSE of 1.5%.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "Scikit-learn", "PyTorch", "NumPy", "Pandas"],
      link: "#"
    },
    {
      title: "SeatAlgo - MHT CET College Counselor",
      description: "Developed a web app to predict MHT-CET seat allotment using 3 years of data and Pandas filtering. Processed 100,000+ records across institutes and courses; did extraction from official CET PDFs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "Pandas", "NumPy", "Streamlit", "Data Extraction"],
      link: "#"
    }
  ],

  // Experience Section
  experience: [
    {
      role: "Data Science Intern",
      company: "Kelp Global",
      period: "Dec 2025 - Present",
      description: `- Integrated LLM APIs (Gemini, OpenAI, Perplexity) with grounding for business use cases and debugged incorrect outputs in existing pipelines.
- Improved retrieval quality (recall & precision) in the core product by applying advanced prompting techniques, directly enhancing search relevance.
- Conducted POC on embedding models for domain-specific business use cases and benchmarked performance across candidates.
- Analyzed open-source LLMs and built multi-modal RAG pipelines handling text, image, and table data for enterprise document understanding.
- Performed data cleaning on the employee reviews dataset using Python libraries, improving data quality.`
    },
  ],

  // Education Section
  education: [
    {
      degree: "B.E. in Artificial Intelligence and Data Science",
      institution: "Dr. D. Y. Patil Institute of Technology, Pune",
      period: "Nov 2022 - June 2026",
      pointer: "CGPA: 9.61 | Relevant coursework: Data Structures, Machine Learning, DBMS, Deep Learning, Natural Language Processing, Linear Algebra, Probability and Statistics"
    },
  ],

  // Certifications
  certifications: [
    {
      title: "Python by University of Michigan",
      issuer: "Coursera",
      period: ""
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera",
      period: ""
    },
    {
      title: "Deep Learning (Stanford Online)",
      issuer: "Coursera",
      period: ""
    },
    {
      title: "PyTorch",
      issuer: "Udemy",
      period: ""
    },
    {
      title: "Google Cloud",
      issuer: "GDSC Cloud Jam",
      period: ""
    }
  ],

  // Achievements
  achievements: [
    "Graduate Aptitude Test in Engineering (GATE - DA) 2026 - AIR 1656",
    "Graduate Aptitude Test in Engineering (GATE - DA) 2025 - AIR 1992"
  ],

  // Social Links
  social: {
    github: "https://github.com/KokateOmkar",
    linkedin: "https://www.linkedin.com/in/omkar-kokate-s1232",
    resume: "https://drive.google.com/file/d/1UUSQkfsXW-14V9d9o3YsxFJYAlx-E3xP/view?usp=sharing",
    
    twitter: ""
  }
};
