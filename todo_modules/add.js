const listen = require("./listen.js");

const rw = require("./listrw.js");

function addItem(item) {
    item = process.argv.slice(3).join(' ');
    if (item.length != 0) {
        rw.append('./list.txt', item + '\n', process.stdout.write('The item has been added to your list. \n'));
    }
    else {
        listen.addListen(item);
    }

}

module.exports = {
    addItem
};