const sleep = (milliseconds) => {
  /**
   * Delay function 
   * I found this on sitepoint.com
   * @param {Number} milliseconds A number representing the number of milliseconds to pause for
   * @return {Promise}            A promise which delays program execution
   * @author James Hibbard
   * @see https://www.sitepoint.com/delay-sleep-pause-wait/
   */
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function remove_old_list(){
  /**
   * removes all pictures and names so that the refresh function doesn't keep piling up names
   */
  let old_p = document.getElementsByClassName('player')
  let old_pic = document.getElementsByClassName('profile_picture')
  let p_length = old_p.length
  for (i = 0; i < p_length; i++) {
    old_p[0].remove()
    old_pic[0].remove()
  }
}

function create_new_lists(stories){
  /**
   * adds new pictures and names
   * @param {Object} stories  An object representing a player's info during any given round
   * @return {Array}          An array containing the stories of all players
   */
  let all_stories = []
  for (i = 0; i < stories.length; i++) {
    all_stories.push(stories[i])
    if (all_stories[i]['story'] == "") {
      next_page = false
      let new_player = document.createElement('p')
      let new_picture = document.createElement('img')
      new_player.innerHTML = all_stories[i]['name']
      new_picture.setAttribute('src', all_stories[i]['picture'])
      new_picture.setAttribute('class', 'profile_picture')
      new_player.setAttribute('class', 'player')
      $("#player_list").append(new_picture)
      $("#player_list").append(new_player)
    }
  }
  return all_stories
}

function should_continue(all_stories, first_player_round){
  /**
   * decides whether or not it should continue to the next page
   * @param {Array} all_stories         An array containing the info about all playrs and their stories
   * @param {Number} first_player_round A number representing the round that the first player is on. This is needed to compare to the rounds of other players
   */
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

function getCurrentBackgroundPic() {
  /**
   * places the current background picture
   */
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
} getCurrentBackgroundPic();

main()