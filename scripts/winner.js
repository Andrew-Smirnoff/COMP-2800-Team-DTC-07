function bubbleSort(players){
    let player_count = players.length;
    for (let i = player_count - 1; i >= 0; i--){
      for(let j = 1; j <= i; j++){
        if(players[j - 1]['points'] > players[j]['points']){
            let temp = players[j - 1];
            players[j - 1] = players[j];
            players[j] = temp;
         }
      }
    }
    return players;
 }

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
    let all_players = snap.data()['stories']
    let sorted_players = bubbleSort(all_players)
    console.log(sorted_players)
    for(i = 0; i < snap.data()['stories'].length; i++){
        let new_item = document.createElement('li')
        new_item.innerHTML = snap.data()['stories'][i]['name'] + " ended with " + snap.data()['stories'][i]['points'] + " points."
        $("ul").append(new_item)
    }
})

$("#finish").click(function(){
    db.collection("rooms").doc(sessionStorage.getItem('room')).delete().then(() => {
        document.location.href = "./main.html";
    });
})