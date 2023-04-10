const axios = require('axios');
const cheerio = require('cheerio');

exports.create = async(url) =>{
    
    const {data} = await axios("https://downloader.bot/api/tiktok/info", {method: "POST",
    data: {
        url: url
    },
        headers: {
            cookie: "lang=id; _ga=GA1.1.1828650537.1680690737; cookieAccept=true; uid=6be964fe7a77aa55ad238b07feb52682; _ga_233R9NY1HK=GS1.1.1680690736.1.1.1680690760.0.0.0",
    
        }
    })
    
    return data.data.mp4
} 

