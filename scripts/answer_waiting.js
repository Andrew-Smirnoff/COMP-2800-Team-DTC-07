const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let next_page = true
const refresh = async () => {
  while (1 > 0) {
    await sleep(2000)
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
      let all_stories = snap.data()['stories']
      for (i = 0; i < all_stories.length; i++) {
        if (all_stories[i]["story"] == "") {
          next_page = false
        }
      }
      if (next_page == true) {
        document.location.href = "./voting.html";
      }
      next_page = true;
    })
  }
}
refresh()