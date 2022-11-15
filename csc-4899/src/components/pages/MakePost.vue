<template>
    <!-- Create Post -->
    <div class="form">
        <form class="create-form" @submit.prevent="register">
            <input type="text" placeholder="Text Here..." v-model="postText" required/>
            <input type="text" placeholder="Image URL..." v-model="postImageUrl" required/>
            <button type="submit">Publish</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '/src/main.js';
import { useRouter } from "vue-router";

const postText = ref("");
const postImageUrl = ref("");
const auth = getAuth();
const router = useRouter();

const register = () => {
    var user = auth.currentUser;

    //https://firebase.google.com/docs/firestore/manage-data/add-data

    // Add a new document in collection "Posts" with auto gen id
    addDoc(collection(db, "Posts"), {
        UUID: user.uid, 
        Text: postText.value,
        Image: postImageUrl.value,
        Dislikes: 0,
        Likes: 0,
        Reposts: 0,
        Timestamp: Timestamp.now(),
    });

    // console.log("");
    router.push("/dashboard");
}

</script>