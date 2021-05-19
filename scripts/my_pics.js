function openInventory(evt, inventoryType) {
    // Declare all variables
    var i, tabcontent, tablinks;


    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i=0; i<tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i< tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(inventoryType).style.display = "grid";
    evt.currentTarget.className += " active";

}

document.getElementById("defaultOpen").click();


// to get document_id in sessionStorage
function getDocumentId() {
    firebase.auth().onAuthStateChanged((user) => {
      let document_id = user.uid
      console.log('document_id: ', document_id)
      sessionStorage.setItem('document_id', document_id)
    });
  }
  getDocumentId();


  // getting the document_id into the session storage
  function getDocumentId() {
      firebase.auth().onAuthStateChanged((user) =>{
        let document_id = user.uid;
        console.log('document id: ', document_id);
        sessionStorage.setItem('document_id', document_id);
      })
  }
  getDocumentId();



function getUserProfPics() {
    db.collection("users").get().then(function (snap) {
        snap.forEach(function (doc) {
            if(doc.data().name == sessionStorage.name) {
                let arrayOfProfPics = doc.data().profile_pictures;  
                for(i = 0; i < arrayOfProfPics.length; i++) {
                    $('#pics').append("<img class='prof-pics' src=' " + arrayOfProfPics[i] + " ' alt='Avatar'>");
                }
            }
        })
    })
} 
getUserProfPics();


function getUserBgPics() {
    db.collection("users").get().then(function (snap) {
        snap.forEach(function (doc) {
            if(doc.data().name == sessionStorage.name) {
                let arrayOfProfPics = doc.data().background_pictures;  
                for(i = 0; i < arrayOfProfPics.length; i++) {
                    $('#bg-pics').append("<img class='backgound-pic' src=' " + arrayOfProfPics[i] + " ' alt='Avatar'>");
                }
            }
        })
    })
} 
getUserBgPics();

