/*Menu*/

$(document).ready(main)




var contador = 1;


function main(){
    $('.menu_bar').click(function(){
       
    if(contador == 1){
           $('nav').animate({
           left: '0'
           });
           contador = 0;
       } else {
           contador = 1;
           $('nav').animate({
            left: '-100%'
        });

       }

   });

};



/*Botón de subir*/

document.getElementById("button-up").addEventListener("click", scrollUp);

function scrollUp(){

    var currentScroll = document.documentElement.scrollTop;

    if (currentScroll > 0){
        window.requestAnimationFrame(scrollUp);
        window.scrollTo (0, currentScroll - (currentScroll / 10));
    }
}

buttonUp = document.getElementById("button-up");

window.onscroll = function(){

    var scroll = document.documentElement.scrollTop;

    if (scroll > 500){
        buttonUp.style.transform = "scale(1)";
    } else if(scroll < 500){
        buttonUp.style.transform = "scale(0)";
    }
}

const colorSwitch = document.querySelector('.theme-switch input[type="Checkbox"]');

function switchColor(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.setProperty('--sombra', '0.62rem 0.62rem 0rem 0rem #369e61, 1.25rem 1.25rem #6fc290');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.setProperty('--sombra', '0.62rem 0.62rem 0rem 0rem #369e61, 1.25rem 1.25rem #6fc290, 1.87rem 1.87rem 0.87rem #8cebb3');
    }
}

colorSwitch.addEventListener('change', switchColor, false);



