players_waiting = []

if(JSON.parse(sessionStorage.getItem('is_host')) == true){
    let host_header = document.createElement('h1');
    host_header.innerHTML = "You are the host"
    $("#host").append(host_header)

    let decrement = document.createElement('button')
    decrement.innerHTML = '-'
    decrement.setAttribute('id', 'decrement')
    let round_number = document.createElement('input')
    round_number.setAttribute('type', 'text')
    round_number.setAttribute('id', 'round_number')
    let increment = document.createElement('button')
    increment.innerHTML = '+'
    increment.setAttribute('id', 'increment')
    $("body").append(decrement)
    $("body").append(round_number)
    $("body").append(increment)
    $("#round_number").val(5)

    let host_button = document.createElement('button')
    host_button.innerHTML = 'Start Game'
    host_button.setAttribute("id", "start_game")
    $("body").append(host_button)

    $("#decrement").click(function(){
        let round_num = parseInt($("#round_number").val())
        $("#round_number").val(round_num - 1)
    })

    $("#increment").click(function(){
        let round_num = parseInt($("#round_number").val())
        $("#round_number").val(round_num + 1)
    })

    $("#start_game").click(function(){
        shuffle();
    })
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const refresh = async () => {
    while (1 > 0) {
      await sleep(2000)
      db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
        players_waiting = snap.data()['players']
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
        if(sessionStorage.getItem('is_host') != true){
            if(snap.data()['started'] == true){
                document.location.href = "./game2.html";
            }
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
        db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
            for(i = 0; i <= 5; i++){
                let rand = Math.floor(Math.random() * all_scenarios.length);
                shuffled.push(all_scenarios[rand])
                all_scenarios.splice(rand, 1)
            }
            db.collection("rooms").doc(sessionStorage.getItem('room')).update({
                scenarios: shuffled,
                started: true,
                rounds: parseInt($("#round_number").val()) * snap.data()['players'].length
            }).then(function(){
                document.location.href = "./game2.html";
            })
        })
    })
}