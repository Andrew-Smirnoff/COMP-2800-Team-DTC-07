let friends_list = sessionStorage.getItem('friends')
let form = document.querySelector('form')
console.log(friends_list.length)

for(i = 0; i < friends_list.length; i++){
    console.log(friends_list[i])
}