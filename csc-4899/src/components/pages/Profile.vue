<script setup>
        import { collection, query, getDocs, where } from "firebase/firestore";
        import { db } from "/src/main.js";
        import { getAuth } from "firebase/auth";

        //grabs current loggedin users id
        const auth = getAuth();
        var user = auth.currentUser;

        const username = [];
        const usernameQ = await getDocs(query(collection(db,"Users"), where("UUID","==",user.uid)));
        usernameQ.forEach((doc) => {

            username.push(doc.data());
        });

        const postArray = [];
        const postQ = await getDocs(query(collection(db,"Posts"), where("UUID","==",user.uid)));
        console.log(postQ);
        postQ.forEach((doc) => {
            
            postArray.push(doc.data());
            console.log(doc.id, " => ", doc.data());
            
        });


</script>
<template>
    
    <body>
        <div v-for="name in username">
            <p class ="name">{{ name.Username }}</p>
        </div>
        

        <div v-for="post in postArray">
            <img class="card-img-top" :src="post.Image" alt="Card image cap">
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
p {
    color:white;
}

</style>

