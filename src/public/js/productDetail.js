document.addEventListener("DOMContentLoaded", () => {
    if (!product || isNaN(product.stock) || product.stock <= 0) {
        document.getElementById("quantity").value = 0;
        document.getElementById("decrease").disabled = true;
        document.getElementById("increase").disabled = true;
        return;
    }

    const stock = parseInt(product.stock, 10);
    const quantityInput = document.getElementById("quantity");
    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");
    const addToCartBtn = document.getElementById("addToCartBtn");

    quantityInput.value = 1;

    // Funcionalidad de los botones para aumentar y disminuir la cantidad
    decreaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue < stock) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Evento para el botón "Agregar al carrito"
    addToCartBtn.addEventListener("click", async () => {
        const cartId = localStorage.getItem("cid"); // Obtener el cartId del localStorage
        const username = localStorage.getItem("user"); // Obtener el username del localStorage
        const quantity = parseInt(quantityInput.value, 10);

        if (!cartId) {
            Swal.fire('Error', 'No se ha encontrado un carrito. Por favor, intenta nuevamente.', 'error');
            return;
        }

        if (quantity <= 0) {
            Swal.fire('Error', 'La cantidad seleccionada no es válida.', 'error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}/${product.id}/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.status === 'success') {
                // Mostrar SweetAlert con dos opciones
                Swal.fire({
                    title: '¡Producto agregado!',
                    text: '¿Qué te gustaría hacer ahora?',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Ver más productos',
                    cancelButtonText: 'Ir al carrito',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirigir al index para ver más productos
                        window.location.href = 'http://localhost:8080/products/realtimeProducts/';
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Redirigir al carrito
                        if (username && cartId) {
                            window.location.href = `http://localhost:8080/products/realtimeProducts/cart/${cartId}`;
                        } else {
                            Swal.fire('Error', 'No se pudo encontrar tu carrito o usuario.', 'error');
                        }
                    }
                });
            } else {
                Swal.fire('Error', 'Hubo un problema al agregar el producto al carrito.', 'error');
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            Swal.fire('Error', 'Hubo un problema al procesar la solicitud. Intenta nuevamente más tarde.', 'error');
        }
    });
});
