let vm = new Vue({
    el: '#addProductApp',
    data: {
        vendors: [],
        name: '',
        price: '',
        vendorId: ''
    },
    mounted() {
        axios.get('http://localhost:8000/api/vendors')
            .then((res) => {
                this.vendors = res.data
            })
    },
    methods: {
        addProduct(){
            axios.post('http://localhost:8000/api/products', {
                name: this.name,
                price:this.price,
                vendorId:this.vendorId
            })
            .then((res)=>{
                window.location.href = '/'
            })
        }
    }
})