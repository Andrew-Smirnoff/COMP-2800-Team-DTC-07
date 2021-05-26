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


function getUserProfPics() {
    db.collection("users").get().then(function (snap) {
        snap.forEach(function (doc) {
            if(doc.data().name == sessionStorage.name) {
                let arrayOfProfPics = doc.data().profile_pics;  
                for(i = 0; i < arrayOfProfPics.length; i++) {
                    $('#pics').append("<img class='prof-pics' id='"+ arrayOfProfPics[i] + "'src='" + arrayOfProfPics[i] + "'onclick='changeProfilePic(this.id)' 'alt='Avatar'>");
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
                let arrayOfProfPics = doc.data().background_pics;  
                for(i = 0; i < arrayOfProfPics.length; i++) {
                    $('#bg-pics').append("<img class='background-pic' id='" + arrayOfProfPics[i] + "'src=' " + arrayOfProfPics[i] + "'onclick='changeBgPic(this.id)'  ' alt='Avatar'>");
                }
            }
        })
    })
} 
getUserBgPics();


function getMainProfilePic() {
    db.collection("users").get().then(function(snap) {
        snap.forEach(function (doc) {
            if(doc.data().name == sessionStorage.name) {
                let mainProfPicLink = doc.data().current_profile_pic;
                $('.main-prof-pic').attr("src", mainProfPicLink);
            }
        })
    })
}getMainProfilePic(); 


function changeProfilePic(id) {
    console.log(id);
    $('.main-prof-pic').attr("src", id);
    let document_id = sessionStorage.getItem('document_id');
    let user_data = db.collection("users").doc(document_id);
    var setWithMerge = user_data.set({
        current_profile_pic: id
    }, {merge: true});
    sessionStorage.setItem('Current_Profile_Pic', id);
}

function changeBgPic(id) {
    console.log(id);
    let document_id = sessionStorage.getItem('document_id');
    let user_data = db.collection("users").doc(document_id);
    var setWithMerge = user_data.set({
        current_bg_pic: id
    }, {merge: true});
    getCurrentBackgroundPic();
}

function getCurrentBackgroundPic() {
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
}
getCurrentBackgroundPic();