// Structured content for the portfolio. Kept separate from layout components
// so copy can be edited without touching presentation code.

export const profile = {
  name: "Nishka Shrimali",
  title: "Associate Software Engineer",
  company: "Prolifics Corporation Ltd.",
  location: "Hyderabad, India",
  tagline: "AI Systems Engineer",
  positioning:
    "I build the infrastructure other engineers reach for AI through — tool registries, MCP servers, retrieval architectures, and orchestration layers that hold up in production.",
  email: "shrimalinishka30@gmail.com",
  phone: "+91-6291764011",
  github: "https://github.com/Nishka30",
  linkedin: "https://www.linkedin.com/in/nishka-codes/",
  resumeHref: "/resume.pdf",
  education: {
    degree: "B.Tech, Computer Science",
    school: "MCKV Institute of Engineering",
    years: "2021–2025",
    gpa: "CGPA 9.6",
  },
};

export const prolifics = {
  company: "Prolifics Corporation Ltd.",
  role: "Associate Software Engineer",
  location: "Hyderabad, India",
  period: "Jul 2025 – Present",
  bullets: [
    {
      title: "ITMS — logistics & transportation management platform",
      body: "Developed and enhanced ITMS for Inter-Metro Freight, a U.S. freight carrier operating across the continental US, using ReactJS, C#, .NET Web APIs, and SQL. Improved UI responsiveness and reduced page load times by 40–50%. Implemented secure SSO authentication.",
      tags: ["ReactJS", "C#", ".NET Web APIs", "SQL", "SSO"],
    },
    {
      title: "Data model & query optimization",
      body: "Optimized dimensional data models and SQL reporting workflows, reducing query execution time from ~200ms to 70–80ms across high-volume transportation operations.",
      tags: ["SQL", "Dimensional Modeling"],
    },
    {
      title: "Real-time driver/warehouse communication",
      body: "Built a real-time communication and notification system using Node.js, Twilio, and webhook-driven workflows — secure calling and messaging between drivers, warehouses, and head office across 6+ US locations.",
      tags: ["Node.js", "Twilio", "Webhooks"],
    },
  ],
};

export const agenticPlatform = {
  title: "Agentic Backend Platform",
  subtitle: "Prolifics — internal developer platform",
  description:
    "Contributed to the design and build-out of an internal developer platform that lets teams assemble configurable AI backends from reusable pieces, rather than rebuilding orchestration in code each time.",
  points: [
    "Built an internal developer platform for generating configurable AI backend templates with pluggable LLM integrations, authentication modules, and reusable orchestration workflows.",
    "Designed and integrated LLM-powered workflows: prompt orchestration, RAG pipelines, context-aware execution, tool-calling, and multi-agent orchestration for intelligent backend automation.",
    "Developed an MCP-based orchestration framework enabling AI agents to dynamically generate and execute tools from natural language prompts, using modular tool registries and runtime execution pipelines.",
  ],
  tech: ["MCP", "LLM integration", "YAML-driven config", "Multi-agent orchestration", "Azure"],
  note: "Framed at the level of contribution documented on my resume — not a claim of sole authorship.",
};

export const priorExperience = [
  {
    company: "Future Byte Innovations",
    role: "Frontend Intern",
    period: "Nov 2024 – Jun 2025",
    location: "Remote",
    body: "Full-stack Lead Management CRM (Next.js, Node.js, MongoDB, Google Maps API) — lead tracking, geolocation, real-time data. Optimized REST APIs, improving performance by 40% and reducing data retrieval latency by 30%. Built an AI-powered chatbot using OpenAI APIs for user interaction automation.",
    tags: ["Next.js", "Node.js", "MongoDB", "OpenAI API"],
  },
  {
    company: "Skepsi.AI",
    role: "SDE Intern",
    period: "Jun 2024 – Aug 2024",
    location: "Remote",
    body: "Full-stack hotel management platform (ReactJS, Node.js, MongoDB) — role-based auth, room allocation, live booking tracking. Improved dashboard responsiveness by 40%.",
    tags: ["ReactJS", "Node.js", "MongoDB"],
  },
];

export const sentinel = {
  name: "Sentinel",
  subtitle: "Deployment Risk Analyzer",
  pitch:
    "Scores whether a code change is safe to deploy — using a model trained on the repository's own bug history, not an LLM's guess.",
  stats: [
    { label: "ROC-AUC", value: "0.74" },
    { label: "PR-AUC", value: "0.25" },
    { label: "Commits benchmarked", value: "4,800" },
    { label: "Automated tests", value: "298" },
  ],
  details: [
    "Predicts deployment risk with a LightGBM model trained on bug-fixing history mined via the SZZ algorithm, which traces bug-inducing commits through line-level git blame.",
    "Benchmarked against a lines-changed baseline on a 4,800-commit codebase — ROC-AUC 0.74, PR-AUC 0.25 — under a strict time-based train/test split to prevent data leakage.",
    "Built a dependency-graph blast-radius analyzer (networkx) that maps direct and transitive dependents across Python and Java, and flags circular imports and hub modules.",
    "SHAP-based explainability layer attributes risk to individual factors; an LLM (NVIDIA OpenAI-compatible API) generates the natural-language narration on top — architected so the LLM can narrate the score but structurally cannot alter it, since the score is computed and frozen before the LLM ever sees it.",
    "Shipped across three surfaces on one versioned JSON contract: a CLI, an MCP server callable by AI agents and editors, and a GitHub Action that gates pull requests.",
  ],
  bands: [
    { key: "low", label: "Low", range: "0–34", color: "var(--risk-low)" },
    { key: "medium", label: "Medium", range: "35–64", color: "var(--risk-medium)" },
    { key: "high", label: "High", range: "65–100", color: "var(--risk-high)" },
  ],
  nonGoals: [
    "No vector database — retrieval isn't the problem this tool solves.",
    "No Redis, no Neo4j — no infra beyond what the scoring pipeline actually needs.",
    "No \"AI agent\" abstraction wrapped around a single deterministic tool call.",
  ],
  demo: {
    score: 67,
    band: "high" as const,
    reasons: [
      { factor: "Blast radius", detail: "14 direct dependents across 3 modules, including 1 hub module", weight: 0.32 },
      { factor: "Bug-prone file history", detail: "This file was the fix target in 6 prior SZZ-traced bug-inducing commits", weight: 0.27 },
      { factor: "Change size", detail: "312 lines changed across 5 files — above the repository's 80th percentile", weight: 0.19 },
      { factor: "Test coverage delta", detail: "No new tests added alongside a change to core execution path", weight: 0.14 },
      { factor: "Review depth", detail: "Single reviewer, approved in under 4 minutes", weight: 0.08 },
    ],
    disclaimer: "Illustrative demo using example numbers from the project README — not a live model.",
  },
  tech: ["Python", "LightGBM", "SHAP", "networkx", "MCP", "GitHub Actions", "NVIDIA OpenAI-compatible API"],
};

export const monitoringMcp = {
  name: "Monitoring MCP Server & Agent",
  pitch:
    "A reusable toolkit that lets developers ship new AI-agent tools by dropping in a Python file and a YAML file — zero server code changes.",
  details: [
    "Architected and independently built a reusable MCP Toolkit: developers define tools purely via Python implementations plus YAML config, and the FastMCP server auto-discovers them.",
    "Dynamic tool lifecycle: automatic discovery, JSON-schema validation, AST-based security scanning that blocks os, subprocess, eval, exec, open and similar calls before any code runs — plus a runtime builtins shim as defense-in-depth — then registration and runtime execution.",
    "Built an Azure OpenAI-powered Monitoring Agent that selects and invokes MCP tools based on natural-language requests, executes monitoring workflows, queries operational data, and generates contextual responses.",
    "Secure, read-only, parameterized SQL execution for database monitoring, with authentication, audit logging, health checks, retries, and guardrails against unsafe operations.",
    "Exposed via Streamable HTTP MCP and containerized with Docker; automated tests and CI validate tool discovery, security checks, registration, agent orchestration, and execution paths.",
  ],
  tech: ["Python", "FastMCP", "Azure OpenAI", "Docker", "Streamable HTTP MCP", "JSON Schema"],
  pipeline: ["tool.py", "tool.yaml", "Auto-discovery", "AST security scan", "JSON-schema validation", "Registered & callable"],
};

export const careNexus = {
  name: "CareNexus",
  subtitle: "Healthcare Risk Analytics Platform",
  pitch:
    "A clinical risk-analytics platform on a self-hosted FHIR server — three scoring modules combined into one weighted patient risk score.",
  modules: [
    { key: "sdoh", label: "Social Determinants of Health", weight: 0.3 },
    { key: "severity", label: "Clinical Severity", weight: 0.45 },
    { key: "adherence", label: "Medication Adherence", weight: 0.25 },
  ],
  details: [
    "Built a full-stack clinical risk-analytics platform on a self-hosted HAPI FHIR server backed by PostgreSQL, ingesting synthetic patient records generated with Synthea to model realistic EMR data.",
    "Designed three clinical risk-scoring modules — Social Determinants of Health (SDOH), Clinical Severity, and Medication Adherence — combined into a single weighted overall patient risk score.",
    "Authored PostgreSQL setup and transformation scripts mapping FHIR resources into query-optimized relational structures that power the scoring pipeline and analytics dashboards.",
    "Produced technical architecture documentation and iteratively tuned score distributions for senior architect and stakeholder review.",
  ],
  tech: ["HAPI FHIR", "PostgreSQL", "Synthea", "HL7/FHIR"],
  note: "Built on synthetic patient data (Synthea) — no real patient or clinician records involved.",
};

export const retrievalApproaches = [
  {
    key: "vector",
    name: "Vector RAG",
    flow: ["Documents", "Embeddings + pgvector (PostgreSQL)", "Relevant chunks", "LLM"],
    note: "The default — dense embeddings and nearest-neighbor search over a vector store.",
  },
  {
    key: "vectorless",
    name: "Vectorless RAG",
    flow: ["Documents", "BM25 + SQLite", "Relevant chunks", "LLM"],
    note: "Lexical retrieval, no embeddings or vector infra — simpler ops when semantic recall isn't the bottleneck.",
  },
  {
    key: "graph",
    name: "GraphRAG",
    flow: ["Documents", "Knowledge graph (Neo4j)", "Relevant chunks", "LLM"],
    note: "Entity/relationship traversal — useful when the question depends on how things connect, not just what they say.",
  },
] as const;

export type SkillGroup = {
  title: string;
  items: string[];
  emphasis?: boolean;
};

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["JavaScript", "TypeScript", "Python", "C#", "Java", "SQL"] },
  {
    title: "AI & LLM Systems",
    items: ["LangChain", "AutoGen", "Semantic Kernel", "MAF", "MCP / FastMCP", "RAG pipelines", "LLM integration", "Multi-agent systems", "LightGBM", "SHAP"],
    emphasis: true,
  },
  { title: "Frontend", items: ["Angular", "ReactJS", "Next.js", "Redux", "jQuery", "HTML5", "CSS3", "TailwindCSS", "TanStack Grid", "Flutter"] },
  { title: "Backend & APIs", items: ["Node.js", "Express.js", ".NET Core / Web APIs", "C#", "FastAPI", "REST APIs", "Microservices", "OAuth2", "JWT", "Redis"] },
  { title: "Databases & Data Engineering", items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Pinecone", "Dimensional Modeling", "Databricks"] },
  { title: "Cloud & Dev Tools", items: ["Azure", "AWS", "Docker", "Kubernetes", "OpenShift", "Azure DevOps", "GitHub Actions", "Git", "Postman"] },
  { title: "Domain", items: ["Healthcare / EMR Systems", "FHIR", "HL7"] },
];

export const achievements = [
  { title: "Finalist, Hackfest'23", detail: "IIT ISM Dhanbad" },
  { title: "2nd Runner-up, HackONova", detail: "Adamas University" },
  { title: "500+ DSA problems solved", detail: "Across multiple platforms" },
];
