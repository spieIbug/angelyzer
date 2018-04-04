#!/usr/bin/env node
import './polyfills';
import * as commander from 'commander';
import chalk from 'chalk';
import { Scanner } from './scanner';
import fs = require('fs')
const mkdirp = require('mkdirp');

commander.version('1.0.0').description('Angular analyzer');

commander.command('scan <modulePath> <savePath>').description('Scan an angular project')
  .action((modulePath, savePath) => {
    const effectiveSavePath = savePath + '/angelyzer_report/';
    console.log(chalk.red(`=========*** scanning ${modulePath} ***==========`));
    mkdirp.sync(effectiveSavePath);
    const scanner = new Scanner();
    fs.readdir(modulePath, (err, files) => scanner.scanPath(files, modulePath, effectiveSavePath));
  });

if (!process.argv.slice(2).length) {
  commander.outputHelp();
  process.exit();
}
commander.parse(process.argv);