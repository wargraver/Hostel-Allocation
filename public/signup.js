function signup(name,no,email,pass,done){
        $.post('/student/signup',{
            name:name,
            email:email,
            no:no,
            password:pass
        },function(data){
               done(data)
        })
}

$(function(){
    let name=$('#name')
    let no=$('#no')
    let email=$('#email')
    let pass=$('#inputPassword')
    $('#btn1').click(()=>{
      if(name.val()==='' || pass.val()===''  || no.val()==='' || email.val()==='' || pass.val()===''){
          window.alert("please enter all the fields")
      }
      else{
          signup(name.val(),no.val(),email.val(),pass.val(),function(data){
                console.log(data)
                if(data.error) window.alert('user with this email alredy exist')
                else{
                    window.location.replace('http://localhost:3000/login.html')
                }
          })
      }
    })
})