<template>
    <div>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
    methods: {
        logout() {
            const auth = getAuth();
            signOut()
            .then(() => {
                alert('Successfully logged out');
                this.$router.push('/');
            })
            .catch(error => {
                alert(error.message);
                this.$router.push('/');
            });
        },
    },
}
</script>