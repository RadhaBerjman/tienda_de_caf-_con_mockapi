const API_URL = "https://68b6233fe5dc090291b0f238.mockapi.io/articulos";

// Destructuring de elementos del DOM
const {
  cards: cardsContainer, spinner, name: nameFilter, type: typeFilter, roast: roastFilter,
  'clear-filters': clearFiltersBtn, addBtn, modalForm: modal, closeModal, cancelBtn, saveBtn,
  formProduct, notification, notificationMessage, closeNotification,'prev-btn': prevBtn,'next-btn': nextBtn
} = Object.fromEntries(
  ['cards', 'spinner', 'name', 'type', 'roast', 'clear-filters', 'addBtn', 
   'modalForm', 'closeModal', 'cancelBtn', 'saveBtn', 'formProduct', 
   'notification', 'notificationMessage', 'closeNotification', 
   'prev-btn', 'next-btn']
    .map(id => [id, document.getElementById(id)])
);

// Mostrar/Ocultar spinner
function showSpinner() { // Remueve la clase is-hidden para mostrar el spinner
  spinner.classList.remove("is-hidden");
}
function hideSpinner() {
  spinner.classList.add("is-hidden");// Añade la clase is-hidden para ocultar el spinner
}

// Fetch de productos. Creo la función asíncrona fetchProducts que utilizaremos varias veces
async function fetchProducts() {
  try {
    showSpinner();
    let url = API_URL;

    // MockAPI no soporta paginación con ?page=, usamos límite
    const params = [`limit=${limit}`, `page=${currentPage}`];
    // Filtramos por nombre, por tipo y por tueste
    // Destructuring de valores de filtros
    const { value: nameValue } = nameFilter;
    const { value: typeValue } = typeFilter;
    const { value: roastValue } = roastFilter;
    
    if (nameValue.trim())
      params.push(`name=${encodeURIComponent(nameValue.trim())}`);
    if (typeValue)
      params.push(`type=${encodeURIComponent(typeValue)}`);
    if (roastValue)
      params.push(`roast=${encodeURIComponent(roastValue)}`);
    // Verifica si hay parametros para agregarlos a la URL
    if (params.length > 0) url += "?" + params.join("&");

    // Realiza la petición con un fetch y almacena la respuesta en "data" en formato JSON
    const res = await fetch(url);
    const data = await res.json();

    // Si data es un array carga las cards y actualiza la paginación, captura algun posible error y finalmente oculta el spinner
    renderCards(Array.isArray(data) ? data : []);
    updatePagination(Array.isArray(data) ? data.length : 0);
  } catch (error) {
    console.error("Error fetching products:", error);
    showNotification("Error al cargar los productos", "is-danger");
  } finally {
    hideSpinner();
  }
}
// Render cards
function renderCards(products) {
  cardsContainer.innerHTML = "";
  if (products.length === 0) {
    cardsContainer.innerHTML = `<p class="has-text-centered">No se encontraron productos.</p>`;
    return;
  }
  products.forEach((product) => {
    // Destructuring del producto
    const { id, name, price, type, roast, avatar, image } = product;
    const card = document.createElement("div");
    card.className = "column is-one-third";
    const imageUrl = avatar || image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80";
    // Card que se inserta en el contenedor de forma dinámica
    card.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${imageUrl}" alt="${name}" 
                 onerror="this.src='https://bulma.io/images/placeholders/1280x960.png'">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">${name}</p>
          <p class="subtitle is-6 has-text-weight-semibold">€${price}</p>
          <p>
            <span class="tag is-info">${type}</span> 
            <span class="tag is-warning">${roast}</span>
          </p>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item has-text-info edit-btn" data-id="${id}">
            <i class="fas fa-edit"></i> Editar
          </a>
          <a href="#" class="card-footer-item has-text-danger delete-btn" data-id="${id}">
            <i class="fas fa-trash"></i> Eliminar
          </a>
        </footer>
      </div>`;
    cardsContainer.appendChild(card);
  });
  // Agregar event listeners a botones de editar y eliminar
  document.querySelectorAll(".edit-btn").forEach((btn) =>
      btn.addEventListener("click", () => editProduct(btn.dataset.id)));

  document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", () => deleteProduct(btn.dataset.id))
    );
}

// Variables para paginación
let currentPage = 1; // Página actual
const limit = 6; // Límite de productos por página
// Paginación MockAPI
function updatePagination(count) {
  prevBtn.disabled = currentPage === 1;
  // En MockAPI, si es < menos que el límite, es la última página
  nextBtn.disabled = count < limit;
}
// Mostrar notificación
function showNotification(message, type = "is-success") { 
  notification.className = `notification ${type}`;
  notificationMessage.textContent = message;
  notification.classList.remove("is-hidden");
  setTimeout(() => notification.classList.add("is-hidden"), 3000);
}
closeNotification.addEventListener("click", () =>
  notification.classList.add("is-hidden")
);

// Cuando hace clic en el boton anterior o siguiente, resta o suma 1 a la página actual y llama a fetchProducts
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
});
nextBtn.addEventListener("click", () => {
  currentPage++; //boton siguiente va sumando páginas
  fetchProducts();
});

// cada vez que se modifica alguno de los tres filtros, se reinicia la paginación y se recargan los productos.
[nameFilter, typeFilter, roastFilter].forEach((input) => {
  input.addEventListener("input", () => {
    currentPage = 1;
    fetchProducts();
  });
});

// Botón para limpiar filtros, vuelve a la primera pagina y deja el valor de los filtros vacio
clearFiltersBtn.addEventListener("click", () => {
  // Destructuring assignment para resetear valores
  [nameFilter, typeFilter, roastFilter].forEach(input => input.value = "");
  currentPage = 1;
  fetchProducts();
});

// añade la clase "is active" al modal para hacerlo visible
function openModal() {
  modal.classList.add("is-active");
}

//oculta el modal, resetea el formulario y limpia el campo oculto del ID
function closeModalForm() {
  modal.classList.remove("is-active");
  formProduct.reset();
  document.getElementById("productId").value = "";
}

addBtn.addEventListener("click", openModal);// Abrir modal para agregar producto
closeModal.addEventListener("click", closeModalForm);// Cerrar modal
cancelBtn.addEventListener("click", closeModalForm);// Presionar cancelar cierra el modal

// Guardar producto
saveBtn.addEventListener("click", async () => {
  const id = document.getElementById("productId").value;
  // Destructuring de los valores del formulario
  const product = {
    name: document.getElementById("nameInput").value,
    avatar: document.getElementById("imageInput").value,
    price: parseFloat(document.getElementById("priceInput").value),
    type: document.getElementById("typeSelect").value,
    roast: document.getElementById("roastSelect").value,
  };
  // Validación con destructuring
  const { name, price, type, roast } = product;
  
  if (!name || !price || !type || !roast) {
    showNotification(
      "Por favor, completa todos los campos obligatorios",
      "is-danger"
    );
    return;
  }
  //Si el producto tiene ID, lo actualiza; si no, lo crea. Luego cierra el formulario, recarga la lista y avisa si todo salió bien o mal
  try {
    const config = {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    };

    const url = id ? `${API_URL}/${id}` : API_URL;
    
    await fetch(url, config);

    showNotification(id ? "Producto actualizado con éxito 😉✅" : "Producto agregado con éxito 🤗✅");
    closeModalForm();
    fetchProducts();
  } catch (error) {
    console.error("Error saving product:", error);
    showNotification("Error al guardar producto 😞", "is-danger");
  }
});

// Editar producto
async function editProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const product = await res.json();

    // Destructuring del producto para asignar valores al formulario
    const { id: productId, name, avatar, image, price, type, roast } = product;

    document.getElementById("productId").value = productId;
    document.getElementById("nameInput").value = name;
    document.getElementById("imageInput").value = avatar || image || ""; // Usa avatar o imagen de url o puede estar vacío
    document.getElementById("priceInput").value = price;
    document.getElementById("typeSelect").value = type;
    document.getElementById("roastSelect").value = roast;

    openModal();
  } catch (error) {
    console.error("Error editing product:", error);
    showNotification("Error al cargar el producto 😞", "is-danger");
  }
}

// Eliminar producto
async function deleteProduct(id) {
  if (confirm("¿Seguro que quieres eliminar este producto 🤔?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      showNotification("Producto eliminado con éxito 😉✅");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("Error al eliminar el producto 😞", "is-danger");
    }
  }
}

//Iniciar app mostrando todos los productos
fetchProducts();