function display_scenario(snap){
    let scenario_index = Math.floor(snap.data()['rounds'] / snap.data()['stories'].length) - 1;
    $("#scenario-goes-here").text(snap.data()['scenarios'][scenario_index])
}

function display_players(snap){
    let players = snap.data()['players']
    let stories = snap.data()['stories']
    for (i = 0; i < players.length; i++) {
        let new_image = document.createElement('img')
        let new_li = document.createElement('li')
        let ul = document.querySelector('ul')
        new_image.setAttribute("src", stories[i]['picture'])
        new_li.setAttribute('class', 'player')
        new_li.setAttribute('id', i)
        ul.appendChild(new_li)
        $("#" + i).html(new_image)
        $("#" + i).append(players[i])
    }
}

function display_page_info(){
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
        display_scenario(snap)
        display_players(snap)
    })
}

function submit_story(){
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
}

function main(){
    display_page_info();
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
}

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


main();