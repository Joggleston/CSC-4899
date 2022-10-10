import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

// page imports
import Home from "./components/pages/Home.vue"
import Login from "./components/pages/Login.vue"
import Logout from "./components/pages/Logout.vue"
import MakePost from "./components/pages/MakePost.vue"
import PostTopics from "./components/pages/PostTopics.vue"
import Profile from "./components/pages/Profile.vue"
import Register from "./components/pages/Register.vue"
import ShowPost from "./components/pages/ShowPost.vue"
import ShowTopic from "./components/pages/ShowTopic.vue"
import Dashboard from "./components/pages/dashboard.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "Home", component: Home}, 
        { path: "/home", redirect: "/"}, 

        { path: "/login", name: "Login", component: Login}, 
        { path: "/logout", name: "Logout", component: Logout}, 

        { path: "/create", name: "MakePost", component: MakePost}, 
        { path: "/topics/:id", name: "PostTopics", component: PostTopics}, 
        { path: "/u/id", name: "Profile", component: Profile}, 
        { path: "/register", name: "Register", component: Register}, 
        { path: "/show-post/:id", name: "ShowPost", component: ShowPost}, 
        { path: "/show-topic/:id", name: "ShowTopic", component: ShowTopic},

        { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { authRequired: true}}
    ]
});

// some methods n stuff
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (getAuth().currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/login',
            });
        }
    } else {
        next();
    }
});

export default router;