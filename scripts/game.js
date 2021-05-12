greeting();
showQuotes();

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

function showQuotes() {
    let rand = Math.floor((Math.random() * 10) + 1);
    db.collection("scenario").where("random", "==", rand)
        .get()
        .then(function (snap) {             //collection of scenarios, just one
            console.log('snap ', snap)
            snap.forEach(function (doc) {   //just cycle thru one
                var list = doc.data().scenario;  //get array called "scenario"
                if (list) {
                    list.forEach(function (item) {   //cycle thru array
                        console.log(item);
                        $("#scenario-goes-here").append(item+ "\n");
                    })
                }
            })
        })
}


