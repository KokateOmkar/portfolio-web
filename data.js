// ===== YOUR PORTFOLIO DATA =====
// Edit this file to customize your portfolio content

const portfolioData = {
  // Hero Section
  hero: {
    name: "John Doe",
    title: "Data Scientist & AI Enthusiast",
    tagline: "Turning raw data into actionable insights and building intelligent systems",
    cta: "View My Work",
    ctaLink: "#projects"
  },

  // About Section
  about: {
    bio: "I'm a Data Scientist passionate about machine learning, deep learning, and generative AI. With experience in building end-to-end ML pipelines and developing RAG-based applications, I help organizations unlock the power of their data. I thrive on solving complex problems and turning them into elegant, scalable solutions.",
    location: "Your City, Country",
    email: "your.email@example.com"
  },

  // Skills Section
  skills: [
    { name: "Python", icon: "🐍" },
    { name: "SQL", icon: "💾" },
    { name: "NumPy", icon: "📊" },
    { name: "Pandas", icon: "🐼" },
    { name: "PyTorch", icon: "🔥" },
    { name: "Machine Learning", icon: "🤖" },
    { name: "Deep Learning", icon: "🧠" },
    { name: "Generative AI", icon: "✨" },
    { name: "LLMs", icon: "📝" },
    { name: "RAG", icon: "🔍" },
    { name: "Data Visualization", icon: "📈" },
    { name: "Git", icon: "📦" }
  ],

  // Projects Section
  projects: [
    {
      title: "Customer Churn Prediction",
      description: "Built a machine learning model to predict customer churn with 92% accuracy using XGBoost and deployed it as a REST API.",
      tags: ["Python", "XGBoost", "Scikit-learn", "Flask"],
      link: "#"
    },
    {
      title: "RAG-based Document Assistant",
      description: "Developed a retrieval-augmented generation system that allows users to chat with their documents using LLM embeddings.",
      tags: ["LangChain", "OpenAI", "Pinecone", "FastAPI"],
      link: "#"
    },
    {
      title: "Image Classification with CNN",
      description: "Trained a convolutional neural network on custom image datasets for multi-class classification tasks using PyTorch.",
      tags: ["PyTorch", "Computer Vision", "Deep Learning"],
      link: "#"
    },
    {
      title: "Sales Forecasting Dashboard",
      description: "Created an interactive dashboard to forecast sales trends using time series analysis and visualize insights with Plotly.",
      tags: ["Pandas", "Prophet", "Plotly", "SQL"],
      link: "#"
    }
  ],

  // Experience Section
  experience: [
    {
      role: "Data Scientist",
      company: "Company Name",
      period: "2022 - Present",
      description: "Building ML models for predictive analytics and developing Gen AI solutions."
    },
    {
      role: "Junior Data Analyst",
      company: "Previous Company",
      period: "2020 - 2022",
      description: "Analyzed datasets and created reports to support business decisions."
    }
  ],

  // Social Links
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: ""
  }
};