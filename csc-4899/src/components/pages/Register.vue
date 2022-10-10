<template>
    <h1>Unknown Canvas Site</h1>
    <!-- regiser form -->
    <div class="register-page">
        <div class="form">
            <form class="register-form" @submit.prevent="register">
            <input type="email" placeholder="Email address..." v-model="registerEmail"/>
            <input type="password" placeholder="Password..." v-model="registerPassword"/>
            <button type="submit">create</button>
            <p class="message">Already registered? <router-link to="/login">Sign In</router-link></p>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { useRouter } from "vue-router";
    const registerEmail = ref("");
    const registerPassword = ref("");
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
    const signInWithGoogle = () => { //will work on lata

    }

</script>

<style>
    @import '../css/loginAndRegister.css';
</style>