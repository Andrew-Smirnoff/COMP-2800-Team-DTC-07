function main(){
    players_waiting = []
    let today = new Date();
    let day = String(today.getDate())
    let month = String(today.getMonth())
    let year = String(today.getFullYear())
    let full_date = year + '/' + month + '/' + day

    if (JSON.parse(sessionStorage.getItem('is_host')) == true) {
        let host_header = document.createElement('h1');
        host_header.innerHTML = "You are the host!"
        host_header.setAttribute('id', 'host_header')
        $("#host_div").append(host_header)

        $("#waiting").text('You may start the game when there are 3 or more players.')

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
            db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
                if(snap.data()['stories'].length >= 2 && $("#round_number").val() >= 3 && $("#round_number").val() <= 8){
                    shuffle();
                } else if(snap.data()['stories'].length < 3){
                    //show snackbar - it's snack time BABAAAYYYYY
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function(){snack.className = snack.className.replace("show", "");}, 3000)
                    $('#snackbar').html("Could not start the game: Please wait for at least three <a href='https://fiendship-85fa8.web.app/easteregg.html'>players.</a>")
                } else if($("#round_number").val() < 3){
                    $('#snackbar').text("Could not start the game: Please enter a number of round from 3-8.")
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function(){snack.className = snack.className.replace("show", "");}, 3000)
                } else if($("#round_number").val() > 8){
                    $('#snackbar').text("Could not start the game: Please enter a number of round from 3-8.")
                    let snack = document.getElementById('snackbar')
                    snack.className = "show"
                    setTimeout(function(){snack.className = snack.className.replace("show", "");}, 3000)
                }
            })
        })
    } else {
        $("#host_options").remove();
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
                for (i = 0; i < old_li.length; i++) {
                    old_li[i].remove()
                }
                for (i = 0; i < players_waiting.length; i++) {
                    let new_li = document.createElement('li')
                    let ul = document.querySelector('ul')
                    new_li.innerHTML = players_waiting[i]
                    ul.appendChild(new_li)
                }
                if (sessionStorage.getItem('is_host') == "false") {
                    if (snap.data()['started'] == true) {
                        document.location.href = "./game2.html";
                    }
                }
            })
        }
    }

    refresh()

    function shuffle() {
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
}

main();