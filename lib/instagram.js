const axios = require('axios');

exports.nam = async(url) => {
    try {
const {data} = await axios("https://savein.io/api/fetch", {method: "POST", data: {
    url: url
}})
return data
    } catch(err) {
        return err
    }
}

