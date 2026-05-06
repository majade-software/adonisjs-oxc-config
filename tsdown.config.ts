import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/oxlint.ts', './src/oxfmt.ts'],
  dts: true,
  clean: true,
  unbundle: true,
  hash: false,
  format: ['esm'],
  deps: {
    neverBundle: ['oxfmt', 'oxlint'],
  },
  target: false,
})
