const fs = require('fs')
    path = require('path'),
    ExcelJS = require('exceljs'),
    workbook = new ExcelJS.Workbook(),
    filePath = process.argv[2],
    fileExt = path.extname(filePath),
    fileName = path.basename(filePath, fileExt)

workbook.xlsx.readFile(path.resolve(__dirname, filePath))
    .then(res => {
        let sheet = res.getWorksheet(1),
            keyArr = sheet.getColumn(1).values,
            valueArr = sheet.getColumn(2).values,
            result = []
        keyArr.forEach( (key, index) => {
            result.push(`${key}=${valueArr[index]}`)
        })
        result.shift()
        makeFile(result)
    })

function makeFile(data) {
    let fileWriter = fs.createWriteStream(`./${fileName}.properties`)
    data.forEach(line => {
        fileWriter.write(`${line}\n`)
    })
}