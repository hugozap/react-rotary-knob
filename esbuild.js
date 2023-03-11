const { build } = require('esbuild');
const flow = require('esbuild-plugin-flow');

build({
  entryPoints: ['src/index.js'],
  outfile: 'build/index.js',
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
  },
  plugins: [flow(/\.(js|jsx)$/)],
}).catch(() => process.exit(1));
