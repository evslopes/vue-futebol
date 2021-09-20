<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Tabela de Partidas</h1>

    <div>
      <router-link to="/cadastropartidas">
        <button class="btn btn-primary fs-8 px-1 mt-1">Nova Partida</button>
      </router-link>
    </div>

    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">ID</th>
        <th scope="col">Time Casa</th>
        <th scope="col">Gols Casa</th>
        <th scope="col">Vs</th>
        <th scope="col">Gols Visitante</th>
        <th scope="col">Time Visitante</th>
        </thead>
        <tbody>
        <tr v-bind:key="partida.id" v-for="(partida, index) in partidas">
          <td>{{ partida.id }}</td>
          <td>{{ partida.time_casa }}</td>
          <td> GOLs </td>
          <td>VS</td>
          <td>GOLS</td>
          <td>{{ partida.time_visitante }}</td>

          <td>
            <button class="btn btn-warning fs-8 px-1 mt-1" @click="editar(partida)">
              <router-link :to="{name: 'editarpartidas', params: {partida:partida.id - 1}}">Editar</router-link>
            </button>
            <button class="btn btn-danger fs-8 px-1 mt-1" @click="apagar(partida, index)">Apagar</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import axios from "axios";

let partidasNovo = (max) => {
  let max_id = max || 0
  return {
    id: max_id + 1,
    time_casa: "",
    time_visitante: ""
  };
};

export default {

  components: {},
  data() {
    return {
      partida: {
        id: "",
        time_casa: "",
        time_visitante: ""
      },
      partidas: [],
    };
  },

  methods: {
    salvar() {
      axios
          .post("http://localhost:3000/partidas", {...this.partida})
          .then((data) => {
            this.partidas.id = data.id
            this.partidas.push(this.partida);
            this.partida = partidasNovo(Math.max(...this.partidas.map(t => t.id)));
            this.editando = false
            this.carregando = false;
          });
    },
    editar(partida) {
      this.editando = true;
      this.partida = partida;
    },
    apagar(partida, index) {
      this.carregando = true;
      axios
          .delete(`http://localhost:3000/partidas/${partida.id}`)
          .then(() => {
            this.partidas.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/partidas/').then(({data}) => {
      this.partidas = data;
    });
  },
}
</script>

<style scoped>

</style>