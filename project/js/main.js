const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: `/catalogData.json`,
        products: [],
        imgCatalog: `https://placehold.it/200x150`,
        show: false,
        basketUrl: `/getBasket.json`,
        allProducts: [],
        imgBasket: `https://placehold.it/100x50`,
        message: '',
        searchLine: '',
    },
    computed: {
        filter(value){
            const s = this.searchLine;
            return this.products.filter(function (elem) {
                if(s === '') {
                    return true;
                } else {
                    value = value.toString();
                    //отображение массива с отбором
                }

            })
        }
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(product){
            console.log(product);
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
               if(data.result){
                   this.message = "";
                   let find = this.allProducts.find(el => el.id_product === product.id_product);
                    if(find){
                       find.quantity++;
                    } else {
                        let prod = Object.assign({quantity: 1}, product);
                        this.allProducts.splice(0, 0, prod); // надо добавить елемент в массив
                    }
                 } else {
                     console.log('Error');
                 }
             })
        },
        delProduct(cart){
            console.log(cart);
            this.getJson(`${API}/deleteFromBasket.json`)
             .then(data => {
                 if (data.result) {
                     if(cart.quantity > 1) {
                         cart.quantity--;
                     } else {
                         this.allProducts.splice(cart, 1);
                         if(!this.allProducts.length) this.message = "Корзина пуста!";//надо удалить объект
                     }
                 } else {
                     console.log('Error');
                 }
             })
        },

    },

    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })

        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.allProducts.push(el);
                }
            });
    }

})


//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(el => regexp.test(el.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible')
//             }
//         })
//     }

