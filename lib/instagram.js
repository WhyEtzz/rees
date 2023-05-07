const axios = require('axios');
const cheerio = require('cheerio')

exports.nam = async(link) => {
   return new Promise(async (resolve, reject) => {
        const result = [];
        const config = {
            header: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'content-length': 89,
                'content-type': 'application/x-www-form-urlencoded',
                origin: 'https://downloadgram.org',
                'ec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': "Windows",
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Mobile Safari/537.36'
            },
            data: {
                url: link,
                submit: ''
            }
        }
        axios.post('https://downloadgram.org/', new URLSearchParams(Object.entries(config.data)), config.header)
            .then((res) => {
                const { data } = res;
                const $ = cheerio.load(data);
                $('#downloadhere > a').each((i, e) => {
                    result.push({ url: $(e).attr('href') });
                })
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
    })
}

