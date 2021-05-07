let friends_list = sessionStorage.getItem('friends')
friends_list = friends_list.split(",")
let form = document.querySelector('form')

for(i = 0; i < friends_list.length; i++){
    let new_box = document.createElement('input');
    let new_label = document.createElement('label');
    new_box.setAttribute('type', 'checkbox')
    new_box.setAttribute('name', friends_list[i])
    new_label.setAttribute('for', friends_list[i])
    new_label.innerHTML = friends_list[i]
    form.appendChild(new_box)
    form.appendChild(new_label)
}