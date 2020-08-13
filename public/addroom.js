function create_room(no,done){
       $.post('/room',{
           no:no,
           token:window.localStorage.token
       },function(data){
           done(data)
       })
}

$(function(){
    //check if given room is already not in db
    //request to add room to database
    let no=$('#no')
    $('#btn1').click(()=>{
        create_room(no.val(),function(data){
            console.log(data)
            if(data.error) window.alert(data.error)
            else{
                window.alert('added the room to db')
            }
        })
    })
})