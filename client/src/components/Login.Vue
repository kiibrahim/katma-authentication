<template>
    <div id="home">
        <h1>Log In</h1>
        <form @submit="login">
            <input type="test" v-model="username" required/>
            <input type="password" v-model="password" required/>
            <input type="submit" value="Register"/>
        </form>

    </div>
</template>
<script>
    export default{
        name: "Home",
        data(){
            return{
                username: '',
                password: '',
            }
        },
        methods:{
            login(){

            }
        }
    }
</script>