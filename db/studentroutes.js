const route=require('express').Router()
const {student}=require('./db.js')
const {room}=require('./db.js')
const {token}=require('./db.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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
route.post('/student/login',async (req,res)=>{
      try{
          const pass=req.body.password
          const email=req.body.email
          const data=await student.findAll({where:{
               email:email
          }})
          if(data.length===0) res.status(400).send("invalid credentials")
          else{
              //console.log(data[0].password)
              const val=bcrypt.compare(pass,data[0].password)
              if(val===false) res.status(400).send('invalid credetials')
              else{
                  const id=data[0].id
                const token2=jwt.sign(id.toString(),'123456789')
                 console.log(token2)
                 const tok=await token.create({
                     token:token2,
                     studentId:data[0].id
                 })
                  res.status(200).send({data,token2,tok})
                }
          }
      }
      catch(error){
         console.log("error",error)
         res.status(400).send({
             error:"something went wrong"
         })
      }
})
route.post('/student/signup',async (req,res)=>{
    try{
        const data1=await student.findAll({where:{
            email:req.body.email
        }})
       // console.log(data1.length)
        if(data1.length===0){
            const pass = await bcrypt.hash(req.body.password,8)
           // console.log(pass)
        const data=await student.create({
            name:req.body.name,
            email:req.body.email,
            admission_no:req.body.no,
            password:pass
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