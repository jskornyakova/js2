Vue.component('cart', {
    data() {
        return {
            cartUrl: `./userCart.json`,
            cartItems: [],
            showCart: false,
            imgCart: `https://placehold.it/50x50`,
            message: ""
        }
    },
    computed: {
        total: function() {
            if (!this.cartItems.length) {
                return 0;
            }

            return this.cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);
        }
    },

    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            product.quantity--;
                        }
                    })
            } else {
                this.$parent.deleteJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }


            // this.$parent.getJson(`${API}/deleteFromBasket.json`)
            //     .then(data => {
            //         if (data.result) {
            //             if (product.quantity > 1) {
            //                 product.quantity--
            //             } else {
            //                 this.cartItems.splice(this.cartItems.indexOf(product), 1);
            //             }
            //         } else {
            //             console.log('error!')
            //         }
            //     })
        },
        changeQuantity(product, quantity){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: +quantity - find.quantity})
                    .then(data => {
                        if (data.result) {
                            find.quantity = +quantity;
                        }
                    })
            }
        },


    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `<div class="header__right_cart">
                    <button class="header__right_cart-btn" @click="showCart = !showCart"><img src="img/cart.svg" alt="cart"></button>
                    <div class="drop-cart" v-show="showCart">
                            <p class="drop-cart-p" v-if="!cartItems.length">Cart is empty</p>
                            <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :img="item.img"
                            :cart-item="item"
                            @input="changeQuantity"
                            @remove="remove"></cart-item>
                            <p v-if="!cartItems.length"><h1 class="h1-cart">TOTAL<span>$ {{total}}</span></h1></p>
                            <br>
                            <div class="button_cart"><a href="checkout.html">Checkout</a></div>
                            <br>
                            <div class="button_cart"><a href="shopping_cart.html">Go to cart</a></div>
                    </div>
                </div>`
});


Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="drop_product_cart">
                    <a href="single_page.html"><img :src="img" alt="" class="img-cart">
                    <h2 class="h2-cart">{{cartItem.product_name}}</h2></a> <div class="star-cart"><img src="img/star.png" alt="" >
                    <img src="img/delete.png" alt="" class="delete" @click="$emit('remove', cartItem)"></div>
                    <br>
                    <h2 class="h2-cart"><span class="pink">
                    {{cartItem.quantity}} x $ {{cartItem.price}}</span></h2> </div>
                </div>`,
});
