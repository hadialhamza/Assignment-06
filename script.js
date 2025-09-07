// Function for fetch all plants category
const fetchCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((json) => loadCategories(json.categories));
};

// Function for fetch all plants
const fetchPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => loadPlants(data.plants));
};

// Function for Fetch plants bt category
const fetchPlantsByCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadPlantsByCategory(data.plants));
};

// Function for load categories
const loadCategories = (categories) => {
  // console.log(categories);
  categories.forEach((category) => {
    // console.log(category.category_name);
    const categoryId = category.id;
    // console.log(categoryId);
    const categorySection = document.getElementById("categories");
    const categoryLi = document.createElement("li");
    categoryLi.innerHTML = `<li onclick="fetchPlantsByCategory('${categoryId}')" class="mt-2 py-2 px-4 rounded-md hover:bg-[#74a887] hover:text-white cursor-pointer">${category.category_name}</li>`;
    categorySection.appendChild(categoryLi);
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
};

//Function for load all plants
const loadPlants = (plants) => {
  // console.log(plants);
  plants.forEach((plant) => {
    // console.log(plant);
    const plantImage = plant.image;
    const plantName = plant.name;
    const plantDescription = plant.description;
    const plantCategory = plant.category;
    plantPrice = plant.price;

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
              <h2 class="text-sm font-semibold mb-2">${plantName}</h2>
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
              <button
                class="bg-[#15803d] px-5 py-3 rounded-full text-white text-base font-medium cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
    `;

    cardContainer.append(cardDiv);
  });
};

fetchCategories();
fetchPlants();
