<script>
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "/src/main.js";

export default{
    data() {
        return {
            id: this.$route.params.id,
            commentArray: [],
        }
    },
    methods: {
        async createCommentsArray() {
            const comments = await getDocs(query(collection(db,"Comments"), where("PostID","==",this.id)));
            // const commentArray = [];

            comments.forEach((doc) => {
                this.commentArray.push(doc.data());
                console.log(doc.data());
            })
        },
        commentOnPost(textEntry) {

        },
        closeImage() { 
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        },
    },
    created() {
        this.createCommentsArray()
    },
}
</script>

<template>
    <body>
        <!-- The Modal -->
        <div id="myModal" class="modal">
            <span @click="closeImage()" class="close">&times;</span>
            <img class="modal-content" id="img01">
        </div>

        <p class="header">Comments</p>

        
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <div v-for="comment in commentArray" class="card-div">

                <!-- <p>{{comment.Text}}</p>
                <br> -->

                <div class="card">
                    <img v-if="comment.image" @click="imageClicked(comment.Image);" id="myImg" class="card-img-top" :src="comment.Image" alt="Card image cap">
                    <div class="card-body">
                        <small class="card-text">{{ comment.Text }}</small>
                        <br><br>
                        <small class="card-text">-{{ comment.Username }}</small>
                    </div>
                    <div class="card-footer">
                        <small class="card-muted">Likes: {{ comment.Likes }}</small>
                        <br>
                        <small class="card-muted">  Dislikes: {{ comment.Dislikes }}</small>
                        <br>
                        <small class="text-muted">{{comment.Timestamp.toDate().toLocaleString()}}</small>
                    </div>
                </div>


            </div>
        </div>
    </body>
</template>