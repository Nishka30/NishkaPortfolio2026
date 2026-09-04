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
  timezone: "IST · UTC+5:30",
  education: {
    degree: "B.Tech, Computer Science",
    school: "MCKV Institute of Engineering",
    years: "2021–2025",
    gpa: "CGPA 9.6",
  },
};

// Capability areas — each one points at real work elsewhere on this page, so
// nothing here is a claim the site doesn't already back up.
export const whatIDo = {
  eyebrow: "What I actually do",
  title: "Four Things I Get Hired For",
  description:
    "The through-line across everything below: I work on the layer between a model and the people relying on it.",
  areas: [
    {
      key: "orchestration",
      icon: "workflow",
      title: "Orchestration & tool infrastructure",
      body: "MCP servers, tool registries, and governed gateways — the layer agents call through. Config-driven routing, persona-scoped capability discovery, and failure modes that are named rather than collapsing into a generic 500.",
      proof: "See Agentic Assembly Framework",
      href: "#projects",
    },
    {
      key: "retrieval",
      icon: "search",
      title: "Retrieval that matches the data",
      body: "I built the same document-intelligence system three ways — dense vectors, BM25, and a knowledge graph — to learn where each one actually wins. The vectorless one is running internally at Prolifics.",
      proof: "See the retrieval comparison",
      href: "#retrieval",
    },
    {
      key: "ml",
      icon: "shield",
      title: "ML that ships behind a contract",
      body: "Models trained on real history rather than an LLM's guess, with explainability attached and the boundary drawn deliberately — in SentinelScan the score is computed and frozen before the LLM is allowed to narrate it.",
      proof: "See SentinelScan",
      href: "#projects",
    },
    {
      key: "fullstack",
      icon: "blocks",
      title: "The product engineering underneath",
      body: "None of the above matters if the application around it doesn't hold up. Python, FastAPI, Java, React, Angular and SQL across live logistics and healthcare platforms — auth, real-time messaging, dimensional data models and Databricks on the reporting side, and the performance tuning that keeps all of it usable.",
      proof: "See Experience",
      href: "#work",
    },
  ],
};

// Explicit type so the optional verification link doesn't narrow the array
// into a union that TypeScript refuses to index.
export type ImpactNumber = {
  key: string;
  value: string;
  label: string;
  detail: string;
  tone: "accent" | "low" | "medium";
  href?: string;
  hrefLabel?: string;
};

// Every figure here is already stated and sourced elsewhere on the page.
export const impactNumbers: ImpactNumber[] = [
  {
    key: "perf",
    value: "40–50%",
    label: "Faster page loads",
    detail: "ITMS logistics platform at Prolifics",
    tone: "low" as const,
  },
  {
    key: "query",
    value: "200→80ms",
    label: "SQL query execution",
    detail: "~200ms down to 70–80ms after dimensional-model and query tuning",
    tone: "accent" as const,
  },
  {
    key: "dsa",
    value: "500+",
    label: "DSA problems solved",
    detail: "Across multiple competitive platforms",
    tone: "low" as const,
    href: "https://codolio.com/profile/Nishka",
    hrefLabel: "verify on Codolio",
  },
  {
    key: "hackathons",
    value: "3×",
    label: "Hackathon winner",
    detail: "Plus Top 20 of 1,500+ teams at HackFest'23",
    tone: "medium" as const,
  },
];

export const educationSection = {
  eyebrow: "Education",
  title: "Where The Fundamentals Came From",
  description:
    "Computer science degree, finished alongside the hackathons and the problem-solving practice above.",
  highlights: [
    "Graduated 2025 and moved straight into enterprise engineering at Prolifics.",
    "Coursework backed by 500+ solved algorithmic problems and four hackathon results.",
  ],
};

export const nowBuilding = {
  text: "Currently building AI/Agentic AI systems focused on enterprise automation, including MCP-based tools, RAG, and intelligent data-quality/monitoring workflows.",
  updated: "2026-09",
};

export const aaf = {
  name: "Agentic Assembly Framework",
  shortName: "AAF",
  subtitle: "Enterprise Agentic AI Platform",
  eyebrow: "Built at Prolifics",
  pipelineHeading: "Five Gates, Never a Mystery 500",
  pitch:
    "A three-layer platform that turns a pile of agents into a governed product surface — one gateway, one YAML file, zero client-side coupling to what's actually running behind it.",
  layers: [
    {
      key: "aaf",
      name: "AAF (Assembly Framework)",
      role: "Governance & routing",
      description:
        "Config-driven via YAML \"assemblies.\" Validates consumer identity, resolves personas and capabilities, and dynamically routes requests to whichever agent, tool, or MCP implementation is bound to that capability — clients never couple to the implementation, only to the capability name.",
    },
    {
      key: "toolkit",
      name: "Agentic Toolkit",
      role: "Execution",
      description:
        "Agent definitions, tool registries, workflow orchestration, and pluggable LLM providers, with multi-agent A2A (agent-to-agent) delegation across local and remote agents.",
    },
    {
      key: "mcp",
      name: "Dynamic MCP Toolkit",
      role: "Tool exposure",
      description:
        "Dynamic MCP tool registration, approval workflows, and branching logic under zero-trust policy enforcement — exposed via an HTTP gateway with REST endpoints for execution, health, and capability discovery.",
    },
  ],
  pipeline: [
    {
      key: "identity",
      label: "Identity",
      description: "Bearer token checked against the consumer registry.",
      failStatus: 401,
      failLabel: "Unauthorized",
    },
    {
      key: "persona",
      label: "Persona",
      description: "Resolves what this caller's role permits.",
      failStatus: 403,
      failLabel: "Forbidden",
    },
    {
      key: "assembly",
      label: "Assembly",
      description: "Routes the capability name to its bound implementation.",
      failStatus: 404,
      failLabel: "Not Found",
    },
    {
      key: "health",
      label: "Health",
      description: "Checks the dependency behind that binding is alive.",
      failStatus: 503,
      failLabel: "Service Unavailable",
    },
    {
      key: "dispatch",
      label: "Dispatch",
      description: "Request forwarded to the real agent, tool, or MCP server.",
      failStatus: null,
      failLabel: null,
    },
  ],
  scenarios: [
    {
      key: "valid",
      label: "Valid request",
      failAt: -1,
      status: 200,
      statusLabel: "OK",
      tone: "low" as const,
      note: "Every stage passed — request dispatched to the bound implementation.",
    },
    {
      key: "invalid-token",
      label: "Invalid token",
      failAt: 0,
      status: 401,
      statusLabel: "Unauthorized",
      tone: "high" as const,
      note: "Bearer token not found in the consumer registry.",
    },
    {
      key: "wrong-persona",
      label: "Wrong persona",
      failAt: 1,
      status: 403,
      statusLabel: "Forbidden",
      tone: "high" as const,
      note: "Caller's resolved persona doesn't permit this capability.",
    },
    {
      key: "unbound",
      label: "Unbound capability",
      failAt: 2,
      status: 404,
      statusLabel: "Not Found",
      tone: "medium" as const,
      note: "No implementation is currently bound to this capability name.",
    },
    {
      key: "unhealthy",
      label: "Dependency down",
      failAt: 3,
      status: 503,
      statusLabel: "Service Unavailable",
      tone: "medium" as const,
      note: "Bound implementation resolved, but its health check is failing.",
    },
  ],
  principles: [
    {
      title: "Capability as contract",
      body: "Capability names are the public contract. Swap the agent, tool, or MCP server behind a binding and callers never notice.",
    },
    {
      title: "Persona-scoped discovery",
      body: "/capabilities is persona-scoped — the same endpoint returns a different list per token. Permissions are data, not code.",
    },
    {
      title: "No ambiguous failures",
      body: "Every failure mode is named and specific — 401, 403, 404, or 503. Never a generic 500.",
    },
  ],
  tech: ["Python", "FastAPI", "YAML-driven config", "MCP", "Bearer auth", "Health checks", "REST gateway"],
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
    "Contributed to multi-agent workflow orchestration — agent-to-agent delegation, handoff logic, and coordinated task execution across the platform's execution layer.",
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
  name: "SentinelScan",
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
  pypiPackage: "sentinel-risk",
  pypiUrl: "https://pypi.org/project/sentinel-risk/",
  pypiInstall: "pip install sentinel-risk",
  githubUrl: "https://github.com/Nishka30/SentinalScan",
  githubRepo: "Nishka30/SentinalScan",
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

export const painScript = {
  name: "PainScript",
  subtitle: "Healthcare / Mental-Health Platform",
  eyebrow: "Client project — built at Prolifics",
  role: "Full-Stack Developer",
  pitch:
    "A healthcare platform used by patients, clinicians, staff, and administrators — full-stack work across web and mobile, plus an AI proof of concept that watches the data behind it.",
  positioning:
    "Full-Stack Engineer building enterprise healthcare applications, with hands-on experience developing AI/Agentic AI solutions on top of real-world production systems.",
  details: [
    "Contributed as a Full-Stack Developer across multiple applications: clinician/admin-facing web applications and a React Native mobile app used by patients, using Java, SQL, React, Angular, and React Native.",
    "The patient mobile app captures regular health and behavioral surveys; built the submission and scoring workflows that surface the resulting information to clinicians to track patient progress and flag relevant changes.",
    "Built and maintained clinician/admin workflows across both web and mobile applications, working with healthcare data and database-driven systems throughout.",
  ],
  aiPoc: {
    title: "AI / Agentic AI proof of concept",
    description:
      "Separately built an AI agent capable of connecting to the application's database and running automated, recurring data-quality health checks — instead of relying entirely on manual investigation.",
    checks: [
      { key: "duplicates", label: "Duplicate record scan", detail: "Detecting potential duplicate patient records" },
      { key: "processing", label: "Submission processing check", detail: "Verifying survey submissions are being scored correctly" },
      { key: "anomalies", label: "Anomaly detection", detail: "Identifying anomalies or inconsistencies in the data" },
      { key: "report", label: "Actionable report", detail: "Surfacing findings instead of requiring manual investigation" },
    ],
  },
  tech: ["Java", "SQL", "React", "Angular", "React Native"],
  note: "Described at the level of contribution and architecture — no patient or clinical data specifics beyond what's already general knowledge of the platform's purpose.",
};

export const internalRag = {
  name: "Internal Vectorless RAG",
  subtitle: "Prolifics — enterprise knowledge retrieval",
  pitch:
    "Built an internal vectorless RAG system using BM25 + SQLite for efficient document retrieval, with an LLM generating grounded responses from retrieved enterprise knowledge.",
  tech: ["BM25", "SQLite", "LLM integration"],
  note: "The real system behind the Vectorless RAG approach below — chosen deliberately over embeddings for this retrieval problem, not a default.",
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

export type RetrievalApproach = {
  key: string;
  name: string;
  flow: string[];
  note: string;
  builtAt?: string;
};

export const retrievalIntro = {
  eyebrow: "How I think about retrieval",
  title: "One Knowledge Problem. Three Architectures.",
  description:
    "I built the same document-intelligence system — upload documents, ask questions, get answers through a chatbot-style interface — three separate ways, to understand how different retrieval strategies change what an AI system can actually do.",
  closing:
    "Same knowledge-retrieval problem, three fundamentally different retrieval strategies — because the right architecture depends on the shape of the data, not habit.",
};

export const retrievalApproaches: RetrievalApproach[] = [
  {
    key: "vector",
    name: "Vector RAG",
    flow: ["Documents", "Embeddings + pgvector (PostgreSQL)", "Relevant chunks", "LLM"],
    note: "Best for semantic similarity — dense embeddings and nearest-neighbor search over a vector store.",
  },
  {
    key: "vectorless",
    name: "Vectorless RAG",
    flow: ["Documents", "BM25 + SQLite", "Relevant chunks", "LLM"],
    note: "No embeddings, no vector infrastructure — lexical retrieval, simpler ops when semantic recall isn't the bottleneck.",
    builtAt: "Built internally at Prolifics for enterprise knowledge retrieval — see Internal Vectorless RAG below.",
  },
  {
    key: "graph",
    name: "GraphRAG",
    flow: ["Documents", "Knowledge graph (Neo4j)", "Relevant chunks", "LLM"],
    note: "Best when relationships between pieces of information matter — entity/relationship traversal over a knowledge graph.",
  },
];

export const beyondRetrieval = {
  eyebrow: "Broader AI experience",
  title: "Beyond Retrieval: How I've Been Expanding What AI Can Do",
  steps: [
    { key: "knowledge", give: "Give AI knowledge", how: "RAG / knowledge retrieval", detail: "The three-architecture system above." },
    { key: "tools", give: "Give AI tools", how: "MCP / tool calling", detail: "Agents that interact with external systems and APIs, not just generate text." },
    { key: "interface", give: "Expand the interface", how: "Voice-to-text / speech-to-text", detail: "Interacting with AI beyond typing." },
    { key: "role", give: "Give AI a role", how: "Multi-agent workflows and orchestration", detail: "Ties to the Prolifics / AAF work above." },
  ],
  closing:
    "I'm most interested in the engineering around the model — retrieval, tools, interfaces, and orchestration — not just the prompt.",
};

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
  { title: "Frontend", items: ["Angular", "ReactJS", "Next.js", "Redux", "jQuery", "HTML5", "CSS3", "TailwindCSS", "TanStack Grid", "Flutter", "React Native (Expo)"] },
  { title: "Backend & APIs", items: ["Node.js", "Express.js", ".NET Core / Web APIs", "C#", "FastAPI", "REST APIs", "Microservices", "OAuth2", "JWT", "Redis"] },
  { title: "Databases & Data Engineering", items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Pinecone", "Dimensional Modeling", "Databricks"] },
  { title: "Cloud & Dev Tools", items: ["Azure", "AWS", "Docker", "Kubernetes", "OpenShift", "Azure DevOps", "GitHub Actions", "Git", "Postman"] },
  { title: "Domain", items: ["Healthcare / EMR Systems", "FHIR", "HL7"] },
];

export const achievements = {
  eyebrow: "Achievements",
  title: "Hackathons: Where I Actually Enjoy Working Under Pressure",
  headlineStat: "3× Hackathon Winner",
  headlineFollowUp: "Plus a Top 20 finish out of 1,500+ teams at HackFest'23.",
  entries: [
    {
      key: "hackfest23",
      placement: "Finalist — Top 20 of 1,500+ teams",
      event: "HackFest'23",
      org: "IIT (ISM) Dhanbad",
      date: "April 2023",
      project: "FemMe Power",
      detail:
        "A rural-women employment platform with personalized job matching, employer partnerships, safety features, and a chatbot assistant.",
      credit: "With Abhishek Mishra & Ayush Jha",
      featured: true,
    },
    {
      key: "hackonova",
      placement: "1st Place",
      event: "HackONova",
      org: "Adamas University",
      detail:
        "36-hour hackathon — built an application against a problem statement set by the university itself.",
    },
    {
      key: "code4web",
      placement: "1st Place",
      event: "Code-4-Web",
      org: "Inter-College Hackathon",
      detail:
        'Team Leader, "405 Not Found" (with Saptarshi Banik). Organized by Risers Club, Coders Club & StartUp Club, MCKVIE.',
    },
    {
      key: "fronthack",
      placement: "1st Place",
      event: "Front-Hack",
      org: "Intra-college Front-End Development Contest",
      date: "May 2022",
      detail: "Team NOOBS. Organized by The Coders Club & The StartUp Club, MCKVIE.",
    },
  ],
  dsa: {
    title: "500+ DSA problems solved",
    detail: "Across multiple platforms",
    // Aggregated coding profile — kept as a verification link on the stat itself
    // rather than a top-level link, so it reads as proof, not as positioning.
    verifyUrl: "https://codolio.com/profile/Nishka",
    verifyLabel: "verify on Codolio",
  },
};
