const chalk = require('chalk');

const getNotes = require('./notes.js'); //this is a local file

const command = process.argv[2];

// console.log(command);

// console.log(`Hello ${command[2]}, how are you today?`);

if (command === 'add') {
    console.log('adding note...');
} else if (command === 'remove') {
    console.log('removing note...');
}

// console.log(getNotes());

// console.log(chalk.green('Success!'));
