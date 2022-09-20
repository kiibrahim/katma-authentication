<template>
    <div id="home">
       <h1>Dasboard</h1>
       <h2>Welcome, {{userId}}</h2>
       <button @click="logout">Logout</button>

    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        name: 'Home',
        data(){
            return{
                userId: ''
            }
        },
        mounted(){
            axios.get('http://localhost:9000/user',{headers:{token:localStorage.getItem('token')}}).then(res=>{
                //console.log(res)
                this.userId =res.data.user.lastName
            })
        },
        created(){
            if(localStorage.getItem('token') === null){
                this.$router.push('/login')
            }
        },
        methods:{
        logout(){
            localStorage.clear()
            this.$router.push('/login')
        }
        },
    }
</script>
<style>
    #home{
        margin: auto;
    }
</style>