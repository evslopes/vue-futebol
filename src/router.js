import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/Home";
import Times from "./pages/Times";
import Jogadores from "./pages/Jogadores";
import CadastroJogadores from "./pages/JogadoresCadastro";
import CadastroTimes from "./pages/TimesCadastro";
import EditarTimes from "@/pages/TimesEditar";
import EditarJogadores from "@/pages/JogadoresEditar";
import Partidas from "@/pages/Partidas";
import PartidasCadastro from "@/pages/PartidasCadastro";
import PartidasEditar from "@/pages/PartidasEditar";
import Gols from "@/pages/Gols";
import GolsCadastrar from "@/pages/GolsCadastrar";
import GolsEditar from "@/pages/GolsEditar";
import TimeDetalhes from "@/pages/TimeDetalhes";
import JogadoresDetalhes from "@/pages/JogadoresDetalhes";
import PartidasDetalhes from "@/pages/PartidasDetalhes";

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
            path: '/times/:time',
            name: 'detalhestime',
            component: TimeDetalhes
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
            path: '/jogadores/:jogador',
            name: 'detalhesjogador',
            component: JogadoresDetalhes
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
        },
        {
            path: '/partidas',
            name: 'partidas',
            component: Partidas
        },

        {
            path: '/partidas/:partida',
            name: 'detalhespartida',
            component: PartidasDetalhes
        },

        {
            path: '/cadastropartidas',
            name: 'cadastropartidas',
            component: PartidasCadastro
        },
        {
            path: '/editarpartidas/:partida',
            name: 'editarpartidas',
            component: PartidasEditar
        },
        {
            path: '/gols',
            name: 'gols',
            component: Gols
        },
        {
            path: '/cadastrogols',
            name: 'cadastrogols',
            component: GolsCadastrar
        },
        {
            path: '/editargols/:gol',
            name: 'editargols',
            component: GolsEditar
        }
    ]
});