import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: './src/index.jsx',
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
  },
  external: ['h3', 'nanoid', 'valibot'],
  plugins: [
    nodeResolve({ extensions: ['.jsx', '.js'] }),
    babel({
      babelHelpers: 'inline',
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            pragma: '_h.create',
          },
        ],
      ],
    }),
  ],
}
