const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function remove_old_list(){
  let old_li = document.querySelectorAll('li')
  for (i = 0; i < old_li.length; i++) {
    old_li[i].remove()
  }
}

function create_new_lists(stories){
  let all_stories = []
  for (i = 0; i < stories.length; i++) {
    all_stories.push(stories[i])
    if (all_stories[i]['story'] == "") {
      next_page = false
      let player = document.createElement("li")
      player.innerHTML = all_stories[i]['name']
      $("#player_list").append(player)
    }
  }
  return all_stories
}

function should_continue(all_stories, first_player_round){
  let next_page = true
  for(let i = 0; i < all_stories.length; i++){
    if(all_stories[i]['story'] == ""){
      next_page = false;
    }
  }
  let filtered = all_stories.filter(story => story['current_round'] == first_player_round)
  if (filtered.length != all_stories.length) {
    next_page = false
  }
  if (next_page == true) {
    document.location.href = "./voting.html";
  }
}

const main = async () => {
  while (1 > 0) {
    await sleep(2000)
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
      remove_old_list()
      let all_stories = create_new_lists(snap.data()['stories'])
      should_continue(all_stories, snap.data()['stories'][0]['current_round'])
    })
  }
}

main()