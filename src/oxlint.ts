import { defineConfig } from 'oxlint'

import { IGNORE_PATTERNS } from './shared.ts'

type OxlintRules = NonNullable<
  NonNullable<Parameters<typeof defineConfig>[0]['overrides']>[number]['rules']
>
type OxlintPlugins = NonNullable<Parameters<typeof defineConfig>[0]['plugins']>
type OxlintJsPlugins = NonNullable<Parameters<typeof defineConfig>[0]['jsPlugins']>
type OxlintOverride = NonNullable<Parameters<typeof defineConfig>[0]['overrides']>[number]

/**
 * Default list of files to include
 */
export const INCLUDE_LIST = ['**/*.ts']

/**
 * List of files that must be ignored globally
 */
export const GLOBAL_IGNORE_LIST = [
  'eslint.config.js',
  'eslint.config.ts',
  '*.min.*',
  '*.d.ts',
  'CHANGELOG.md',
  'LICENSE*',
  'output/**',
  'coverage/**',
  'temp/**',
  '.yalc/**',
  'pnpm-lock.yaml',
  'yarn.lock',
  'package-lock.json',
  ...IGNORE_PATTERNS,
]

/**
 * Default set of files to ignore
 */
export const ADONIS_IGNORE_LIST = [
  'public/assets/**',
  '__snapshots__/**',
  'resources/**',
  '.adonisjs/**',
]

/**
 * Default set of plugins to apply to the config
 */
export const PLUGINS_LIST: OxlintPlugins = ['typescript', 'unicorn', 'oxc']

/**
 * List of JS plugins to load
 */
export const JS_PLUGINS_LIST: OxlintJsPlugins = ['@stylistic/eslint-plugin']

/**
 * Default list of rules to apply
 */
export const RULES_LIST: OxlintRules = {
  'curly': ['error', 'all'],
  'eqeqeq': ['error', 'always'],
  'handle-callback-err': ['error', '^(err|error)$'],
  'no-array-constructor': ['error'],
  'no-caller': ['error'],
  'no-cond-assign': ['error', 'except-parens'],
  'no-constant-condition': ['error'],
  'no-control-regex': ['error'],
  'no-debugger': ['error'],
  'no-duplicate-case': ['error'],
  'no-eval': ['error'],
  'no-ex-assign': ['error'],
  'no-extra-boolean-cast': ['error'],
  'no-fallthrough': ['error'],

  /**
   * Knex query builder return a promise but safe to ignore
   * as they are not executed until you call `.exec()` or similar method.
   * Thanks to @Julien-R44 : https://github.com/Julien-R44/tooling-configs/blob/main/src/oxc/lint.ts#L22
   */
  '@typescript-eslint/no-floating-promises': [
    'error',
    {
      allowForKnownSafePromises: [
        {
          from: 'package',
          package: '@adonisjs/lucid',
          name: [
            'ExcutableQueryBuilderContract',
            'ModelQueryBuilderContract',
            'DatabaseQueryBuilderContract',
            'InsertQueryBuilderContract',
            'RawQueryBuilderContract',
            'ChainableContract',
            'RelationQueryBuilderContract',
            'RelationSubQueryBuilderContract',
            'HasManyQueryBuilderContract',
            'HasManyThroughQueryBuilderContract',
            'ManyToManyQueryBuilderContract',
            'ManyToManySubQueryBuilderContract',
          ],
        },
      ],
    },
  ],
  'no-inner-declarations': ['error'],
  'no-invalid-regexp': ['error', { allowConstructorFlags: ['u', 'y'] }],
  'no-irregular-whitespace': ['error'],
  'no-new-wrappers': ['error'],
  'no-proto': ['error'],
  'no-regex-spaces': ['error'],
  'no-self-assign': ['error'],
  'no-self-compare': ['error'],
  'no-shadow': ['error'],
  'no-sparse-arrays': ['error'],
  'no-this-before-super': ['error'],
  'no-unreachable': ['error'],
  'no-unsafe-finally': ['error'],
  'no-unsafe-negation': ['error'],
  'no-with': ['error'],
  'use-isnan': ['error'],
  'valid-typeof': ['error', { requireStringLiterals: true }],

  '@stylistic/brace-style': ['error', '1tbs'],
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/eol-last': ['error', 'always'],
  '@stylistic/indent': 'off',
  '@stylistic/max-len': [
    'error',
    {
      code: 100,
      comments: 120,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
    },
  ],
  '@stylistic/new-parens': ['error', 'always'],
  '@stylistic/no-mixed-spaces-and-tabs': ['error'],
  '@stylistic/no-multi-spaces': ['error'],
  '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
  '@stylistic/no-trailing-spaces': ['error', { ignoreComments: true }],
  '@stylistic/padded-blocks': ['error', 'never'],
  '@stylistic/quotes': 'off',
  '@stylistic/rest-spread-spacing': ['error', 'never'],
  '@stylistic/space-before-function-paren': 'off',
  '@stylistic/space-in-parens': ['error', 'never'],

  'typescript/consistent-type-imports': [
    'error',
    {
      fixStyle: 'inline-type-imports',
      disallowTypeAnnotations: false,
    },
  ],
  'unicorn/no-useless-undefined': 'error',

  'unicorn/prefer-module': 'error',
  'unicorn/prefer-node-protocol': 'error',
  'unicorn/filename-case': ['error', { case: 'snakeCase' }],
  'unicorn/no-await-expression-member': 'error',
  'unicorn/no-instanceof-builtins': 'error',
  'unicorn/prefer-number-properties': 'error',
}

function getDefaultIgnoreList() {
  return [...GLOBAL_IGNORE_LIST, ...ADONIS_IGNORE_LIST]
}

/**
 * Configures Oxlint to use an opinionated config tailored for
 * creating a TypeScript library.
 *
 * You may pass additional config blocks as multiple
 * arguments to this function.
 *
 * @example
 * ```ts
 * configPkg()
 *
 * configPkg({
 *   files: INCLUDE_LIST,
 *   ignorePatterns: IGNORE_LIST,
 *   rules: {
 *   }
 * })
 * ```
 */
export function configPkg(
  ...configBlocksToMerge: OxlintOverride[]
): ReturnType<typeof defineConfig> {
  return defineConfig({
    ignorePatterns: getDefaultIgnoreList(),
    plugins: PLUGINS_LIST,
    jsPlugins: JS_PLUGINS_LIST,
    overrides: [{ files: INCLUDE_LIST, rules: RULES_LIST }, ...configBlocksToMerge],
  })
}

/**
 * Inertia-specific Oxlint config block
 */
const inertiaConfigBlock: {
  files: string[]
  rules: OxlintRules
} = {
  files: ['inertia/**/*.{ts,tsx}'],
  rules: {
    '@adonisjs/no-backend-import-in-frontend': ['error'],
    '@adonisjs/prefer-adonisjs-inertia-link': ['error'],
    '@adonisjs/prefer-adonisjs-inertia-form': ['error'],
  },
}

/**
 * Check if @adonisjs/inertia is installed
 */
function isInertiaInstalled() {
  try {
    import.meta.resolve('@adonisjs/inertia')
    return true
  } catch {
    return false
  }
}

/**
 * Configures Oxlint to use an opinionated config tailored for
 * an AdonisJS application
 *
 * You may pass additional config blocks as multiple
 * arguments to this function.
 *
 * @example
 * ```ts
 * configApp()
 *
 * configApp({
 *   files: INCLUDE_LIST,
 *   ignore: IGNORE_LIST,
 *   rules: {
 *   }
 * })
 * ```
 */
export function configApp(
  ...configBlocksToMerge: OxlintOverride[]
): ReturnType<typeof defineConfig> {
  const inertia = isInertiaInstalled()

  return defineConfig({
    ignorePatterns: getDefaultIgnoreList(),
    plugins: PLUGINS_LIST,
    jsPlugins: [...JS_PLUGINS_LIST, '@adonisjs/eslint-plugin'],
    overrides: [
      {
        files: INCLUDE_LIST,
        rules: {
          ...RULES_LIST,
          '@adonisjs/prefer-lazy-controller-import': ['error'],
          '@adonisjs/prefer-lazy-listener-import': ['error'],
        },
      },
      ...(inertia ? [inertiaConfigBlock] : []),
      ...configBlocksToMerge,
    ],
  })
}
