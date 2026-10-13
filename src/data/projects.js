export const projects = [
  {
    id: "project-1791867763234",
    number: "01",
    featured: true,
    label: "FEATURED PROJECT",
    title: "Pricemind AI",
    subtitle: "Dynamic Pricing and Revenue Optimization",
    description: "PriceMind AI is an AI-powered dynamic pricing and revenue optimization platform that uses machine learning to forecast demand, analyze price elasticity, and recommend optimal product prices.\nIts Visual Intelligence module uses Computer Vision (YOLO) and OCR to detect products and extract competitor prices from retail images.",
    longDescription: "PriceMind AI transforms traditional retail pricing by integrating computer vision and machine learning. The platform detects products, monitors competitors in real-time, and optimizes pricing strategies dynamically.",
    tags: [
      "Python",
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "YOLO",
      "Open CV",
      "LLM's",
      "LangChain",
      "SHAP",
      "DataScience",
      "ML Tech's"
    ],
    github: "https://github.com/Pranav-Kaushik008/PriceMind-AI",
    demo: null,
    caseStudy: true,
    problem: "Retailers struggle to continuously track competitor prices and manually adjust pricing strategies against dynamic market demand.",
    solution: "An autonomous pricing intelligence platform combining YOLO computer vision for competitor shelf analysis with machine learning models for demand forecasting and price elasticity.",
    keyFeatures: [
      "Real-time product detection and price extraction using YOLO and OCR",
      "Machine learning demand forecasting and price elasticity models",
      "Dynamic pricing recommendation engine",
      "FastAPI backend with PostgreSQL persistence",
      "Interactive React dashboard with analytics visualizations"
    ],
    architecture: "React frontend → FastAPI REST API → Computer Vision & ML Serving → PostgreSQL",
    aiComponents: [
      "YOLO computer vision for retail object detection",
      "OCR for automated competitor price tag extraction",
      "SHAP explainability for pricing recommendations",
      "LangChain LLM orchestration for automated market summaries"
    ],
    techStack: [
      {
        category: "Backend",
        items: ["Python", "FastAPI"]
      },
      {
        category: "Frontend",
        items: ["React.js", "JavaScript"]
      },
      {
        category: "Database",
        items: ["PostgreSQL"]
      },
      {
        category: "AI/ML & Vision",
        items: ["YOLO", "OpenCV", "LangChain", "SHAP", "Scikit-Learn"]
      }
    ],
    challenges: [
      "Accurate price extraction from noisy and varied retail shelf images",
      "Balancing pricing optimization speed with multi-variable demand modeling"
    ],
    learnings: [
      "End-to-end integration of Computer Vision (YOLO) with backend microservices",
      "Production deployment of dynamic price elasticity models"
    ],
    futureImprovements: [
      "Multi-store live camera feed streaming",
      "Automated e-commerce web crawler integration"
    ]
  },
  {
    id: "intelliprocure-ai",
    number: "02",
    featured: true,
    label: "FEATURED PROJECT",
    title: "IntelliProcure AI",
    subtitle: "Intelligent Procurement Platform",
    description: "AI-powered intelligent procurement platform designed to assist procurement workflows, analyze purchasing information, and provide intelligent recommendations using large language models and autonomous AI agents.",
    longDescription: "IntelliProcure AI transforms traditional procurement processes by integrating advanced AI capabilities. The platform leverages LLMs to understand procurement context, analyze vendor data, and deliver actionable insights that accelerate decision-making.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "LLMs",
      "AI Agents"
    ],
    github: "https://github.com/Pranav-Kaushik008/IntelliProcure-AI",
    demo: null,
    caseStudy: true,
    problem: "Traditional procurement workflows are fragmented, manual, and slow — making it difficult to analyze vendor performance, compare purchasing options, and make data-driven decisions at scale.",
    solution: "An AI-powered platform that uses LLMs and AI agents to automate procurement analysis, surface intelligent recommendations, and streamline purchasing workflows from requisition to order.",
    keyFeatures: [
      "AI-powered procurement query analysis using LLMs",
      "Autonomous AI agents for vendor comparison and insights",
      "FastAPI backend with PostgreSQL data persistence",
      "Conversational interface for natural language procurement queries",
      "Intelligent recommendation engine for purchasing decisions"
    ],
    architecture: "React frontend → FastAPI REST API → AI Agent orchestration → PostgreSQL",
    aiComponents: [
      "LLM integration for natural language understanding",
      "AI Agents for autonomous task execution",
      "Prompt engineering for procurement context"
    ],
    techStack: [
      {
        category: "Backend",
        items: ["Python", "FastAPI"]
      },
      {
        category: "Frontend",
        items: ["React", "JavaScript"]
      },
      {
        category: "Database",
        items: ["PostgreSQL"]
      },
      {
        category: "AI/ML",
        items: ["LLMs", "AI Agents", "Prompt Engineering"]
      }
    ],
    challenges: [
      "Designing reliable AI agent workflows that handle edge cases gracefully",
      "Ensuring LLM outputs are structured and actionable for procurement decisions",
      "Building a scalable API architecture that supports concurrent AI requests"
    ],
    learnings: [
      "Deep understanding of LLM prompt design for domain-specific applications",
      "AI agent orchestration patterns and reliability engineering",
      "Full-stack architecture for AI-first applications"
    ],
    futureImprovements: [
      "Multi-agent collaboration for complex procurement scenarios",
      "Integration with ERP systems",
      "Advanced analytics and spend forecasting"
    ]
  },
  {
    id: "smart-travel-planner",
    number: "03",
    featured: true,
    label: "FEATURED PROJECT",
    title: "Smart Travel Planner",
    subtitle: "AI-Powered Itinerary & Travel Agent",
    description: "An intelligent travel planning application that leverages AI models to generate personalized itineraries, recommend attractions, and optimize multi-day travel schedules based on user preferences and constraints.",
    longDescription: "Smart Travel Planner transforms trip planning by acting as an autonomous travel assistant. By understanding user budgets, pace preferences, interests, and time limits, it generates optimized day-by-day itineraries complete with real-time routing recommendations.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "LLMs",
      "Prompt Engineering",
      "REST APIs"
    ],
    github: "https://github.com/Pranav-Kaushik008/Smart-Travel-Planner",
    demo: null,
    caseStudy: true,
    problem: "Planning multi-day travel itineraries manually requires hours of researching attractions, balancing transit times, and organizing schedules, often leading to fragmented and overwhelming travel plans.",
    solution: "An end-to-end AI travel assistant that generates structured, personalized itineraries, intelligently allocating time across attractions and adapting to specific travel preferences.",
    keyFeatures: [
      "AI-driven custom itinerary generation based on user prompts",
      "Dynamic day-by-day activity scheduling and time optimization",
      "Personalized destination recommendations tailored to user interest profiles",
      "FastAPI backend with high-performance LLM prompt processing",
      "Interactive, responsive React user interface"
    ],
    architecture: "React frontend → FastAPI backend → LLM & Prompt Pipeline → Travel API Integrations",
    aiComponents: [
      "LLM-based natural language trip requirement extraction",
      "Context-aware itinerary generation",
      "Constraint-guided prompt engineering"
    ],
    techStack: [
      {
        category: "Backend",
        items: ["Python", "FastAPI"]
      },
      {
        category: "Frontend",
        items: ["React", "JavaScript", "CSS Modules"]
      },
      {
        category: "AI/ML",
        items: ["LLMs", "Prompt Engineering", "Random Forest (ML Algorithm)"]
      },
      {
        category: "Tools",
        items: ["Git", "GitHub", "REST APIs"]
      }
    ],
    challenges: [
      "Structuring LLM responses into consistent, valid JSON data formats for frontend rendering",
      "Optimizing prompt latency to ensure fast itinerary generation times",
      "Handling complex scheduling constraints like open hours and transit times"
    ],
    learnings: [
      "Advanced techniques in structured LLM output formatting and validation",
      "Designing intuitive travel UI component hierarchies around dynamic temporal data",
      "Building performant Python microservices for generative AI features"
    ],
    futureImprovements: [
      "Real-time weather and flight price API integrations",
      "Collaborative trip editing for group travel",
      "Offline PDF itinerary export and mobile map integration"
    ]
  },
  {
    id: "fraudshield-ai",
    number: "04",
    featured: true,
    label: "FEATURED PROJECT",
    title: "FraudShield AI",
    subtitle: "Fraud Detection & Explainability Platform",
    description: "AI-powered fraud detection and explainability platform for identifying suspicious transactions and providing interpretable risk insights using machine learning and SHAP-based explanation techniques.",
    longDescription: "FraudShield AI combines machine learning fraud detection with model explainability to give compliance teams not just predictions, but understandable reasons behind every risk flag.",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "MLflow",
      "SHAP"
    ],
    github: "https://github.com/Pranav-Kaushik008/FraudShield-AI",
    demo: null,
    caseStudy: true,
    problem: "Financial fraud detection models are often black boxes — they flag transactions but cannot explain why, making it impossible for compliance teams to trust or act on the results.",
    solution: "A fraud detection platform that combines high-accuracy ML models with SHAP-based explainability, enabling compliance teams to understand exactly why each transaction was flagged.",
    keyFeatures: [
      "Real-time transaction fraud scoring using trained ML models",
      "SHAP-powered feature importance explanations per prediction",
      "MLflow experiment tracking and model versioning",
      "Interactive dashboard for transaction review and investigation",
      "RESTful API for integration with external systems"
    ],
    architecture: "React dashboard → FastAPI API → ML Model serving → PostgreSQL + MLflow",
    aiComponents: [
      "Machine learning fraud classification",
      "SHAP explainability layer",
      "MLflow model registry and tracking"
    ],
    techStack: [
      {
        category: "Backend",
        items: ["Python", "FastAPI"]
      },
      {
        category: "Frontend",
        items: ["React"]
      },
      {
        category: "Database",
        items: ["PostgreSQL"]
      },
      {
        category: "AI/ML",
        items: ["Machine Learning", "SHAP", "MLflow"]
      }
    ],
    challenges: [
      "Balancing model accuracy with computational efficiency for real-time scoring",
      "Designing SHAP visualizations that are interpretable for non-technical users",
      "Managing model lifecycle and version control with MLflow"
    ],
    learnings: [
      "Applied ML model explainability in production contexts",
      "MLflow best practices for experiment tracking and model management",
      "Building trust in AI systems through transparent explanations"
    ],
    futureImprovements: [
      "Real-time streaming fraud detection with Apache Kafka",
      "Adversarial robustness testing",
      "Multi-model ensemble approach"
    ]
  },
  {
    id: "ai-resume-screening",
    number: "05",
    featured: true,
    label: "FEATURED PROJECT",
    title: "AI Resume Screening Agent",
    subtitle: "Semantic Resume Analysis System",
    description: "AI-powered resume screening and semantic matching system that analyzes resumes and compares candidates against job requirements using embeddings, vector search, and large language models.",
    longDescription: "The AI Resume Screening Agent automates the initial screening process by using semantic embeddings to match candidate qualifications against job descriptions, far beyond simple keyword matching.",
    tags: [
      "Python",
      "Streamlit",
      "ChromaDB",
      "Embeddings",
      "LLMs"
    ],
    github: "https://github.com/Pranav-Kaushik008/Resume-Screening-Agent",
    demo: null,
    caseStudy: true,
    problem: "Traditional resume screening relies on keyword matching that misses qualified candidates and wastes recruiters' time reviewing irrelevant applications at scale.",
    solution: "A semantic AI agent that uses embedding-based vector search to understand resume context and match candidates to job requirements based on meaning, not just keywords.",
    keyFeatures: [
      "PDF resume parsing and text extraction",
      "Semantic embedding generation for resumes and job descriptions",
      "Vector similarity search using ChromaDB",
      "LLM-powered candidate ranking and reasoning",
      "Streamlit interface for recruiter review"
    ],
    architecture: "Streamlit UI → Python agent → ChromaDB vector store → LLM reasoning",
    aiComponents: [
      "Text embeddings for semantic similarity",
      "ChromaDB vector database",
      "LLM reasoning for candidate ranking",
      "RAG-style retrieval for job matching"
    ],
    techStack: [
      {
        category: "Backend",
        items: ["Python"]
      },
      {
        category: "Frontend",
        items: ["Streamlit"]
      },
      {
        category: "Vector DB",
        items: ["ChromaDB"]
      },
      {
        category: "AI/ML",
        items: ["Embeddings", "LLMs", "RAG"]
      }
    ],
    challenges: [
      "Parsing diverse resume formats reliably",
      "Tuning embedding similarity thresholds for accurate matching",
      "Designing prompts that produce consistent candidate evaluations"
    ],
    learnings: [
      "Practical implementation of RAG patterns for document analysis",
      "Vector database design for semantic search applications",
      "Building end-to-end AI agents with real-world utility"
    ],
    futureImprovements: [
      "Multi-language resume support",
      "Bias detection and fairness scoring",
      "API deployment for ATS integration"
    ]
  }
];
