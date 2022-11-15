<script setup>
    import { collection, query, getDocs } from "firebase/firestore";
    import { db } from "/src/main.js";

    const q = query(collection(db, "Posts"));

    const Docs = await getDocs(q); 
    const postArray = [];

    Docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        postArray.push(doc.data());
    });

    // post.Image.replace(/\\/g,'\\\\')
    console.log(postArray[0].Image);


</script>

<template>
    <body>
        
        <h2>Feed</h2>

        <!-- Post Card Here -->

        <div class="card-deck">
            <div v-for="post in postArray">
                <div class="card">
                    <img class="card-img-top" :src="post.Image" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Poster Unique ID: {{ post.UUID }}</h5>
                        <p class="card-text">Post Text: {{ post.Text }}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Posted on {{post.Timestamp}}</small>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style>
@import '../css/main.css';
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
}
.post {
    background-color: #5a5959;
    display:grid;
    column-count: 3;
}
.postimg {
    margin-left:20px;
    margin-right:20px;
    margin-bottom:20px;
    border-width: 3px;
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
</style>