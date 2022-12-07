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
                        <small class="card-muted">Likes: {{ post.Likes }}</small>
                        <br>
                        <small class="card-muted">  Dislikes: {{ post.Dislikes }}</small>
                        <br>
                        <small class="text-muted">{{post.Timestamp.toDate().toLocaleString()}}</small>
                    </div>
                </div>
            </div>

        </div>

    </body>
</template>

<style>
@import '../css/main.css';
.username{
    color: ;
}
.card-div{
    display: flex;
    justify-content: center;
}
.card {
    /* display: inline-block !important; */
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
/* .card {
    width:200px;
    height:400px;
} */
h2 {
    text-align:center;
    color: #6667AB;
    margin-top:0px
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
@media (max-width: 576px) {  
  .xs {color:red;font-weight:bold;}
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width:768px) {  
  .sm {color:red;font-weight:bold;}
}
 
/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) and (max-width:992px) {  
 .md {color:red;font-weight:bold;}
}
 
/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width:1200px) { 
 .lg {color:red;font-weight:bold;}
}
 
/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {  
    .xl {color:red;font-weight:bold;}
}
</style>