import * as core from '@actions/core'

import { CheckIssue, check } from './'

export const run = async (): Promise<void> => {
  try {
    const pathToSource = core.getInput('path-to-source')
    const fileGlob = core.getInput('file-glob')
    const ignorePatterns = JSON.parse(core.getInput('ignore-patterns') || '[]') as Array<string>
    const cutoffDate = core.getInput('cutoff-date')
    const logLevel = core.getInput('log-level')
    // const maxNumberOfOverdue = core.getInput('max-overdue')
    // const allowMalformedTodo = core.getInput('allow-malformed')

    const result = await check({
      pathToSource,
      fileGlob,
      ignorePatterns,
      cutoffDate: new Date(cutoffDate),
      logLevel,
      // maxNumberOfOverdue: Number(maxNumberOfOverdue),
      // allowMalformedTodo,
    })
    if (result.allIssues.length !== 0) {
      logIssues(result.allIssues)
      throw new Error('There are overdue TODOs')
    }
    core.setOutput('num-passed', result.totalNumberOfPassing)
    core.setOutput('num-failed', result.totalNumberOfFailing)
    core.setOutput('num-files-checked', result.numberOfFilesChecked)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

const logIssues = (issues: Array<CheckIssue>) => {
  issues.forEach((issue) => {
    core.error(`[${issue.failureReason}]: ${issue.issue}`, {
      title: issue.sourceComment,
      file: issue.filePath,
      startLine: issue.lineNumber,
    })
  })
}
