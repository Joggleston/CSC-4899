import { createApp } from 'vue'
import App from './components/pages/Home.vue'
import router from "./routes"
import { initializeApp } from "firebase/app"
import "./components/css/main.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const firebaseConfig = {
    apiKey: "AIzaSyB3Ak6z97pHKC48i6ovMhVutHXoRU6dM3c",
    authDomain: "csc-4899-76d79.firebaseapp.com",
    projectId: "csc-4899-76d79",
    storageBucket: "csc-4899-76d79.appspot.com",
    messagingSenderId: "39434280477",
    appId: "1:39434280477:web:5cc0eab3f850b5fc0b30f4",
    measurementId: "G-ESW1QSR1M5"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)
app.mount('#app')