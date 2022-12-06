<template>
  <body>
<!-- 
  <nav v-if = "isLoggedIn">
    <router-link to="/dashboard"> Dashboard </router-link>
    <router-link to="/canvas"> Canvas </router-link>
    <router-link to="/profile"> Profile </router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Log Out</button>
  </nav> -->

  <nav class="navbar navbar-expand-lg" v-if="isLoggedIn">
  <div class="container-fluid">
    <a class="navbar-brand">Canvost</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/canvas">Canvas</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/create">Publish</router-link>
        </li>
        <li class="nav-item">
          <p class="nav-link" @click="handleSignOut">Log Out</p>
        </li>
      </ul>
    </div>
  </div>
  <div id ="search">
    <input type="search" placeholder="User Search">
  </div>
</nav>

<!-- This is the main site vue file thing, dont touch -->
<Suspense>
   <template #default>
    <router-view />
   </template>
   <template #fallback>
     <span>Loading...</span>
   </template>
 </Suspense>

</body>
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
@import '../css/main.css';
body { 
  background: #262d26 !important; 
  font-family: "Roboto", sans-serif !important;  
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
  text-align:center;
	display: grid;
  font-weight: bold;
	grid-template-columns: repeat(4, 1fr);
  background-color: #5a5959;
	grid-template-rows: 50px;
  text-decoration:none;
}
/* nav a:visited, a {
  font-size: 15pt;
  padding-top:9pt;
  text-align:center;
  vertical-align: bottom;
  text-decoration:none;
  color:#FFFFFF;
} */
nav li:hover {
  background-color:#6667AB;
}

 div .search {
  margin-right:20px;
  float:right;
}

input {
  color: white;
  background-color: #262d26;
  border:10px, solid, #6667AB;
}
</style>