function display_scenario(snap) {
    /**
   * delay function 
   * I found this on sitepoint.com
   * @author James Hibbard
   * @see https://www.sitepoint.com/delay-sleep-pause-wait/
   */
    let scenario_index = Math.floor(snap.data()['rounds'] / snap.data()['stories'].length) - 1;
    $("#scenario-goes-here").text(snap.data()['scenarios'][scenario_index])
}

function display_players(snap) {
    /**
     * displays all players and their profile pictures
     */
    let players = snap.data()['players']
    let stories = snap.data()['stories']
    for (i = 0; i < players.length; i++) {
        let new_image = document.createElement('img')
        let new_player = document.createElement('p')
        let all_players = document.getElementById('player_list')
        new_image.setAttribute("src", stories[i]['picture'])
        new_image.setAttribute('class', 'profile_picture')
        new_player.setAttribute('class', 'player')
        new_player.innerHTML = players[i]
        all_players.appendChild(new_image)
        all_players.appendChild(new_player)
    }
}

function display_page_info() {
    /**
     * function to display scenarios and players
     */
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
        display_scenario(snap)
        display_players(snap)
    })
}

function main() {
    display_page_info();
    $("#submit-btn").click(function () {
        console.log('a')
        if ($("#story").val() == "") {
            /**
             * Supports snackbar display.
             * I found this code on www.w3schools.com
             * 
             * @author www.w3schools.com
             * @see https://www.w3schools.com/howto/howto_js_snackbar.asp
             */
    $('#snackbar').text("Please enter a story to submit!")
            let snack = document.getElementById('snackbar')
            snack.className = "show"
            setTimeout(function(){snack.className = snack.className.replace("show", "");}, 3000)
        } else {
            let all_stories = []
            let story = $("#story").val();
            db.runTransaction((transaction) => {
                return transaction.get(db.collection('rooms').doc(sessionStorage.getItem('room'))).then(function (snap) {
                    all_stories = snap.data()['stories']
                    for (i = 0; i < all_stories.length; i++) {
                        if (all_stories[i]['name'] == sessionStorage.getItem('name')) {
                            all_stories[i]['story'] = story;
                        }
                    }
                    transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), { stories: all_stories })
                })
            }).then(function () {
                document.location.href = "./answer_waiting.html";
            })
        }
    })
}

function getCurrentBackgroundPic() {
    /**
     * places the current background picture
     */
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