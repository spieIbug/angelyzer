#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
var commander = require("commander");
var chalk_1 = require("chalk");
var scanner_1 = require("./scanner");
var fs = require("fs");
commander
    .version('1.0.0')
    .description('Angular analyzer');
commander
    .command('scan')
    .alias('s')
    .description('Scan an angular project')
    .action(function (modulePath) {
    console.log(chalk_1.default.yellow("=========*** scanning " + modulePath + " ***=========="));
    var scanner = new scanner_1.Scanner();
    fs.readdir(modulePath, function (err, files) { return scanner.scanPath(files, modulePath); });
});
if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}
commander.parse(process.argv);
