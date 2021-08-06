const fs = require('fs'),
    path = require('path'),
    sourceFilePath = process.argv[2],
    sourceFileExt = path.extname(sourceFilePath).replace('.', ''),
    extensions = require("./src/extensions"),
    fileHandler = require("./src/fileHanler"),
    modules = require('./src/modules'),
    xlsxMaker = require('./src/xlsx')

if (!fs.existsSync(sourceFilePath)) {
    throw new Error("No such file exist")
}

if (extensions.indexOf(sourceFileExt) !== -1) {
    fileHandler(sourceFilePath)
        .then(async res => {
            await xlsxMaker.fill(modules[sourceFileExt].parse(res))
        })
} else {
    console.log('Extension is not supported')
}