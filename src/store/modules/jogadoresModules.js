import axios from "axios";
import API from "@/services/API";

export default {
    state() {  // equivalente ao data de um componente
        return {
            carregando: false,
            jogadores: [],
        }
    },
    getters: { // equivalente ao computed de um componente

    },
    mutations: { // altera o state
        carregando(state) {
            state.carregando = true
        },
        jogador_carregado(state, jogadores) {
            state.jogadores = jogadores
            state.carregando = false
        },
        jogador_apagar(state, jogador) {
            let index = state.times.indexOf(jogador)
            if (index >= 0) {
                state.times.splice(index, 1)
            }
            state.carregando = false
        },
        jogador_editar(state, {original, editado}) {
            Object.assign(original, editado)
            state.carregando = false
        },
        jogador_criar(state, time) {
            state.times.push(time)
            state.carregando = false
        }
    },
    actions: { // equivalente ao methods de um componente
        async carregar({commit}) {
            commit('carregando')

            axios.get(API).then(({data}) => {
                commit('time_carregado', data)
            })
        },
        async apagar({commit}, jogador) {
            commit('carregando')

            await axios.delete(`${API}/id/${jogador.id}`)
            commit('time_apagar', jogador)

        },
        async criar({commit}, jogador) {
            commit('carregando')
            await axios.post(
                API,
                {data: [jogador]}
            )
            commit('time_criar', jogador)

        },
        async editar({commit}, {original, editado}) {
            commit('carregando')

            await axios.put(
                `${API}/id/${original.id}`,
                {data: [editado]}
            )
            commit('jogador_editar', {original, editado})
        }

    }
}