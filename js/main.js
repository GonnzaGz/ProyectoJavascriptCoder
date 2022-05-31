let productosDB;

const usarCarrito = (estadoInicial)=> {
    let privado = estadoInicial;
    const publico = {
        get carrito(){
            return privado.carrito;
        },
        get productos(){
            return privado.productos;
        },
        agregaralCarrito :(id)=>{
            const [producto] = privado.productos.filter(item => item.id === id);
            if(producto){
                privado = {...privado, carrito: [...privado.carrito, producto]};
                return producto;
            }else{
                console.error("no se encontro el producto")
            }
            
        },
        removerdelCarrito: (id)=>{
            const nuevoCarrito = privado.carrito.filter(item => item.id !== id);
            privado = {...privado, carrito: nuevoCarrito};
        },
        actualizarProductos :(productos) =>{
            privado = {...privado, productos: productos};
        }
    };
    
    return publico;
}


const inicializacionCarrito = usarCarrito({productos:productosDB, carrito:[]})


const contenedor = document.getElementById("contPadre");


fetch(`js/db.json`)
.then(respuesta => {

    return respuesta.json()

})
.then(resultado => {
    productosDB = resultado;

    renderTipo({productosTipo:productosDB}); 
    render({productos:productosDB});   
    precios({productosPrecios:productosDB});  
    inicializacionCarrito.actualizarProductos(productosDB)
})

const id = {
    id:""
}


const panelCat = document.querySelector(".panelCat");
panelCat.innerHTML =`
<a id="cGeneral" href="">General</a>
<a id="cMotor" href="">Motor</a>
<a id="cSobrealimentacion" href="">Sobrealimentación</a>
<a id="cTransmision" href="">Transmisión</a>
<a id="cSuspension" href="">Suspensión</a>
<a id="cFrenos" href="">Frenos</a>
<a id="cLlantas" href="">Llantas</a>
<a id="cCubiertas" href="">Cubiertas</a>
<a id="cEscape" href="">Escape</a>
<a id="cBodykit" href="">BodyKit</a>
<a id="pMenor" href="">Menor precio</a>
<a id="pMayor" href="">Mayor precio</a>
<a id="tDeportivos" href="">Deportivos</a>
<a id="tCompeticion" href="">Competición</a>`

const cGeneral = document.querySelector("#cGeneral");
cGeneral.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"", tipo:"categoria"});
});

const cMotor = document.querySelector("#cMotor");
cMotor.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"motor", tipo:"categoria"});
});

const cSobrealimentacion = document.querySelector("#cSobrealimentacion");
cSobrealimentacion.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"sobrealimentacion", tipo:"categoria"});
});

const cTransmision = document.querySelector("#cTransmision");
cTransmision.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"transmision", tipo:"categoria"});
});

const cSuspension = document.querySelector("#cSuspension");
cSuspension.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"suspension", tipo:"categoria"});
});

const cFrenos = document.querySelector("#cFrenos");
cFrenos.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"frenos", tipo:"categoria"});
});

const cLlantas = document.querySelector("#cLlantas");
cLlantas.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"llantas", tipo:"categoria"});
});

const cCubiertas = document.querySelector("#cCubiertas");
cCubiertas.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"cubiertas", tipo:"categoria"});
});

const cEscape = document.querySelector("#cEscape");
cEscape.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"escape", tipo:"categoria"});
});

const cBodykit = document.querySelector("#cBodykit");
cBodykit.addEventListener("click",(e)=>{
    e.preventDefault();
    render({productos:productosDB, filtro:"bodykit", tipo:"categoria"});
});

const pMenor = document.querySelector("#pMenor");
pMenor.addEventListener("click",(e)=>{
    e.preventDefault();
    precios({productosPrecios:productosDB, tipo:"precio", opcion:"menor"});
});



const pMayor = document.querySelector("#pMayor");
pMayor.addEventListener("click",(e)=>{
    e.preventDefault();
    precios({productosPrecios:productosDB, tipo:"precio", opcion:"mayor"});
});

const tDeportivos = document.querySelector("#tDeportivos");
tDeportivos.addEventListener("click",(e)=>{
    e.preventDefault();
    renderTipo({productosTipo:productosDB, filtro:"DEPORTIV"});
});

const tCompeticion = document.querySelector("#tCompeticion");
tCompeticion.addEventListener("click",(e)=>{
    e.preventDefault();
    renderTipo({productosTipo:productosDB, filtro:"COMPETICION"});
});


function precios({productosPrecios, tipo, opcion}){
    contenedor.innerHTML = "";
        if (tipo == "precio"){
            if(opcion == "menor"){
                productosPrecios.sort((a, b) => {
                    if (a.precio < b.precio) {
                        return -1;
                    }
                    if (a.precio > b.precio) {
                        return 1
                    }
                    return 0
                })
            }else if(opcion == "mayor"){
                productosPrecios.sort((a, b) => {
                    if (a.precio < b.precio) {
                        return 1;
                    }
                    if (a.precio > b.precio) {
                        return -1
                    }
                    return 0
                })
            }
        }

            productosPrecios.map(itemProducto =>{
                contenedor.innerHTML += `
                <div class="contenedorTarjeta">
                    <img class="imgTarjeta" src="${itemProducto.imagen}" alt="">
                    <h2 class="nombreTarjeta">${itemProducto.nombre}</h2>
                    <p class="precioTarjeta">$${itemProducto.precio}</p>
                    <button id="${itemProducto.id}" class="btnTarjeta">COMPRAR</button>
                </div>`
                
            })
        }
function render({productos, filtro, tipo}){
    contenedor.innerHTML = "";
    if(filtro){
    productos = productos.filter(producto=>{
        if(filtro){
            return producto[tipo] == filtro;
        }
        
    })
}
    
    productos.forEach(itemProducto =>{
        contenedor.innerHTML += `
        <div class="contenedorTarjeta">
            <img class="imgTarjeta" src="${itemProducto.imagen}" alt="">
            <h2 class="nombreTarjeta">${itemProducto.nombre}</h2>
            <p class="catTarjeta">Categoria: ${itemProducto.categoria}</p>
            <p class="precioTarjeta">$${itemProducto.precio}</p>
            <button id="${itemProducto.id}" class="btnTarjeta">COMPRAR</button>
        </div>`
        
    })    
}


function renderTipo({productosTipo, filtro}){
    let arrayType = []
    contenedor.innerHTML = "";
    if(filtro){

        productosTipo.forEach(elm =>{
            
            let nombres = (elm.nombre).toUpperCase()
            let busqueda = nombres.indexOf(filtro)
            if(busqueda != -1){
                arrayType.push(elm)
            }
        })
    }

    
    arrayType.map(itemProducto =>{
            contenedor.innerHTML += `
            <div class="contenedorTarjeta">
                <img class="imgTarjeta" src="${itemProducto.imagen}" alt="">
                <h2 class="nombreTarjeta">${itemProducto.nombre}</h2>
                <p class="catTarjeta">Categoria: ${itemProducto.categoria}</p>
                <p class="precioTarjeta">$${itemProducto.precio}</p>
                <button id="${itemProducto.id}" class="btnTarjeta">COMPRAR</button>
            </div>`

            itemProducto.id.addEventListener('click', (e) => {
                console.log(e)
            })
        })
    

}




const carrito = document.querySelector("#carritoCompras");
carrito.addEventListener("click",(e)=>{
    e.preventDefault();
    const div1 = document.createElement("div");
    div1.classList.add("menuC");

    const div2 = document.createElement("div");
    div2.classList.add("separador");
    div2.id="separador";

    const div3 = document.createElement("div");
    div3.classList.add("menuGeneral");

    const a1 = document.createElement("a");

    const a2 = document.createElement("a");

    const button1 = document.createElement("button");

    const button2 = document.createElement("button");

    carrito.appendChild(div1);
    div1.appendChild(div2);
    
    div1.appendChild(div3);
    div3.appendchild(a1);
    div3.appendchild(a2);
    div3.appendChild(button1);
    div3.appendChild(button2);

    carrito.innerHTML = `
    <div class="menuC">
        <div id="separador" class="separador">
            <div class="menuProducto">
                <span><img src="" alt=""></span>
                <a href="">producto</a>
                <a href="">$</a>
                <a href="">cantidad</a>
                <button class="botonEliminar">X</button>
            </div>
        </div>
        <div class="menuGeneral">
            <a href="">Total:</a>
            <a href="">$ ------------</a>
            <button class="botonComprar">COMPRAR</button>
            <button class="botonVaciar">VACIAR CARRITO</button>
        </div>
    </div>
    `
});



const handleButtonBuyClick = (e)=> {
    const {target} = e;
    if(target.classList.contains("btnTarjeta")){
        let id = parseInt(target.id)
        inicializacionCarrito.agregaralCarrito(id)
        console.log(inicializacionCarrito.carrito)
    }
}
contenedor.addEventListener("click", handleButtonBuyClick )

