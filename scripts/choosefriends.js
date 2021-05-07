let friends_list = sessionStorage.getItem('friends')
console.log(friends_list)
console.log(typeof(friends_list))
var res = friends_list.split(",")
console.log(res)
let form = document.querySelector('form')
console.log(res.length)

for(i = 0; i < res.length; i++){
    console.log(res[i])
}