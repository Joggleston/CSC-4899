<template>
  <h1>Canvost</h1>
  <!-- Login Form -->
  <div class="login-page">
    <div class="form">
      <form class="login-form" @submit.prevent="login">
        <input type="email" placeholder="Email address..." v-model="loginEmail" required/>
        <input type="password" placeholder="Password..." v-model="loginPassword" required/>
        <p v-if="errMsg">{{ errMsg }}</p>
        <button type="submit">Login</button> 
        <button type="button" @click="signInWithGoogle"><img src="./images/Google__G__Logo.svg"> Sign In With Google </button>
        <p class="message">Not registered? <router-link to="/register">Create an Account</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { useRouter } from "vue-router";
  const loginEmail = ref("");
  const loginPassword = ref("");
  const errMsg = ref() // ERROR MESSAGE
  const router = useRouter();

  const login = () => {
    // need .value because ref()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then((data) => {
        console.log("Successfully Logged In!");
        console.log(auth.currentUser)
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "Not account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect Password";
            break;
          default:
            errMsg.value = "Email of password was incorrect";
            break;
        }
      })
  };

  const signInWithGoogle = () => { 
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        router.push("/dashboard");
      })
      .catch((error) => {
          //handle error
      });
  };

</script>


<style>
  @import '../css/main.css';
  @import '../css/loginAndRegister.css';
</style>