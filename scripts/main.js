startApp();

function startApp() {
    firebase.auth().onAuthStateChanged(function (user) {        // Check the user that's logged in
        if (user) {
            db.collection('users')
                .doc(user.uid)                                  // the user's UID
                .get()                                          //READ !!
                .then(function (doc) {
                    var name = doc.data().name;                 // point to user's name in the document
                    var friends = doc.data().friends;
                    var coins = doc.data().coins;  // get user coins                  
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('friends', friends);
                    sessionStorage.setItem('coins', coins);
                    $('#name-goes-here').text(sessionStorage.getItem('name', name));    
                })
        }
    })
}