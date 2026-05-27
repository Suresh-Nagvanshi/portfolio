const projects = [
  {
    id: 1,
    title: "AI Web Forensic System",
    description: "AI-powered forensic platform capable of detecting deepfakes, manipulated images, and GAN-generated content using computer vision and explainable AI.",
    overview: "AI-powered forensic platform for detecting deepfakes, GAN-generated media, and manipulated images through computer vision and explainable AI.",
    features: [
      "Deepfake detection",
      "GAN-generated image detection",
      "Grad-CAM heatmap explainability",
      "YOLOv8 face detection",
      "Forensic report generation"
    ],
    architecture: "Spring Boot dashboard → Flask AI API → YOLOv8 face detection → EfficientNetB0 classification → Grad-CAM generation → PostgreSQL report storage",
    challenges: [
      "Integrating Java backend with AI inference services",
      "Generating explainable AI outputs",
      "Handling multiple face-level predictions"
    ],
    outcomes: [
      "97.6% classification accuracy",
      "Explainable AI workflow",
      "Dual-backend architecture"
    ],
    technologies: ["YOLOv8", "EfficientNet", "Spring Boot", "Flask", "TensorFlow"],
    github: "https://github.com/Suresh-Nagvanshi/AI-Forensic-Project",
    live: "",
    badge: "97.6% Accuracy",
    icon: "🔬"
  },
  {
    id: 2,
    title: "PetConnect",
    description: "Full-stack ecosystem connecting pet owners, adoption services, healthcare support, and AI-based symptom analysis.",
    overview: "Full-stack MERN platform connecting pet owners, adopters, veterinary professionals, and AI-driven healthcare assistance.",
    features: [
      "Pet adoption marketplace",
      "Veterinary appointment scheduling",
      "AI symptom analysis using Gemini",
      "Secure payment integration",
      "JWT authentication + RBAC"
    ],
    architecture: "React frontend → Express API → MongoDB → Gemini AI service → Payment integration",
    challenges: [
      "Multi-role ecosystem design",
      "AI integration with pet guidance",
      "Secure transaction handling"
    ],
    outcomes: [
      "Scalable MERN architecture",
      "AI-assisted healthcare support",
      "Unified pet service ecosystem"
    ],
    technologies: ["React", "NodeJS", "MongoDB", "Express", "AI"],
    github: "https://github.com/Suresh-Nagvanshi/PetConnect",
    live: "",
    badge: "MERN + AI",
    icon: "🐾"
  },
  {
    id: 3,
    title: "Fake Financial News Detection",
    description: "NLP-based financial misinformation detection system using transformer architecture.",
    overview: "AI-powered misinformation detection platform using DistilBERT and NLP for financial credibility analysis.",
    features: [
      "Transformer-based DistilBERT classification",
      "Real-time predictions",
      "Confidence score generation",
      "Sentiment analysis",
      "Protected dashboard routes"
    ],
    architecture: "React frontend → FastAPI backend → DistilBERT inference → MongoDB",
    challenges: [
      "Transformer integration",
      "Real-time inference optimization",
      "Search history architecture"
    ],
    outcomes: [
      "94.2% prediction accuracy",
      "Scalable NLP pipeline",
      "Real-time credibility analysis"
    ],
    technologies: ["DistilBERT", "Python", "NLP", "TensorFlow"],
    github: "https://github.com/Suresh-Nagvanshi/fake-financial-news-prediction",
    live: "",
    badge: "94.2% Accuracy",
    icon: "📊"
  },
  {
    id: 4,
    title: "Pet Passport System",
    description: "Digital health tracker and medical history vault for domestic pets.",
    overview: "Pet health management platform providing vaccination records, health timelines, travel readiness, and AI-generated summaries.",
    features: [
      "Vaccination tracking",
      "Health timeline",
      "AI summary generation with Gemini",
      "QR-code passport sharing",
      "Multi-pet dashboard"
    ],
    architecture: "React frontend → Express backend → MongoDB → Gemini API → QR route generation",
    challenges: [
      "AI model quota limitations",
      "Cross-device QR deep-linking",
      "Dynamic multi-pet routing"
    ],
    outcomes: [
      "AI-powered veterinary insights",
      "QR-based passport system",
      "Scalable pet record management"
    ],
    technologies: ["React", "NodeJS", "MongoDB", "AI"],
    github: "https://github.com",
    live: "",
    badge: "Health Vault",
    icon: "🐾"
  },
  {
    id: 5,
    title: "Varsity Vibe",
    description: "Dynamic campus collaboration and resource hub for university students.",
    overview: "University event management platform enabling coordination between organizers, coordinators and students.",
    features: [
      "Student registration",
      "Event coordination",
      "Profile management",
      "Role-based access",
      "Dashboard workflow"
    ],
    architecture: "Java backend → MySQL → JSP/Servlet workflow",
    challenges: [
      "Role-based workflow handling",
      "Database relationship design"
    ],
    outcomes: [
      "Structured event management workflow",
      "Improved coordination process"
    ],
    technologies: ["Java", "MySQL", "JSP", "Servlet"],
    github: "https://github.com",
    live: "",
    badge: "Campus Hub",
    icon: "⚡"
  },
  {
    id: "weather-dashboard",
    title: "Weather Analytics Dashboard",
    description: "Feature-rich weather analytics platform providing real-time monitoring, multi-city comparison, forecasting, interactive maps, 3D visualizations, and weather insights.",
    badge: "Analytics + Visualization",
    icon: "🌦️",
    overview: "A feature-rich interactive weather analytics platform built with Streamlit and OpenWeatherMap API that provides real-time weather monitoring, forecasting, 3D visualizations, trend analysis, and anomaly detection.",
    features: [
      "Real-time weather dashboard with multiple city support",
      "Side-by-side city comparison with highlighted extremes",
      "Interactive 3D visualizations and animated charts",
      "Weather maps and heatmaps using Plotly",
      "5-day forecasting and next-24-hour weather insights",
      "Correlation analytics and temperature prediction",
      "Automatic anomaly detection",
      "CSV and JSON export support",
      "Auto-refresh weather updates"
    ],
    architecture: "Streamlit frontend → OpenWeatherMap API → Analytics layer → Plotly + Matplotlib visualization engine → Forecast & prediction modules",
    challenges: [
      "Handling multiple real-time API responses",
      "Creating responsive and interactive weather visualizations",
      "Building animated 3D representations efficiently",
      "Designing prediction and anomaly detection workflows"
    ],
    outcomes: [
      "Real-time weather monitoring dashboard",
      "Multi-city analytics system",
      "Interactive 3D weather insights",
      "Forecasting and anomaly detection integration"
    ],
    technologies: [
      "Python",
      "Streamlit",
      "Plotly",
      "Matplotlib",
      "OpenWeather API",
      "Pandas",
      "Scikit-learn",
      "Numpy"
    ],
    github: "https://github.com/Suresh-Nagvanshi/weather_dashboard",
    live: "#"
  }
];

export default projects;