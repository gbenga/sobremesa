const fruitAndVegURL = "http://localhost:3000/fruitandveg";

const toggle = document.getElementById('toggle')
const open = document.getElementById('open')
const close = document.getElementById('close')

toggle.addEventListener('click', () => { 
    document.body.classList.toggle('show-nav')
})