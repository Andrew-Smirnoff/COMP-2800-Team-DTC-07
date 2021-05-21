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
                        transaction.update(db.collection('rooms').doc(sessionStorage.getItem('room')), {stories: stories, votes: vote_count, rounds: snap.data()['rounds'] - 1})
                    }
                }
            })
        }).then(function(){
            document.location.href = "./vote_waiting.html";
        })
    });
})

function display_stories(){
    let story_array = []
    let form_selections = $("form")

    db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
        story_array = snap.data()['stories'];
    }).then(function(){
        for(i = 0; i < story_array.length; i++){
            if(story_array[i]['name'] != sessionStorage.getItem('name')){
                let new_label = document.createElement('label')
                let new_input = document.createElement('input')
                new_input.setAttribute('type', 'radio')
                new_input.setAttribute('name', 'vote')
                new_input.setAttribute('id', story_array[i]['story'])
                new_input.setAttribute('value', story_array[i]['name'])
                new_label.setAttribute('for', story_array[i]['story'])
                new_label.innerHTML = story_array[i]['story']
                form_selections.append(new_label)
                form_selections.append(new_input)
            }
        }
    })
}

function main(){
    display_stories()
}

main()