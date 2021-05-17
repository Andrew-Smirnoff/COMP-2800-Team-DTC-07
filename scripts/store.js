
// for tab display
function storeChoice(evt, choiceName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
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

// for display user coin balance
function displayBalance() {
  db.collection("users").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        // console.log(doc.data().name)
        // console.log(doc.data().coins)
        if (doc.data().name == sessionStorage.name) {
          console.log(doc.data().coins)
          $('#balance-goes-here').text(doc.data().coins);
        }
      })

    })
}
displayBalance();

function displayBalanceAfterBuying(balance) {
  
  $('#balance-goes-here').text(balance);

}

function displayProfilePicsInStore() {
  db.collection("profile_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        // console.log('doc: ', doc.data())
        // console.log('name: ', doc.data().name)
        let name = doc.data().name;
        let price = doc.data().price;
        let pic_url = doc.data().url;
        // console.log(name);
        // console.log(price);
        console.log(pic_url);

        $('.tabcontent').append("<div class='pic-container'></div>");
        $('.pic-container:last').append("<img class='profile-pic' src=' " + pic_url + " ' alt='Avatar'>");
        $('.pic-container:last').append("<p class='price'> price " + price + "</p>");
        $('.pic-container:last').append("<button class='buy-btn' id='" + name + "' onclick='buy(this.id)'>buy</button>");
      })
    })
}
displayProfilePicsInStore();

function displayBackgroundPicsInStore() {
  db.collection("background_pictures").get().then(
    function (snap) {
      snap.forEach(function (doc) {
        console.log(doc.data().name);
        console.log(doc.data().price);
        console.log(doc.data().url);

        let name = doc.data().name;
        let price = doc.data().price;
        let url = doc.data().url;

        $('.bgtabcontent').append("<div class='pic-container1'></div>");
        $('.pic-container1:last').append("<img class='bg-pic' src=' " + url + " ' alt='Background'>");
        $('.pic-container1:last').append("<p class='price'> price " + price + "</p>");
        $('.pic-container1:last').append("<button class ='bg-buy-btn' id='" + name + " 'onclick='buy(this.id)'>buy</button>");
      })
    }
  )
}
displayBackgroundPicsInStore();

// to get document_id in sessionStorage
function getDocumentId() {
  firebase.auth().onAuthStateChanged((user) => {
    let document_id = user.uid
    console.log('document_id: ', document_id)
    sessionStorage.setItem('document_id', document_id)
  });
}
getDocumentId();

// to get item_price in sessionStorage
function buy(id) {
  console.log('btn-id: ', id) // btn-id: Tired, Angry, Solider...
  db.collection("profile_pictures").get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (id == doc.data().name) {
          let item_price = doc.data().price;
          console.log('item_price: ', item_price)
          // sessionStorage.setItem('item_price', item_price)
          let document_id = sessionStorage.getItem('document_id');
          console.log('33', document_id);
          console.log('44', typeof (document_id));
          updateDatabase(document_id, item_price);          
        }
      })
    })
}

function updateDatabase(document_id, item_price) {

  db.collection('users').doc(document_id).get().then((doc) => {
    console.log('3: ', doc.data());
    console.log('coins', doc.data().coins)
    let balance = doc.data().coins - item_price;
    
    db.collection("users")
      .doc(document_id).update({
        "coins": balance
      })
      displayBalanceAfterBuying(balance);
      console.log('current balance', balance)
  })
  
}

