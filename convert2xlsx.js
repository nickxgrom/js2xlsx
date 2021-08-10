const fs = require('fs'),
    path = require('path'),
    sourceFilePath = process.argv[2],
    sourceFileExt = path.extname(sourceFilePath),
    fileName = path.basename(sourceFilePath, sourceFileExt)
    extensions = require("./src/extensions"),
    fileHandler = require("./src/fileHanler"),
    modules = require('./src/modules'),
    xlsxMaker = require('./src/xlsx');

if (!fs.existsSync(sourceFilePath)) {
    throw new Error("No such file exist")
}

if (extensions.indexOf(sourceFileExt.replace('.', '')) !== -1) {
    fileHandler(sourceFilePath)
        .then(async res => {
            await xlsxMaker.fill(modules[sourceFileExt.replace('.', '')].parse(res), fileName)
        })
} else {
    console.log('Extension is not supported')
}