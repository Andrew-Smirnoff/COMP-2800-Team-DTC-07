let story_list = $("ul")

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
    let stories = snap.data()['stories']
    for(i = 0; i < stories.length; i++){
        let new_item = document.createElement('li')
        new_item.innerHTML = stories[i]['name'] + " wrote: " + stories[i]['story'] + ", and was rewarded " + stories[i]['points'] + " points. They now have " + stories[i]['points'] + " points."
        story_list.append(new_item)
    }
})

$("#continue").click(function(){
    db.collection('rooms').doc(sessionStorage.getItem('room')).update({
        stories: []
    }).then(function(){
        document.location.href = "./game2.html";
    })
})