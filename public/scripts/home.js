let vm = new Vue({
    el: '#homeApp',
    data: {
        products: [],
        vendorId: '',
        vendors: []
    },
    mounted() {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                this.products = res.data
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get('http://localhost:8000/api/vendors')
            .then((res) => {
                this.vendors = res.data
            })
    },
    methods: {
        addToCart(product) {
            axios.post('http://localhost:8000/api/carts/' + product.id)
                .then(() => {
                    window.location.href = '/cart'
                })
        },

        searchProductsByVendor() {
            axios.get('http://localhost:8000/api/products/vendors/' + this.vendorId)
                .then((res) => {
                    this.products = res.data
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
})