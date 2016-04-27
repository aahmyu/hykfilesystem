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
    case 'remove':
        remove();
        break;
    case 'undone':
        unDone();
        break;
    default:
        process.stderr.write('The command was not found. \n');
        exit();
        break;
}

function list(items) {
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            if (data.length > 0) {
                var count = 0;
                items = data.split('\n');
                for (var i = 0; i < items.length - 1; i++) {
                    count++;
                    process.stderr.write(count + '- ' + items[i] + '\n');
                }
            }
            else {
                process.stdout.write('The list is empty, Please add some items first. \n');
            }
        }
    });
}

function add(item) {
    item = process.argv.slice(3).join(' ');
    if (item.length != 0) {
        fs.appendFile('./list.txt', item + '\n', 'utf8', function(error) {
            if (error) {
                console.error(error);
            }
            process.stdout.write('The item has been added to your list. \n');
        });
    }
    else {
        addListen(item);
    }

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
                    process.stdout.write('This item has already been flagged as completed. \n');
                }

            }
            else {
                process.stdout.write('The item was not found in the list. \n');
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

function remove(item) {
    var select = parseInt(todo, 10) - 1;
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            var regex = /^\s*\n/gm;                    // Regex to get rid of the empty line in the list after removing the item.
            var splitted = data.split('\n');
            if (splitted[select] != undefined) {
                var position = splitted[select].length;
                var removed = splitted.slice(position + 1);
                var replaced = data.replace(splitted[select], removed);
                var noBreaks = replaced.replace(regex, "");
                process.stdout.write('The selected item has been removed.' + '\n');
                fs.writeFile('./list.txt', noBreaks, 'utf8', function(error) {
                    if (error) {
                        console.error(error);
                    }
                });
            }
            else {
                process.stdout.write('Please choose an item to remove it from the list. \n');
            }

        }
    });
}

function unDone(item) {
    var select = parseInt(todo, 10) - 1;
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            var splitted = data.split('\n');
            if (splitted[select] != undefined) {
                var marker = ' *Completed.';
                if (splitted[select].indexOf(marker) != -1) {
                    var newData = data.replace(marker, '');
                    process.stdout.write('The complete flag has been removed from this item.' + '\n');
                    fs.writeFile('./list.txt', newData, 'utf8', function(error) {
                        if (error) {
                            console.error(error);
                        }
                    });
                }
                else {
                    process.stderr.write('This item has not been completed yet. \n');
                }

            }
            else {
                process.stderr.write('The item was not found in the list. \n');
            }
        }
    });
}

function addListen(item) {
    var arrayOfItems = [];
    process.stdin.setEncoding('utf8');
    process.stdout.write("Please enter the item's name(s) to add to the list \nPress Ctrl + D when done to confirm adding them to the list \n");
    process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            item = chunk;
            arrayOfItems.push(item);
        }
    });

    process.stdin.on('end', () => {
        if (item.length != 0) {
            for (var i = 0; i < arrayOfItems.length; i++) {
                fs.appendFile('./list.txt', arrayOfItems[i], 'utf8', function(error) {
                    if (error) {
                        console.error(error);
                    }

                });
            }
            process.stdout.write('The item(s) has been added to your list. \n');
        }
        else {
            process.stdout.write('Nothing to add. \n');
        }


    });
}