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
    for(i = sorted_players.length - 1; i >= 0 ; i--){
        console.log(sorted_players)
        let new_item = document.createElement('li')
        new_item.innerHTML = sorted_players[i]['name'] + " ended with " + sorted_players[i]['points'] + " points."
        $("ul").append(new_item)
    }
})

function getCurrentBackgroundPic() {
    let document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log('[user current background pic] ', doc.data().current_bg_pic);
            let user_current_bg_pic = doc.data().current_bg_pic;
            $('body').css('background-image', "url('" + user_current_bg_pic + "')");
        } else {
            console.log('no such document')
        }
    }).catch((error)=> {
        console.log('Error getting document: ', error)
    })
}
getCurrentBackgroundPic();


$("#finish").click(function(){
    db.collection("rooms").doc(sessionStorage.getItem('room')).delete().then(() => {
        document.location.href = "./main.html";
    });
})

