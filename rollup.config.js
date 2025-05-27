/* eslint-disable import/no-extraneous-dependencies */
import typescript from 'rollup-plugin-typescript2';
// @rollup/plugin-typescript 只能配置 outDir, 无法配置 filename
import postcss from 'rollup-plugin-postcss';
import nodesass from 'postcss-node-sass';
import presetEnv from 'postcss-preset-env';
import vue from "rollup-plugin-vue"; 
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.ts', '.tsx'];

export default {
    input: 'lib/index.ts',
    output: [{
        dir: 'build',
        format: 'cjs',

        // 源码调试
        sourcemap: true,
        exports: 'named',
        indent: '    ',
        preserveModules: true
    }],
    plugins: [
        external({
            includeDependencies: true,
        }),
        resolve({
            browser: true,
            extensions,
        }),
        commonjs({
            include: ['node_modules/**'],
            extensions,
        }),
        typescript({
            tsconfig: 'tsconfig.json',
        }),
        babel({
            exclude: ['node_modules/**', '../../node_modules/**'],
            babelHelpers: 'runtime',
            extensions,
            presets: ["@vue/babel-preset-jsx"]
        }),
        vue({
          css: true, 
          compileTemplate: true 
        }),
        postcss({
            modules: true,
            plugins: [
                nodesass(),
                presetEnv({
                    browsers: 'chrome >= 29, ie >= 9',
                    autoprefixer: true,
                    stage: 3,
                }),
            ],
        }),
    ],
};
