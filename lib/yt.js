const axios = require("axios");
const cheerio = require("cheerio");

async function yt(linkk) {
  return new Promise(async(resolve, reject) => {
    const {data} = await axios.get("https://easysave.net/ytmp4/#url=" + linkk, {
      headers: {
  cookie: "PHPSESSID=82114b9aa4fd2b7f4b1d399269796db0; pll_language=en; _gid=GA1.2.1434943369.1665844140; _gat_gtag_UA_186343763_1=1; _ga_89JXKDVYKN=GS1.1.1665844140.1.0.1665844140.0.0.0; _ga=GA1.1.2006129509.1665844140"
      }
  })
  
  let s = cheerio.load(data)
  let token = s("#token").attr("value")
  
  const {data: rsty} = await axios("https://easysave.net/wp-json/aio-dl/video-data/", {method: "post", data: {
      url: linkk,
      token: token
  }, headers: {
  cookie: "PHPSESSID=82114b9aa4fd2b7f4b1d399269796db0; pll_language=en; _gid=GA1.2.1434943369.1665844140; _gat_gtag_UA_186343763_1=1; _ga_89JXKDVYKN=GS1.1.1665844140.1.0.1665844140.0.0.0; _ga=GA1.1.2006129509.1665844140"
  }})
  //console.log(s("#mylink").attr("href"))
  
        resolve({
          title: rsty.title,
          size: rsty.medias[1].formattedSize,
          quality: rsty.medias[1].quality,
          url: rsty.medias[1].url,
          thumb: rsty.thumbnail
        });
     
  });
}


async function ytmp4(url) {
  return new Promise(async(resolve, reject) => {
    await axios.request({
      method: "POST",
      url: "https://yt1s.com/api/ajaxSearch/index",
      data: `q=${encodeURIComponent(url)}&vt=home`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
        "Cookie": "_ga=GA1.2.56066711.1640019302; _gid=GA1.2.1024042191.1640019302; __atuvc=1%7C51; __atuvs=61c0b56a497017fe000; __atssc=google%3B1; prefetchAd_4425332=true"
      }
    }).then(async({ data }) => {
      await axios.request({
        method: "POST",
        url: "https://yt1s.com/api/ajaxConvert/convert",
        data: `vid=${encodeURIComponent(data.vid)}&k=${encodeURIComponent(data.links.mp4['18'].k)}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
          "Accept": "*/*",
          "Origin": "https://yt1s.com/",
          "Referer": "https://yt1s.com/id89",
          "Cookie": "_ga=GA1.2.56066711.1640019302; _gid=GA1.2.1024042191.1640019302; __atssc=google%3B1; __atuvc=2%7C51; __atuvs=61c0b56a497017fe001; prefetchAd_3897490=true"
        }
      }).then(({ data: result }) => {
        resolve({
          title: data.title,
          channel: data.a,
          videoID: data.vid,
          size: data.links.mp4['18'].size,
          quality: data.links.mp4['18'].q,
          url: result.dlink
        });
      }).catch(reject);
    }).catch(reject);
  });
}


module.exports = {
yt,
ytmp4
}
