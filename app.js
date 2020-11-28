const express=require('express')
const path=require('path')
const https=require('https')
const fs=require('fs')
const app=express()
const morgan=require('morgan')
const {route}=require('./db/studentroutes.js')
const route2=require('./db/room.js').route
//app.use(morgan('combined'))
const pvtkey=fs.readFileSync('server.key')
const cert=fs.readFileSync('server.cert')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)
app.use(route2)
app.use(express.static(path.join(__dirname,'./public')))
const port=process.env.PORT || 3000
app.get('/',(req,res)=>{
    res.status(200).send("hello")
})
https.createServer({key:pvtkey,cert:cert},app).listen(port,()=>{
    console.log("server started on port 3000")
})