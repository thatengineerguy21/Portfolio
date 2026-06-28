const fs = require('fs');
let code = fs.readFileSync('src/data/projects.js', 'utf8');

code = code.replace(/slug: 'portfolio',/, "slug: 'portfolio',\n    workflows: ['rest', 'microservices', 'ai-agent', 'queue', 'auth'],");
code = code.replace(/slug: 'jal-sanket',/, "slug: 'jal-sanket',\n    workflows: ['rest'],");
code = code.replace(/slug: 'weather-intelligence',/, "slug: 'weather-intelligence',\n    workflows: ['ai-agent', 'rest'],");
code = code.replace(/slug: 'off-duty',/, "slug: 'off-duty',\n    workflows: ['microservices', 'queue', 'auth'],");

fs.writeFileSync('src/data/projects.js', code);
