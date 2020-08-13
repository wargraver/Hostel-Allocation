function get_room(done){
    $.get('/room',{
        token:window.localStorage.token
    },function(data){
        done(data)
    })
}//<a href="http://localhost:3000/student/room/${text}"> 
function load(text,val){
    return $(`<div class="col-sm-1 mt-2 ">
            <div class="card ${val}">
           <div class="child">
           
            <p class="ml-2 mt-2">${text}</p></a>
           </div>
           </div>
           </div>`)
}


$(function(){
    let contain=$('#container')
    get_room(function(data){
       contain.empty()
       console.log(data)
       for(let i=0;i<data.length;i++){
           if(data[i].students.length===3) contain.append(load(data[i].room_no,'filled'))
           else contain.append(load(data[i].room_no,'vacant'))
       }
       $('.child').on('click',function(clicked){
        console.log($(clicked)[0].target.innerText,"first")
         console.log($(clicked))
         const room=$(clicked)[0].target.innerText
         console.log(room)
         //get request to room
         //if room is filled give filled message
         //else booking page
     })
    })
    
})