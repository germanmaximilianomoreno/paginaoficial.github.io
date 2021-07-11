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
        draggable: false,
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



/*Carrito de compras*/

const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrecio = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1,
    }

    addItemCarrito(newItem)
}


function addItemCarrito(newItem){

    const alert = document.querySelector('.alert')

    setTimeout(function(){
        alert.classList.add('hide')
    }, 2000)
       alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__elemento')

    for(let i = 0; i < carrito.length; i++) {
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
        
        <th scope="row"></th>
                         <td class="table__productos">
                            <img src=${item.img} alt="">
                            <h5 class="title">${item.title}</h5>
                         </td>
                         <td class="table__precio"><p>${item.precio}</p></td>
                         <td class="table__cantidad">
                            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                            <button class="delete btn btn-danger">x</button>
                         </td>
        
        `

        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i = 0; i < carrito.length; i++) {

        if(carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function(){
        alert.classList.add('remove')
    }, 2000)
       alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage) {
        carrito = storage;
        renderCarrito()
    }
}
