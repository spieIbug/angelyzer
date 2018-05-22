#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./polyfills");
var commander = require("commander");
var chalk_1 = require("chalk");
var scanner_1 = require("./scanner");
var fs = require("fs");
var mkdirp = require('mkdirp');
commander.version('1.0.5').description('Angular analyzer');
commander.command('scan <modulePath> <savePath>').description('Scan an angular project')
    .action(function (modulePath, savePath) {
    var effectiveSavePath = savePath + '/angelyzer_report/';
    console.log(chalk_1.default.red("\n     ___   ___     _   _____    ______   _      __    __  ______   ______   _____   \n    /   | |   \\   | | |  ___|  |  ____| | |     \\ \\  / / |  ____| |  ____| |  __  |\n   / /| | | |\\ \\  | | | |  __  | |__    | |      \\ \\/ /   \\ \\     | |__    | |__| |\n  / /_| | | | \\ \\ | | | | |  | |  __|   | |       \\  /     \\ \\    |  __|   | |__ '\n /  __  | | |  \\ \\| | | |__| | | |____  | |____   / /    ___\\ \\   | |____  | |  \\ \\\n/_/   |_| |_|   \\___| |______| |______| |______| /_/    |______|  |______| |_|   \\_\\\n"));
    console.log(chalk_1.default.white('Angular project analyzer @author: Yacine MEDDAH <my.meddah@gmail.com>'));
    console.log(chalk_1.default.yellow("Scanning " + modulePath));
    mkdirp.sync(effectiveSavePath);
    var scanner = new scanner_1.Scanner();
    fs.readdir(modulePath, function (err, files) { return scanner.scanPath(files, modulePath, effectiveSavePath); });
})
    .on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', commander.args.join(' '));
    process.exit();
});
if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}
commander.parse(process.argv);
