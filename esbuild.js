const { build } = require('esbuild');
const flow = require('esbuild-plugin-flow');
const babel = require('@babel/core');
const fs = require('fs');

build({
  entryPoints: ['src/index.tsx'],
  outdir: 'build',
  bundle: true,
  minify: true,
  sourcemap: true,
  target:['esnext'],
  format: 'cjs',
}).catch(() => process.exit(1));
