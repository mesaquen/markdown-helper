#!/usr/bin/env node

'use strict'

const spawn = require('cross-spawn')

const args = process.argv.slice(2)

const scriptIndex = args.findIndex((arg) => arg === 'create')

const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

const SIGKILL_MESSAGE = `The build failed because the process exited too early.
This probably means the system ran out of memory or someone called
\`kill -9\` on the process.`

const SIGTERM_MESSAGE = `The build failed because the process exited too early.
Someone might have called \`kill\` or \`killall\`, or the system could
be shutting down.`

if (['create'].includes(script)) {
  const nextArgs = nodeArgs
    .concat(require.resolve(`../scripts/${script}`))
    .concat(args.slice(scriptIndex + 1))

  const result = spawn.sync(process.execPath, nextArgs, { stdio: 'inherit' })

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(SIGKILL_MESSAGE)
    } else if (result.signal === 'SIGTERM') {
      console.log(SIGTERM_MESSAGE)
    }
    process.exit(1)
  }

  process.exit(result.status)
} else {
  console.log(`Unknown script "${script}".`)
}
