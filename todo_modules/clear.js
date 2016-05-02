const rw = require("./listrw.js");

function clearList() {
    rw.fileWrite('./list.txt', '');
}

module.exports = {
    clearList
};