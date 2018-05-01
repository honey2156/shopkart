let vm = new Vue({
    el: '#cartApp',

    data: {
        carts: []
    },

    mounted() {
        this.getCarts()
    },

    methods: {
        getCarts(){
            axios.get('http://localhost:8000/api/carts/')
            .then((res) => {
                this.carts = res.data
            })
        },

        cartTotalAmount() {
            let total = 0
            for (cart of this.carts) {
                total += (cart.product.price * cart.quantity)
            }
            return total
        },

        increaseQuantity(productId){
            axios.post('http://localhost:8000/api/carts/add/' + productId)
            .then(()=>{
                this.getCarts()
            })
        },

        decreaseQuantity(productId){
            axios.post('http://localhost:8000/api/carts/remove/' + productId)
            .then(()=>{
                this.getCarts()
            })
        }

    }
})