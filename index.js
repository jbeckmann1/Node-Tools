#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
// Method#2
// const util = require('util');
// const lstat = util.promisify(fs.lstat);
// Method#3
const { lstat } = fs.promises;

//Für alle
fs.readdir(process.cwd(), async (err, filenames) => {
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
		return lstat(filename);
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
