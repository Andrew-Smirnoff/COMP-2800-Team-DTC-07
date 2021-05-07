storageUserName();
sayHello();

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

function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            console.log(somebody.uid);
            db.collection("users")
                .doc(somebody.uid)
                .get()                  //READ!!!
                .then(function (doc) {
                    console.log(doc.data().name);
                    var n = doc.data().name;
                    $("#name-goes-here").text(n);    //jQuery for quick select, .text is for setting text content
                    // get other things and do other things for this person
                })

        }
    })
}