const fs = require("fs");

function addListen(item) {
    let arrayOfItems = [];
    process.stdin.setEncoding('utf8');
    process.stdout.write("Please enter the item's name(s) to add to the list \nPress Ctrl + D when done to confirm adding them to the list \n");
    process.stdin.on('readable', () => {
        let chunk = process.stdin.read();
        if (chunk !== null) {
            item = chunk;
            arrayOfItems.push(item);
        }
    });

    process.stdin.on('end', () => {
        if (item.length != 0) {
            for (let i of arrayOfItems) {
                fs.appendFile('./list.txt', i, 'utf8', function(error) {
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

module.exports = {
    addListen
};
