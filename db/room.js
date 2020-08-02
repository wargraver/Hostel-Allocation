const route=require('express').Router()
const {student}=require('./db.js')
const {room}=require('./db.js')
const {token}=require('./db.js')
const {auth}=require('./auth.js')
route.get('/room/:no',auth,async(req,res)=>{
    try{
       const data=await room.findAll({
           where:{
               room_no:req.params.no
           },include:student})
           res.status(200).send(data)
    }
    catch(error){
        console.log("error",error)
        res.status(400).send({
            error:"something went wrong while fetching room"
        })
    }
})
route.post('/room',auth,async(req,res)=>{
    try{
    const valid=await room.findAll({
        where:{
            room_no:req.body.no
        }
    })
    if(valid.length===0){
        const data=await room.create({
            room_no:req.body.no
        })
        res.status(200).send(data)
    }
    else res.status(400).send("room alreay exist")
    }
    catch(error){
        console.log("error",error)
        res.status(400).send({
            error:"can not create a room"
        })
    }
})
module.exports={route}