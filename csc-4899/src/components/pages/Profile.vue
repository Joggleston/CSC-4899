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
        
        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

            <!-- Post Card Here -->
            <div v-for="post in postArray" class="card-div">
                <div class="card">
                    <img class="card-img-top" :src="post.Image" alt="Card image cap">
                    <div class="card-body">
                        <small class="card-text">{{ post.Text }}</small>
                        <br><br>
                        <small class="card-text">-{{ post.Username }}</small>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">{{
                            post.Timestamp.toDate().toLocaleString()
                            }}</small>
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