import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store';

import App from './components/partials/App.vue';

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'hash',
    routes,
    store
});

const app = new Vue({
    el: "#app",
    components: { App },
    router,
    store,
    created: function() {
        document.getElementById("loading").style.display = "block";
    },
    mounted: function() {
       // we will use this lifecyle hook later
    },
    updated: function() {
        
    }
});