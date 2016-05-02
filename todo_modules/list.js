const rw = require("./listrw.js");

function list(items) {
    rw.fileRead('./list.txt', function(data){
        if (data.length > 0) {
                let count = 0;
                items = data.split('\n');
                for (let i of items) {
                    count++;
                    if (i.length > 0) {
                        process.stdout.write(count + '- ' + i + '\n');
                    }
                }
            }
            else {
                process.stdout.write('The list is empty, Please add some items first. \n');
            }
    });
}

module.exports = {
    list
};