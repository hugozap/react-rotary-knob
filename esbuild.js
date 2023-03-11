const { build } = require('esbuild');
const flow = require('esbuild-plugin-flow');
const babel = require('@babel/core');
const fs = require('fs');

build({
  entryPoints: ['src/entry.js'],
  outfile: 'build/index.js',
  bundle: true,
  loader: {
    '.js': 'jsx',
    '.jsx': 'jsx',
  },
  plugins: [
    {
      name: 'flow',
      setup(build) {
        build.onLoad({ filter: /\.js$/ }, async (args) => {
          const content = await fs.promises.readFile(args.path, 'utf8');
          const { code } = babel.transformSync(content, {
            presets: ['@babel/preset-flow'],
          });
          return { contents: code };
        });
      },
    },
  ],
}).catch(() => process.exit(1));
