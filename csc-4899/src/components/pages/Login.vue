<template>
  <body>
    <h1>Unknown Canvas Site</h1>
    <!-- Login Buttons n stuff -->
    <div class="login-page">
      <div class="form">
        <!-- regiser form -->
        <form class="register-form" v-if="!isLoginShown" @submit.prevent="register">
          <input type="email" placeholder="Email address..." v-model="registerEmail"/>
          <input type="password" placeholder="Password..." v-model="registerPassword"/>
          <button type="submit">create</button>
          <p class="message">Already registered? <a href="#" @click="isLoginShown = !isLoginShown">Sign In</a></p>
        </form>
        <!-- login form -->
        <form class="login-form" v-if="isLoginShown" @submit.prevent="login">
          <input type="email" placeholder="Email address..." v-model="loginEmail"/>
          <input type="password" placeholder="Password..." v-model="loginPassword"/>
          <button type="submit">login</button> 
          <p class="message">Not registered? <a href="#" @click="isLoginShown = !isLoginShown">Create an account</a></p>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

    export default {
      data() {
        return {
          isLoginShown: true
        }
      },

      methods: {
        register() {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.registerEmail, this.registerPassword)
          .then((userCredential) => {
            //registered acount
            alert('Successfully registered! Please Login.');
            const user = userCredential.user;
          })
          .catch(error => {
            alert(error.message);
          });
        },

        // TODO: THIS IS UNDEFINED IN THE .THEN(), this becomes undefined in => functions
        login() {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
          .then((userCredential) => {
            //signed in
            alert('Successfully logged in!');
            this.$router.push({ name: 'Dashboard' });
            // const user = userCredential.user;
            // console.log(user);
          })
          .catch(error => {
            alert(error.message);
          });
        },
      },

    }

</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 5% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
/* .form .register-form {
  display: none;
} */
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
</style>