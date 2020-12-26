#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
// Method#2
// const util = require('util');
// const lstat = util.promisify(fs.lstat);
// Method#3
const { lstat } = fs.promises;
//receive argument or use the current directory
const targetDir = process.argv[2] || process.cwd();
//Für alle
fs.readdir(targetDir, async (err, filenames) => {
	if (err) {
		console.log(err);
	}
	// 	for (let filename of filenames) {
	// 		try {
	// 			const stats = await lstat(filename);
	// 			console.log(filename, stats.isFile());
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	}
	// });
	// //Method#1
	// const lstat = (filename) => {
	// 	return new Promise((resolve, reject) => {
	// 		fs.lstat(filename, (err, stat) => {
	// 			if (err) {
	// 				reject(err);
	// 			}
	// 			resolve(stat);
	// 		});
	// 	});
	// };
	//"Good Solution"
	const statPromises = filenames.map((filename) => {
		return lstat(path.join(targetDir, filename));
	});
	const allStats = await Promise.all(statPromises);
	for (let stats of allStats) {
		const index = allStats.indexOf(stats);
		if (stats.isFile()) {
			console.log(filenames[index]);
		}
		else {
			console.log(chalk.bold(filenames[index]));
		}
	}
});
