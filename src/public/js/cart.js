document.addEventListener('DOMContentLoaded', () => {
    const productsTable = document.getElementById('productsTable');
    const emptyCartBtn = document.getElementById('emptyCartBtn');

    // Manejar el clic en el botón de eliminar un producto
    productsTable.addEventListener('click', async (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const productId = event.target.getAttribute('data-pid');
            const cartId = event.target.getAttribute('data-cid');

            try {
                const response = await fetch(`http://localhost:8080/api/carts/${cartId}/${productId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                if (data.status === 'success') location.reload();
                else alert(data.message || 'Error al eliminar el producto');
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert('Hubo un error al intentar eliminar el producto');
            }
        }
    });

    // Manejar el clic en el botón de vaciar carrito
    emptyCartBtn.addEventListener('click', async () => {
        const cartId = emptyCartBtn.getAttribute('data-cid');

        try {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (data.status === 'success') location.reload();
            else alert(data.message || 'Error al vaciar el carrito');
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            alert('Hubo un error al intentar vaciar el carrito');
        }
    });
});
