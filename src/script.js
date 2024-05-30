// Script for navigation bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

// get product single page
const single_main_images = document.getElementById('single-main-images');
const gellary_images = document.getElementsByClassName('gallery-small-img');


// Header menu

if(bar){
    bar.onclick = () => {
        nav.classList.add('active')
    } 
}
if(close){
    close.onclick = () => {
        nav.classList.remove('active')
    } 
}


// single page product images change
gellary_images[0].onclick = () =>{
    single_main_images.src = gellary_images[0].src;
}
gellary_images[1].onclick = () =>{
    single_main_images.src = gellary_images[1].src;
}
gellary_images[2].onclick = () =>{
    single_main_images.src = gellary_images[2].src;
}
gellary_images[3].onclick = () =>{
    single_main_images.src = gellary_images[3].src;
}