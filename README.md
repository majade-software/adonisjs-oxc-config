# @majade-software/adonisjs-oxc-config

Unified Oxlint and Oxfmt presets for AdonisJS packages and applications.

## Installation

```sh
npm i -D @majade-software/adonisjs-oxc-config oxlint oxfmt
```

## Migration guide

### 1) Install dependencies

```bash
npm install -D oxlint oxfmt @majade-software/adonisjs-oxc-config
```

### 2) Replace ESLint config

Create an `oxlint.config.ts` file (or update your existing one):

```ts
// oxlint.config.ts
import { configApp } from '@majade-software/adonisjs-oxc-config'

export default configApp()
```

For a TypeScript package/library, use `configPkg()` instead:

```ts
// oxlint.config.ts
import { configPkg } from '@majade-software/adonisjs-oxc-config/oxlint'

export default configPkg()
```

### 3) Replace Prettier config

Create an `oxfmt.config.ts` file:

```ts
// oxfmt.config.ts
import { configOxfmt } from '@majade-software/adonisjs-oxc-config/oxfmt'

export default configOxfmt()
```

### 4) Migrate NPM scripts

Example in `package.json`:

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix .",
    "format": "oxfmt --write",
    "format:check": "oxfmt --check"
  }
}
```

### 5) Remove Prettier config

Delete prettier entry from `package.json` and any `.prettierrc` files, as Oxfmt will now handle formatting rules.

```bash
npm uninstall @adonisjs/prettier-config prettier
```

Note : You can keep Prettier installed to format Edge.js files as Oxmt does not support js plugin yet.

### 6) Remove ESLint progressively

- You can run Oxlint and ESLint together if you still depend on rules not supported by Oxlint, refer to OXC doc for details: <https://oxc.rs/docs/guide/usage/linter/migrate-from-eslint.html#running-oxlint-and-eslint-together>
- Once everything is validated, remove `eslint` and any now-unused ESLint plugins.

```bash
npm uninstall eslint @adonisjs/prettier-config
```

## Rule compatibility status

| ESLint rule                                  | Oxlint status     | Current handling                                             |
| -------------------------------------------- | ----------------- | ------------------------------------------------------------ |
| `@typescript-eslint/consistent-type-imports` | Direct equivalent | `typescript/consistent-type-imports`                         |
| `@typescript-eslint/no-shadow`               | Near equivalent   | `no-shadow`                                                  |
| `@typescript-eslint/naming-convention`       | Not supported     | Removed                                                      |
| `unicorn/no-for-loop`                        | Not supported     | Removed                                                      |
| `one-var`                                    | Not supported     | Removed                                                      |
| `no-undef-init`                              | Not supported     | Removed; partially covered by `unicorn/no-useless-undefined` |

### Added to keep related intent

- `unicorn/no-useless-undefined` (covers redundant `undefined` usage patterns related to the removed `no-undef-init` rule intent)

If Oxlint adds support for any removed rules later, they can be reintroduced in `RULES_LIST` in `src/oxlint.ts`.
