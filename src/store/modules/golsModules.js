import axios from "axios";
import API from "@/services/API";

export default {
    state() {  // equivalente ao data de um componente
        return {
            carregando: false,
            gols: [],
        }
    },
    getters: { // equivalente ao computed de um componente

    },
    mutations: { // altera o state
        carregando(state) {
            state.carregando = true
        },
        partida_carregado(state, gols) {
            state.gols = gols
            state.carregando = false
        },
        gol_apagar(state, gol) {
            let index = state.gols.indexOf(gol)
            if (index >= 0) {
                state.gols.splice(index, 1)
            }
            state.carregando = false
        },
        gol_editar(state, {original, editado}) {
            Object.assign(original, editado)
            state.carregando = false
        },
        gol_criar(state, gol) {
            state.gols.push(gol)
            state.carregando = false
        }
    },
    actions: { // equivalente ao methods de um componente
        async carregar({commit}) {
            commit('carregando')

            axios.get(API).then(({data}) => {
                commit('gol_carregado', data)
            })
        },
        async apagar({commit}, gol) {
            commit('carregando')

            await axios.delete(`${API}/id/${gol.id}`)
            commit('gol_apagar', gol)

        },
        async criar({commit}, gol) {
            commit('carregando')
            await axios.post(
                API,
                {data: [gol]}
            )
            commit('gol_criar', gol)

        },
        async editar({commit}, {original, editado}) {
            commit('carregando')

            await axios.put(
                `${API}/id/${original.id}`,
                {data: [editado]}
            )
            commit('gol_editar', {original, editado})
        }

    }
}