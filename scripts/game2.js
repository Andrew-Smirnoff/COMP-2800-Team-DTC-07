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
                console.log('DONE')
            } else {
                stories = []
                console.log("NOT DONE")
            }
        })
    })    
    }
  }
  refresh();

db.collection("scenario_cards").get().then(function (snap) {
    snap.forEach(function (doc) {
        $("#scenario-goes-here").text(doc.data()['scenario'])
    })
})

db.collection("waiting").get().then(function (snap) {
    snap.forEach(function (doc) {
        players = doc.data()['players']
        for (i = 0; i < players.length; i++) {
            let new_li = document.createElement('li')
            let ul = document.querySelector('ul')
            new_li.innerHTML = players[i]
            ul.appendChild(new_li)
        }
    })
})

$("#submit-btn").click(function(){
    let new_story = $("#story").val();
    $("#story").val('')
    db.collection("user_stories").doc(sessionStorage.getItem('name')).set({
        story: new_story
    })
})