<template>
    <!-- Create Post -->
    <p class = "header">Upload An Image</p>
    <div class="form">
        <form class="create-form" @submit.prevent="register">
            <!-- <input type="text" placeholder="Text Here..." v-model="postText" required/> -->
            <textarea cols="30" rows="10" placeholder="Text Here..." v-model="postText" required></textarea>
            <input type="text" placeholder="Image URL..." v-model="postImageUrl" required/>
            <button type="submit">Publish</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '/src/main.js';
import { useRouter } from "vue-router";

const postText = ref("");
const postImageUrl = ref("");
const auth = getAuth();
const router = useRouter();
var user = auth.currentUser;

const ourUsername = [];
const queryU = query(collection(db,"Users"),where("UUID","==",user.uid));
const ourUN = await getDocs(queryU);
ourUN.forEach((doc) => {
    ourUsername.push(doc.data());
});
console.log(ourUsername);
const register = () => {
    var user = auth.currentUser;
    
    console.log(queryU);


    //https://firebase.google.com/docs/firestore/manage-data/add-data

    // Add a new document in collection "Posts" with auto gen id
    addDoc(collection(db, "Posts"), {
        UUID: user.uid, 
        Text: postText.value,
        Image: postImageUrl.value,
        Username: ourUsername[0].Username,
        Dislikes: 0,
        Likes: 0,
        Reposts: 0,
        Timestamp: Timestamp.now(),
    });

    // console.log("");
    router.push("/dashboard");
}

</script>

<style>
textarea{
font-family: "Roboto", sans-serif;
outline: 0;
background: #afaeae;
width: 100%;
border: 0;
margin: 0 0 15px;
padding: 15px;
box-sizing: border-box;
font-size: 14px;
}
.form {
margin-top: 25px;
}

.header {
    color:white;
    font-weight:200;
    text-align: center;
    padding: 0px;
    background-color: #6667AB;
    font-size:200%;
    float:center;
}
</style>