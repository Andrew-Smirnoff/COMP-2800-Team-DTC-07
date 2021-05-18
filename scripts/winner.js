db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
    console.log(snap.data())
    for(i = 0; i < snap.data()['stories'].length; i++){
        let new_item = document.createElement('li')
        new_item.innerHTML = snap.data()['stories'][i]['name'] + " ended with " + snap.data()['stories'][i]['points'] + " points."
        $("ul").append(new_item)
    }
})

$("#finish").click(function(){
    db.collection("rooms").doc(sessionStorage.getItem('room')).delete().then(() => {
        document.location.href = "./main.html";
    });
})