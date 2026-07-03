const fs = require('fs');
const path = require('path');

const dir = 'D:/Code/Portfolio/Portfolio/diagrams';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const groupMapping = {
  'presentation-layer': 'frontend',
  'extension-layer': 'frontend',
  'api-layer': 'backend-services',
  'application-layer': 'backend-services',
  'backend': 'backend-services',
  'backend-layer': 'backend-services',
  'host-layer': 'backend-services',
  'container-layer': 'backend-services',
  'hosting-layer': 'backend-services',
  'cloud-run': 'backend-services',
  'edge-functions': 'backend-services',
  'agent-layer': 'ai-agents',
  'ai-layer': 'ai-agents',
  'tool-layer': 'mcp-servers',
  'data-layer': 'data-layer',
  'storage-layer': 'data-layer',
  'external-services': 'external-api',
  'frontend-security': 'frontend',
  'backend-security': 'backend-services'
};

const defaultStatusMapping = {
  'service': 'success',
  'database': 'success',
  'http-client': 'success',
  'ai': 'running',
  'gateway': 'success',
  'agent': 'running',
  'client': 'success',
  'auth': 'success',
  'queue': 'running',
  'storage': 'success'
};

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // We need to replace all JSON blocks.
  content = content.replace(/```json\n([\s\S]*?)\n```/g, (match, jsonString) => {
    try {
      let data = JSON.parse(jsonString);
      let isArray = true;
      if (!Array.isArray(data)) {
        data = [data];
        isArray = false;
      }

      data.forEach(view => {
        if (view.flow && view.flow.nodes) {
          view.flow.nodes.forEach(node => {
            // Update groupId
            if (node.groupId && groupMapping[node.groupId]) {
              node.groupId = groupMapping[node.groupId];
              updated = true;
            }
            // If the groupId isn't mapped but exists, we might want to default it
            // if we are strict. But let's only map known ones.

            // Set status if missing
            if (!node.status) {
              node.status = defaultStatusMapping[node.type] || 'success';
              updated = true;
            }
          });
        }
      });

      const updatedJsonString = JSON.stringify(isArray ? data : data[0], null, 2);
      return '```json\n' + updatedJsonString + '\n```';
    } catch (e) {
      console.error(`Error parsing JSON in ${file}`, e);
      return match;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log("All diagram files processed and standardized for WorkflowGraph features.");
