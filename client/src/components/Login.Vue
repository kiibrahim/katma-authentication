<template>
    <div id="home">
        <h1>Log In</h1>
        <form @submit="login">
            <input type="test" placeholder="userId" v-model="username" required/>
            <input type="password" placeholder="password" v-model="password" required/>
            <input type="submit" value="Login"/>
        </form>
        {{updates}}
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        name: "Home",
        data(){
            return{
                username: '',
                password: '',

                updates:''
            }
        },
        methods:{
            login(){
                let user = {
                    userId: this.username,
                    password: this.password
                }
                axios.post('http://localhost:9000/api/login',user).then(res=>{
                    if(res.status === 200){
                        localStorage.setItem('token',res.data)
                        this.$router.push('/home')
                       // console.log(res)
                    }
                },err=>{
                   this.updates=(err.response.data)
                })

            }
        }
    }
</script>