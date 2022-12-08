<script>
// import { ref } from "vue";
import { db } from "/src/main.js";
import router from "../../routes";
import { collection, query, getDocs, where, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default{
    data() {
        return {
            id: this.$route.params.id,
            commentArray: [],
            postText: '',
            postImage: '',
        }
    },
    methods: {
        async createCommentsArray() {
            const comments = await getDocs(query(collection(db,"Comments"), where("PostID","==",this.id)));

            comments.forEach((doc) => {
                this.commentArray.push(doc.data());
                console.log(doc.data());
            })
        },
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
        async createPost(submitEvent) {
            const auth = getAuth();
            var user = auth.currentUser;
            
            const ourUsername = [];
            const queryU = query(collection(db,"Users"),where("UUID","==",user.uid));
            const ourUN = await getDocs(queryU);
            ourUN.forEach((doc) => {
                ourUsername.push(doc.data());
            });

            var user = auth.currentUser;
            
            await addDoc(collection(db, "Comments"), {
                PostID: this.id,
                UUID: user.uid, 
                Text: this.postText,
                Image: this.postImage,
                Username: ourUsername[0].Username,
                Dislikes: 0,
                Likes: 0,
                Timestamp: Timestamp.now(),
            });

            //refreshes page
            this.$router.go()
        },
    },
    created() {
        this.createCommentsArray()
    },
}
</script>

<template>
    <body>
        <!-- The Modal, for image enlarging -->
        <div id="myModal" class="modal">
            <span @click="closeImage()" class="close">&times;</span>
            <img class="modal-content" id="img01">
        </div>

        <!-- simple header -->
        <p class="header">Comments</p>
        
        <!-- POST CARDS -->
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <div v-for="comment in commentArray" class="card-div">

                <div class="card">
                    <img v-if="comment.Image" @click="imageClicked(comment.Image);" id="myImg" class="card-img-top" :src="comment.Image" alt="Card image cap">
                    <div class="card-body">
                        <small class="card-text">{{ comment.Text }}</small>
                    </div>
                    <div class = "profile">
                        <button class="card-text-ul" @click="userProfile(comment.UUID)">{{ comment.Username }}</button>
                    </div>
                    <div class="card-footer">
                        <small class="card-muted">Likes: {{ comment.Likes }}</small>
                        <small class="card-muted">  Dislikes: {{ comment.Dislikes }}</small>
                        <br>
                        <small class="text-muted">{{comment.Timestamp.toDate().toLocaleString()}}</small>
                    </div>
                </div>

            </div>
        </div>

        <!-- Create Comment -->
        <p class = "header">Post Comment</p>
        <div class="form">
            <form class="create-form" @submit.prevent="createPost">
                <textarea cols="30" rows="10" placeholder="Text Here..." v-model="postText" required></textarea>
                <input type="text" placeholder="Image URL..." v-model="postImage" required/>
                <button type="submit">Publish</button>
            </form>
        </div>

    </body>
</template>