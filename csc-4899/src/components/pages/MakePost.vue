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
import { doc, setDoc, Timestamp} from "firebase/firestore"; 

const postText = ref("");
const postImageUrl = ref("");

const register = () => {

    var documentName = "something";

    const docData = {
        UUID: "UUID String here",
        Text: postText,
        Image: postImageUrl,
        PostID: "add 1 to last post id",
        Dislikes: 0,
        Likes: 0,
        Reposts: 0,
        Timestamp: Timestamp.now()
    }
    // Add a new document in collection "Posts"
    setDoc(doc(db, "Posts", documentName), docData);
}

</script>