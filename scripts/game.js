main();

function main(){
    sessionStorage.setItem('player_counter', 0);
    sessionStorage.setItem('all_scenarios', JSON.stringify([]));
    greeting();
    showStory();
    display_names();
    setup_submit();
}

function setup_submit(){
    $("#submit-btn").click(function(){
        let user_scenarios = JSON.parse(sessionStorage.getItem('all_scenarios'));
        let player_list = sessionStorage.getItem('friendsList').split(',')
        let player_counter = sessionStorage.getItem('player_counter')
        let new_story = $("#story").val();
        user_scenarios.push(new_story)
        $("#story").val('')
        player_counter++
        if(player_counter >= player_list.length){
            player_counter = 0;
        }
        sessionStorage.setItem('all_scenarios', JSON.stringify(user_scenarios))
        sessionStorage.setItem('player_counter', player_counter)
    })
}

function display_names(){
    let players = sessionStorage.getItem('friendsList').split(',')
    console.log(players)
    for(i = 0; i < players.length; i++){
        $("ul").append("<li>" + players[i] + "</li>")
    }
}

// console.log(sessionStorage.getItem('scenarios'));

// let scenarioString = sessionStorage.getItem('scenarios');
// console.log('scenarioString_type: ', typeof(scenarioString));

// createScenarios();
// showQuotes();

// function createScenarios() {
//     for (let i = 1; i <= 10; i++) { //create 10
//         let number = Math.floor(Math.random() * 10) + 1;
//         let sname = "scenario" + i;
//         let obj = {
//             name: sname,
//             random: number,
//             scenario: [
//                 "No pain no gain",
//                 "Tell me about something you see in me that makes you proud?",
//                 "If you could change one thing about our life, what would it be?"
//             ]
//         }
//         db.collection("scenarios").add(obj)
//             .then(function () {
//                 console.log("item added")
//             })
//     }
// }

// function showQuotes() {
//     let rand = 5;
//     db.collection("scenarios").where("random", "==", rand)
//         .get()
//         .then(function (snap) {             //collection of scenarios, just one
//             snap.forEach(function (doc) {   //just cycle thru one
//                 //console.log(doc.data());
//                 var list = doc.data().scenario;  //get array called "scenario"
//                 if (list) {
//                     list.forEach(function (item) {   //cycle thru array
//                         console.log(item);
//                         $("#quotes-go-here").append(item+ "\n");
//                     })
//                 }
//             })
//         })
// }

function greeting(){
    $('#name-goes-here').text(sessionStorage.getItem('name'))
}

function showStory(){
    let scenarios = JSON.parse(sessionStorage.getItem('scenarios'))
    $("#scenario-goes-here").text(scenarios[0])
}