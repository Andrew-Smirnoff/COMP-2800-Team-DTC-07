function display_stories(){
    let story_list = $("ul")
    db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function (snap) {
        let stories = snap.data()['stories']
        for (i = 0; i < stories.length; i++) {
            let new_item = document.createElement('li')
            let new_image = document.createElement('img')
            let new_line = document.createElement("hr")
            new_image.setAttribute("src", stories[i]['picture'])
            new_image.setAttribute("class", "picture")
            new_item.setAttribute('class', 'player')
            new_item.setAttribute('id', i)
            story_list.append(new_item)
            story_list.append(new_line)
            $("#" + i).html(new_image)
            $("#" + i).append(stories[i]['name'] + " wrote: " + stories[i]['story'] + ", and was rewarded " + stories[i]['current_points'] + " points. They now have " + stories[i]['points'] + " points.")
        }
    })
}

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

function getCurrentBackgroundPic() {
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

function main(){
    getCurrentBackgroundPic();
    display_stories()
}

main();