import { globSync } from 'glob'
import type { Block } from 'comment-parser'
import cliProgress from 'cli-progress'

import {
  pathToSourceDefault,
  fileGlobDefault,
  ignorePatternsDefault,
  // cutoffDateDefault,
  // logLevelDefault,
  // maxNumberOfOverdueDefault,
  // allowMalformedTodoDefault,
} from './defaults'
import { parseFile, checkIfPathIsDir } from './parseFile'

const ConversionProgress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

export const check = async (argumentos: CheckArgs) => {
  const {
    pathToSource = pathToSourceDefault,
    fileGlob = fileGlobDefault,
    ignorePatterns = ignorePatternsDefault,
    todoValidator,
  } = argumentos
  // Consider doing a stream again if this is too memory intensive
  const filePaths = globSync(fileGlob, { ignore: ignorePatterns, root: pathToSource })
  ConversionProgress.start(filePaths.length, 0)

  let numberOfFilesChecked = 0
  let totalNumberOfFailing = 0
  let totalNumberOfPassing = 0
  const allIssues: Array<CheckIssue> = []

  for (const relativeFilePath of filePaths) {
    numberOfFilesChecked++
    ConversionProgress.increment()
    if (checkIfPathIsDir(relativeFilePath)) continue
    const { numberOfFailing, numberOfPassing, issues } = await parseFile(relativeFilePath, todoValidator)
    totalNumberOfFailing += numberOfFailing
    totalNumberOfPassing += numberOfPassing
    allIssues.push(...issues)
  }

  return {
    numberOfFilesChecked,
    totalNumberOfFailing,
    totalNumberOfPassing,
    allIssues,
  }
}

export type CheckArgs = {
  pathToSource?: string
  /**
   * @default **
   */
  fileGlob?: string
  /**
   * @default Today
   */
  cutoffDate?: Date
  /**
   * @default ["node_modules", ".git"]
   */
  ignorePatterns?: Array<string>
  logLevel?: string
  todoValidator?: (block: Block) => boolean | Promise<boolean>
}

export type FailureReason = 'date' | 'ticket' | 'malformed'
export type CheckIssue = {
  sourceComment: string
  failureReason: FailureReason
  /** Brief description as to why the todo was failed */
  issue: string
  filePath: string
  lineNumber: number
}
export type CheckResult = {
  totalNumberOfFailing: number
  totalNumberOfPassing: number
  numberOfFilesChecked: number
  /** Will only be present if you are using the default validator */
  issues?: Array<CheckIssue>
}
