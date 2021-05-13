let players = []
let stories = []

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const refresh = async () => {
    while (1 > 0) {
      await sleep(2000)
      db.collection("user_stories").get().then(function (snap) {
        snap.forEach(function (doc) {
            stories.push(doc.data())
            if(stories.length >= players.length){
                // Redirect
                
            } else {
                stories = []
                console.log("NOT DONE")
            }
        })
    })    
    }
  }
  refresh();

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
$("#submit-btn").click(function(){
    let new_story = $("#story").val();
    $("#story").val('')
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function(snap){
        let story_array = snap.data()['stories']
        let dict = {'name': sessionStorage.getItem('name'), 'story': new_story}
        story_array.push(dict)
        db.collection("rooms").doc(sessionStorage.getItem('room')).update({
            stories: story_array
        }).then(function(){
            db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function(snap){
                console.log(snap.data()['stories'])
                if(snap.data()['stories'].length >= 4){
                    document.location.href = "./voting.html";
                }
            })
        })
    })
})