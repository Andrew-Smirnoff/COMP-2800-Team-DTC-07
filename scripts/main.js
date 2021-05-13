startApp();

function startApp() {
    firebase.auth().onAuthStateChanged(function (user) {        // Check the user that's logged in
        if (user) {
            db.collection('users')
                .doc(user.uid)                                  // the user's UID
                .get()                                          //READ !!
                .then(function (doc) {
                    var name = doc.data().name;                 // point to user's name in the document
                    var friends = doc.data().friends;
                    var coins = doc.data().coins;  // get user coins                  
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('friends', friends);
                    sessionStorage.setItem('coins', coins);
                    $('#name-goes-here').text(sessionStorage.getItem('name', name));    
                })
        }
    })
}

$("#start").click(function(){
    let room_number = $("#room_number").val();
    db.collection('rooms').doc(room_number).get().then(function(snap){
        if(snap.exists){
            let players = snap.data()['players']
            players.push(sessionStorage.getItem('name'))
            db.collection('rooms').doc(room_number).update({
                players: players,
                stories: []
            }).then(function(){
                sessionStorage.setItem('room', room_number)
                document.location.href = "./waiting.html";
            })
        } else {
            db.collection('rooms').doc(room_number).set({
                players: [sessionStorage.getItem('name')],
                room_number: room_number,
                stories: []
            }).then(function(){
                sessionStorage.setItem('room', room_number)
                document.location.href = "./waiting.html";
            })
        }
    })
})