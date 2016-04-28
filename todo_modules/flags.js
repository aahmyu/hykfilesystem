const fs = require("fs");

function done(todo) {
    let select = parseInt(todo, 10) - 1;
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            const splitted = data.split('\n');
            if (splitted[select] != undefined && splitted[select].length > 0) {
                const marker = ' *Completed.';
                let completed = splitted[select].concat(marker);
                let newData = data.replace(splitted[select], completed);
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

function unDone(todo) {
    let select = parseInt(todo, 10) - 1;
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            const splitted = data.split('\n');
            if (splitted[select] != undefined) {
                const marker = ' *Completed.';
                if (splitted[select].indexOf(marker) != -1) {
                    let newData = data.replace(marker, '');
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

module.exports = {
    done, unDone
};