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
		//Einen absoluten Pfad hersttellen
		return lstat(path.join(targetDir, filename));
	});
	//Promise wird resolved wenn die Stats von allen Dateien/Ordnern zurückgegeben
	const allStats = await Promise.all(statPromises);

	for (let stats of allStats) {
		//Den index bekommen um wiederzuverwenden in if statement
		const index = allStats.indexOf(stats);
		//Entscheiden ob file oder nicht wenn ja ausschreiben
		if (stats.isFile()) {
			console.log(filenames[index]);
		}
		else {
			//Ansonsten fett drucken
			console.log(chalk.bold(filenames[index]));
		}
	}
});
