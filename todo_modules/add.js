const fs = require("fs");

const listen = require("./listen.js");

function addItem(item) {
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
        listen.addListen(item);
    }

}

module.exports = {
    addItem
};