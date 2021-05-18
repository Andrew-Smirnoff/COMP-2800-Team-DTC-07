const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  const refresh = async () => {
    while (1 > 0) {
      await sleep(2000)
      db.collection("rooms").doc(sessionStorage.getItem('room')).get().then(function (snap) {
        let votes = snap.data()['votes']
        if (votes == snap.data()['players'].length) {
          document.location.href = "./results.html";
        }
        next_page = true;
      })
    }
  }
  refresh()