const axios = require("axios")
const cheerio = require("cheerio")

exports.fb = async(link) => {
const {data} = await axios("https://fdownloader.net/api/ajaxSearch", {method: "POST", data: `q=${link}`})

let $ = cheerio.load(data.data)
console.log($("td > a:nth-child(1)").attr("href"))
return $("td > a:nth-child(1)").attr("href")

}

