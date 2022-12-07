<template>
    
    <body>

        <h2>Profile</h2>

        <div v-for="post in postArray">

            <div class="card">
                <img class="card-img-top" :src="post.Image" alt="Card image cap">
                <div class="card-body">
                    <p class="card-text">{{ post.Text }}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">{{ post.UUID }}</small>
                    <br>
                    <small class="text-muted">{{post.Timestamp.toDate()}}</small>
                </div>
            </div>
        </div>

    </body>
</template>

<script setup>
        import { collection, query, getDocs, where } from "firebase/firestore";
        import { db } from "/src/main.js";
        import { getAuth } from "firebase/auth";

        //grabs current loggedin users id
        const auth = getAuth();
        var user = auth.currentUser;

        //error cause we try testing for uid before page finished loading
        //sort database based on user id posts
        const q = query(collection(db, "Posts"), where("UUID", "==", user.uid));
        const Docs = await getDocs(q); 

        const postArray = [];
        Docs.forEach((doc) => {
            postArray.push(doc.data());
            console.log(postArray)
        });


</script>