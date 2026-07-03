import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function main() {
  console.log('Fetching projects from Sanity...');
  const projects = await client.fetch(`*[_type == "project"]{_id, slug, name}`);
  console.log(`Found ${projects.length} projects in Sanity:`);
  projects.forEach(p => console.log(`- ${p.name} (Slug: ${p.slug?.current})`));

  const diagramsDir = path.join(__dirname, 'diagrams');
  const files = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    console.log(`\nProcessing ${file}...`);
    // Extract base name, e.g. "Jal-Sanket-Kendra" from "Jal-Sanket-Kendra_diagrams.md"
    let baseName = file.replace('_diagrams.md', '');
    
    // Find matching project
    // Try matching by slug or name (case insensitive)
    let project = projects.find(p => 
      p.slug?.current.toLowerCase() === baseName.toLowerCase() ||
      p.name.toLowerCase() === baseName.toLowerCase()
    );

    // Hardcode matching for Portfolio if it's named differently
    if (baseName.toLowerCase() === 'portfolio') {
        project = projects.find(p => p.name.toLowerCase().includes('portfolio'));
    }

    if (!project) {
        // loose match
        project = projects.find(p => p.slug?.current.toLowerCase().replace(/-/g, '') === baseName.toLowerCase().replace(/-/g, '') || p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === baseName.toLowerCase().replace(/[^a-z0-9]/g, ''));
    }
    
    if (!project && baseName.toLowerCase() === 'storeops') {
        project = projects.find(p => p.slug?.current === 'off-duty');
    }

    if (!project) {
      console.log(`  -> Warning: No matching project found for ${baseName}`);
      continue;
    }

    console.log(`  -> Matched project: ${project.name} (${project._id})`);

    const content = fs.readFileSync(path.join(diagramsDir, file), 'utf-8');
    const matches = [...content.matchAll(/```json\n([\s\S]*?)\n```/g)];
    
    if (matches.length === 0) {
      console.log(`  -> Error: No JSON block found in ${file}`);
      continue;
    }

    try {
      let combinedData = [];
      for (const match of matches) {
        const parsedData = JSON.parse(match[1]);
        if (Array.isArray(parsedData)) {
          combinedData = combinedData.concat(parsedData);
        } else {
          combinedData.push(parsedData);
        }
      }
      
      // We expect an array of workflows.
      // Generate keys for the Sanity array.
      const workflows = combinedData.map((item, index) => ({
        _key: item.id || `view-${index}`,
        id: item.id,
        icon: item.icon,
        label: item.label,
        desc: item.desc,
        flow: {
          nodes: item.flow.nodes.map((n, i) => ({
            ...n,
            _key: n.id || `node-${i}`,
            metadata: n.metadata ? {
              ...n.metadata,
              entries: n.metadata.entries ? n.metadata.entries.map((e, j) => ({
                ...e,
                _key: `entry-${j}`
              })) : undefined
            } : undefined
          })),
          edges: item.flow.edges.map((e, i) => ({
            ...e,
            _key: e.id || `edge-${i}`
          }))
        }
      }));

      // Update Sanity document
      console.log(`  -> Patching document ${project._id} with ${workflows.length} workflows...`);
      await client.patch(project._id)
        .unset(['workflows'])
        .set({ 'caseStudy.workflows': workflows })
        .commit();
      console.log(`  -> Successfully updated ${project.name}`);

    } catch (err) {
      console.log(`  -> Error parsing or uploading JSON: ${err.message}`);
      console.error(err);
    }
  }
}

main().catch(console.error);
