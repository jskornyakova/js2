const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.readyState !== 200){
//                 console.log('error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
// };

// let getRequest = () => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.readyState !== 200){
//                     reject(error);
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//     })
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = []; // получаем данные от сервера
        this.allProducts = [];
        this._getProduts()
            .then(() => this._render());
    }

    _getProduts(){ //получение товаров из github
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log('error'));
    }

    _render(){ //добавляем каждый элемент продукта в каталог
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    costProductList(){ //подсчет стоимости товаров в каталоге
        // return this.allProducts.reduce((accum, item) => accum + item.price, 0); второй вариант
        let cost = 0;
        for (let product of this.allProducts){
            cost += product.price;
        }
        return cost;
    }

}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render(){ //рисуем карточку товара
        return `<div class="product-item"> 
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" id_product="${this.id_product}">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.data2 = {}; // получаем данные от сервера
        this.allCart = []; //массив для хранения всего добавленного в корзину товара
        this._getCart()
            .then(() => this._render());
    }

    _getCart(){ //получение корзины из github
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data2 => {
                this.data2 = [...data2.contents];
            })
            .catch(error => console.log('error'));
    }
    _render(){ //рендерим структуру всей корзины
        const cart = document.querySelector(this.container);
        for (let item of this.data2){
            const cartItem = new CartItem(item);
            this.allCart.push(cartItem);
            cart.insertAdjacentHTML('beforeend', cartItem.render());
        }
    } 
    
    costCart() { //стоимость корзины
        let cost = 0;
        for (let cartItem of this.allCart){
            cost += cartItem.price;
        }
        return cost;
    } 
    clearCart() {  //полностью очистить корзину
        allCart = [];
    } 

    isExist(id_product){ //найти по id элемент, есть ли он в корзине или нет
        for(let i = 0; i < this.allCart.length; i++) {
            if(this.allCart[i].id_product === id_product) {
                return true;
            } 
        }
        return false;
    }

    findIdx(id_product) { //вернуть значение id найденного элемента
        for (let i = 0; i < this.allCart.length; i++) {
            if(this.allCart[i].id_product === id_product) {
                return i;
            }
        }
    }
    addInCart () { //добавить в корзину ещё 1 ед. товара
        if(event.target.tagName === 'BUTTON') {    
            if(this.isExist(+event.target.attributes.id_product.nodeValue)) {
                let idx = this.findIdx(+event.target.attributes.id_product.nodeValue);
                this.allCart[idx].quantity++;
            } else {
                for (let i = 0; i < products.length; i++){
                    if (idx === +products[i].id_product){
                        this.allCart.push(products[i]);
                    }
                }
                // нужно создать новый элемент корзины с параметрми из калатога
                // добавить его в массив
            }
        }
    } 
    delFromCart () { //убрать товар из корзины как 1 ед., так и весь товар
        if(event.target.tagName === 'BUTTON') {    
            if(isExist(+event.target.dataset.id_product)) {
                let idx = findIdx(+event.target.dataset.id_product);
                if(allCart[idx].quantity > 1) {
                    allCart[idx].quantity--;
                } else {
                    document.querySelector('.cart-item').remove();
                }
                
            }
        }
    } 
}
class CartItem {
    constructor(cartItem, img = `https://placehold.it/100x50`){
        this.id_product = cartItem.id_product; //индификатор
        this.product_name = cartItem.product_name; //название
        this.price = cartItem.price; //цена
        this.img = img; //картинка
        this.quantity = 1; //количество
    }
    render(){ //рисуем карточку товара
        return `<div class="cart-item" id_product="${this.id_product}"> 
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="item">
                        <h3>${this.product_name} </h3>
                        <p>${this.quantity} шт.</p>
                        <p>${this.price}</p>
                        <button class="del-btn" id_product="${this.id_product}">x</button>
                    </div>
                </div>`
    }
}

const products = new ProductsList();
let cartItems = new Cart();


function handleCartClick(event) {
    if(event.target.tagName === 'BUTTON') {
        document.getElementsByClassName('cart')[0].style = "display: block";
        
    } 
}
function handleCloseClick(event) {
    if(event.target.tagName === 'BUTTON') {
        document.getElementsByClassName('cart')[0].style = "display: none";
    } 
}

function handleAddClick(event) {
    console.log(event);
    cartItems.addInCart();
    cartItems = new Cart();
}

function init(){
    document.querySelector('.btn-cart').addEventListener('click', handleCartClick);
    document.querySelector('.close').addEventListener('click', handleCloseClick);
    document.querySelector('.products').addEventListener('click', handleAddClick);
}

window.onload = init; 
// console.log(products.costProductList());