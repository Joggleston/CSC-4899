<template>
  <body>

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
  <div class="searchwrapper">
    <input type="text" placeholder="Search Users" id = "search" v-model="searchEntry">
    <div>
    <button @click=routeProfile(searchUsers())>Search</button>
    </div>
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
  import { getDocs, getDoc, collection, where, query } from "@firebase/firestore";

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
  
  function routeProfile(x) {
    var valid = false;
    
    x.then((flag) => {
      if (flag == true) {
        console.log(router.currentRoute.value.fullPath);
        if (router.currentRoute.value.fullPath == '/profile') {
          router.go();
        }
        router.push('/profile');
      }
    });   
  }




</script>

<script>
  import { getDocs, getDoc, collection, where, query } from "@firebase/firestore";
  import { onMounted, ref } from "vue";
  import { db } from "/src/main.js";
  import { useRouter } from "vue-router";
  const searchEntry = ref("");
  const router = useRouter();
  const searchResult = [];
  var flag = false;

  function checkResult(){
    flag = false;
    for (var i = 0; i < searchResult.length;i++) {
      if (searchEntry.value.toLowerCase == searchResult[i].Username.toLowerCase) {
        result = searchResult[i].UUID;
        flag = true;
      }
    }

    sessionStorage.setItem("result",result); 
    
  }


  var result = null;
  async function searchUsers() {
    const Info = await getDocs(query(collection(db, "Users"), where("Username", "==", searchEntry.value)));
    Info.forEach((doc) => {
      searchResult.push(doc.data());
    });
    checkResult();
    return flag;
  }
  

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
.searchwrapper {
  display: flex;
  flex-direction:column;
  margin-right:20px;
  float:right;
  gap:.25rem;
  margin-top:1rem;
}
input {
  color: white;
  background-color: #262d26;
  border:10px, solid, #6667AB;
}
.users {
  display:grid;
  grid-template-columns: repeat(auto-fill);
}
</style>