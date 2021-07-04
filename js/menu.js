
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

function ocultar() {
    if (contador == 0){
        document.getElementById("nav").style.display = "none";
    }
}




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


/*Modo oscuro*/

/*const colorSwitch = document.querySelector('.theme-switch input[type="Checkbox"]');

function switchColor(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.setProperty('--sombra', '0.62rem 0.62rem 0rem 0rem #369e61, 1.25rem 1.25rem #6fc290');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.setProperty('--sombra', '0.62rem 0.62rem 0rem 0rem #369e61, 1.25rem 1.25rem #6fc290, 1.87rem 1.87rem 0.87rem #8cebb3');
    }
}

colorSwitch.addEventListener('change', switchColor, false);*/




/*Buscador interno*/

//Ejecutando funciones

document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);
document.getElementById("box-search").addEventListener("click", ocultar_buscador);
//Declarando variables

bars_search = document.getElementById("ctn-bars-search");
cover_ctn_search = document.getElementById("cover-ctn-search");
inputSearch = document.getElementById("inputSearch");
box_search = document.getElementById("box-search");

//Función para mostrar el buscador

function mostrar_buscador(){

    bars_search.style.top="65px";
    cover_ctn_search.style.display = "block";

    if(inputSearch.value === ""){
        box_search.style.display = "none";
    }
}


//Función para ocultar el buscador

function ocultar_buscador(){

    bars_search.style.top = "-35px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";
    box_search.style.display = "none";

}

//Creando filtrado de busqueda

document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){

    filter = inputSearch.value.toUpperCase();
    li = box_search.getElementsByTagName("li");
    
    //Recorriendo elementos a filtrar mediante los li

    for (i = 0; i < li.length; i++){

        a = li[i].getElementsByTagName("a")[0];
        textValue = a.textContent || a.innerText;

        if(textValue.toUpperCase().indexOf(filter) > -1){

            li[i].style.display = "";
            box_search.style.display = "block";

            if(inputSearch.value === ""){
                box_search.style.display = "none";
            }

        } else{
            li[i].style.display = "none";
        }
    }
}


/*Carousel*/

window.addEventListener('load', function(){
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.carousel__indicadores',
        arrows: {
           prev: '',
           next: ''
       },
       responsive: [
        {
          // screens greater than >= 775px
          breakpoint: 900,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: 4,
            slidesToScroll: 4,
            itemWidth: 150,
            duration: 0.25
          }
        },{
            // screens greater than >= 1024px
            breakpoint: 700,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 150,
              duration: 0.25
            }
          },{
          // screens greater than >= 1024px
          breakpoint: 550,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            itemWidth: 150,
            duration: 0.25
          }
        },{
            // screens greater than >= 1024px
            breakpoint: 100,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              itemWidth: 150,
              duration: 0.25
            }
          }
      ]
    });
});





