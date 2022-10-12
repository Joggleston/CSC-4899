<template>
    <h1>Unknown Canvas Site</h1>
    <!-- regiser form -->
    <div class="register-page">
        <div class="form">
            <form class="register-form" @submit.prevent="register">
            <input type="name" placeholder="Username..." v-model="registerUsername" required/>
            <input type="email" placeholder="Email address..." v-model="registerEmail"/>
            <input type="password" placeholder="Password..." v-model="registerPassword"/>
            <button type="submit">Create</button>
            <!-- <button type="button" @click="signInWithGoogle">Sign In With Google</button> -->
            <p class="message">Already registered? <router-link to="/login">Sign In</router-link></p>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
    // const signInWithGoogle = () => { 
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(getAuth(), provider)
    //         .then((result) => {
    //             console.log(result.user);
    //             router.push("/dashboard");
    //         })
    //         .catch((error) => {
    //             //handle error
    //         });
    // };

</script>

<style>
    @import '../css/loginAndRegister.css';
</style>