document.addEventListener("DOMContentLoaded", function () {
  const productsContainer = document.querySelector(".products");

  async function fetchProducts(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();

      response.forEach((product) => {
        let description = product.description;
        let title = product.title;
        productsContainer.innerHTML += `
              <div class="product">
                <img src="${product.images[1]}" alt="${
          product.category.name
        }" class="product-img">
                <div class="product-content">
                  <h2 class="product-title">${
                    title.length > 18
                      ? title.substring(0, 18).concat(" ...")
                      : title
                  }</h2>
                  <h4 class="product-category">${product.category.name}</h4>
                  <p class="product-description">${
                    description.length > 80
                      ? description.substring(0, 80).concat(" ...more")
                      : description
                  }</p>
                  <div class="product-price-container">
                    <h3 class="product-price">$${product.price}</h3>
                    <a href="#!" data-productId="${
                      product.id
                    }" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                  </div>
                </div>
              </div>
            `;
      });
    } catch (err) {
      console.log(err);
    }
  }

  fetchProducts("https://api.escuelajs.co/api/v1/products");

  const input = document.getElementById("myInput");

  function filterItems(query) {
    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
      const title = product
        .querySelector(".product-title")
        .textContent.toLowerCase();
      const description = product
        .querySelector(".product-description")
        .textContent.toLowerCase();
      if (
        title.includes(query.toLowerCase()) ||
        description.includes(query.toLowerCase())
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }

  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      //change the current slide
      wrapper.style.transform = `translateX(${-100 * index}vw)`;

      //change the choosen product
      choosenProduct = products[index];

      //change texts of currentProduct
      currentProductTitle.textContent = choosenProduct.title;
      currentProductPrice.textContent = "$" + choosenProduct.price;
      currentProductImg.src = choosenProduct.colors[0].img;

      //assing new colors
      currentProductColors.forEach((color, index) => {
        color.style.backgroundColor = choosenProduct.colors[index].code;
      });
    });
  });
});
