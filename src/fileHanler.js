const fs = require('fs')

function fileDestruct(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data.toString().replace(/\r\n/g, '\n').split('\n'))
        })
    })
}

module.exports = fileDestruct