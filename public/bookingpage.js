$(function(){
    $(".child").on('click',function(clicked){
        console.log($(clicked)[0].target.innerText,"first")
         console.log($(clicked))
         const room=$(clicked)[0].target.innerText
         console.log(room)
         //get request to room
         //if room is filled give filled message
         //else booking page
     })
})