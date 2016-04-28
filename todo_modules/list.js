const fs = require("fs");

function list(items) {
    fs.readFile('./list.txt', 'utf8', function(error, data) {
        if (error) {
            console.error(error);
        }
        else {
            if (data.length > 0) {
                let count = 0;
                items = data.split('\n');
                for (let i of items) {
                    count++;
                    if (i.length > 0) {
                        process.stderr.write(count + '- ' + i + '\n');
                    }
                }
            }
            else {
                process.stdout.write('The list is empty, Please add some items first. \n');
            }
        }
    });
}

module.exports = {
    list
};