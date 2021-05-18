const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let next_page = true
const refresh = async () => {
  while (1 > 0) {
    await sleep(2000)
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
      let all_stories = []
      for(i = 0; i < snap.data()['stories'].length; i++){
        all_stories.push(snap.data()['stories'][i])
        if (all_stories[i]['story'] == "") {
          next_page = false
        }
      }
      let filtered = all_stories.filter(story => story['current_round'] == snap.data()['stories'][0]['current_round'])
      if(filtered.length != all_stories.length){
        next_page = false
      }
      if (next_page == true) {
        document.location.href = "./voting.html";
      }
      next_page = true;
    })
  }
}
refresh()