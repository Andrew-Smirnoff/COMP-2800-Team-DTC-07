players_waiting = []

if(JSON.parse(sessionStorage.getItem('is_host')) == true){
    console.log('hey')
    let host_header = document.createElement('h1');
    host_header.innerHTML = "You are the host"
    $("#host").append(host_header)
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const refresh = async () => {
    while (1 > 0) {
      await sleep(2000)
      db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
        players_waiting = snap.data()['players']
        if(players_waiting.length >= 3){
            shuffle();
        }
        let old_li = document.querySelectorAll('li')
        for(i = 0; i < old_li.length; i++){
            old_li[i].remove()
        }
        for (i = 0; i < players_waiting.length; i++) {
            let new_li = document.createElement('li')
            let ul = document.querySelector('ul')
            new_li.innerHTML = players_waiting[i]
            ul.appendChild(new_li)
        }
    })    
    }
  }

  refresh()

function shuffle(){
    let all_scenarios = []
    let shuffled = []
    db.collection("scenario").get().then(function(snap){
        snap.forEach(function(doc){
            all_scenarios.push(doc.data().scenario[0])
        })
        for(i = 0; i < 5; i++){
            let rand = Math.floor(Math.random() * all_scenarios.length);
            shuffled.push(all_scenarios[rand])
            all_scenarios.splice(rand, 1)
        }
        db.collection("rooms").doc(sessionStorage.getItem('room')).update({
            scenarios: shuffled
        }).then(function(){
            document.location.href = "./game2.html";
        })
    })
}