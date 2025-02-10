const productIdForm = document.getElementById("productIdForm");
const productResult = document.createElement("div"); // Crear un div para mostrar el resultado
document.body.appendChild(productResult); // Agregarlo al body

// Función para renderizar la tabla de productos
const renderProduct = (product) => {
    let html = `
        <h3>Producto encontrado:</h3>
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
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.code}</td>
                    <td>$${product.price}</td>
                    <td>${product.stock}</td>
                    <td>${product.category}</td>
                </tr>
            </tbody>
        </table>
    `;
    productResult.innerHTML = html; // Mostrar el producto
};

// Manejar envío del formulario
productIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const productId = document.getElementById("pid").value;

    try {
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) throw new Error("Producto no encontrado");

        const product = await response.json();
        renderProduct(product); // Renderizar el producto encontrado
    } catch (error) {
        console.error(error);
        alert("Hubo un error al buscar el producto.");
    }
});
