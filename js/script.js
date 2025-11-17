/* Data */
let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

let editingId = null;

/* Format Rupiah */
function formatRupiah(number) {
    return "Rp " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ---------------- DASHBOARD ---------------- */
const summary = {
    totalSales: 85,
    totalRevenue: 12500000
};

function renderDashboard() {
    const container = document.getElementById("summaryCards");
    if (!container) return;

    container.innerHTML = "";

    const items = [
        { title: "Total Produk", value: products.length }, // otomatis mengikuti jumlah produk
        { title: "Total Penjualan", value: summary.totalSales },
        { title: "Total Revenue", value: formatRupiah(summary.totalRevenue) }
    ];

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card-summary";
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.value}</p>
        `;
        container.appendChild(card);
    });
}

/* ---------------- PRODUCTS TABLE ---------------- */
function renderProducts() {
    const tbody = document.querySelector("#productsTable tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    products.forEach((p, i) => {
        const tr = document.createElement("tr");
        tr.dataset.id = p.id;

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.name}</td>
            <td>${formatRupiah(p.price)}</td>
            <td>${p.stock}</td>
            <td>
                <button class="action-btn" onclick="editProduct(${p.id})">✏️</button>
                <button class="action-btn" onclick="deleteProduct(${p.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/* ---------------- DELETE PRODUCT ---------------- */
function deleteProduct(id) {
    if (!confirm("Yakin hapus produk ini?")) return;

    products = products.filter(p => p.id !== id);
    
    renderProducts();
    renderDashboard();
}

/* ---------------- EDIT PRODUCT ---------------- */
function editProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    editingId = id;

    document.getElementById("editName").value = p.name;
    document.getElementById("editPrice").value = p.price;
    document.getElementById("editStock").value = p.stock;

    document.getElementById("editModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function saveEdit() {
    const name = document.getElementById("editName").value;
    const price = Number(document.getElementById("editPrice").value);
    const stock = Number(document.getElementById("editStock").value);

    const index = products.findIndex(p => p.id === editingId);

    products[index].name = name;
    products[index].price = price;
    products[index].stock = stock;

    closeModal();
    renderProducts();
    renderDashboard();
}

/* ---------------- ADD PRODUCT ---------------- */
function openAddModal() {
    document.getElementById("addName").value = "";
    document.getElementById("addPrice").value = "";
    document.getElementById("addStock").value = "";
    document.getElementById("addModal").style.display = "flex";
}

function closeAddModal() {
    document.getElementById("addModal").style.display = "none";
}

function saveAdd() {
    const name = document.getElementById("addName").value.trim();
    const price = Number(document.getElementById("addPrice").value);
    const stock = Number(document.getElementById("addStock").value);

    if (!name || !price || !stock) {
        alert("Semua input harus diisi!");
        return;
    }

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        stock: stock
    };

    products.push(newProduct);

    closeAddModal();
    renderProducts();
    renderDashboard();
}

/* ---------------- AUTO RENDER ---------------- */
if (document.querySelector("#productsTable")) {
    renderProducts();
}

if (document.querySelector("#summaryCards")) {
    renderDashboard();
}

/* ---------------- EXPOSE ---------------- */
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.saveEdit = saveEdit;
window.closeModal = closeModal;

window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;
window.saveAdd = saveAdd;

