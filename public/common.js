function logout(done){
    $.get('/student/logout',{
        token:window.localStorage.token
    },function(data){
        done(data)
    })
}
$(function(){
    $('#logout').on('click',()=>{
        logout((data)=>{
            console.log('logged out')
            window.location.replace('http://localhost:3000/login.html')
        })
    })
})