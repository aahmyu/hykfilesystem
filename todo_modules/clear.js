const fs = require("fs");

function clearList() {
    fs.writeFile('./list.txt', '', 'utf8', function(error) {
        if (error) {
            console.error(error);
        }
    });
}

module.exports = {
    clearList
};