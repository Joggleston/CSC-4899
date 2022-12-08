<template>
    
    <body>
        <!-- The Modal -->
        <div id="myModal" class="modal">
            <span @click="closeImage()" class="close">&times;</span>
            <img class="modal-content" id="img01">
        </div>

        <div v-for="name in username">
            <p class ="name">{{ name.Username }}</p>
        </div>
        
        
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
                        <button class="card-text-un">{{ post[0].Username }}</button>
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

<script>

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
        }
    }
</script>

<script setup>


        import { collection, query, getDocs, where } from "firebase/firestore";
        import { db } from "/src/main.js";
        import { getAuth } from "firebase/auth";
        import { computed } from "@vue/reactivity";
        import {useRouter} from "vue-router";
        const router = useRouter();

        

        //grabs current loggedin users id
        const auth = getAuth();
        var user = auth.currentUser;
        var uniqueid = user.uid;
        var result = null;
        result = sessionStorage.getItem("result")
        console.log(result);
        if (result != null) {
            uniqueid = result;
            result = null;
        }

        


        const username = [];
        const usernameQ = await getDocs(query(collection(db,"Users"), where("UUID","==",uniqueid)));
        usernameQ.forEach((doc) => {
            username.push(doc.data());
        });

        //create array of database data
        const postArray = [];
        const postQ = await getDocs(query(collection(db,"Posts"), where("UUID","==",uniqueid)));

        postQ.forEach((doc) => {
            postArray.push([doc.data(),doc.id]);
            // console.log(doc.id, " => ", doc.data());
            
        });

        
        

</script>

<style>
.name {
    color:white;
    font-weight:200;
    text-align: center;
    padding: 0px;
    background-color: #7e80ef;
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
.card-text-un {
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
/* image popout related */
#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
#myImg:hover {opacity: 0.7;}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}
/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}
/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}
/* Add Animation - Zoom in the Modal */
.modal-content, #caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}
@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}
/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}
.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}

</style>