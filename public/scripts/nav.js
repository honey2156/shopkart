let nav = new Vue({
    el: '#navApp',
    data: {
        isLogged : false
    },

    mounted(){
        this.checkLogin()
    },

    methods: {
        checkLogin(){
            axios.get('/checkLogin')
            .then((res)=>{
                if(res.data){
                    this.isLogged = true
                }
            })
        },

        addProduct() {
            window.location.href = "/products/addproduct"
        },

        viewHome() {
            window.location.href = "/"
        },

        viewCart() {
            window.location.href = "/cart"
        },

        viewLogin(){
            window.location.href = "/login"
        },

        viewSignup(){
            window.location.href = "/signup"
        },

        logout(){
            window.location.href = "/logout"
        }
    }
})