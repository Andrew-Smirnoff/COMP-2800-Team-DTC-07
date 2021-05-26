main();

function main() {

    // driver function; places name of user and their current balance dynamically on page

    var document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    getCurrentBackgroundPic();
    getCurrentProfilePic();
    docRef.get().then((doc) => {

        if (doc.exists) {
            let user_current_balance = doc.data().coins;
            $("#coins_go_here").text(user_current_balance);
        }

        else {
            console.log('no such document')   
        }

    }).catch((error)=> {
        console.log('Error getting document: ', error)
    })

    $("#name_goes_here").text(sessionStorage.getItem('name'));
}

function getCurrentProfilePic() {
    
    // Updates profile picture on 'profile.html' to the user's current profile pic

    let document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    docRef.get().then((doc) => {

        if (doc.exists) {
            let user_current_profile_pic = doc.data().current_profile_pic;
            $('#profile_pic').attr('src', user_current_profile_pic);
        } 

        else {
            console.log('no such document')
        }

    }).catch((error)=> {
        console.log('Error getting document: ', error)
    })
}


function getCurrentBackgroundPic() {

   // Changes background picture url of 'profile.html' to the user's current background pic
    
    let document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    docRef.get().then((doc) => {

        if (doc.exists) {
            let user_current_bg_pic = doc.data().current_bg_pic;
            $('body').css('background-image', "url('" + user_current_bg_pic + "')");
        } 

        else {
            console.log('no such document')
        }

    }).catch((error)=> {
        console.log('Error getting document: ', error)
    })
}
