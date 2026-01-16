import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

// Import all schemas
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
    name: 'web-creativa-tesis',
    title: 'Web Creativa Tesis',

    projectId: '6fouyy0h',
    dataset: 'production',

    basePath: '/studio',

    plugins: [
        structureTool(),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
});
