let friends_list = sessionStorage.getItem('friends')
let form = document.querySelector('form')

for(i = 0; i < friends_list.length; i++){
    console.log(friends_list[i])
}