import Vuex from 'vuex'
import axios from 'axios'
import API from "@/services/API";

export const store = new Vuex.Store({
    state() {  // equivalente ao data de um componente
        return {
            carregando: false,
            times: []
        }
    },
    getters: { // equivalente ao computed de um componente

    },
    mutations: { // altera o state
        carregando(state) {
            state.carregando = true
        },
        time_carregado(state, times) {
            state.times = times
            state.carregando = false
        },
        time_apagar(state, time) {
            let index = state.times.indexOf(time)
            if (index >= 0) {
                state.times.splice(index, 1)
            }
            state.carregando = false
        },
        time_editar(state, {original, editado}) {
            Object.assign(original, editado)
            state.carregando = false
        },
        time_criar(state, time) {
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
        async apagar({commit}, time) {
            commit('carregando')

            await axios.delete(`${API}/id/${time.id}`)
            commit('time_apagar', time)

        },
        async criar({commit}, time) {
            commit('carregando')
            await axios.post(
                API,
                {data: [time]}
            )
            commit('time_criar', time)

        },
        async editar({commit}, {original, editado}) {
            commit('carregando')

            await axios.put(
                `${API}/id/${original.id}`,
                {data: [editado]}
            )
            commit('time_editar', {original, editado})
        }

    }
})
