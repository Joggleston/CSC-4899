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
        
        
        <div class="card-columns"> 
            <!-- Post Card Here -->
                <div v-for="post in postArray">
                    <div class="card">
                        <img class="card-img-top" :src="post.Image" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text">{{ post.Text }}</p>
                        </div>
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
p {
    color:white;
}
.card {
    max-width:200px;
}
.card-body {
    background-color:#262d26;
}


</style>