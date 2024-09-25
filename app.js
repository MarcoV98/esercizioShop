class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.innerHTML = ` 
      <div> 
        <img src="${this.product.imageUrl}" alt="${this.product.title}" width="200" height="200"/>
        <h2>${this.product.title}</h2>
        <h3>\$${this.product.price}</h3>
        <p>${this.product.description}</p>
        <button>Add to Cart</button>
      </div> 
    `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }
}

class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://www.materassi.com/cdn/shop/files/GANT14_A2_1.jpg?v=1725207787&width=990",
      "A soft pillow",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://thumbs.static-thomann.de/thumb//orig/pics/prod/308445.webp",
      "Perfect Carpet!",
      89.99
    ),
  ];

  render() {
    const prodList = document.createElement("ul");
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    const totalPrice = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    this.totalOutput.innerHTML = `
      <h2>Total: \$${totalPrice.toFixed(2)}</h2>
    `;

    console.log(this.items);
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
      <h2>Total: \$0</h2>
      <button>Order Now!</button>
    `;

    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    const productList = new ProductList();
    const prodListEl = productList.render();

    this.cart = new ShoppingCart();

    const cartEl = this.cart.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
