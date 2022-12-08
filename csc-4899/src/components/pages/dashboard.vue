<script setup>
    import { collection, query, getDocs } from "firebase/firestore";
    import { db } from "/src/main.js";
    
    const q = query(collection(db, "Posts"));
    const c = query(collection(db, "Comments"));

    const Docs = await getDocs(q); 
    const postArray = [];
    
    Docs.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        postArray.push([doc.data(),doc.id]);
    });


</script>
<script>
    import { collection, query, getDocs } from "firebase/firestore";
    import router from "../../routes";
    export default{
        methods: {
            imageClicked(img) {
                var modal = document.getElementById("myModal");
                var modalImg = document.getElementById("img01");

                modal.style.display = "block";
                modalImg.src = img;
            },

            closeImage() { 
                var modal = document.getElementById("myModal");
                modal.style.display = "none";
            },

            userProfile(result) {
                // console.log(result)
                sessionStorage.setItem("result",result);
                router.push('/profile');
            },
        }
    }
</script>

<template>
    <body>
        <!-- The Modal -->
        <div id="myModal" class="modal">
            <span @click="closeImage()" class="close">&times;</span>
            <img class="modal-content" id="img01">
        </div>
        
        <p class = "header">Feed</p>

        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">

            <!-- Post Card Here -->
            <div v-for="post in postArray" class="card-div">
                <div class="card">

                    <img @click="imageClicked(post[0].Image);" id="myImg" class="card-img-top" :src="post[0].Image" alt="Card image cap">
                    
                    <div class="card-body">
                        <small class="card-text">{{ post[0].Text }}</small>
                        <br>
                    </div>

                    <div class = "profile">
                        <button class="card-text-ul" @click="userProfile(post[0].UUID)">{{ post[0].Username }}</button>
                    </div>

                    <div class="card-footer">
                        <small class="card-muted">Likes: {{ post[0].Likes }}</small>
                        <small class="card-muted">  Dislikes: {{ post[0].Dislikes }}</small>
                        <br>
                        <router-link id="comments" class="card-muted" v-bind:to="('/show-post/' + post[1])">Comments</router-link>
                        <br>
                        <small class="text-muted">{{post[0].Timestamp.toDate().toLocaleString()}}</small>
                    </div>

                </div>
            </div>

        </div>

    </body>
</template>

<style>
@import '../css/main.css';
.username{
    color: white;
}
p {
    color:white;
}
.card {
    min-width:10000px;
    max-width:20000px;
    margin:10px;
}
.card-body {
    background-color:#5a5959;
}
.card-text-ul {
    background-color: #262d26;
    color:#7e80ef;
    font-weight:400;
    font-size:14px;
    float:center;
    text-align:center;
    vertical-align: center;
    margin-left: 2px;
    margin-bottom:2px;
}
.profile {
    background-color: #5a5959;
}
.card-title {
    color:#FFFFFF;
}
.card-text {
    color:#FFFFFF;

}

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
#comments{
    color: #6667AB;
    text-decoration: underline;
    font-weight: bold;
}
.card-div{
    display: flex;
    justify-content: center;
    size:3000px;
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