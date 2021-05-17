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

/*$("#submit-btn").click(function(){
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
})*/

$("#submit-btn").click(function(){
    let all_stories = []
    let story = $("#story").val();
    db.runTransaction((transaction) => {
        db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
            all_stories = snap.data()['stories']
            for(i = 0; i < all_stories.length; i++){
                if(all_stories[i]['name'] == sessionStorage.getItem('name')){
                    all_stories[i]['story'] = story;
                }
            }
            db.collection("rooms").doc(sessionStorage.getItem('room')).update({
                stories: all_stories
            })
        })
    }).then(function(){
        document.location.href = "./answer_waiting.html";
    })
})