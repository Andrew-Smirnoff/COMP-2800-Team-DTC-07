const min_round_num = 2;
const max_round_num = 9;

main();

function main() {
    before_game();
    increment_btn();
    decrement_btn();
    redirect();
}

function before_game() {
    let friends_list = sessionStorage.getItem('friends')
    // console.log(friends_list);
    // console.log('friends_list_type: ', typeof(friends_list));
    friends_list = friends_list.split(",")
    // console.log('friends_list_type2: ', typeof(friends_list));  
    let form = document.querySelector('form')
    for (i = 0; i < friends_list.length; i++) {
        let new_box = document.createElement('input');
        let new_label = document.createElement('label');
        let friend_div = document.createElement('div');
        new_box.setAttribute('type', 'checkbox')
        new_box.setAttribute('name', 'friend-name')
        new_box.setAttribute('value', friends_list[i])
        new_box.setAttribute('class', 'checkbox')
        new_label.setAttribute('for', friends_list[i])
        new_label.setAttribute('class', 'friends_list')
        friend_div.setAttribute('class', 'friend_div')
        new_label.innerHTML = friends_list[i]
        friend_div.appendChild(new_label)
        friend_div.appendChild(new_box)
        form.appendChild(friend_div)
    }
}

function increment_btn() {
    $('#increment-btn').click(function () {
        var round_num = parseInt($('#round-num').val());
        $('#round-num').val(round_num + 1)
    });
}

function decrement_btn() {
    $('#decrement-btn').click(function () {
        var round_num = parseInt($('#round-num').val());
        if (round_num >= 2) {
            $('#round-num').val(round_num - 1)
        }
    });
}

function redirect() {
    $('#begin').click(function () {
        let friendsList = [];
        round_num = $('#round-num').val();
        $('input[name="friend-name"]:checked').each(function () {
            friend = this.value;
            friendsList.push(friend);
            console.log(friendsList);
            sessionStorage.setItem('friendsList', friendsList);
        });
        if (friendsList.length < 2 || friendsList.length > 5) {
            $(document).ready(function () {
                $(".toast-header").text("Insufficient Players");
                $(".toast-body").text("Please select two to five players to begin the game.");
                $('.toast').toast('show');
            });
            friendsList = []
        } else if (round_num < min_round_num || round_num > max_round_num) {
            $(document).ready(function () {
                $(".toast-header").text("Insufficient Number of Rounds");
                $(".toast-body").text("You must play two to nine rounds to begin the game.");
                $('.toast').toast('show');
            });
            round_num = 1;
            sessionStorage.setItem('round_num', round_num);
        } else {
            sessionStorage.setItem('round_num', round_num);
            shuffle()
        }
    });
}

function shuffle(){
    let all_scenarios = []
    let shuffled = []
    db.collection("scenario").get().then(function(snap){
        snap.forEach(function(doc){
            all_scenarios.push(doc.data().scenario[0])
        })
        for(i = 0; i < sessionStorage.getItem('round_num'); i++){
            let rand = Math.floor(Math.random() * all_scenarios.length);
            shuffled.push(all_scenarios[rand])
            all_scenarios.splice(rand, 1)
        }
        console.log(shuffled)
        let temp = []
        sessionStorage.setItem('scenarios', JSON.stringify(shuffled))
        sessionStorage.setItem('all_scenarios', JSON.stringify(temp))
        sessionStorage.setItem('player_counter', 0)
        document.location.href = "./game.html";
    })
}