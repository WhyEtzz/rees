const axios = require('axios');

exports.nam = async(url) => {
    try {
form.append("link", url)
form.append("submit", "DOWNLOAD")
const {data} = await axios("https://www.w3toys.com/", {method: "POST", data: form})
let s = cheerio.load(data)
let all = []
let anu = s(".dlsection > a").toArray()
for (i of anu) {
    let adrs = s(i).attr("href")
    const {headers} = await axios.get(adrs, {responseType: "arraybuffer"})
    all.push({url:adrs, type:headers["content-type"].split("/")[0]})
}
        return all
    } catch(err) {
        return err
    }
}

