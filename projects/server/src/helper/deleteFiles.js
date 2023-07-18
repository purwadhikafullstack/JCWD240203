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
    }
}