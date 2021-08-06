module.exports = {
    parse(res) {
        let obj = {}
        res.forEach(line => {
            let [key, value] = line.split(/=(.*)/g)
            if (value && key) {
                obj[key] = value
            }
        })
        return obj
    }
}