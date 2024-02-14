const moment = require("moment");

module.exports = {
    execute: async (client) => {
        client.log = function (message) {
            console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${message}`);
          };

    }
}
