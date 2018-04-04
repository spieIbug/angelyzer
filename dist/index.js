#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
var commander = require("commander");
var chalk_1 = require("chalk");
var scanner_1 = require("./scanner");
var fs = require("fs");
var mkdirp = require('mkdirp');
commander.version('1.0.0').description('Angular analyzer');
commander.command('scan <modulePath> <savePath>').description('Scan an angular project')
    .action(function (modulePath, savePath) {
    var effectiveSavePath = savePath + '/angelyzer_report/';
    console.log(chalk_1.default.red("=========*** scanning " + modulePath + " ***=========="));
    mkdirp.sync(effectiveSavePath);
    var scanner = new scanner_1.Scanner();
    fs.readdir(modulePath, function (err, files) { return scanner.scanPath(files, modulePath, effectiveSavePath); });
});
if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}
commander.parse(process.argv);
