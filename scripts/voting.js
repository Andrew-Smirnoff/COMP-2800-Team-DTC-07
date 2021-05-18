let story_array = []
let form_selections = $("form")

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
    story_array = snap.data()['stories'];
}).then(function(){
    for(i = 0; i < story_array.length; i++){
        if(story_array[i]['name'] != sessionStorage.getItem('name')){
            let new_input = document.createElement('input')
            let new_label = document.createElement('p')
            new_input.setAttribute('type', 'radio')
            new_input.setAttribute('name', 'friend-name')
            new_input.setAttribute('value', story_array[i]['name'])
            new_label.innerHTML = story_array[i]['story']
            form_selections.append(new_label)
            form_selections.append(new_input)
        }
    }
})

$('#submit').click(function(){
    $('input:checked').each(function () {
        let vote = this.value;
        db.runTransaction((transaction) => {
            return transaction.get(db.collection('rooms').doc(sessionStorage.getItem('room'))).then(function(snap){
                let stories = snap.data()['stories']
                let vote_count = snap.data()['votes']
                vote_count++;
                for(i = 0; i < stories.length; i++){
                    if(stories[i]['name'] == vote){
                        stories[i]['points'] ++;
                        stories[i]['current_points'] ++;
                        console.log(stories)
                        transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), {stories: stories, votes: vote_count})
                    }
                }
            })
        }).then(function(){
            document.location.href = "./vote_waiting.html";
        })
    });
})