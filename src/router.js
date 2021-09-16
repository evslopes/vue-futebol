import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home";
import Times from "./pages/Times";
import Jogadores from "./pages/Jogadores";
import CadastroJogadores from "./pages/CadastroJogadores";
import CadastroTimes from "./pages/CadastroTimes";
import EditarTimes from "@/pages/EditarTimes";
import EditarJogadores from "@/pages/EditarJogadores";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes : [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/times',
            name: 'times',
            component: Times
        },

        {
            path: '/cadastrotimes',
            name: 'cadastrotimes',
            component: CadastroTimes
        },
        {
            path: '/editartimes',
            name: 'editartimes',
            component: EditarTimes
        },
        {
            path: '/jogadores',
            name: 'jogadores',
            component: Jogadores
        },
        {
            path: '/cadastrojogadores',
            name: 'cadastrojogadores',
            component: CadastroJogadores
        },
        {
            path: '/editarjogadores',
            name: 'editarjogadores',
            component: EditarJogadores
        }
    ]
});