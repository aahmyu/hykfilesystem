const fs = require("fs");

const todo = process.argv[3];

function removeItem(item) {
    let select = parseInt(todo, 10) - 1;
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            const regex = /^\s*\n/gm;                            // Regex to get rid of the empty line in the list after removing the item.
            const splitted = data.split('\n');
            if (splitted[select] != undefined) {
                if (splitted[select].length > 0) {
                    let replaced = data.replace(splitted[select], "");
                    let noBreaks = replaced.replace(regex, "");
                    process.stdout.write('The selected item has been removed.' + '\n');
                    fs.writeFile('./list.txt', noBreaks, 'utf8', function(error) {
                        if (error) {
                            console.error(error);
                        }
                    });
                }
                else {
                    process.stdout.write('The selectd item does not exist. \n');
                }

            }
            else {
                process.stdout.write('Please choose an item to remove it from the list. \n');
            }

        }
    });
}

module.exports = {
    removeItem
};