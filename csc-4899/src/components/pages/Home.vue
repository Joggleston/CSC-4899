<template>

  <nav>
    <router-link to="/"> Home </router-link>
    <router-link to="/dashboard"> Dashboard </router-link>
    <router-link to="/canvas"> Canvas </router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Log Out</button>
  </nav>

  <router-view />

</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const isLoggedIn = ref(false);

  let auth;
  onMounted(() => {
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isLoggedIn.value = true;
      } else {
        isLoggedIn.value = false;
      }
    });
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/login");
    });
  };

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
nav {
  text-align: center;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 50px;
}
</style>