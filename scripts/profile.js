main();

function main(){
    var document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log('[user current coins] ', doc.data().coins);
            let user_current_balance = doc.data().coins;
            $("#coins_go_here").text(user_current_balance);
        } else {
            console.log('no such document')
        }
    }).catch((error)=> {
        console.log('Error getting document: ', error)
    })

    $("#name_goes_here").text(sessionStorage.getItem('name'));
    
}

function getCurrentProfilePic() {
    let document_id = sessionStorage.getItem('document_id');
    var docRef = db.collection('users').doc(document_id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log('[user current profile pic] ', doc.data().current_profile_pic);
            let user_current_profile_pic = doc.data().current_profile_pic;
            $('#profile_pic').attr('src', user_current_profile_pic);
        } else {
            console.log('no such document')
        }
    }).catch((error)=> {
        console.log('Error getting document: ', error)
    })
}
getCurrentProfilePic();