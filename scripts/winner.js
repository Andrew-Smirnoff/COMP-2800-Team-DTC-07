db.collection('rooms').doc(sessionStorage.getItem('room')).get().the(function(snap){
    for(i = 0; i < snap.data()['stories'].length; i++){
        let new_item = document.createElement('li')
        new_item.innerHTML = snap.data()['stories']['name'] + " ended with " + snap.data()['stories']['points'] + " points."
        $("ul").append(new_item)
    }
})