# TODO Checker

CLI for tacking the status of your outstanding TODO comments.

Took the of inspiration from [Shopify's smart todo](https://github.com/Shopify/smart_todo), but this is language agnostic (geared towards JS).

<p align="center">
  <h4/>
  <img src="https://img.shields.io/npm/v/@caldwell619/todo-checker">
  <img src="https://img.shields.io/bundlephobia/min/@caldwell619/todo-checker">
  <img src="https://img.shields.io/github/last-commit/christopher-caldwell/todo-checker">
  <img src="https://img.shields.io/npm/types/@caldwell619/todo-checker">
</p>

## Demo

## Install

```bash
yarn add @caldwell619/todo-checker
# or
npm install --save @caldwell619/todo-checker
```

## Usage

This tool is available in 3 forms.

### Code DIY

```ts
import { check } from '@caldwell619/todo-checker'

const result = await check({
  pathToSource: './demo/example-source',
})
```

### CLI

<details><summary>Full List of Arguments</summary>

**None** of the arguments are required. They all have default values.

| Name                           | Description                                                                            |             Default              |
| ------------------------------ | -------------------------------------------------------------------------------------- | :------------------------------: |
| `--pathToSource` - `-ps`       | Relative path to directory to check                                                    |               `.`                |
| `--glob` - `-g`                | Glob Expression to check if a file should be checked                                   |               `**`               |
| `--ignorePatterns` - `-ign`    | File patterns checker will ignore. Provide array like string, parsable by `JSON.parse` | `['node_modules/**', '.git/**']` |
| `--cutoffDate` - `-cod`        | Cutoff date for a todo passing. Defaults to todays date                                |               Now                |
| `--logLevel` - `-ll`           | Log level of conversion                                                                |             `quiet`              |
| `--maxNumberOfOverdue` - `-mo` | Maximum number of overdue todos you consider successful                                |               `0`                |
| `--allowMalformedTodo` - `-al` | Allow a non-standard todo to be present and still pass                                 |             `false`              |

</details>

```shell
npx @caldwell619/todo-checker \
  -ps ./demo/example-source
```

### GitHub Action

This tool is also available as a GH action

<details><summary>Full List of Arguments</summary>

**None** of the arguments are required. They all have default values.

| Name                      | Description                                                                            |             Default              |
| ------------------------- | -------------------------------------------------------------------------------------- | :------------------------------: |
| `path-to-source`          | Relative path to directory to check                                                    |               `.`                |
| `glob`                    | Glob Expression to check if a file should be checked                                   |               `**`               |
| `ignore-patterns`         | File patterns checker will ignore. Provide array like string, parsable by `JSON.parse` | `['node_modules/**', '.git/**']` |
| `cutoff-date`             | Cutoff date for a todo passing. Defaults to todays date                                |               Now                |
| `log-level`               | Log level of conversion                                                                |             `quiet`              |
| `max-overdue` - `-mo`     | Maximum number of overdue todos you consider successful                                |               `0`                |
| `allow-malformed` - `-al` | Allow a non-standard todo to be present and still pass                                 |             `false`              |

</details>

```yml
jobs:
  todo-check:
    runs-on: ubuntu-latest
    name: Check the validity of my TODOs
    steps:
      - name: Check me
        id: checker
        uses: christopher-caldwell/todo-checker
        with:
          # All of the values shown below are the defaults. None are required
          path-to-source: '.'
          file-glob: '**'
          ignore-patterns: '["node_modules", ".git"]'
          cutoff-date: '2023-10-11'
          log-level: 'quiet'
          max-overdue: 0
          allow-malformed: false
        outputs:
          num-passed:
            description: 'Number of files with TODOs that passed'
          num-failed:
            description: 'Number of files with TODOs that failed'
          num-files-checked:
            description: 'Number of files in total checked'
      # Use the output from the `hello` step
      - name: Show the total number of files passed
        run: echo "Number of files that passed ${{ steps.checker.outputs.num-passed }}"
      - name: Show the total number of files failed
        run: echo "Number of files that failed ${{ steps.checker.outputs.num-failed }}"
      - name: Show the total number of files checked
        run: echo "Number of files that failed ${{ steps.checker.outputs.num-files-checked }}"
```

## License

MIT © [christopher-caldwell](https://github.com/christopher-caldwell)
