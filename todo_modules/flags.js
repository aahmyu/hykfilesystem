const rw = require("./listrw.js");


function done(todo) {
    const select = parseInt(todo, 10) - 1;
    rw.fileRead('./list.txt', function(data){
        const splitted = data.split('\n');
            if (splitted[select] != undefined && splitted[select].length > 0) {
                const marker = ' *Completed.';
                const completed = splitted[select].concat(marker);
                const newData = data.replace(splitted[select], completed);
                if (splitted[select].indexOf(marker) == -1) {
                    process.stdout.write('The selected item is now flagged as completed.' + '\n');
                    rw.fileWrite('./list.txt', newData);
                }
                else {
                    process.stdout.write('This item has already been flagged as completed. \n');
                }

            }
    });
}

function unDone(todo) {
    const select = parseInt(todo, 10) - 1;
    rw.fileRead('./list.txt', function(data){
        const splitted = data.split('\n');
            if (splitted[select] != undefined) {
                const marker = ' *Completed.';
                if (splitted[select].indexOf(marker) != -1) {
                    const unmarked = splitted[select].replace(marker, '');
                    const newData = data.replace(splitted[select], unmarked);
                    process.stdout.write('The complete flag has been removed from this item.' + '\n');
                    rw.fileWrite('./list.txt', newData);
                }
                else {
                    process.stderr.write('This item has not been completed yet. \n');
                }

            }
            else {
                process.stderr.write('The item was not found in the list. \n');
            }
    });
}

module.exports = {
    done, unDone
};