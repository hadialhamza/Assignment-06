// Function for fetch all plants category
const fetchCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((json) => {
      const allCategories = [];
      const fetchCategories = json.categories;

      if (fetchCategories.length) {
        allCategories.push({
          id: "category-btn-all",
          category_name: "All Tress",
        });
        allCategories.push(...fetchCategories);
      }
      loadCategories(allCategories);
    });
};

// Function for fetch all plants
const fetchPlants = () => {
  loadingSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => loadPlants(data.plants));
};

// Function for Fetch plants bt category
const fetchPlantsByCategory = (id) => {
  loadingSpinner(true);
  removeHighlightCategory();
  addHighlightCategory(id);

  if (id === "category-btn-all") {
    allTress();
    return;
  }

  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loadPlantsByCategory(data.plants);
    });
};

// Function for fetch tree details
const fetchTreeDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      loadTreeDetails(data.plants);
    });
};

// Function for load categories
const loadCategories = (categories) => {
  const categorySection = document.getElementById("categories");
  const categorySelect = document.getElementById("categorySelect");

  categories.forEach((category, index) => {
    const categoryId = category.id;

    // Category load for Desktop device
    const categoryLi = document.createElement("li");
    categoryLi.innerHTML = `<li id="categoryBtn-${categoryId}" onclick="fetchPlantsByCategory('${categoryId}')" class="category-btns  ${
      index === 0 ? "bg-[#15803D] text-white" : ""
    } mt-2 py-2 pl-5 rounded-full hover:bg-[#15803D] hover:text-white cursor-pointer">${
      category.category_name
    }</li>`;
    categorySection.appendChild(categoryLi);

    //Category load for mobile device
    const categoryOption = document.createElement("option");
    categoryOption.value = categoryId;
    categoryOption.text = category.category_name;
    categorySelect.appendChild(categoryOption);
  });

  // Function for All tree load in mobile device
  categorySelect.addEventListener("change", (e) => {
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId) {
      fetchPlantsByCategory(selectedCategoryId);
    }
  });
};

// Function for load all tress
const allTress = () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  fetchPlants();
};

// Function for load plants by category
const loadPlantsByCategory = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  loadPlants(plants);
  loadingSpinner(false);
};

//Function for load all plants
const loadPlants = (plants) => {
  plants.forEach((plant) => {
    const plantId = plant.id;
    const plantImage = plant.image;
    const plantName = plant.name;
    const plantDescription = plant.description;
    const plantCategory = plant.category;
    const plantPrice = plant.price;

    // Inject data in card
    const cardContainer = document.getElementById("card-container");
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
            <div class="bg-white rounded-lg p-4 flex flex-col justify-between h-full">
              <div class="rounded-lg overflow-hidden mb-3 h-48">
                <img
                  src="${plantImage}"
                  alt=""
                  class="w-full h-full object-cover"
                />
              </div>
              <h2 onclick="fetchTreeDetails('${plantId}')" class="text-base font-semibold mb-2 cursor-pointer">${plantName}</h2>
              <p class="text-xs font-normal text-[#8c8c8c] mb-2">
                ${plantDescription}
              </p>
              <div class="flex justify-between items-center mb-3">
                <button
                  class="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-sm font-normal"
                >
                  ${plantCategory}
                </button>
                <p class="text-sm font-semibold">৳ <span>${plantPrice}</span></p>
              </div>
              <button onclick='addToCart("${plantName}", "${plantPrice}")'
                class="bg-[#15803d] px-5 py-3 rounded-full text-white text-base font-medium cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
    `;
    cardContainer.append(cardDiv);
  });
  loadingSpinner(false);
};

// Function for tree details in modal
const loadTreeDetails = (plant) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = `
          <div
          class="bg-white rounded-lg p-4 flex flex-col justify-between gap-4"
        >
          <h2 class="text-lg font-semibold cursor-pointer">${plant.name}</h2>
          <div class="rounded-lg overflow-hidden h-80">
            <img
              src="${plant.image}"
              alt=""
              class="w-full h-full object-cover"
            />
          </div>
          <p class="text-sm font-normal">
            <span class="font-semibold">Description: </span>${plant.description}
          </p>
          <p class="text-base font-normal">
            <span class="font-semibold">Category: </span>${plant.category}
          </p>
          <p class="text-base">
            <span class="font-semibold">Price: </span>৳
            <span>${plant.price}</span>
          </p>
        </div>
        <form method="dialog" class="flex justify-end">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
  `;
  modalContainer.append(modalDiv);
  my_modal_1.showModal();
};

//Function for Add items to cart
const addToCart = (name, price) => {
  const cartContainer = document.getElementById("cart-container");
  const cartDiv = document.createElement("div");
  cartDiv.innerHTML = `
            <div class="mb-2">
              <div
                class="bg-[#f0fdf4] py-2 px-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 class="text-sm font-semibold mb-1">${name}</h2>
                  <p class="text-base font-normal text-[#8C8C8C]">৳ <span>${price}</span> x 1</p>
                </div>
                <button onclick="removeItem(event, '${price}')" class="cursor-pointer">❌</button>
              </div>
            </div>
  `;
  cartContainer.append(cartDiv);

  // Update total price
  const totalPrice = document.getElementById("total");
  const currentTotal = parseInt(totalPrice.innerText);
  const newTotal = currentTotal + parseInt(price);
  totalPrice.innerText = newTotal;

  const modalTreeName = document.getElementById("tree-name");
  modalTreeName.innerText = name;
  my_modal_2.showModal();
};

//Function for remove items from cart
const removeItem = (e, price) => {
  const removeElement = e.target.parentElement.parentElement;
  removeElement.remove();

  // Update total price
  const totalPrice = document.getElementById("total");
  const currentTotal = parseInt(totalPrice.innerText);
  const newTotal = currentTotal - parseInt(price);
  totalPrice.innerText = newTotal;
};

// Function for loading spinner
const loadingSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};

// Function for add highlight selected category
const addHighlightCategory = (id) => {
  const categoryBtn = document.getElementById(`categoryBtn-${id}`);
  if (categoryBtn) {
    categoryBtn.classList.add("bg-[#15803D]", "text-white");
  }

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
};

// Function for remove highlight selected category
const removeHighlightCategory = () => {
  const allCategoryBtns = document.querySelectorAll(".category-btns");

  allCategoryBtns.forEach((categoryBtn) => {
    categoryBtn.classList.remove("bg-[#15803D]", "text-white");

    const allTreeBtn = document.getElementById("category-btn-all");
    if (allTreeBtn) {
      allTreeBtn.classList.remove("bg-[#15803D]", "text-white");
    }
  });
};

// Mobile device buttons functionality
const mobileCategoryBtn = document.getElementById("mobile-categories-btn");
const mobileCartBtn = document.getElementById("mobile-cart-btn");
const mobileCategory = document.getElementById("mobile-category");
const shoppingCart = document.getElementById("shopping-cart");
const cardContainer = document.getElementById("card-container");
const campaign = document.getElementById("campaign");

mobileCategoryBtn.addEventListener("click", () => {
  mobileCategoryBtn.classList.add("bg-[#15803d]", "text-white");
  mobileCategoryBtn.classList.remove("bg-white", "text-[#15803d]");

  mobileCartBtn.classList.add("bg-white", "text-[#15803d]");
  mobileCartBtn.classList.remove("bg-[#15803d]", "text-white");

  mobileCategory.classList.remove("hidden");
  shoppingCart.classList.add("hidden");
  cardContainer.classList.remove("hidden");
  campaign.classList.remove("hidden");
});

mobileCartBtn.addEventListener("click", () => {
  mobileCartBtn.classList.add("bg-[#15803d]", "text-white");
  mobileCartBtn.classList.remove("bg-white", "text-[#15803d]");

  mobileCategoryBtn.classList.add("bg-white", "text-[#15803d]");
  mobileCategoryBtn.classList.remove("bg-[#15803d]", "text-white");

  mobileCategory.classList.add("hidden");
  shoppingCart.classList.remove("hidden");
  cardContainer.classList.add("hidden");
  campaign.classList.add("hidden");
});

fetchCategories();
fetchPlants();
