let story_array = []
let form_selections = $("form")

db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
    story_array = snap.data()['stories'];
}).then(function(){
    for(i = 0; i < story_array.length; i++){
        let new_input = document.createElement('input')
        let new_label = document.createElement('p')
        new_input.setAttribute('type', 'radio')
        new_input.setAttribute('name', 'friend-name')
        new_input.setAttribute('value', story_array[i]['name'])
        new_label.innerHTML = story_array[i]['story']
        form_selections.append(new_label)
        form_selections.append(new_input)
    }
})

$('#submit').click(function(){
    $('input:checked').each(function () {
        friend = this.value;
        console.log(friend)
        db.collection('rooms').doc(sessionStorage.getItem('room')).get().then(function(snap){
            let stories = snap.data()['stories'];
            for(i = 0; i < stories.length; i++){
                if(stories[i]['name'] == friend){
                    stories[i]['points']++
                    console.log(stories)
                    db.collection('rooms').doc(sessionStorage.getItem('room')).update({
                        stories: stories
                    }).then(function(){
                        console.log(snap.data()['stories'])
                    })
                }
            }
        }).then(function(){
            document.location.href = "./results.html";
        })
    });
})