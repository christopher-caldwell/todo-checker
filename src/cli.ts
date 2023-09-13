import { Builtins, Command, Option } from 'clipanion'
import { Cli } from 'clipanion'
import * as t from 'typanion'

import {
  pathToSourceDefault,
  fileGlobDefault,
  ignorePatternsDefault,
  logLevelDefault,
  cutoffDateDefault,
  maxNumberOfOverdueDefault,
  allowMalformedTodoDefault,
} from './defaults'

class CheckerCommand extends Command {
  pathToSource = Option.String('-ps,--pathToSource', pathToSourceDefault, {
    arity: 1,
    tolerateBoolean: false,
    description: 'Relative path to the directory to check',
  })
  fileGlob = Option.String('-g,--glob', fileGlobDefault, {
    description: 'Glob Expression to check if a file should be checked',
    validator: t.isString(),
    arity: 1,
  })
  ignorePatterns = Option.Array('-ign,--ignorePatterns', ignorePatternsDefault, {
    description: 'The file patterns the checker will ignore',
    validator: t.isArray(t.isString()),
  })
  cutoffDate = Option.String('-cod,--cutoffDate', cutoffDateDefault, {
    description: 'The cutoff date for a todo passing. Defaults to todays date',
    validator: t.isDate(),
    arity: 1,
  })
  logLevel = Option.String(`-ll,--logLevel`, logLevelDefault, {
    description: 'The log level of the conversion',
    arity: 1,
  })
  maxNumberOfOverdue = Option.String(`-mo,--maxOverdue`, maxNumberOfOverdueDefault, {
    description: 'Maximum number of overdue todos you consider successful',
    arity: 1,
  })
  allowMalformedTodo = Option.Boolean('-al,--allowMalformed', allowMalformedTodoDefault, {
    description: 'Allow a non-standard todo to be present and still pass',
  })

  async execute() {
    try {
      console.log('Yay')
      process.exit(0)
    } catch (e) {
      process.exit(1)
    }
  }
}

const [node, app, ...args] = process.argv

const cli = new Cli({
  binaryLabel: `TODO Checker`,
  binaryName: `${node} ${app}`,
})

cli.register(CheckerCommand)
cli.register(Builtins.HelpCommand)
cli.runExit(args)
