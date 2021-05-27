/** 
 * Adds back button to go back to main page.
 */
$("#back").click(function(){
    document.location.href = "./main.html";
})

/**
 * Supports tab display.
 * I found this code on www.w3schools.com
 * 
 * @author www.w3schools.com
 * @see https://www.w3schools.com/howto/howto_js_tabs.asp
 * 
 * @param {object} evt A triggered event.
 * @param {string} choiceName Id for the selected element. 
 */
function storeChoice(evt, choiceName) {

  var i, tabcontent, bgtabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  bgtabcontent = document.getElementsByClassName("bg-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    bgtabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(choiceName).style.display = "grid";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();


/** 
 * Displays user coin balance.
 */
function displayBalance() {
  db.collection("users").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (doc.data().name == sessionStorage.name) {
          console.log(doc.data().coins)
          $('#balance-goes-here').text(doc.data().coins);
        }
      })

    })
}
displayBalance();


/** 
 * Displays user coin balance after purchasing an item.
 * @param {number} balance The current user's account balance.
 */
function displayBalanceAfterBuying(balance) {

  $('#balance-goes-here').text(balance);

}

 
/** 
 * Displays all available profile pictures from the database.
 */
function displayProfilePicsInStore() {
  db.collection("profile_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        let name = doc.data().name;
        let price = doc.data().price;
        let pic_url = doc.data().url;

        $(".tabcontent:visible").append("<div class='pic-container' ></div>");
        $('.pic-container:last').append("<img class='profile-pic' src=' " + pic_url + " ' alt='Avatar'>");
        $('.pic-container:last').append("<p class='price'> price " + price + "</p>");
        $('.pic-container:last').append("<button class='buy-btn' id='" + name + "' onclick='buyProfilePic(this.id);'>buy</button>");
      })
    })
}
displayProfilePicsInStore();

 
/** 
 * Displays all available background pictures from the database.
 */
function displayBgPicsInStore() {
  db.collection("background_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        let name = doc.data().name;
        let price = doc.data().price;
        let bg_pic_url = doc.data().url;

        $('.bg-tabcontent').append("<div class='bg-pic-container'></div>");
        $('.bg-pic-container:last').append("<img class='bg-pic' src=' " + bg_pic_url + " ' alt='Avatar'>");
        $('.bg-pic-container:last').append("<p class='bg-price'> price " + price + "</p>");
        $('.bg-pic-container:last').append("<button class='bg-buy-btn' id='" + name + "' onclick='buyBgPic(this.id);'>buy</button>");
      })
    })
}
displayBgPicsInStore();


/** 
 * Gets document_id in sessionStorage for identifying current user.
 */
function getDocumentId() {
  firebase.auth().onAuthStateChanged((user) => {
    let document_id = user.uid
    console.log('document_id: ', document_id)
    sessionStorage.setItem('document_id', document_id)
  });
}
getDocumentId();


/** 
 * Gets item_price in sessionStorage when buying a profile picture.
 * @param {string} id The current user's account id in the database.
 */
function buyProfilePic(id) {
  db.collection("profile_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (id == doc.data().name) {
          let item_price = doc.data().price;
          sessionStorage.setItem('item_price', item_price)
          let document_id = sessionStorage.getItem('document_id'); 
          updateDatabase(document_id, item_price, id);
        }

      })
    })
}


/** 
 * Gets item_price in sessionStorage when buying a background picture.
 * @param {string} id The current user's account id in the database.
 */
function buyBgPic(id) {
  db.collection("background_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (id == doc.data().name) {
          let item_price = doc.data().price;
          let document_id = sessionStorage.getItem('document_id');
          updateDatabaseForBgPic(document_id, item_price, id);
        }

      })
    })
}


/** 
 * Updates the database after a profile picture is bought.
 * @param {string} document_id The current user's account id in the database.
 * @param {number} item_price The price of the selected item.
 * @param {string} item_id The name of the selected item.
 */
function updateDatabase(document_id, item_price, item_id) {

  db.collection('users').doc(document_id).get().then((doc) => {

    var existing_profile_pics = doc.data().profile_pics;
    var item_id_url = './images/Profile pictures/' + item_id + '.png';

    if (existing_profile_pics.includes(item_id_url)) {
      alert('Hey, you have got this pic!');
    } else if (doc.data().coins < item_price) {
      snackbar();
    } else {
      var balance = doc.data().coins - item_price;
      db.collection("users")
        .doc(document_id).update({
          "coins": balance
        })
      givePlayerProfilePic(item_id);
      displayBalanceAfterBuying(balance);
    }
  })

}


/** 
 * Updates the database after a background picture is bought.
 * @param {string} document_id The current user's account id in the database.
 * @param {number} item_price The price of the selected item.
 * @param {string} item_id The name of the selected item.
 */
function updateDatabaseForBgPic(document_id, item_price, item_id) {

  db.collection('users').doc(document_id).get().then((doc) => {

    var existing_profile_pics = doc.data().background_pics;
    var item_id_url = './images/Background pictures/' + item_id + '.png';

    if (existing_profile_pics.includes(item_id_url)) {
      alert('Hey, you have got this pic!');
    } else if (doc.data().coins < item_price) {
      snackbar();
    } else {
      var balance = doc.data().coins - item_price;
      db.collection("users")
        .doc(document_id).update({
          "coins": balance
        })
      givePlayerBgPic(item_id);
      displayBalanceAfterBuying(balance);
    }
  })

}


/** 
 * Adds the purchased profile picture(s) url to user account in the database.
 * @param {string} id The current user's account id in the database.
 */
function givePlayerProfilePic(id) {

  let document_id = sessionStorage.getItem('document_id'); 

  db.collection("profile_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (id == doc.data().name) {
          let profile_pic_url = doc.data().url;

          db.collection("users")
            .doc(document_id).update({
              "profile_pics": firebase.firestore.FieldValue.arrayUnion(profile_pic_url)
            })
        }

      })
    })
}


/** 
 * Adds the purchased background picture(s) url to user account in the database.
 * @param {string} id The current user's account id in the database.
 */
function givePlayerBgPic(id) {

  let document_id = sessionStorage.getItem('document_id');

  db.collection("background_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (id == doc.data().name) {
          let bg_pic_url = doc.data().url;

          db.collection("users")
            .doc(document_id).update({
              "background_pics": firebase.firestore.FieldValue.arrayUnion(bg_pic_url)
            })   
        }

      })
    })
}

/**
 * Supports snackbar display.
 * I found this code on www.w3schools.com
 * 
 * @author www.w3schools.com
 * @see https://www.w3schools.com/howto/howto_js_snackbar.asp
 */
function snackbar() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

