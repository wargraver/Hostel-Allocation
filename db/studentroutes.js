const route=require('express').Router()
const {student}=require('./db.js')
const {room}=require('./db.js')
const {token}=require('./db.js')
route.get('/student',async (req,res)=>{
      try{
         const data=await student.findAll()
         res.status(200).send(data)
      }
      catch(error){
          consolr.log('error',error)
          res.status(400).send({
              error:"something went wrong while fetching students"
          })
      }
})
route.post('/student',async (req,res)=>{
    try{
        const data1=await student.findAll({where:{
            email:req.body.email
        }})
        console.log(data1.length)
        if(data1.length===0){
        const data=await student.create({
            name:req.body.name,
            email:req.body.email,
            admission_no:req.body.no,
            password:req.body.password
        })
        res.status(200).send(data)
    }
    else res.status(400).send({
        error:"user with this email id already exist"
    })
    }
    catch{
        console.log('error',error)
        res.status(400).send({
            error:"something went wrong while creating students"
        })
    }
})
module.exports={route}