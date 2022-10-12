<template>
    <body>
        <h2>Dashboard</h2>
        <div class = "post">
            <h2>John Doe</h2>
            <!-- These will need to be implemented for the post functions. Serves more of 
            an example of a post. -->
            <!-- #the ./ tells the script that you're looking in the active directory -->
            <img class = "postimg" src="./images/painting_scott_johnson.jpg" height="400" width="400" alt="Sample Image"/>
            
        </div>
    </body>
</template>

<script>
export default {
    
}
</script>
<style>
h2 {
    text-align:center;
    color:#4CAF50;
    margin-top:0px
}
.post {
    background-color: #5a5959;
    display:grid;
}
.postimg {
    margin-left:20px;
    margin-bottom:20px;
    border-width: 3px;
    border-color: #FFFFFF;
    border-style:solid;
}
.post h2 {
    color:#FFFFFF;
    font-style: bolder;
    text-align:left;
    margin-left:20px;
    margin-top:20px;
}
</style>