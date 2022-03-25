const mongoose=require('mongoose')
const urlConfig=require('./url_config')

mongoose.connect(urlConfig.url,{dbName:'BlockYourSeat'},(err,data)=>{
    if(err){console.log(err)}
    else{
        console.log('db connected')
    }
})