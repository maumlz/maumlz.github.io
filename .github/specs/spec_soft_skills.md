# Resume Website Update Specification

## Objective

Update the personal resume website to better reflect:

1. Professional soft skills demonstrated through current work experience.
2. Hands-on learning in Artificial Intelligence, Machine Learning, LLMs, Transformers, RAG, and related tooling.
3. Production troubleshooting experience across multiple banking products and services.

The goal is to strengthen the profile for Software Engineer II opportunities, including JPMorganChase, without overstating AI expertise or inventing responsibilities, achievements, or metrics.

The website should continue to present the candidate primarily as a software engineer with enterprise Java, Spring Boot, Angular, PostgreSQL, testing, troubleshooting, and deployment experience.

AI and Machine Learning should be presented as active technical learning and independent experimentation, not professional production experience.

---

# 1. Preserve Existing Resume Positioning

The primary professional positioning should remain:

**Software Engineer | Java | Spring Boot | Angular**

Do not reposition the profile as:

- AI Engineer
- Machine Learning Engineer
- Data Scientist
- LLM Engineer
- AI Specialist

The AI content is complementary to the existing software engineering profile.

---

# 2. Add Professional Skills / Soft Skills Section

Add a concise section titled:

## Professional Skills

Include the following:

- Analytical Problem-Solving
- Continuous Learning & Technical Curiosity
- Adaptability
- Cross-Functional Collaboration

These should be presented separately from technical skills.

Do not add generic or unsupported skills such as:

- Leadership
- People Management
- Mentoring
- Project Management
- Strategic Planning
- Team Leadership

unless they already exist elsewhere in the repository and are supported by actual experience.

## Rationale

These skills are supported by existing experience:

### Analytical Problem-Solving

Supported by:

- Investigating production issues.
- Reproducing reported defects in QA environments.
- Performing root cause analysis.
- Troubleshooting application behavior.

### Continuous Learning & Technical Curiosity

Supported by:

- Independent AI and Machine Learning study.
- Studying mathematical foundations behind ML and neural networks.
- Implementing a simplified Transformer.
- Developing a small GPT-style model with PyTorch.
- Experimenting with locally executed pretrained LLMs.

### Adaptability

Supported by:

- Troubleshooting issues across different banking products.
- Becoming familiar with different applications and underlying services.
- Working across frontend, backend, databases, monitoring, and deployments.

### Cross-Functional Collaboration

Supported by:

- Working with development and QA teams.
- Executing and monitoring application deployments.
- Participating in incident resolution and software delivery workflows.

Keep this section concise. Do not write long descriptions for each soft skill unless the current UI already supports detailed competency cards.

---

# 3. Update Banregio Production Troubleshooting Experience

Update the existing production incident / troubleshooting bullet to better reflect actual responsibilities.

Use the following wording:

> Investigate production incidents and reproduce reported issues in QA environments to support root cause analysis and troubleshooting across multiple banking products and services.

If there is already a similar bullet, replace or consolidate it rather than adding a duplicate.

Do not imply that the candidate:

- Owned all production incidents.
- Was solely responsible for root cause analysis.
- Managed production support teams.
- Designed the entire incident management process.

The scope should remain technical investigation and troubleshooting.

---

# 4. Add AI & Machine Learning Learning Section

Add a new section titled:

## AI & Machine Learning — Independent Study and Projects

This section should clearly communicate that the work is educational and exploratory.

Use the following content:

- Studying machine learning, neural networks, LLMs, Transformer architectures, RAG, and the mathematical foundations behind modern AI systems through online courses and independent research.
- Implemented a simple Transformer architecture in Python to understand embeddings, multi-head attention, feed-forward networks, residual connections, and the overall Transformer data flow.
- Currently developing a small GPT-style language model with PyTorch to gain practical understanding of tokenization, embeddings, attention, training, and text generation.
- Experimented with locally running pretrained language models using Ollama and Qwen2.5 0.5B to explore LLM inference and local model execution.
- Researching AI-assisted software development and automation capabilities, including GitHub Copilot and GitHub Copilot Automations.

## Important Positioning Constraint

Do not describe this section using phrases such as:

- Production AI experience
- Production ML systems
- AI engineering experience
- Machine learning expertise
- LLM production deployment
- RAG implementation experience
- Model fine-tuning experience
- AI architecture ownership

unless those experiences are explicitly present elsewhere in the repository.

This section should communicate:

**hands-on learning + implementation + experimentation**

not:

**professional AI specialization**

---

# 5. Technical Skills Handling

Do not automatically move the following into the primary Technical Skills section as expert-level technologies:

- PyTorch
- LLMs
- Transformers
- RAG
- Ollama
- Qwen

These should primarily remain associated with the AI learning section.

If the website already supports skill levels or categories, they may be placed under a category such as:

## Currently Learning

or

## AI / ML Exploration

with wording such as:

- PyTorch — Learning
- Transformers — Learning
- LLM Fundamentals — Learning
- RAG Concepts — Learning
- Ollama — Experimentation

Do not visually present these at the same proficiency level as:

- Java
- Spring Boot
- Angular
- PostgreSQL
- JUnit
- Jest
- OpenShift

unless the existing design explicitly distinguishes proficiency.

---

# 6. Recommended Section Order

If compatible with the current website structure, use this order:

1. Header / Professional Title
2. Professional Summary
3. Technical Skills
4. Professional Skills
5. Professional Experience
6. AI & Machine Learning — Independent Study and Projects
7. Education
8. Selected Projects
9. Languages
10. Contact / Resume Download

If the existing navigation structure is different, preserve the current information architecture unless changing it materially improves clarity.

Do not perform a full redesign solely to change section order.

---

# 7. AI Learning Section UI

Use the existing design system and component patterns.

Preferred presentation:

### AI & Machine Learning
**Independent Study and Projects**

Then show concise bullets or cards for:

### Foundations

- Machine Learning
- Neural Networks
- Mathematical foundations
- LLM concepts

### Transformer Learning

- Tokenization
- Embeddings
- Multi-head attention
- Feed-forward networks
- Residual connections
- Transformer architecture

### Hands-On Projects

- Simple Transformer implementation in Python
- Small GPT-style model under development with PyTorch
- Local inference experimentation using Ollama and Qwen2.5 0.5B

### AI Development Tooling

- GitHub Copilot
- GitHub Copilot Automations
- RAG concepts

Do not create these subsections if they would make the page unnecessarily verbose. A simple bullet list is acceptable.

---

# 8. Current GPT Project Wording

The GPT implementation is still in progress.

Use wording such as:

> Currently developing a small GPT-style language model with PyTorch to understand the core components of language model training and text generation.

Do not describe it as:

- Completed GPT implementation
- Production GPT
- ChatGPT clone
- GPT replacement
- Fully trained LLM
- Large-scale language model

unless the project later reaches that state.

---

# 9. Transformer Project Wording

The candidate implemented a simple Transformer as a learning exercise.

Use wording such as:

> Implemented a simplified Transformer architecture in Python to understand its internal data flow and core components.

It is acceptable to mention:

- embeddings
- positional information
- queries, keys, and values
- attention
- multi-head attention
- feed-forward layers
- residual connections
- normalization

only where consistent with the actual implementation in the repository.

Do not claim reproduction of the full original Transformer paper unless the code clearly supports that claim.

---

# 10. Ollama / Qwen Experiment

The candidate used:

`ollama run qwen2.5:0.5b`

This should be described as local pretrained-model experimentation.

Preferred wording:

> Experimented with running the pretrained Qwen2.5 0.5B model locally through Ollama to understand local LLM inference and model execution.

Do not imply:

- model training
- fine-tuning
- model development
- model optimization
- production deployment

The model was pretrained and used for inference.

---

# 11. RAG Wording

Current RAG experience is primarily conceptual learning and research.

Use:

> Studying Retrieval-Augmented Generation (RAG) concepts and architectures.

Do not write:

> Built RAG systems

or:

> Developed production RAG pipelines

unless such implementation exists in the repository.

---

# 12. GitHub Copilot Automations Wording

The candidate has been researching tools such as GitHub Copilot Automations.

Preferred wording:

> Researching AI-assisted development and software automation workflows using GitHub Copilot and GitHub Copilot Automations.

Do not describe this as production automation experience unless there is already a working implementation.

---

# 13. Professional Summary

Do not substantially rewrite the current summary unless necessary.

If the summary is updated, AI should only appear as a secondary interest.

Preferred structure:

> Software Engineer with nearly five years of professional experience designing, developing, and maintaining enterprise applications using Java, Spring Boot, Angular, and PostgreSQL. Experienced in microservices development, testing, production troubleshooting, application monitoring, and deployment workflows. Currently expanding technical knowledge through independent study and hands-on experimentation with machine learning, LLMs, and Transformer architectures.

Avoid turning the summary into an AI-focused profile.

---

# 14. Accessibility and UI Constraints

When adding the new sections:

- Follow existing responsive behavior.
- Preserve semantic heading hierarchy.
- Maintain keyboard accessibility.
- Preserve existing color contrast standards.
- Reuse existing components where possible.
- Avoid introducing unnecessary UI libraries.
- Avoid excessive animations.
- Keep the page lightweight.
- Ensure content remains readable on mobile devices.

---

# 15. Repository Implementation Instructions

Before making changes:

1. Inspect the existing repository.
2. Identify the framework and project structure.
3. Determine whether resume data is:
   - hardcoded in components,
   - stored in JSON/TypeScript objects,
   - loaded from Markdown,
   - or managed through another data layer.
4. Reuse the existing content architecture.
5. Avoid duplicating resume content across multiple components if a centralized data source already exists.
6. Follow existing naming, formatting, and styling conventions.

Do not refactor unrelated code.

---

# 16. Validation

After implementation:

Run all available project checks, including where applicable:

- build
- lint
- unit tests
- formatting checks

Also verify manually or through available tooling:

- all sections render correctly,
- no duplicate experience bullets exist,
- responsive layout is preserved,
- links still work,
- resume PDF links still work,
- no console errors are introduced,
- no deployment configuration is broken.

---

# 17. Content Accuracy Rules

Do not invent:

- metrics
- percentages
- number of users
- number of services
- number of incidents
- performance improvements
- cost savings
- test coverage percentages
- production AI experience
- leadership responsibilities
- architectural ownership beyond what is explicitly stated

If information is unclear, preserve conservative wording rather than inferring broader responsibilities.

---

# 18. Acceptance Criteria

The change is complete when:

- A Professional Skills section exists.
- It includes:
  - Analytical Problem-Solving
  - Continuous Learning & Technical Curiosity
  - Adaptability
  - Cross-Functional Collaboration
- Banregio experience reflects production issue reproduction in QA and troubleshooting across banking products/services.
- A separate AI & Machine Learning learning section exists.
- The Transformer implementation is presented as a learning project.
- The small GPT project is clearly described as currently in development.
- Ollama/Qwen usage is described as pretrained-model inference experimentation.
- RAG is presented as a concept currently being studied.
- AI learning is clearly differentiated from professional AI experience.
- Existing software engineering experience remains the primary focus.
- Existing layout, functionality, responsiveness, and deployment behavior remain intact.
- Available build and test checks pass or failures are documented.

---

# 19. Final Codex Output

After implementation, provide a summary containing:

1. Files modified.
2. New sections/components created.
3. Existing sections modified.
4. Content changes made.
5. Styling changes made.
6. Build/lint/test commands executed.
7. Results of each validation command.
8. Any assumptions made.
9. Any remaining manual review items.

Do not make unrelated repository changes.