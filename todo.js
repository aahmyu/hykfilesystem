var fs = require("fs");

var command = process.argv[2];

var todo = process.argv[3];

switch (command) {
    case 'list':
        list();
        break;
    case 'add':
        add();
        break;
    case 'clear':
        clear();
        break;
    case 'done':
        done();
        break;
    case 'help':
        help();
        break;
    default:
        process.stderr.write('The command was not found. \n');
        exit();
        break;
}

function list() {
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            if (data.length > 0) {
                process.stdout.write(data);
            }
            else {
                process.stderr.write('The list is empty, Please add some items first. \n');
            }
        }
    });
}

function add(item) {
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            item = process.argv.slice(3).join(' ');
            var calls = data.split('\n').length;
            fs.appendFile('./list.txt', calls + '- ' + item + '\n', 'utf8', function(error) {
                if (error) {
                    console.error(error);
                }
            });
        }
    });

}

function clear() {
    fs.writeFile('./list.txt', '', 'utf8', function(error) {
        if (error) {
            console.error(error);
        }
    });
}

function done() {
    var select = parseInt(todo, 10) - 1;
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            var splitted = data.split('\n');
            if (splitted[select] != undefined) {
                var marker = ' *Completed.';
                var completed = splitted[select].concat(marker);
                var newData = data.replace(splitted[select], completed);
                if (splitted[select].indexOf(marker) == -1) {
                    process.stdout.write('The selected item is now flagged as completed.' + '\n');
                    fs.writeFile('./list.txt', newData, 'utf8', function(error) {
                        if (error) {
                            console.error(error);
                        }
                    });
                }
                else {
                    process.stderr.write('This item is already flagged as completed. \n');
                }

            }
            else {
                process.stderr.write('The item was not in the list. \n');
            }
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
