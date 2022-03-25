const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()
require('./config/db_config')

const user=require('./route/user_route')
const res = require('express/lib/response')

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('',(req,res)=>{
    res.status(200).send('welcome block your seat')
})

app.use('/user',user)

app.listen(process.env.PORT,()=>{
    console.log(`server is listening on the port:${process.env.PORT}`)
})