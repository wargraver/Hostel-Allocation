function get_room(done){
    $.get('/room',{
        token:window.localStorage.token
    },function(data){
        done(data)
    })
}//<a href="http://localhost:3000/student/room/${text}">  //  <p class="ml-2 mt-2">${text}</p></a>
function load(text,val,bool){
    return $(`<div class="col-sm-1 mt-2 ">
            <div class="card ${val}">
           <div class="child">
           <button type="button" class="btn btn-primary ${val}" data-toggle="button" aria-pressed="false" autocomplete="off" aria-disabled=${bool}>
           ${text}
         </button>
           </div>
           </div>
           </div>`)
}
function book_room(roomno,done){
    //console.log(roomno)
    $.get(`/student/room/`+roomno,{
      token:window.localStorage.token
    },function(data){
        done(data)
    })
}
$(function(){
    let contain=$('#container')
    get_room(function(data){
       contain.empty()
       //console.log(data)
       for(let i=0;i<data.length;i++){
           if(data[i].students.length===3) contain.append(load(data[i].room_no,'filled',true))
           else contain.append(load(data[i].room_no,'vacant',false))
       }
       $('.child').on('click',function(clicked){
       // console.log($(clicked)[0].target.innerText,"first")
         //console.log($(clicked))
         let room=($(clicked)[0].target.innerText).toString()
        // console.log(room)
         $('#val').val(room)
         room=$('#val').val()
        $('#btn').on('click',()=>{
            book_room(room,function(data){
            //console.log(data)
            //console.log(room)
            window.alert(data)
        })})
         //get request to room
         //if room is filled give filled message
         //else booking page
     })
    })
    
})