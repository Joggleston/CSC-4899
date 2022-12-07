<script setup>
    import { collection, query, getDocs } from "firebase/firestore";
    import { db } from "/src/main.js";
    

    const q = query(collection(db, "Posts"));

    const Docs = await getDocs(q); 
    const postArray = [];
    const userArray = [];
    
    Docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        postArray.push(doc.data());
    });

    

    
    console.log(userArray)


    // post.Image.replace(/\\/g,'\\\\')
    console.log(postArray[0].Image);


</script>

<template>
    <body>
        
        <p class = "header">Feed</p>

        <!-- this and its css are causing the cards to be cut off -->
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
@import '../css/main.css';
.card {
    display: inline-block !important;
    margin: 10px;
}
.card-body {
    background-color:#5a5959;
}
.card-title {
    color:#FFFFFF;
}
.card-text {
    color:#FFFFFF;
    height:100px;
}
.card-columns {
    column-count: 5;
}
.card {
    width:200px;
    height:400px;
    
}
h2 {
    text-align:center;
    color: #6667AB;
    margin-top:0px
}
.row {
    background-color:#5a5959;
    width:200%;
    border-style: solid;
    border-width: 3px;
    border-color:#6667AB;
    align-items:center;
}
.post {
    background-color: #5a5959;
    display:grid;
    column-count: 3;
}
.postimg {
    margin-left:10px;
    margin-right:10px;
    margin-bottom:10px;
    border-width: 5px;
    border-color: #FFFFFF;
    border-style:solid;
    float:left;
}
.post h2 {
    color:#FFFFFF;
    font-style: bolder;
    text-align:left;
    margin-left:20px;
    margin-top:20px;
}
.post h2:hover {
    color: #6667AB;
}
.comments {
    background-color:#262d26;
    color:#FFFFFF;
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