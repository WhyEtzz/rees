const axios = require('axios');

exports.nam = async(url) => {
    try {
const {data} = await axios("https://shortURl.tesqreplitt.repl.co/ig", {method: "POST", data: {
url: url
}})
    
    return data

    } catch(err) {
        return err
    }
}

