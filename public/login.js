function login(email,password,done){
     $.post('/student/login',{
         email:email,
         password:password
     },function(data){
         done(data)
     })
}

$(function(){
     let email=$('#email')
     let pass=$('#inputPassword')
     console.log(email.val())
     $('#btn1').click(()=>{
         login(email.val(),pass.val(),function(data){
             console.log(data)
             console.log(data.token2)
        if(data.token2===undefined) window.alert("invalid credentials")
      else{
              window.localStorage.token=data.token2
            window.location.replace('https://hostel-allocation.herokuapp.com/bookingpage.html')
         }
         })
     })
})