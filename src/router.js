import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home";
import Times from "./pages/Times";
import Jogadores from "./pages/Jogadores";
import CadastroJogadores from "./pages/JogadoresCadastro";
import CadastroTimes from "./pages/TimesCadastro";
import EditarTimes from "@/pages/TimesEditar";
import EditarJogadores from "@/pages/JogadoresEditar";

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
            path: '/editartimes/:time',
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
            path: '/editarjogadores/:jogador',
            name: 'editarjogadores',
            component: EditarJogadores
        }
    ]
});