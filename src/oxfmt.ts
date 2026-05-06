import { defineConfig } from 'oxfmt'

import { IGNORE_PATTERNS } from './shared.ts'

type OxfmtOptions = Partial<Parameters<typeof defineConfig>[0]>

export function configOxfmt(config: OxfmtOptions = {}): ReturnType<typeof defineConfig> {
  return defineConfig({
    trailingComma: 'es5',
    semi: false,
    singleQuote: true,
    useTabs: false,
    quoteProps: 'consistent',
    bracketSpacing: true,
    arrowParens: 'always',
    printWidth: 100,
    ignorePatterns: IGNORE_PATTERNS,
    ...config,
  })
}
