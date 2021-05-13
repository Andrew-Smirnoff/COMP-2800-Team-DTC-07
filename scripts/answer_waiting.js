const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const refresh = async () => {
    while (1 > 0) {
      await sleep(2000)
      db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
        let all_stories = snap.data()['stories']
        console.log(all_stories)
        if(all_stories.length >= 1){
            document.location.href = "./voting.html";
        }
    })    
    }
  }

  refresh()