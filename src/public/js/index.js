const socket = io();
const productForm = document.getElementById("productForm");
const productsTable = document.getElementById("productsTable");
const buttonReload = document.getElementById("buttonReload");

// Escuchar la lista de productos y renderizarla
socket.on("productList", (products) => {
    renderTable(products);
});


//Renderizar la tabla
const renderTable = (products) => {
    let html = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Código</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Acciones</th> <!-- Nueva columna para los botones -->
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(product => {
        html += `
            <tr data-id="${product.id}">
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.code}</td>
                <td>$${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn btn-danger btn-delete" data-id="${product.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    productsTable.innerHTML = html;

    // evento Eliminar a cada boton
    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", async (event) => {
            const productId = event.target.getAttribute("data-id");

            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: "DELETE",
                });

                if (!response.ok) throw new Error("Error al eliminar el producto");

                // actualizar tabla
                socket.emit("newProductAdded"); //reutilizo el evento de agregar... 
            } catch (error) {
                console.error(error);
                alert("Hubo un error al eliminar el producto.");
            }
        });
    });
};


// Manejar envío del formulario por HTTP y actualizar con WebSocket
productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Capturar datos del formulario
    const newProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: Number(document.getElementById("price").value),
        status: true, // Por defecto, el producto está disponible
        stock: Number(document.getElementById("stock").value),
        category: document.getElementById("category").value,
        thumbnails: "" // No manejamos imágenes aún
    };

    try {
        // Enviar producto por HTTP POST
        const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) throw new Error("Error al agregar producto");
        if (response.ok) {socket.emit("newProductAdded");};

        // Limpiar el formulario después de enviar
        productForm.reset();
    } catch (error) {
        console.error(error);
        alert("Hubo un error al agregar el producto.");
    }
});


