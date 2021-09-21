import axios from "axios";
import API from "@/services/API";

export default {
    state() {  // equivalente ao data de um componente
        return {
            carregando: false,
            partidas: [],
        }
    },
    getters: { // equivalente ao computed de um componente

    },
    mutations: { // altera o state
        carregando(state) {
            state.carregando = true
        },
        partida_carregado(state, partidas) {
            state.partidas = partidas
            state.carregando = false
        },
        partida_apagar(state, partida) {
            let index = state.partidas.indexOf(partida)
            if (index >= 0) {
                state.partidas.splice(index, 1)
            }
            state.carregando = false
        },
        partida_editar(state, {original, editado}) {
            Object.assign(original, editado)
            state.carregando = false
        },
        partida_criar(state, partida) {
            state.partidas.push(partida)
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
        async apagar({commit}, partida) {
            commit('carregando')

            await axios.delete(`${API}/id/${partida.id}`)
            commit('partida_apagar', partida)

        },
        async criar({commit}, partida) {
            commit('carregando')
            await axios.post(
                API,
                {data: [partida]}
            )
            commit('partida_criar', partida)

        },
        async editar({commit}, {original, editado}) {
            commit('carregando')

            await axios.put(
                `${API}/id/${original.id}`,
                {data: [editado]}
            )
            commit('partida_editar', {original, editado})
        }

    }
}