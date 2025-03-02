const socket = io();
const productsTable = document.getElementById("productsTable");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const categoryFilter = document.getElementById("categoryFilter");

let currentPage = 1;
let totalPages = 1;
let currentCategory = "";

// Cargar productos
const loadProducts = async (page = 1, category = "") => {
    try {
        const res = await fetch(`/api/products?page=${page}&limit=9${category ? `&query=${category}` : ""}`);
        const data = await res.json();

        if (data.status === "success") {
            totalPages = data.payload.totalPages;
            currentPage = data.payload.page;
            renderTable(data.payload.docs);
            updatePagination();
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

// Mostrar productos
const renderTable = (products) => {
    productsTable.innerHTML = products.map(p => `
        <div class="col">
            <div class="card">
                <img src="${p.img.thumbnails}" class="card-img-top">
                <div class="card-body">
                    <h6>${p.title}</h6>
                    <p>${p.description}</p>
                    <h6>$${p.price}</h6>
                    <a href="/products/realtimeProducts/productDetail/${p._id}" class="btn btn-primary btn-sm">Ver</a>
                </div>
            </div>
        </div>
    `).join("");
};

// Actualizar botones de paginación
const updatePagination = () => {
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
};

// Eventos
prevPageBtn.addEventListener("click", () => loadProducts(currentPage - 1, currentCategory));
nextPageBtn.addEventListener("click", () => loadProducts(currentPage + 1, currentCategory));
categoryFilter.addEventListener("change", (e) => loadProducts(1, e.target.value));

// Escuchar cambios en tiempo real
socket.on("productList", renderTable);

// Cargar al iniciar
loadProducts();

