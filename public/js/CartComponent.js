Vue.component('cart', {
    data() {
        return {
            cartUrl: `./userCart.json`,
            cartItems: [],
            showCart: false,
            imgCart: `https://placehold.it/50x50`
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
                            <p v-if="!cartItems.length"><h1 class="h1-cart">TOTAL<span>$ {{total}}</span></h1></p>
                            <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :img="imgCart"
                            :cart-item="item"
                            @remove="remove"></cart-item>
                            
                            <br>
                            <div class="button_cart"><a href="checkout.html">Checkout</a></div>
                            <br>
                            <div class="button_cart"><a href="shopping_cart.html">Go to cart</a></div>
                    </div>
                </div>`
});


Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
    <div class="drop_prouct_cart">
        <a href="single_page.html"><img :src="img" alt="" class="img-cart">
        <h2 class="h2-cart">{{cartItem.product_name}}</h2></a> <img src="img/star.png" alt="">
        <a href="#"><img src="img/delete.png" alt="" class="delete"> </a>
        <br>
        <h2 class="h2-cart"><span class="pink"> <input v-model.number="cartItem.quantity" type="number" name="num1" min="1" max="10"> x $ {{cartItem.price}}</span></h2> </div>
<!--                <div class="d-tr cart-item">-->
<!--                        <div class="d-td"><img :src="img" alt="Some image">-->
<!--                            <h2><a class="product__link" href="single_page.html">{{cartItem.product_name}}</a></h2>-->
<!--                            <p>Color: {{cartItem.color}}-->
<!--                            <br>Size: {{cartItem.size}}</p>-->
<!--                        </div>-->
<!--                        <div class="d-td">$ {{cartItem.price}} each</div>-->
<!--                        <form class="d-td">-->
<!--                            <input v-model.number="cartItem.quantity" type="number" name="num1" min="1" max="10">-->
<!--                        </form>-->
<!--                        <div class="d-td">$ </div>-->
<!--                        <div class="d-td d-td_delete">-->
<!--                            <a href="#"><img src="img/delete.png" alt="" @click="$emit('remove', cartItem)"></a>-->
<!--                        </div>-->
                </div>`,






    // `<div class="cart-item" >
    //         <div class="product-bio">
    //             <img :src="img" alt="Some image">
    //             <div class="product-desc">
    //                 <p class="product-title">{{cartItem.product_name}}</p>
    //                 <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
    //                 <p class="product-single-price">$ {{cartItem.price}} each</p>
    //             </div>
    //         </div>
    //         <div class="right-block">
    //             <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
    //             <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
    //         </div>
    //     </div>`
});