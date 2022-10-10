<template>
  <router-view />
</template>

<script>
import Login from '@/components/pages/Login.vue'
import Register from '@/components/pages/Register.vue'

export default {
  data() {
    return {
      isLoginShown: true
    }
  },
  name: 'Home',
  components: {
  Login,
  Register
  },
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
body {
  background: rgb(141,194,111);
  /*background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);*/
  font-family: "Roboto", sans-serif;     
}
h1 {
  font-family: "Roboto", sans-serif;
  display:  block;
  margin: auto;
  text-align: center;
  padding-top: 4%;
  font-size: 50px;
}
</style>