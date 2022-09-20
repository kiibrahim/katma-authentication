<template>
    <div id="registration">
        <h1>Registration</h1>
        <form @submit="postData">
            <input type="email" v-model="email" placeholder="email" required/><br/><br/>
            <input type="test" v-model="username" placeholder="username" required/><br/><br/>
            <input type="text" v-model="firstname" placeholder="First Name" required/><br/><br/>
            <input type="text" v-model="lastname" placeholder="Last Name" required/><br/><br/>
            <input type="password" v-model="password" placeholder="password" required/><br/><br/>
            <input type="password" v-model="confirmpassword" placeholder="re-type password" required/><br/><br/>
            <input type="submit" value="Register" id="submit"/>
        </form>
        {{updates}}
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        name: "Registration",
        data(){
            return{
                email : '',
                username: '',
                firstname: '',
                lastname:'',
                password: '',
                confirmpassword: '',

                updates: ''
            }
        },
        methods:{
            postData(){
                let newUser = {
                    email: this.email,
                    userId: this.username,
                    firstName: this.firstname,
                    lastName: this.lastname,
                    password: this.password
                }
                if(this.password != this.confirmpassword){
                    alert("Passwords are not same!")
                }
                axios.post('http://localhost:9000/api/registration', newUser).then(res=>{
                       //this.updates=("Successful")
                       this.$router.push('/login')
                }, err=>{
                  this.updates= (err.response.data)
                    })

            }
        }
    }
</script>
<style >
#registration{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    align-items: center;
}
#submit{
    align-items: center;
}
</style>