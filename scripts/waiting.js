function shuffle() {
    /**
     * shuffles all scenarios and starts the game
     */
    let all_scenarios = []
    let shuffled = []
    db.collection("scenario").get().then(function (snap) {
        snap.forEach(function (doc) {
            all_scenarios.push(doc.data().scenario[0])
        })
        db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
            for (i = 0; i <= $("#round_number").val() - 1; i++) {
                let rand = Math.floor(Math.random() * all_scenarios.length);
                shuffled.push(all_scenarios[rand])
                all_scenarios.splice(rand, 1)
            }
            db.collection("rooms").doc(sessionStorage.getItem('room')).update({
                scenarios: shuffled,
                started: true,
                rounds: parseInt($("#round_number").val()) * snap.data()['players'].length
            }).then(function () {
                document.location.href = "./game2.html";
            })
        })
    })
}

function apply_host_buttons() {
    /**
     * makes host buttons appear if the player is the host
     */
    let decrement = document.createElement('button')
    decrement.innerHTML = '-'
    decrement.setAttribute('id', 'decrement')
    let round_number = document.createElement('input')
    round_number.setAttribute('type', 'text')
    round_number.setAttribute('id', 'round_number')
    let increment = document.createElement('button')
    increment.innerHTML = '+'
    increment.setAttribute('id', 'increment')
    let pick_rounds = document.createElement('p')
    pick_rounds.innerHTML = "Pick the number of rounds you'd like to play:"
    $("#host_options").prepend(pick_rounds)
    $("#rounds").append(decrement)
    $("#rounds").append(round_number)
    $("#rounds").append(increment)
    $("#round_number").val(5)
}

function host_function() {
    /**
     * this function changes the waiting room for the host
     */
    if (JSON.parse(sessionStorage.getItem('is_host')) == true) {
        let host_header = document.createElement('h1');
        host_header.innerHTML = "You are the host!"
        host_header.setAttribute('id', 'host_header')
        $("#host_div").append(host_header)

        $("#waiting").text('You may start the game when there are 3 or more players.')

        apply_host_buttons();

        let host_button = document.createElement('button')
        host_button.innerHTML = 'Start Game'
        host_button.setAttribute("id", "start_game")
        $("#host_options").append(host_button)

        $("#decrement").click(function () {
            let round_num = parseInt($("#round_number").val())
            $("#round_number").val(round_num - 1)
        })

        $("#increment").click(function () {
            let round_num = parseInt($("#round_number").val())
            $("#round_number").val(round_num + 1)
        })

        $("#start_game").click(function () {
            db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
                if (snap.data()['stories'].length >= 2 && $("#round_number").val() >= 3 && $("#round_number").val() <= 8) {
                    shuffle();
                } else if (snap.data()['stories'].length < 3) {
                    /**
                     * Supports snackbar display.
                     * It's snack time BABAAAYYYYY!
                     * I found this code on www.w3schools.com
                     * 
                     * @author www.w3schools.com
                     * @see https://www.w3schools.com/howto/howto_js_snackbar.asp
                     */
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function () { snack.className = snack.className.replace("show", ""); }, 3000)
                    $('#snackbar').html("Could not start the game: Please wait for at least three <a href='https://fiendship-85fa8.web.app/easteregg.html'>players.</a>")
                } else if ($("#round_number").val() < 3) {
                    $('#snackbar').text("Could not start the game: Please enter a number of round from 3-8.")
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function () { snack.className = snack.className.replace("show", ""); }, 3000)
                } else if ($("#round_number").val() > 8) {
                    $('#snackbar').text("Could not start the game: Please enter a number of round from 3-8.")
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function () { snack.className = snack.className.replace("show", ""); }, 3000)
                }
            })
        })
    } else {
        $("#host_options").remove();
    }
}

function remove_old_players() {
    /**
     * removes old players so that the refresh works properly
     */
    let old_players = document.getElementsByClassName('player')
    let old_player_length = old_players.length;
    let old_pictures = document.getElementsByClassName('profile_picture')
    for (i = 0; i < old_player_length; i++) {
        old_players[0].remove()
        old_pictures[0].remove()
    }
}

function add_new_players(players_waiting, snap) {
    /**
     * adds new players and their pictures
     * @param {Array} players_waiting   An array of all of the players in a given room
     * @param {Object} snap             A snapshot of a game room, with access to info about players and their stories
     */
    for (i = 0; i < players_waiting.length; i++) {
        let new_player = document.createElement('p')
        let new_picture = document.createElement('img')
        new_picture.setAttribute('src', snap.data()['stories'][i]['picture'])
        new_picture.setAttribute('class', 'profile_picture')
        new_player.innerHTML = players_waiting[i]
        new_player.setAttribute('class', 'player')
        $("#player_list").append(new_picture)
        $("#player_list").append(new_player)
    }
}

function main() {
    host_function();

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const refresh = async () => {
        while (1 > 0) {
            await sleep(2000)
            db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
                let players_waiting = snap.data()['players']
                remove_old_players();
                add_new_players(players_waiting, snap);
                if (sessionStorage.getItem('is_host') == "false") {
                    if (snap.data()['started'] == true) {
                        document.location.href = "./game2.html";
                    }
                }
            })
        }
    }
    refresh()
}

function getCurrentBackgroundPic() {
    /**
     * place current background picture
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