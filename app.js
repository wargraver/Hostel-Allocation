const express=require('express')
const path=require('path')
const app=express()
const {route}=require('./db/studentroutes.js')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)
app.use(express.static(path.join(__dirname,'./public')))
app.get('/',(req,res)=>{
    res.status(200).send("hello")
})
app.listen(3000,()=>{
    console.log("server started on port 3000")
})