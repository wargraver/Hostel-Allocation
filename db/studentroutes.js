const route=require('express').Router()
const {student}=require('./db.js')
const {room}=require('./db.js')
const {token}=require('./db.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {auth}=require('./auth.js')
route.get('/student',auth,async (req,res)=>{
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
route.get('/student/logout',auth,async (req,res)=>{
    try{
        await token.destroy({
            where:{
                token:req.token
            }
        })
        res.status(200).send(`token removed ${req.token}`)
    }
    catch(error){
        console.log("error",error)
        res.status(400).send({
            error:"could not logout"
        })
    }
})
route.get('/student/:id',auth,async (req,res)=>{
    try{
        const data=await student.findAll({
            where:{
                id:req.params.id
            },include:[room,token]
        })
        if(data.length===0) res.status(400).send('NO such user exist')
        else res.status(200).send(data)
    }
    catch(error){
        console.log("error",error)
        res.status(400).send({
            error:"something went wrong while fetching a user"
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
          if(data.length===0) res.status(200).send("invalid credentials")
          else{
              //console.log(data[0].password)
              const val=bcrypt.compare(pass,data[0].password)
              if(val===false) res.status(200).send('invalid credetials')
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
    else res.status(200).send({
        error:"user with this email id already exist"
    })
    }
    catch(error){
        console.log('error from here',error)
        res.status(400).send({
            error:"something went wrong while creating students"
        })
    }
})
route.get('/student/room/:room1',auth,async (req,res)=>{
    try{
        console.log(req.params.room1)
      const data=await room.findAll({
          where:{
              room_no:req.params.room1
          },include:student
      })
      console.log(data[0])
      const id=data[0].id
      console.log(data[0].id)
      console.log(data[0].students)
      console.log(data[0].students.length)
      if(data[0].students.length<3){
        let check=await student.findAll({
            where:{
                id:req.id
            }
        })
        console.log("check",check[0].roomId)
       if(check[0].roomId===null){
        await student.update({roomId:id},{
             where:{
                 id:req.id
             }
         })
         res.status(200).send("Room booked")
        }
        else res.status(200).send("room already alloted")
      }
      else{
          res.status(200).send({
              error:"Room is already full"
          })
      }
    }
    catch(error){
        console.log("error",error)
        res.status(400).send({
            error:"something went wrong while booking room"
        })
    }
})
module.exports={route}