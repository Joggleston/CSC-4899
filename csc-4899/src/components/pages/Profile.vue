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
        
        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            
            <!-- Post Card Here -->
            <div v-for="post in postArray" class="card-div">
                <div class="card">
                    <img @click="imageClicked(post.Image);" id="myImg" class="card-img-top" :src="post.Image" alt="Card image cap">
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

<script>
    export default{
        props: ['myprop'],
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