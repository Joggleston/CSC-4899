<template>
    <body>
        <h1>Unknown Canvas Site</h1>
        <Login/> <!-- login single page app -->
    </body>

</template>

<script>
import Login from '@/components/pages/Login.vue'

export default {
    components: {
        Login
    }
}
</script>

<style>
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