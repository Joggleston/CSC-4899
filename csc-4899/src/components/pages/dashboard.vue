<template>
    <body>
        <h1>Dashboard</h1>
        <Logout/> <!-- this is the logout button -->
        <p>should only be visible to user logged in !!</p>
    </body>
</template>

<script>
import Logout from '@/components/pages/Logout.vue'

export default {
  name: 'Dashboard',
    components: {
        Logout
    },
}
</script>