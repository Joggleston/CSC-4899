<template>
    <!-- Create Post -->
    <div class="form">
        <form class="create-form" @submit.prevent="post">
            <input type="text" placeholder="Text Here..." v-model="postText" required/>
            <input type="image" placeholder="Image URL..." v-model="postImageUrl" required/>
            <button type="submit">Publish</button>
        </form>
    </div>
</template>

<script>
// import { doc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { doc, addDoc, serverTimestamp } from 'firebase/compat/firestore'; 
const postText = ref("");
const postImageUrl = ref("");

const register = () => {
    //https://firebase.google.com/docs/firestore/manage-data/add-data
    const docData = {
        UUID: "UUID String here",
        Text: postText,
        Image: postImageUrl,
        Dislikes: 0,
        Likes: 0,
        Reposts: 0,
        Timestamp: serverTimestamp()
    }

    // Add a new document in collection "Posts" with auto gen id
    addDoc(doc(db, "Posts"), docData);

    console.log("");
    // router.push("/dashboard");
}

</script>