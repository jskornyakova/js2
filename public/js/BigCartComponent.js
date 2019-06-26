Vue.component('bcart', {
    data() {
        return {
            cartUrl: `./userCart.json`,
            cartItems: [],
            imgCart: `https://placehold.it/50x80`
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
    template: ` <div class="d-tr">
                    <div class="d-tr zaglav">
                        <div class="d-td">Product Details</div>
                        <div class="d-td">unite Price</div>
                        <div class="d-td">Quantity</div>
                        <div class="d-td">shipping</div>
                        <div class="d-td">Subtotal</div>
                        <div class="d-td">ACTION</div>
                    </div>
                            <p class="drop-cart-p" v-if="!cartItems.length">Cart is empty</p>
                            <cart-item 
                            v-for="item of cartItems" 
                            :key="item.id_product"
                            :img="item.img"
                            :name="item.product_name"
                            :color="item.color"
                            :size="item.size"
                            :cart-item="item"
                            @input="changeQuantity"
                            @remove="remove"></cart-item>
                       
                            </div>
                            </div>
<!--                             <p v-if="!cartItems.length"><h1 class="h1-cart">TOTAL<span>$ {{total}}</span></h1></p>-->
<!--                             <br>-->
<!--                             <div class="button_cart"><a href="checkout.html">Checkout</a></div>-->
<!--                             <br>-->
<!--                            <div class="button_cart"><a href="shopping_cart.html">Go to cart</a></div>-->
<!--                    -->
<!--                 </div>-->
`
});


Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `

                    
                    <div class="d-tr">
                        <div class="d-td"><img :src="img" alt="">
                            <h2><a class="product__link" href="single_page.html">{{cartItem.product_name}}</a></h2>
                            <p>Color: {{cartItem.color}}
                                <br>Size: {{cartItem.size}}</p>
                        </div>
                        <div class="d-td">$ {{cartItem.price}}</div>
                        <form class="d-td">
                            <input 
                            :value="cartItem.quantity"
                            @input="$emit('input', cartItem, $event.target.value)"
                          type="number" name="num1" min="1" max="10"> 
                        </form>
                        <div class="d-td">{{cartItem.shipping}}</div>
                        <div class="d-td">$ {{cartItem.quantity*cartItem.price}}</div>
                        <div class="d-td d-td_delete">
                            <a href="#"><img src="img/delete.png" alt="" @click="$emit('remove', cartItem)"></a>
                        </div>
                        </div>
                   
<!--<div class="drop_prouct_cart">-->
<!--                    <a href="single_page.html"><img :src="img" alt="" class="img-cart">-->
<!--                    <h2 class="h2-cart">{{cartItem.product_name}}</h2></a> <img src="img/star.png" alt="">-->
<!--                    <img src="img/delete.png" alt="" class="delete" @click="$emit('remove', cartItem)">-->
<!--                    <br>-->
<!--                    <h2 class="h2-cart"><span class="pink"> -->
<!--                    <input -->
<!--                    :value="cartItem.quantity"-->
<!--                    @input="$emit('input', cartItem, $event.target.value)"-->
<!--                     type="number" name="num1" min="1" max="10"> x $ {{cartItem.price}}</span></h2> </div>-->
<!--                </div>-->`,
});
