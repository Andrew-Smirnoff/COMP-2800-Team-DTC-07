storageUserName();

function storageUserName() {
    firebase.auth().onAuthStateChanged(function (user) {        // Check the user that's logged in
        if (user) {
            db.collection('users')
                .doc(user.uid)                                  // the user's UID
                .get()                                          //READ !!
                .then(function (doc) {
                    var name = doc.data().name;                 // point to user's name in the document
                    sessionStorage.setItem('name', name);
                    // here is where you can edit stuff using session storage.
                    // It is important that it is done here, ex.
                    // let h1 = document.querySelector("h1")
                    // h1.innerHTML = sessionStorage.getItem('name')       
                })
        }
    })
}