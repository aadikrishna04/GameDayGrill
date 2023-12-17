const menuItemsUrl = "menuItems.json";

async function fetchMenuItems() {
  try {
    const response = await fetch(menuItemsUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return null;
  }
}

async function showCategory(category) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";

  const menuItems = await fetchMenuItems();

  if (!menuItems) {
    console.error("Failed to fetch menu items.");
    return;
  }

  const items = menuItems[category];

  if (!items) {
    console.error("Category not found:", category);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "menu-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;

    const cardContent = document.createElement("div");
    cardContent.className = "menu-card-content";

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = item.price;

    card.appendChild(img);
    cardContent.appendChild(title);
    cardContent.appendChild(description);
    cardContent.appendChild(price);

    card.appendChild(cardContent);

    menuContainer.appendChild(card);
  });
}

showCategory("appetizers");
