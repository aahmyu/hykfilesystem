const fs = require("fs");

const list = require("./todo_modules/list.js");

const add = require("./todo_modules/add.js");

const clear = require("./todo_modules/clear.js");

const flag = require("./todo_modules/flags.js");

const remove = require("./todo_modules/remove.js");

const command = process.argv[2];


switch (command) {
    case 'list':
        list.list();
        break;
    case 'add':
        add.addItem();
        break;
    case 'clear':
        clear.clearList();
        break;
    case 'done':
        flag.done();
        break;
    case 'help':
        help();
        break;
    case 'remove':
        remove.removeItem();
        break;
    case 'undone':
        flag.unDone();
        break;
    default:
        process.stderr.write('The command was not found. \n');
        exit();
        break;
}

function exit() {
    fs.readFile('./help.txt', 'utf8', function(error, help) {
        if (error) {
            console.error(error);
        }
        else {
            process.stderr.write(help + '\n');
            process.exit(1);
        }
    });
}

function help() {
    fs.readFile('./help.txt', 'utf8', function(error, help) {
        if (error) {
            console.error(error);
        }
        else {
            process.stdout.write(help + '\n');
        }
    });
}



