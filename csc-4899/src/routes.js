import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// page imports
import Home from "./components/pages/Home.vue"
import Login from "./components/pages/Login.vue"
import MakePost from "./components/pages/MakePost.vue"
import PostTopics from "./components/pages/PostTopics.vue"
import Profile from "./components/pages/Profile.vue"
import Register from "./components/pages/Register.vue"
import ShowPost from "./components/pages/ShowPost.vue"
import ShowTopic from "./components/pages/ShowTopic.vue"
import Dashboard from "./components/pages/dashboard.vue"
import Canvas from "./components/pages/Canvas.vue"
import Bootstrap from "./components/pages/Bootstrap.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/home", name: "Home", component: Home}, 
        { path: "/", redirect: "/dashboard", meta:{requiresAuth: true }}, //this should be the first page the user sees, default route view
        { path: "/login", name: "Login", component: Login},
        { path: "/create", name: "MakePost", component: MakePost, meta: { requiresAuth: true }}, 
        { path: "/topics/:id", name: "PostTopics", component: PostTopics}, 
        { path: "/profile", name: "Profile", component: Profile, meta: {requiresAuth: true }, props: { profile: true }}, 
        { path: "/register", name: "Register", component: Register}, 
        { path: "/show-post/:id", name: "ShowPost", component: ShowPost}, 
        { path: "/show-topic/:id", name: "ShowTopic", component: ShowTopic},
        { path: "/bootstrap", name: "Bootstrap", component: Bootstrap},
        { path: "/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true }},
        { path: "/canvas", name: "Canvas", component: Canvas, meta: { requiresAuth: true }},
    ]
});

// some methods n stuff
const getCurrentUser = () => { //grabs current user
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

router.beforeEach(async (to, from, next) => { //happens before each route change
    if (to.matched.some((record) => record.meta.requiresAuth)) { //this is neva true
        if (await getCurrentUser() ) { 
            next();
        } else {
            // alert('You must be logged in to see this page');
            next("/login");
        }
    } else {
        next();
    }
});



export default router;