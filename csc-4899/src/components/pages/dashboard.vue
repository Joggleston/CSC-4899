<template>
    <body>
        
        <h2>Feed</h2>

        <!-- These will need to be implemented for the post functions. Serves more of 
        an example of a post. -->
        <div class="row">

            <div class = "post">

                <!-- #the ./ tells the script that you're looking in the active directory -->
                <img class = "postimg" src="./images/painting_scott_johnson.jpg" height="400" width="400" alt="Sample Image"/>
            </div>

            <div class = "comments">
            </div>

        </div>
    </body>
</template>

<script>
export default {
    
}



</script>

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