let story_list = $("ul")

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
    let stories = snap.data()['stories']
    for (i = 0; i < stories.length; i++) {
        let new_item = document.createElement('li')
        new_item.innerHTML = stories[i]['name'] + " wrote: " + stories[i]['story'] + ", and was rewarded " + stories[i]['current_points'] + " points. They now have " + stories[i]['points'] + " points."
        story_list.append(new_item)
    }
})

$("#submit").click(function () {
    db.runTransaction((transaction) => {
        return transaction.get(db.collection('rooms').doc(sessionStorage.getItem('room'))).then(function (snap) {
            let stories = snap.data()['stories'];
            for (i = 0; i < stories.length; i++) {
                if(stories[i]['name'] == sessionStorage.getItem('name')){
                    stories[i]['current_points'] = 0
                    stories[i]['story'] = ""
                    stories[i]['current_round'] = stories[i]['current_round'] + 1
                }
            }
            transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), {stories: stories,
            votes: 0})
        })
    }).then(function () {
        document.location.href = "./game2.html";
    })
})