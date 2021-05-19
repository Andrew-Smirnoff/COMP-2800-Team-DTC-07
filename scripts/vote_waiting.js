const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const refresh = async () => {
  while (1 > 0) {
    await sleep(2000)
    db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
      let votes = snap.data()['votes']
      if (votes == snap.data()['players'].length) {
        if (Math.floor(snap.data()['rounds'] / snap.data()['players'].length) == 0) {
          document.location.href = "./winner.html";
        } else {
          document.location.href = "./results.html";
        }
      }
      next_page = true;
    })
  }
}
refresh()