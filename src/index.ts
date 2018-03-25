#!/usr/bin/env node
import './polyfills'
import * as commander from 'commander'
import chalk from 'chalk'
import {Scanner} from './scanner'
import fs = require('fs')

commander
    .version('1.0.0')
    .description('Angular analyzer')

commander
    .command('scan')
    .alias('s')
    .description('Scan an angular project')
    .action((modulePath) => {
        console.log(chalk.yellow(`=========*** scanning ${modulePath} ***==========`))
        const scanner = new Scanner();
        fs.readdir(modulePath, (err, files) => scanner.scanPath(files, modulePath));
    })

if(!process.argv.slice(2).length) {
    commander.outputHelp()
    process.exit()
}
commander.parse(process.argv);