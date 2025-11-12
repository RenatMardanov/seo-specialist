import { defineConfig } from 'orval';

export default defineConfig({
  main: {
    input: './src/api/schema.yaml',
    output: {
      schemas: './src/api/types/main/schemas',
      target: './src/api/types/main/index.ts',
      mode: 'single',
      client: 'react-query',
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: './src/api/api.instance.ts',
          name: 'createInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },

  zod: {
    input: {
      target: './src/api/schema.yaml',
    },
    output: {
      client: 'zod',
      mode: 'single',
      schemas: './src/api/types/zod/schemas',
      target: './src/api/types/zod/index.ts',
    },
  },
});
