let players = []
let stories = []

db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
    $("#scenario-goes-here").text(snap.data()['scenarios'][0])
})

// setting list of names
db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
    let players = snap.data()['players']
    for (i = 0; i < players.length; i++) {
        let new_li = document.createElement('li')
        let ul = document.querySelector('ul')
        new_li.innerHTML = players[i]
        ul.appendChild(new_li)
    }
})

// submitting a story to DB
/*
$("#submit-btn").click(function(){
    let new_story = $("#story").val();
    $("#story").val('')
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function(snap){
        let story_array = snap.data()['stories']
        let dict = {'name': sessionStorage.getItem('name'), 'story': new_story, 'points': 0}
        story_array.push(dict)
        db.collection("rooms").doc(sessionStorage.getItem('room')).update({
            stories: story_array
        }).then(function(){
            db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function(snap){
                console.log(snap.data()['stories'])
                if(snap.data()['stories'].length >= 1){
                    document.location.href = "./answer_waiting.html";
                }
            })
        })
    })
})
*/

$("#submit-btn").click(function(){
    let all_stories = []
    let story = $("#story").val();
    db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
        all_stories = snap.data()['stories']
        for(i = 0; i < all_stories.length; i++){
            if(all_stories[i]['name'] == sessionStorage.getItem('name')){
                all_stories[i]['story'] = story;
            }
        }
        db.collection("rooms").doc(sessionStorage.getItem('room')).update({
            stories: all_stories
        }).then(function(){
            document.location.href = "./answer_waiting.html";
        })
    }).then(function(){
        
    })
})