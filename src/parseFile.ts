import { resolve } from 'path'
import { readFileSync, statSync } from 'fs-extra'
import dayJs from 'dayjs'
import { parse, Block } from 'comment-parser'

import type { CheckArgs, CheckIssue } from './'
import assert from 'assert'
// import type { CheckArgs } from './'

export const parseFile = async (filePath: string, todoValidator: CheckArgs['todoValidator']) => {
  const fullPath = resolve(process.cwd(), filePath)
  const fileContent = readFileSync(fullPath, { encoding: 'utf-8' })
  const blocks = parse(fileContent)

  let numberOfPassing = 0
  let numberOfFailing = 0
  const issues: Array<CheckIssue> = []
  for (const block of blocks) {
    if (!block.description.includes('TODO')) continue
    if (todoValidator) {
      const doesPass = await todoValidator(block)
      doesPass ? numberOfPassing++ : numberOfFailing++
    } else {
      const potentialIssue = defaultValidator(block, fullPath)
      if (potentialIssue) {
        numberOfFailing++
        issues.push(potentialIssue)
      } else {
        numberOfPassing++
      }
    }
  }

  return {
    numberOfFailing,
    numberOfPassing,
    issues,
  }
}

// This finds the first error in the hierarchy, could potentially move into a cumulative option
const defaultValidator = (block: Block, filePath: string): CheckIssue | null => {
  const partialCheckIssue = {
    filePath,
    sourceComment: block.description,
    lineNumber: block.source[0].number + 1,
  }
  const dueTag = block.tags.find(({ tag }) => tag === 'due')
  if (!dueTag) {
    return {
      ...partialCheckIssue,
      failureReason: 'date',
      issue:
        'Due date not provided in the accepted format Use the JSDoc param "@due YYYY-MM-DD" to provide the due date',
    }
  }

  const { doesPass, message } = checkIfValidDueDate(dueTag.name)
  if (!doesPass) {
    assert(message !== null)
    return {
      ...partialCheckIssue,
      failureReason: 'date',
      issue: message,
    }
  }

  // Add the ability to skip this check, as not everyone will want it
  const ticketTag = block.tags.find(({ tag }) => tag === 'ticket')
  if (!ticketTag) {
    return {
      ...partialCheckIssue,
      failureReason: 'ticket',
      issue:
        'Ticket not provided in the accepted format Use the JSDoc param "@ticket https://linktoticket.com" to provide the link to the related work',
    }
  }
  const isValidTicket = checkIfValidUrl(ticketTag.name)
  if (!isValidTicket) {
    return {
      ...partialCheckIssue,
      failureReason: 'ticket',
      issue: `Expected valid ticket URL, got ${ticketTag.name}`,
    }
  }
  return null
}

const checkIfValidDueDate = (dateString: string) => {
  const date = dayJs(dateString)
  if (!date.isValid()) {
    return {
      doesPass: false,
      message: `Provided date: "${dateString}" is unable to be parsed into a readable date`,
    }
  }

  const doesPass = date.isAfter(dayJs())
  return {
    doesPass,
    message: doesPass
      ? null
      : `Provided date: "${dateString}" is before the given threshold of "${dayJs().format('YYYY-MM-DD')}"`,
  }
}

const checkIfValidUrl = (ticketLink: string) => {
  try {
    new URL(ticketLink)
    return true
  } catch (e) {
    return false
  }
}

export const checkIfPathIsDir = (filePath: string) => {
  const fullPath = resolve(process.cwd(), filePath)
  const stats = statSync(fullPath)
  if (stats.isDirectory()) return true
}
