import simpleIconsList from './simpleIconsList.json';

/**
 * Technology Icon Detection System
 * Given a node label or text, it scans left-to-right to identify the first technology.
 * Ignores generic words and resolves common aliases.
 */

// Sort icons by length descending so longer phrases (e.g. "Google Cloud") match before shorter ("Google")
const sortedIcons = [...simpleIconsList].sort((a, b) => b.title.length - a.title.length);

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Pre-compile a highly optimized regex containing all 3400+ icons
const allTitlesPattern = sortedIcons.map(icon => escapeRegExp(icon.title)).join('|');
// Using the same word boundaries as before
const globalIconRegex = new RegExp(`(?:^|[^\\w#+.])(${allTitlesPattern})(?:[^\\w#+.]|$)`, 'i');

// Create a fast lookup map for O(1) resolution
const iconLookup = {};
for (const icon of sortedIcons) {
  iconLookup[icon.title.toLowerCase()] = icon;
}

const GENERIC_WORDS = new Set([
  'service', 'api', 'backend', 'frontend', 'database', 'server', 'worker', 
  'queue', 'cache', 'client', 'storage', 'application', 'system', 'layer', 
  'module', 'gateway', 'function', 'bus', 'event', 'cluster', 'container', 
  'processing', 'internal', 'external', 'ui', 'ux', 'app', 'web', 'mobile',
  'node', 'hub', 'manager', 'proxy', 'loadbalancer', 'network'
]);

// Custom dictionary handles specific aliases and edge cases that the raw library titles miss
// E.g. "JS" -> JavaScript, "K8s" -> Kubernetes
const TECHNOLOGY_DICTIONARY = [
  // Cloud & Managed Services (Specific over generic)
  { match: ['aws lambda', 'lambda'], name: 'AWS Lambda', lib: 'simple-icons', icon: 'awslambda' },
  { match: ['google cloud run', 'cloud run'], name: 'Google Cloud Run', lib: 'simple-icons', icon: 'googlecloud' },
  { match: ['azure cosmos db', 'cosmos db', 'cosmos'], name: 'Azure Cosmos DB', lib: 'simple-icons', icon: 'microsoftazure' },
  { match: ['google kubernetes engine', 'gke'], name: 'Google Kubernetes Engine', lib: 'simple-icons', icon: 'googlecloud' },
  { match: ['amazon eks', 'eks'], name: 'Amazon EKS', lib: 'simple-icons', icon: 'amazonaws' },
  { match: ['azure kubernetes service', 'aks'], name: 'Azure Kubernetes Service', lib: 'simple-icons', icon: 'microsoftazure' },
  { match: ['aws', 'amazon web services'], name: 'AWS', lib: 'simple-icons', icon: 'amazonaws' },
  { match: ['gcp', 'google cloud'], name: 'Google Cloud', lib: 'simple-icons', icon: 'googlecloud' },
  { match: ['azure', 'microsoft azure'], name: 'Microsoft Azure', lib: 'simple-icons', icon: 'microsoftazure' },
  
  // Languages & Platforms
  { match: ['javascript', 'js'], name: 'JavaScript', lib: 'simple-icons', icon: 'javascript' },
  { match: ['typescript', 'ts'], name: 'TypeScript', lib: 'simple-icons', icon: 'typescript' },
  { match: ['python', 'py'], name: 'Python', lib: 'simple-icons', icon: 'python' },
  { match: ['golang', 'go'], name: 'Go', lib: 'simple-icons', icon: 'go' },
  { match: ['rust'], name: 'Rust', lib: 'simple-icons', icon: 'rust' },
  { match: ['java'], name: 'Java', lib: 'simple-icons', icon: 'java' },
  { match: ['c#', 'csharp'], name: 'C#', lib: 'simple-icons', icon: 'csharp' },
  { match: ['ruby'], name: 'Ruby', lib: 'simple-icons', icon: 'ruby' },
  { match: ['php'], name: 'PHP', lib: 'simple-icons', icon: 'php' },
  { match: ['c++', 'cpp'], name: 'C++', lib: 'simple-icons', icon: 'cplusplus' },
  { match: ['node.js', 'node js', 'nodejs', 'node'], name: 'Node.js', lib: 'simple-icons', icon: 'nodedotjs' },
  { match: ['deno'], name: 'Deno', lib: 'simple-icons', icon: 'deno' },
  { match: ['bun'], name: 'Bun', lib: 'simple-icons', icon: 'bun' },

  // Frameworks & Libraries
  { match: ['react', 'react.js', 'reactjs'], name: 'React', lib: 'simple-icons', icon: 'react' },
  { match: ['next.js', 'nextjs', 'next'], name: 'Next.js', lib: 'simple-icons', icon: 'nextdotjs' },
  { match: ['vue', 'vue.js', 'vuejs'], name: 'Vue.js', lib: 'simple-icons', icon: 'vuedotjs' },
  { match: ['nuxt'], name: 'Nuxt', lib: 'simple-icons', icon: 'nuxtdotjs' },
  { match: ['angular'], name: 'Angular', lib: 'simple-icons', icon: 'angular' },
  { match: ['svelte'], name: 'Svelte', lib: 'simple-icons', icon: 'svelte' },
  { match: ['django'], name: 'Django', lib: 'simple-icons', icon: 'django' },
  { match: ['flask'], name: 'Flask', lib: 'simple-icons', icon: 'flask' },
  { match: ['fastapi'], name: 'FastAPI', lib: 'simple-icons', icon: 'fastapi' },
  { match: ['spring boot', 'spring'], name: 'Spring Boot', lib: 'simple-icons', icon: 'springboot' },
  { match: ['laravel'], name: 'Laravel', lib: 'simple-icons', icon: 'laravel' },
  { match: ['express', 'express.js'], name: 'Express', lib: 'simple-icons', icon: 'express' },
  { match: ['tailwind', 'tailwindcss'], name: 'Tailwind CSS', lib: 'simple-icons', icon: 'tailwindcss' },
  { match: ['framer motion', 'framer'], name: 'Framer', lib: 'simple-icons', icon: 'framer' },

  // Databases & Storage
  { match: ['postgresql', 'postgres', 'pg'], name: 'PostgreSQL', lib: 'simple-icons', icon: 'postgresql' },
  { match: ['mysql'], name: 'MySQL', lib: 'simple-icons', icon: 'mysql' },
  { match: ['mongodb', 'mongo'], name: 'MongoDB', lib: 'simple-icons', icon: 'mongodb' },
  { match: ['redis'], name: 'Redis', lib: 'simple-icons', icon: 'redis' },
  { match: ['sqlite'], name: 'SQLite', lib: 'simple-icons', icon: 'sqlite' },
  { match: ['elasticsearch', 'elastic'], name: 'Elasticsearch', lib: 'simple-icons', icon: 'elasticsearch' },
  { match: ['cassandra'], name: 'Apache Cassandra', lib: 'simple-icons', icon: 'apachecassandra' },
  { match: ['supabase'], name: 'Supabase', lib: 'simple-icons', icon: 'supabase' },
  { match: ['firebase'], name: 'Firebase', lib: 'simple-icons', icon: 'firebase' },
  { match: ['prisma'], name: 'Prisma', lib: 'simple-icons', icon: 'prisma' },
  { match: ['pinecone'], name: 'Pinecone', lib: 'simple-icons', icon: 'pinecone' },
  { match: ['milvus'], name: 'Milvus', lib: 'simple-icons', icon: 'milvus' },

  // Messaging, Queues & Event Buses
  { match: ['kafka', 'apache kafka'], name: 'Apache Kafka', lib: 'simple-icons', icon: 'apachekafka' },
  { match: ['rabbitmq', 'rabbit'], name: 'RabbitMQ', lib: 'simple-icons', icon: 'rabbitmq' },
  { match: ['celery'], name: 'Celery', lib: 'simple-icons', icon: 'celery' },
  { match: ['bullmq', 'bull'], name: 'BullMQ', lib: 'simple-icons', icon: 'bullmq' }, 

  // Infrastructure, Containers & DevOps
  { match: ['kubernetes', 'k8s'], name: 'Kubernetes', lib: 'simple-icons', icon: 'kubernetes' },
  { match: ['docker'], name: 'Docker', lib: 'simple-icons', icon: 'docker' },
  { match: ['terraform'], name: 'Terraform', lib: 'simple-icons', icon: 'terraform' },
  { match: ['github actions'], name: 'GitHub Actions', lib: 'simple-icons', icon: 'githubactions' },
  { match: ['gitlab ci'], name: 'GitLab', lib: 'simple-icons', icon: 'gitlab' },
  { match: ['vercel'], name: 'Vercel', lib: 'simple-icons', icon: 'vercel' },
  { match: ['nginx'], name: 'NGINX', lib: 'simple-icons', icon: 'nginx' },

  // Tools & Others
  { match: ['graphql'], name: 'GraphQL', lib: 'simple-icons', icon: 'graphql' },
  { match: ['apollo'], name: 'Apollo GraphQL', lib: 'simple-icons', icon: 'apollographql' },
  { match: ['vite'], name: 'Vite', lib: 'simple-icons', icon: 'vite' },
  { match: ['webpack'], name: 'Webpack', lib: 'simple-icons', icon: 'webpack' },
  { match: ['sanity', 'sanity.io'], name: 'Sanity', lib: 'simple-icons', icon: 'sanity' },
  
  // AI & LLMs
  { match: ['openai'], name: 'OpenAI', lib: 'simple-icons', icon: 'openai' },
  { match: ['anthropic', 'claude'], name: 'Anthropic', lib: 'simple-icons', icon: 'anthropic' },
  { match: ['gemini', 'google gemini'], name: 'Google Gemini', lib: 'simple-icons', icon: 'googlegemini' },
  { match: ['huggingface', 'hugging face'], name: 'Hugging Face', lib: 'simple-icons', icon: 'huggingface' },
  { match: ['langchain'], name: 'LangChain', lib: 'simple-icons', icon: 'langchain' },
];

/**
 * Normalizes text to handle punctuation and extra spaces.
 */
const normalizeText = (text) => text.toLowerCase().replace(/[^\w\s.#+]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Detects the first technology in the given text.
 * @param {string} text - The input node text.
 * @returns {Object} JSON payload as requested.
 */
export const detectTechnology = (text) => {
  if (!text || typeof text !== 'string') {
    return {
      technology: null,
      normalizedName: null,
      iconLibrary: "lucide",
      iconName: "box",
      confidence: 0.0
    };
  }

  let bestMatch = null;
  let matchIndex = Infinity;

  for (const tech of TECHNOLOGY_DICTIONARY) {
    for (const alias of tech.match) {
      // Escape alias for regex
      const escapedAlias = escapeRegExp(alias);
      
      // Use capturing group for the exact match, ignoring case.
      // Boundaries: Start of string/non-word char, and End of string/non-word char.
      // We include #, +, and . as part of our 'word' characters since C++, C#, Node.js use them.
      const regex = new RegExp(`(?:^|[^\\w#+.])(${escapedAlias})(?:[^\\w#+.]|$)`, 'i');
      const match = text.match(regex);
      
      if (match) {
        if (match.index < matchIndex) {
          matchIndex = match.index;
          // match[1] contains the exactly cased substring from the original text!
          bestMatch = {
            technology: match[1],
            normalizedName: tech.name,
            iconLibrary: tech.lib,
            iconName: tech.icon,
            confidence: 0.99
          };
        }
      }
    }
  }

  if (bestMatch) {
    return bestMatch;
  }

  // FALLBACK: Query the massive pre-compiled simple-icons regex!
  const globalMatch = text.match(globalIconRegex);
  if (globalMatch) {
    const matchedString = globalMatch[1];
    const iconData = iconLookup[matchedString.toLowerCase()];
    if (iconData) {
      return {
        technology: matchedString,
        normalizedName: iconData.title,
        iconLibrary: 'simple-icons',
        iconName: iconData.slug,
        confidence: 0.90
      };
    }
  }

  // If no specific tech was matched, return the fallback
  return {
    technology: null,
    normalizedName: null,
    iconLibrary: "lucide",
    iconName: "box",
    confidence: 0.15
  };
};

export default detectTechnology;
