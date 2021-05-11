main();

function main() {
    before_game();
    increment_btn();
    decrement_btn();
    select_friends();
    enter_rounds();
}

function before_game() {
    let friends_list = sessionStorage.getItem('friends')
    friends_list = friends_list.split(",")
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

function select_friends() {
    $('#begin').click(function () {
        let friendsList = [];
        $('input[name="friend-name"]:checked').each(function () {
            console.log(this.value);
            friend = this.value;
            friendsList.push(friend);
            console.log(friendsList);
            sessionStorage.setItem('friendsList', friendsList);
        });
    });
}

function enter_rounds() {
$('#begin').click(function (){
    console.log($('#round-num').val());
    let round_num = $('#round-num').val();
    sessionStorage.setItem('round_num', round_num);
});
}
