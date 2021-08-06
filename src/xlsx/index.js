const ExelJS = require('exceljs'),
    workbook = new ExelJS.Workbook(),
    path = require('path')

module.exports = {
    async fill(data) {
        await workbook.xlsx.readFile(path.resolve(__dirname + '/template.xlsx'))
        let worksheet = workbook.getWorksheet('templateSheet')
        worksheet.columns = [
            {key: "key", width: 50},
            {key: "ru", width: 75},
            {key: "kz", width: 75}
        ]

        for (let key of Object.keys(data)) {
            worksheet.addRow({"key": key, "ru": data[key], "kz": ""});

        }
        await workbook.xlsx.writeFile('result.xlsx')
    }
}