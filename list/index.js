#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// Create my own lstat function that returns a promise (option 1)

// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };

// Use the util.promisify function to do the same automatically (option 2)

// const lstat = util.promisify(fs.lstat);

// Use the built-in promise based fs functions (option 3)

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  // Bad code example
  // Callbacks are asynchronous and therefore may return in any order

  // for (let filename of filenames) {
  //   fs.lstat(filename, (err, stats) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     console.log(filename, stats.isFile());
  //   });
  // }

  // Better code (option 1)
  // Populate an array with the results of each lstat call
  // When the array is full, print out the results
  // Works well for the simple solution, but breaks down quickly
  // if the callback has an async call which has an async call...

  // const allStats = Array(filenames.length).fill(null);

  // for (let filename of filenames) {
  //   fs.lstat(filename, (err, stats) => {
  //     const index = filenames.indexOf(filename);

  //     if (err) {
  //       console.log(err);
  //     }

  //     allStats[index] = stats;

  //     const ready = allStats.every((stats) => {
  //       return stats;
  //     });

  //     if (ready) {
  //       allStats.forEach((stat, index) => {
  //         console.log(filenames[index], stat.isFile());
  //       });
  //     }
  //   });
  // }

  // Better code (option 2)
  // Wrap each lstat call with a promise
  // See three options for doing this above
  // This serializes the lstat calls, and therefore a slow method

  // for (let filename of filenames) {
  //   try {
  //     const stats = await lstat(filename);

  //     console.log(filename, stats.isFile());
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Best code (option 3)
  // Combo of option 1 and 2, use Promise.all

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.green.bold(filenames[index]));
    } else if (stats.isSymbolicLink()) {
      console.log(chalk.blue.bold(filenames[index]));
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
});
