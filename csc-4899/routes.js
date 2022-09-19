import Home from "./components/pages/Home.vue"
import Login from "./components/pages/Login.vue"
import Logout from "./components/pages/Logout.vue"
import MakePost from "./components/pages/MakePost.vue"
import PostTopics from "./components/pages/PostTopics.vue"
import Profile from "./components/pages/Profile.vue"
import Register from "./components/pages/Register.vue"
import ShowPost from "./components/pages/ShowPost.vue"
import ShowTopic from "./components/pages/ShowTopic.vue"

export const routes = [
    { path: "/", name: "Home", component: Home}, 
    { path: "/home", redirect: "/"}, 
    { path: "/login", name: "Login", component: Login}, 
    { path: "/logout", name: "Logout", component: Logout}, 
    { path: "/create", name: "MakePost", component: MakePost}, 
    { path: "/topics/:id", name: "PostTopics", component: PostTopics}, 
    { path: "/u/id", name: "Profile", component: Profile}, 
    { path: "/register", name: "Register", component: Register}, 
    { path: "/show-post/:id", name: "ShowPost", component: ShowPost}, 
    { path: "/show-topic/:id", name: "ShowTopic", component: ShowTopic}
];