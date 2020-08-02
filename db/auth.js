const jwt=require('jsonwebtoken')
const {room}=require('./db.js')
const {token}=require('./db.js')
const {student}=require('./db.js')
const auth=async function(req,res,next){
    try{
        const head=req.header('Authorization')
        console.log(head)
        const head2=head.replace('Bearer ','')
        const _id=jwt.verify(head2,'123456789')
        console.log(_id)
        const data=await student.findAll({
            where:{
                id:_id
            }
        ,include:token})
        if(data.length===0){
            res.status(400).send({
                error:"Login again"
            })
        }
        else{
        req.token=head2
        next()
        //res.status(200).send(data)
        }
    }
    catch(error){
        console.log("error",error)
        res.status(400).send({
            error:"Something went wrong while authenticating"
        })
    }
}
module.exports={
    auth
}