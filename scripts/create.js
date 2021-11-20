'use strict'

const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const execSync = require('child_process').execSync
const chalk = require('chalk')

const script = process.argv[1]
const scriptRoot = path.dirname(script)
const args = process.argv.slice(2)

const [name] = args

const root = path.resolve(name)
const appName = path.basename(root)

const templateDir = path.join(path.resolve(scriptRoot, '../template'))

fs.copySync(templateDir, appName)
fs.moveSync(path.join(appName, 'gitignore'), path.join(appName, '.gitignore'))

process.chdir(appName)

try {
    execSync('git init', {stdio: 'ignore'})
    execSync('git add -A', {stdio: 'ignore'})
    execSync('git commit -m "Initialize project using Markdown Helper"', {stdio: 'ignore'})
    console.log('Created git commit')
} catch(e) {
    console.warn('Git repo not initialized')
}

function logCommand(command, description) {
    console.log(`  ${chalk.cyan(command)}`)
    console.log(`    ${description}`)
    console.log('')
}

function successMessage(name, dir) {
    console.log()
    console.log(`Success! Created "${name}" at ${dir}`)
    console.log('Inside that directory, you can run several commands:')
    console.log()
    logCommand('make','Generate all the file formats described in the Makefile')
    logCommand('make pdf','Generate only .pdf file')
    logCommand('make odt','Generate only .odt file')
    logCommand('make clean','Remove all generated files')
    
    console.log('We suggest that you begin by typing:')
    console.log()
    console.log(`  ${chalk.cyan('cd')} ${appName}`)
    console.log(`  ${chalk.cyan('make')}`)
    console.log()
    console.log('Happy hacking!')

}

successMessage(appName, root)
