const stockProductos = [
    {
        id: 1,
        nombre: "Chiles Varios",
        cantidad: 1,
        desc:"Jalapeños, Habaneros x100g",
        precio: 1200,
        img: "imagenes/chiles.jpg",
      },
      {
        id: 2,
        nombre: "Nachos",
        cantidad: 1,
        desc: "Nachos de Harina de maiz x250g",
        precio: 1500,
        img: "imagenes/nachos.jpg",
      },
      {
        id: 3,
        nombre: "Salsa Tabasco",
        cantidad: 1,
        desc: "Salsa Picante Tabasco bot. 100ml",
        precio: 1570,
        img: "imagenes/tabasco.jpg",
      },
      {
        id: 4,
        nombre: "Tortillas Burrito",
        cantidad: 1,
        desc: "Tortillas de Harina de Trigo x10 unidades",
        precio: 1000,
        img: "imagenes/tortillaburrito.jpg",
      },
      {
        id: 5,
        nombre: "Salsa Valentina",
        cantidad: 1,
        desc: "Salsa Picante Valentina",
        precio: 1200,
        img: "imagenes/valentina.jpg",
      },
      {
        id: 6,
        nombre: "Tortilla Maiz",
        cantidad: 1,
        desc: "Tortilla De Harina de Maiz x10 unidades",
        precio: 1200,
        img: "imagenes/tortilla maiz.jpg",
      },
      {
        id: 7,
        nombre: "Tortilla Trigo",
        cantidad: 1,
        desc: "Tortilla de harina de Trigo x10 unidades",
        precio: 1400,
        img: "imagenes/tortillatrigo.png",
      },
      {
        id: 8,
        nombre: "Mezcal",
        cantidad: 1,
        desc: "Mezcal Ojo de Tigre botella 1L",
        precio: 1200,
        img: "imagenes/mezcal.jpg",
      },
      {
        id: 9,
        nombre: "Tequila",
        cantidad: 12,
        desc:"Tequila José Cuervo Botella 750ml",
        precio: 1400,
        img: "imagenes/tequila.jpg",
      },
      {
        id: 10,
        nombre: "Aguardiente",
        cantidad: 3,
        desc: "Aguardiente Antioqueño botella 750ml",
        precio: 1200,
        img: "imagenes/aguardiente.jpg",
      }
];     

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire(
        'Compra Exitosa!!',
        'Nos pondremos en contacto para el envio de su pedido!',
        'success'
      )
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agregaste Correctamente este Producto',
      showConfirmButton: false,
      timer: 1500
    })
  

  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agregaste Correctamente este Producto',
      showConfirmButton: false,
      timer: 1500
    })

  } 

  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}


