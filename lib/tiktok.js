const axios = require('axios');

exports.create = async(url) =>{
    
   const {data} = await axios("https://shortURl.tesqreplitt.repl.co/tiktok", {method: "POST", data: {
url: url
}})
    
    return data.url
}
