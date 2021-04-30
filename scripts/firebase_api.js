// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCgER9S4FBPGbUg6yHZYtsPxALhZ8BzDDk",
    authDomain: "fiendship-85fa8.firebaseapp.com",
    projectId: "fiendship-85fa8",
    storageBucket: "fiendship-85fa8.appspot.com",
    messagingSenderId: "462108145345",
    appId: "1:462108145345:web:ddf1ded09345965d188640"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// This chunk of code below is for adding data into db

// goes to the database and gets the collection named aaa, and adds to it
// db.collection("aaa").add({
// this will be sent to the database
// first is the document name it will add to
// second is the data being sent to that document
//     fsfsdfsd: "jjjjjj"
// })
