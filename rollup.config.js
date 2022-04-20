import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import html from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import { terser } from 'rollup-plugin-terser';
import { generateSW } from 'rollup-plugin-workbox';
import path from 'path';
import copy from 'rollup-plugin-copy';

export default {
  input: 'index.html',
  output: [
    {
      format: 'es',
      dir: 'dist',
    },
  ],
  preserveEntrySignatures: false,
  plugins: [
    html({
      minify: true,
      injectServiceWorker: process.env.VERCEL_ENV !== 'development',
      serviceWorkerPath: 'dist/sw.js',
    }),
    copy({
      targets: [
        {
          src: 'node_modules/@lrnwebcomponents/rpg-character/lib',
          dest: 'dist',
        },
        {
          src: 'node_modules/@lrnwebcomponents/simple-icon/lib/svgs',
          dest: 'dist',
        },
        {
          src: 'node_modules/@lrnwebcomponents/hax-iconset/lib/svgs',
          dest: 'dist',
        },
      ],
    }),
    nodeResolve(),
    commonjs({
      namedExports: {
        'sjcl': ['isValidElementType'],
      },
      include: [
        /node_modules\/sjcl/
      ],
    }),
    terser(),
    importMetaAssets(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: [
              'last 3 Chrome major versions',
              'last 3 Firefox major versions',
              'last 3 Edge major versions',
              'last 3 Safari major versions',
            ],
            modules: false,
            bugfixes: true,
          },
        ],
      ],
      plugins: [
        [
          require.resolve('babel-plugin-template-html-minifier'),
          {
            modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
            failOnError: false,
            strictCSS: true,
            htmlMinifier: {
              collapseWhitespace: true,
              conservativeCollapse: true,
              removeComments: true,
              caseSensitive: true,
              minifyCSS: true,
            },
          },
        ],
      ],
    }),
    generateSW({
      navigateFallback: '/index.html',
      // where to output the generated sw
      swDest: path.join('dist', 'sw.js'),
      // directory to match patterns against to be precached
      globDirectory: path.join('dist'),
      // cache any html js and css by default
      globPatterns: ['**/*.{html,js,css,webmanifest}'],
      skipWaiting: true,
      clientsClaim: true,
    }),
  ],
};
