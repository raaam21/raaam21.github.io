
export const profile = {
  name: 'Bramharishi Shukla',
  tagline: 'Software Development Engineer · Python / Django / PostgreSQL / GCP',
  about:
    'Backend engineer at AdNabu since Sep 2024. I build and fix Shopify apps used by thousands of merchants: finding root causes of production bugs, making slow queries fast, and running releases and on-call. 250 PRs merged, 795 reviewed.',
  email: 'bramharishi21@gmail.com',
  resume: 'resume.pdf',
  github: ['bramharishi', 'raaam21'],
  links: [
    { label: 'github', url: 'https://github.com/raaam21' },
    { label: 'linkedin', url: 'https://www.linkedin.com/in/bramharishi-shukla-72528b1b3/' },
    { label: 'leetcode', url: 'https://leetcode.com/codeforfun21/' },
  ],
}

export const impact = [
  { n: 98, after: '%', label: 'fewer webhook DB requests (61k → 1.5k/hr)' },
  { before: '2.3m → ', n: 15, after: 's', label: 'product sync pipeline runtime' },
  { n: 68, after: 'K+', label: 'redirects per shop: dashboard went from 60s+ timeouts to loading instantly' },
  { before: '2,157 → ', n: 0, label: 'quarterly Sentry errors from two recurring bugs' },
  { n: 98, after: ' → 11', label: 'GCP secrets bundled, under Cloud Build’s 100 limit' },
  { n: 795, label: 'PR reviews for ~17 teammates' },
]

export const experience = [
  {
    role: 'Software Development Engineer',
    company: 'AdNabu',
    dates: 'Sep 2024 – Present',
    points: [
      'Found why new installs showed no products for **~1 hour**: Shopify’s new install flow set a “sync in progress” cache flag before the subscription existed, blocking the first sync until it expired. Proved it from a 58-minute gap matching the 3600 s timeout.',
      'Rebuilt Redirect Manager analytics for shops with 68K+ redirects: query only the ~5K paths that actually got 404s instead of excluding 68K, cache and parallelize. Dashboards went from **60 s+ timeouts to loading instantly**, and historical 404 counts are correct again.',
      'Cached a webhook flag that was 10.3% of all DB time: **~61k → 1.5k DB requests an hour (−98%)**.',
      'Took two recurring Sentry errors (duplicate-key race, OAuth invalid_grant; **2,157 events in Q1 2026**) to **zero**. Added retry with backoff for Google Merchant API 500s (8.5K events).',
      'Fixed a race that created duplicate settings rows and locked merchants out (123 failures in 90 days), with a DB unique constraint so it can’t recur. Stopped false “disconnected” states for Facebook and Google Merchant Center users.',
      'Optimized product sync pipelines with bulk DB operations and batching: runtime **2.3 min → 15–30 s**, and 300K+ DB operations removed. Removed N+1 queries on a 300M-row table and fixed Celery out-of-memory kills with chunked processing.',
      'Benchmarked a proposed query split on 2M dummy products and in production: it was **3× slower**, so it was dropped before shipping.',
      'Features: 4 new Facebook Pixel events, Advanced Matching and a 3-step onboarding; instant Facebook catalog sync over Pub/Sub; barcode/GTIN as product ID across 6 marketplaces; AI regex redirect rules from plain English, guarded against prompt injection.',
      // 'Built an in-house LLM localization platform (Django, DRF, Celery, GPT-4o, GCS CDN) that replaced Localazy, **saving ~₹6L a year**. It translates only new or changed keys, keeps placeholders intact, and publishes via GitHub Actions.',
      'Platform: bundled **98 GCP secrets into 11** to stay under Cloud Build’s 100 limit; moved new tables to 64-bit IDs ahead of the 2.1B limit; self-hosted SonarQube; set up Claude Code PR review across 3 repos; ~30 dependency and CVE upgrades.',
      'Primary release manager **7 times**, ~57 emergency releases and ~10 on-call shifts. Introduced release rules the team still uses: no emergency releases after 6 PM, DB-change disclosure before release, and alert runbooks.',
    ],
    tags: ['Django', 'Python', 'React', 'Celery', 'PostgreSQL', 'Redis', 'RabbitMQ', 'InfluxDB', 'Pub/Sub', 'Docker', 'GCP', 'Sentry', 'pytest'],
  },
  {
    role: 'Software Developer Intern',
    company: 'Cognitree',
    dates: 'May 2024 – Jul 2024',
    points: [
      'Built a modular, stateless Python framework for file processing and custom report generation (argparse, tqdm).',
      'Developed a Flask + SQLAlchemy contacts microservice with REST APIs for sorting, filtering and pagination.',
      'Deployed with Gunicorn on Linux.',
    ],
    tags: ['Flask', 'SQLite', 'REST', 'Python', 'Linux'],
    link: { label: 'certificate', url: 'https://drive.google.com/file/d/168-taZ2qlilL-zXpKG9AnXlcUTIUQKg7/view?usp=sharing' },
  },
]

export const projects = [
  {
    name: 'LocaSync',
    url: 'https://github.com/raaam21/LocaSync',
    summary: 'Upload en.json and get <locale>.json back. Only the keys that changed are sent to the LLM.',
    points: [
      'Background jobs in RQ workers, with a Redis lock per project (SET NX + compare-and-delete Lua) so syncs never overlap.',
      "Diff-based sync: new keys are inserted, changed keys re-translated, removed keys deactivated. Upserts happen per batch, so one failure doesn't roll everything back.",
      'Locale export with ETag/304, an htmx dashboard, and a GitHub Action that syncs when en.json changes.',
      'A personal rebuild of the translation tool I built at work, fixing its design flaws. Tested with pytest and a fake LLM provider.',
    ],
    tags: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'RQ', 'Redis', 'OpenAI', 'htmx', 'Docker'],
  },
]

export const skills = [
  { group: 'languages', items: ['Python', 'JavaScript', 'C++'] },
  { group: 'frameworks', items: ['Django', 'FastAPI', 'Flask', 'Node.js', 'Express.js', 'React.js'] },
  { group: 'data & queues', items: ['PostgreSQL', 'InfluxDB', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Celery', 'RabbitMQ'] },
  { group: 'cloud & tools', items: ['GCP', 'Cloud Run', 'Cloud Build', 'Pub/Sub', 'Docker', 'GitHub Actions', 'Sentry', 'SonarQube', 'Sliplane', 'Git'] },
  { group: 'ai', items: ['LLM API integrations', 'prompt engineering', 'RAG', 'AI agents', 'tool calling', 'Ollama', 'Claude Code'] },
]

// Simple Icons slugs; "/hex" recolors logos too dark for the dark theme.
export const logos = {
  Python: 'python', JavaScript: 'javascript', 'C++': 'cplusplus',
  Django: 'django/44B78B', FastAPI: 'fastapi', Flask: 'flask/8b949e', 'Node.js': 'nodedotjs', 'Express.js': 'express/8b949e', 'React.js': 'react',
  PostgreSQL: 'postgresql', InfluxDB: 'influxdb', MySQL: 'mysql', MongoDB: 'mongodb', SQLite: 'sqlite/4b9cd3', Redis: 'redis', Celery: 'celery', RabbitMQ: 'rabbitmq',
  GCP: 'googlecloud', 'Pub/Sub': 'googlepubsub', Docker: 'docker', 'GitHub Actions': 'githubactions', Sentry: 'sentry/9e86ff', SonarQube: 'sonarqubeserver', Git: 'git',
  Ollama: 'ollama/8b949e', 'Claude Code': 'claude',
}

export const achievements = [
  'LeetCode **1677** rating · 3-star · top 14.37%',
  '**1000+** problems solved across LeetCode, HackerRank, CodeChef and GFG',
  'Open-source contributor · Hacktoberfest',
]

export const education = [
  {
    degree: 'B.Tech, Computer Science & Engineering',
    school: 'Pranveer Singh Institute of Technology',
    dates: '2020 – 2024',
    score: '7.5 CGPA',
    coursework: 'DSA, DBMS, Distributed Systems, Computer Networks, OOP, System Design',
  },
]
