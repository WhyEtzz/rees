const axios = require('axios');

exports.create = async(url) =>{
    
   const {data} = await axios("https://api.tiklydown.eu.org/api/download", {method: "GET", params: {
 url
}})
    
    return data.video.noWatermark
}
