const { build } = require('esbuild');
const flow = require('esbuild-plugin-flow');
const babel = require('@babel/core');
const fs = require('fs');

build({
  entryPoints: ['src/index.tsx'],
  outfile: 'build/index.js',
  bundle: true,
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
  },
  plugins: [

  ],
}).catch(() => process.exit(1));
