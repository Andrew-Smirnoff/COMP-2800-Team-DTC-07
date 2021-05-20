let players = []
let stories = []

db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
    let scenario_index = Math.floor(snap.data()['rounds'] / snap.data()['stories'].length) - 1;
    $("#scenario-goes-here").text(snap.data()['scenarios'][scenario_index])
})

// setting list of names
db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
    let players = snap.data()['players']
    for (i = 0; i < players.length; i++) {
        let new_image = document.createElement('img')
        let new_li = document.createElement('li')
        let ul = document.querySelector('ul')
        new_image.setAttribute("src", "./images/Profile pictures/beepboop.png")
        new_li.setAttribute('class', 'player')
        ul.appendChild(new_li)
        $(".player").html(new_image)
        $(".player").append(players[i])
    }
})

$("#submit-btn").click(function(){
    let all_stories = []
    let story = $("#story").val();
    db.runTransaction((transaction) => {
        return transaction.get(db.collection('rooms').doc(sessionStorage.getItem('room'))).then(function(snap){
            all_stories = snap.data()['stories']
            for(i = 0; i < all_stories.length; i++){
                if(all_stories[i]['name'] == sessionStorage.getItem('name')){
                    all_stories[i]['story'] = story;
                }
            }
            transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), {stories: all_stories})
        })
    }).then(function(){
        document.location.href = "./answer_waiting.html";
    })
})