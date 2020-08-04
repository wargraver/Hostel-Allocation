const jwt=require('jsonwebtoken')
const {room}=require('./db.js')
const {token}=require('./db.js')
const {student}=require('./db.js')
const auth=async function(req,res,next){
    try{
        var head=req.header('Authorization')
        console.log(head)
        var head2=head.replace('Bearer ','')
        var _id=jwt.verify(head2,'123456789')
        console.log(_id)
        var data=await student.findAll({
            where:{
                id:_id
            }
        ,include:token})
        console.log(data[0].tokens)
        console.log(data[0].tokens[0].token)
        var flag=0
        for(var i=0;i<data[0].tokens.length;i++){
            if(data[0].tokens[i].token===head2) flag=1
        }
        if(flag===0){
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