import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { minify } from 'rollup-plugin-esbuild'
import rollupPluginLicense from 'rollup-plugin-license';

const bannerLicense = `/*!
* @karasu-themes/blogger-utils v1.1.0
* https://github.com/Karasu-themes/bloggerSection
*
* Copyright © ${new Date().getFullYear()} MarceloTLD
* 
* Released under the MIT License
*-----------------------------------------------*/`;
export default {
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: 'bundled' }),
    minify(),
    rollupPluginLicense({ banner: bannerLicense })
  ],
  input: 'src/index.js',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    name: "bloggerUtils"
  }
};