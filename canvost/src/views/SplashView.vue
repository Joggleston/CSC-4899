<template>
  <div class="bg-success" style="position:relative;--bs-bg-opacity:.5">
    <div class="container-fluid d-flex">
      <div class="row">
        <div class="col-8">
          <Carousel/>
        </div>
        <div class="col-4 gx-2 px-2 border rounded-5 overflow-hidden bg-primary text-light" style="--bs-bg-opacity: .5;">
          <div class="col my-4">
            <h3>Welcome to Canvost!</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repellat! Debitis accusamus quos atque dolore enim. Fugit, voluptatum vero voluptate architecto nesciunt, voluptates eveniet recusandae corrupti molestias culpa, et nisi.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum maxime veritatis illo?</p>
          </div>
          <div class="col">
            <Login/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Login from "@/components/Login.vue"
  import Carousel from "@/components/Carousel.vue"

  export default {
    name: "Splash",
    components: {
      Login,
      Carousel
    }
  }
</script>