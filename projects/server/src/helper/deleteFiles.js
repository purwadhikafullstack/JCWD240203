const fs = require('fs');

module.exports = {
    deleteFiles: (files) => {
        files.forEach(value => {
            console.log(value);
            fs.unlink(value.path, function(err) {
                try {
                    if(err) throw err;
                }
                catch(error) {
                    console.log(error);
                }
            })
        })
    },

    formatReqFiles: (rawData) => {
        const formatted = []
        for(let i in rawData) {
            formatted.push(rawData[i]);
        }
        return formatted.flat(1);
    }
}