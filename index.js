const fs = require('fs'),
    path = require('path'),
    sourceFilePath = process.argv[2],
    sourceFileExt = path.extname(sourceFilePath)

if (!fs.existsSync(sourceFilePath)) {
    throw new Error("No such file exist")
}

if (sourceFileExt === '.properties') {
//    TODO: handling .properties to .xlsx
} else {
    console.log('Extension is not supported')
}



