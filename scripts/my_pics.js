function openInventory(evt, inventoryType) {
/**
 * Supports tab display.
 * I found this code on www.w3schools.com
 * 
 * @author www.w3schools.com
 * @see https://www.w3schools.com/howto/howto_js_tabs.asp
 */
        
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for(i=0; i<tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i< tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(inventoryType).style.display = "grid";
    evt.currentTarget.className += " active";
}


document.getElementById("defaultOpen").click();


function getDocumentId() {
    /** 
     * To get document_id in sessionStorage
    */
    firebase.auth().onAuthStateChanged((user) => {
      let document_id = user.uid
      sessionStorage.setItem('document_id', document_id)
    });
}
getDocumentId();


function getUserProfPics() {
    /** 
     * GETS all of the profile pics the user has bought and places them dynamically on 'my_pics.html'
    */
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
    /**
     * GETS all of the background pics the user has bought from database and places them dynamically on 'my_pics.html'
    */
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
    /**
     * GETS the current profile pic from the database and places it dynamically at top of 'my_pics.html' page
    */
    db.collection("users").get().then(function(snap) {
        snap.forEach(function (doc) {
            if(doc.data().name == sessionStorage.name) {
                let mainProfPicLink = doc.data().current_profile_pic;
                $('.main-prof-pic').attr("src", mainProfPicLink);
            }
        })
    })
}
getMainProfilePic(); 


function changeProfilePic(id) {
    /** 
     * When a profile picture from the collection is clicked on 'my_pics.html', the clicked picture gets updated
     * in the database as well as in the src attribute of the main profile picture
     * @param {String} id link to profile picture being changed
    */
    $('.main-prof-pic').attr("src", id);
    let document_id = sessionStorage.getItem('document_id');
    let user_data = db.collection("users").doc(document_id);
    var setWithMerge = user_data.set({
        current_profile_pic: id
    }, {merge: true});
    sessionStorage.setItem('Current_Profile_Pic', id);
}


function changeBgPic(id) {
    /** 
     * Changes background picture on click of one of the background pictures in the collection on 'my_pics.html';
     * The current background field also gets updated in the database
     * @param {String} id link to background picture being changed
    */
    let document_id = sessionStorage.getItem('document_id');
    let user_data = db.collection("users").doc(document_id);
    var setWithMerge = user_data.set({
        current_bg_pic: id
    }, {merge: true});
    getCurrentBackgroundPic();
}


function getCurrentBackgroundPic() {
    /** 
     * Changes background pic url of 'my_pics.html' to the users current background pic
    */
    let document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    docRef.get().then((doc) => {
        if (doc.exists) {
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