class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = []; // получаем данные от сервера
        this.allProducts = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
        this._costProductList(this.allProducts);
    }
    _fetchProducts(){ //условно входные данные от сервера
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 65},
        ];
    }
    _render(){ //добавляем каждый элемент продукта в каталог
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    _costProductList(items) {
        var cost = 0;
        for (let i = 0; i < items.length; i++) {
            cost += items[i].price
        }
        console.log('Товаров на сумму ' + cost);
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){ //рисуем карточку товара
        return `<div class="product-item"> 
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor() {
       // this.allCart = []; массив для хранения всего добавленного в корзину товара
    }
    // render() {} рендерим структуру всей корзины
    // costCart() {} стоимость корзины
    // clearCart() {} полностью очистить корзину
}
class CartItem {
    constructor(){
        //  this.id = product.id; индификатор
        //  this.title = product.title; название
        //  this.price = product.price; цена
        //  this.img = img; картинка
        //  this.quantity = 1; количество
    }
    // render() {} рендерим структуру элемента корзины
    // addInCart () {} добавить в корзину ещё 1 ед. товара
    // delFromCart () {} убрать товар из корзины как 1 ед., так и весь товар
}

const products = new ProductsList();