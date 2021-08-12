const path = require('path'),
    fs = require('fs'),
    fileSourcePath = process.argv[2],
    fileHandler = require('./src/fileHanler'),
    xlsxMaker = require('./src/xlsx/index'),
    fileExt = path.extname(fileSourcePath)
    fileName = path.basename(fileSourcePath, fileExt)

let preparedDataObj = {}

fileHandler(fileSourcePath)
    .then( res => {
        writeFile(createTempFile(res))
    })

function createTempFile(res) {
    res.filter(line => {
        return line.includes('import')
            || line.includes('$vuetify')
            || line.includes('export default')
    }).forEach(item => {
        res.splice(res.indexOf(item), 1)
    })
    res.push('module.exports = locale')

    return res
}

function writeFile(res) {
    const fileWriter = fs.createWriteStream('~temp.js')
    res.forEach(line => {
        fileWriter.write(`${line}\n`)
    })

    fileWriter.end(() => {
        createWritableObj(require('./~temp.js'))
        xlsxMaker.fill(preparedDataObj, fileName)
        fs.unlinkSync(`./~temp.js`)
    })
}

function createWritableObj(obj, prevKey) {
    Object.keys(obj).forEach(key => {
        let keyString = prevKey ? `${prevKey}.${key}` : key
        if (typeof obj[key] === 'object') {
            createWritableObj(obj[key], keyString)
        } else {
            preparedDataObj[keyString] = obj[key]
        }
    })
}