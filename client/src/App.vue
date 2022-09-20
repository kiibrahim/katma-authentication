<template>
  <div id="app">
    <h1>Registration</h1>
    <div id="buttons">
    <router-link to="registration" active-class="active" tag="button">
      <div class="link_container">
        Registration
      </div>
    </router-link>
    <router-link to="login" active-class="active" tag="button">
      <div class="link_container">
        Login
      </div>
    </router-link>
  </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  components: {

  },
  data() {
    return {

    };
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: center;
}
#buttons{
  display: flex;
  flex-direction: row;
}
button{
  margin: 10px;
}
</style>
