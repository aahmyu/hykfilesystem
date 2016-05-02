const rw = require("./listrw.js");


function removeItem(todo) {
    const select = parseInt(todo, 10) - 1;
    rw.fileRead('./list.txt', function(data){
        const regex = /^\s*\n/gm;                            // Regex to get rid of the empty line in the list after removing the item.
            const splitted = data.split('\n');
            if (splitted[select] != undefined) {
                if (splitted[select].length > 0) {
                    const replaced = data.replace(splitted[select], "");
                    const noBreaks = replaced.replace(regex, "");
                    process.stdout.write('The selected item has been removed.' + '\n');
                    rw.fileWrite('./list.txt', noBreaks);
                }
                else {
                    process.stdout.write('The selectd item does not exist. \n');
                }

            }
            else {
                process.stdout.write('Please choose an item to remove it from the list. \n');
            }
    });
}

module.exports = {
    removeItem
};