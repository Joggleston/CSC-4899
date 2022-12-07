<script setup>
        import { collection, query, getDocs, where } from "firebase/firestore";
        import { db } from "/src/main.js";
        import { getAuth } from "firebase/auth";

        //grabs current loggedin users id
        const auth = getAuth();
        var user = auth.currentUser;

        //error cause we try testing for uid before page finished loading
        //sort database based on user id posts
        // const q = query(collection(db, "Posts"), where("UUID", "==", user.uid));
        // const Docs = await getDocs(q); 

        // const postArray = [];
        // Docs.forEach((doc) => {
        //     postArray.push(doc.data());
        // });
        // console.log(Docs)
        const username = [];
        const usernameQ = await getDocs(query(collection(db,"Users"), where("UUID","==",user.uid)));
        usernameQ.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            username.push(doc.data())
        });


</script>
<template>
    
    <body>
        <div v-for="name in username">
            <p class ="name">{{ name.Username }}</p>
        </div>
        

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

<style>
.name {
    color:white;
    font-weight:200;
    text-align: center;
    padding: 0px;
    background-color: #6667AB;
    font-size:200%;
    float:center;
}

</style>

