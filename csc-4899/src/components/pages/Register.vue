<template>
    <h1>Canvost</h1>
    <!-- regiser form -->
    <div class="register-page">
        <div class="form">
            <form class="register-form" @submit.prevent="register">
            <input type="name" placeholder="Username..." v-model="registerUsername" required/>
            <input type="email" placeholder="Email address..." v-model="registerEmail" required/>
            <input type="password" placeholder="Password..." v-model="registerPassword" required/>
            <button type="submit" @click="createUser">Create</button>
            <button type="button" @click="signInWithGoogle"><img src="./images/Google__G__Logo.svg"> Sign In With Google </button>
            <p class="message">Already registered? <router-link to="/login">Sign In</router-link></p>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { db } from "/src/main.js";
    import {collection,addDoc, Timestamp} from "firebase/firestore";
    import { useRouter } from "vue-router";
    const registerEmail = ref("");
    const registerPassword = ref("");
    const registerUsername = ref("");
    const router = useRouter();

    const register = () => {
        // need .value because ref()
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
            .then((data) => {
                console.log("Successfully Registration!");
                console.log(auth.currentUser)
                router.push('/dashboard');
            })
            .catch((error) => {
                console.log(error.code);
                alert(error.message);
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

    const createUser = () => {

        const auth = getAuth()
        var user = auth.currentUser;
            addDoc(collection(db,"Users"),{
                UUID: user.uid,
                Username:registerUsername.value,
                Email:registerEmail.value,
                Profile: "",
                RegisterDate: Timestamp.now
                
            });

    };



    








</script>

<style>
    @import '../css/main.css';
    @import '../css/loginAndRegister.css';
</style>