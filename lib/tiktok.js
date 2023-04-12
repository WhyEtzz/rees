const axios = require('axios');

exports.create = async(url) =>{
    
   const {data} = await axios("https://shortnya.ml/tiktok", {method: "POST", data: {
url: url
}})
    
    return data.url
}
