const jwt=require('jsonwebtoken')
const {room}=require('./db.js')
const {token}=require('./db.js')
const {student}=require('./db.js')
const auth=async function(req,res,next){
    try{
        var head=req.body.token
       // console.log(head)
        //var head2=head.replace('Bearer ','')
        if(head===undefined) head=req.query.token
       // console.log("head",head)
        if(head!=undefined){
        var _id=jwt.verify(head,'123456789')
        //console.log("id",_id)
        var data=await student.findAll({
            where:{
                id:_id
            }
        ,include:token})
      //  console.log(data[0])
      //  console.log(data[0].id)
        //console.log(data[0].tokens[0].token)
        var flag=0
        for(var i=0;i<data[0].tokens.length;i++){
            if(data[0].tokens[i].token===head) flag=1
        }
        if(flag===0){
          res.redirect('http://localhost:3000/login.html')
          /* res.status(200).send({
                error:"Login again"
            })*/
        }
        else{
        req.token=head
        req.id=data[0].id
        
        next()
        //res.status(200).send(data)
        }
    }
    else {
    res.redirect('http://localhost:3000/login.html')
    //res.status(200).send({error:"login agian"})
}
}
    catch(error){
        console.log("error",error)
        res.status(200).send({
            error:"login again"
        })
    }
}
module.exports={
    auth
}