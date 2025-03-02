const socket = io();
const productsTable = document.getElementById("productsTable");

// Verificar si el usuario ya está registrado en el localStorage
const user = localStorage.getItem("user");
const cartId = localStorage.getItem("cid");

if (!user) {
    // Si no hay usuario guardado, mostrar SweetAlert para registrar el nombre
    Swal.fire({
        title: '¡Bienvenido!',
        text: 'Aún no estás registrado. Por favor, ingresa tu nombre.',
        input: 'text',
        inputPlaceholder: 'Nombre de usuario',
        confirmButtonText: 'Registrar',
        showCancelButton: false,
        preConfirm: (inputValue) => {
            if (inputValue) {
                // Si se ingresa un nombre, guardarlo en localStorage y crear el carrito
                localStorage.setItem("user", inputValue);
                createCart(inputValue);
            } else {
                // Si no se ingresa nombre, prevenir el cierre del modal
                Swal.showValidationMessage('El nombre es obligatorio');
            }
        }
    });
} else if (!cartId) {
    // Si el usuario está registrado pero no tiene carrito, creamos el carrito
    createCart(user);
}

// Crear un carrito en la base de datos y guardar el id en el localStorage
const createCart = async (userName) => {
    try {
        const response = await fetch(`http://localhost:8080/api/carts/${userName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.status === 'success') {
            // Guardar el cartId en el localStorage
            localStorage.setItem("cid", data.payload._id);
            Swal.fire('¡Carrito creado!', 'Tu carrito ha sido creado correctamente.', 'success').then(() => {
                // Después de mostrar el éxito, recargar la página para mostrar los productos
                location.reload(); // Recarga la página para mostrar los productos
            });
        } else {
            Swal.fire('Error', 'No se pudo crear el carrito. Intenta nuevamente.', 'error');
        }
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        Swal.fire('Error', 'Hubo un problema al crear tu carrito. Intenta nuevamente más tarde.', 'error');
    }
};

// Escuchar la lista de productos y renderizarla
socket.on("productList", (products) => renderTable(products));

// Renderizar las cartas de productos
const renderTable = (products) => {
    productsTable.innerHTML = products.map(product => `
        <div class="col">
            <div class="card shadow-sm" style="max-width: 250px;">
                <img src="${product.img.thumbnails}" class="card-img-top" alt="${product.img.alt}">
                <div class="card-body p-2">
                    <h6 class="card-title text-truncate">${product.title}</h6>
                    <p class="card-text text-muted small">${product.description}</p>
                    <h6 class="fw-bold">$${product.price}</h6>
                    <a href="/products/realtimeProducts/productDetail/${product._id}" class="btn btn-primary btn-sm w-100">Product Detail</a>
                </div>
            </div>
        </div>
    `).join("");
};




