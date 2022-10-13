<template>
  <nav v-if="notSplash">
    <router-link to="/">Dashboard</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/splash">Splash</router-link>
  </nav>
  <router-view/>
</template>

<!-- Hides navbar if the current route is the splash page -->
<script>
  export default {
    computed: {
      notSplash() {
        if (this.$route.path != "/splash") {
          return true;
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
