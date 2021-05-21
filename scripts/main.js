function getDocumentId() {
    firebase.auth().onAuthStateChanged((user) => {
      let document_id = user.uid
      console.log('document_id: ', document_id)
      sessionStorage.setItem('document_id', document_id)
    })
  }

function make_date(){
    let today = new Date();
    let day = String(today.getDate())
    let month = String(today.getMonth())
    let year = String(today.getFullYear())
    let full_date = year + '/' + month + '/' + day
    return full_date;
}

function date_difference(full_date, document_date){
    full_date = full_date.split('/')
    full_date = Number(full_date[0] + full_date[1] + full_date[2])

    document_date = document_date.split('/')
    document_date = Number(document_date[0] + document_date[1] + document_date[2])

    return document_date - full_date;
}

//delete old games
function delete_games(){
    db.collection('rooms').get().then(function(snap){
        snap.forEach(function(doc){
            let document_date = doc.data()['created']
            let full_date = make_date()

            let difference = date_difference(full_date, document_date)

            if(difference < -2){
                db.collection("rooms").doc(doc.data()['room_number']).delete()
            }
        })
    })
}

function setup_player() {
    firebase.auth().onAuthStateChanged(function (user) {        // Check the user that's logged in
        if (user) {
            db.collection('users').doc(user.uid).get().then(function (doc) {
                    var prof_picture = doc.data().current_profile_picture;
                    var name = doc.data().name;                 // point to user's name in the document
                    var friends = doc.data().friends;
                    var coins = doc.data().coins;  // get user coins
                    var bg_picture = doc.data().current_bg_pic;                  
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('friends', friends);
                    sessionStorage.setItem('coins', coins);
                    sessionStorage.setItem('Current_Profile_Pic', prof_picture);
                    sessionStorage.setItem('Current_Bg_Pic', bg_picture);
                    $('#name-goes-here').text(sessionStorage.getItem('name', name));    
                })
        }
    })
}

function join_game(snap){
    if(snap.data()['started'] == false){
        sessionStorage.setItem('is_host', false)
        let players = snap.data()['players']
        let stories = snap.data()['stories']
        let dict = {'name': sessionStorage.getItem('name'), 'story': "", "points": 0, "current_points": 0, "current_round": 0, "picture": sessionStorage.getItem("Current_Profile_Pic")}
        stories.push(dict)
        players.push(sessionStorage.getItem('name'))
        transaction.update(db.collection('rooms').doc(room_number), {players: players, stories: stories})
    } else if(snap.data()['started'] == true){
        //show snackbar - it's snack time BABY
        let snack = document.getElementById('snackbar')
        snack.className = "show"
        setTimeout(function(){snack.className = snack.className.replace("show", "");}, 3000)
    }
}

function host_game(snap){
    sessionStorage.setItem('is_host', true)
    players_waiting = []
    let full_date = make_date();
    let dict = {'name': sessionStorage.getItem('name'), 'story': "", "points": 0, "current_points": 0, "current_round": 0, "picture": sessionStorage.getItem("Current_Profile_Pic")}
    transaction.set(db.collection('rooms').doc(room_number), {players: [sessionStorage.getItem('name')],
    room_number: room_number, stories: [dict], votes: 0, created: full_date, started: false})
}

function begin_game(){
    let room_number = $("#room_number").val();
    db.runTransaction((transaction) => {
        return transaction.get(db.collection('rooms').doc(room_number)).then(function(snap){
            if(snap.exists){
                if(snap.data()['started'] == false){
                    sessionStorage.setItem('is_host', false)
                    let players = snap.data()['players']
                    let stories = snap.data()['stories']
                    let dict = {'name': sessionStorage.getItem('name'), 'story': "", "points": 0, "current_points": 0, "current_round": 0, "picture": sessionStorage.getItem("Current_Profile_Pic")}
                    stories.push(dict)
                    players.push(sessionStorage.getItem('name'))
                    transaction.update(db.collection('rooms').doc(room_number), {players: players, stories: stories})
                } else if(snap.data()['started'] == true){
                    //show snackbar - it's snack time BABY
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function(){snack.className = snack.className.replace("show", "");}, 3000)
                }
            } else {
                sessionStorage.setItem('is_host', true)
                players_waiting = []
                let full_date = make_date();
                let dict = {'name': sessionStorage.getItem('name'), 'story': "", "points": 0, "current_points": 0, "current_round": 0, "picture": sessionStorage.getItem("Current_Profile_Pic")}
                transaction.set(db.collection('rooms').doc(room_number), {players: [sessionStorage.getItem('name')],
                room_number: room_number, stories: [dict], votes: 0, created: full_date, started: false})
            }
        })
    }).then(function(){
        db.collection('rooms').doc($("#room_number").val()).get().then(function(snap){
            if(snap.data()['started'] == false){
                sessionStorage.setItem('room', room_number)
                document.location.href = "./waiting.html";
            }
        })
    })
}

function main(){
    getDocumentId();
    setup_player();
    delete_games();
    $("#start").click(function(){
        begin_game();
    })
}

main();