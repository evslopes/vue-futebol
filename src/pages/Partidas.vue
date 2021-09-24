<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Tabela de Partidas</h1>

    <div class="d-grid gap-2 col-6 mx-auto">
      <router-link :to="{name:'cadastropartidas'}">
        <button class="btn btn-primary fs-8 px-1 mt-1 btn-sm">Nova Partida</button>
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
        <th scope="col">Editar ou Apagar</th>
        </thead>
        <tbody>
        <tr v-bind:key="partida.id" v-for="(partida, index) in partidas">
          <td>
            <router-link :to="{name: 'detalhespartida', params: {partida:partida.id - 1}}">
              {{ partida.id }}
            </router-link>
          </td>
          <td>{{ partida.time_casa }}</td>
          <td> GOLs</td>
          <td>VS</td>
          <td>GOLS</td>
          <td>{{ partida.time_visitante }}</td>

          <td class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button class="btn btn-outline-warning btn-sm fs-12 px-1 mt-1 me-md-2" @click="editar(partida)">
              <router-link :to="{name: 'editarpartidas', params: {partida:partida.id}}">Editar</router-link>
            </button>
            <button class="btn btn-outline-danger btn-sm fs-12 px-1 mt-1 me-md-2" @click="apagar(partida, index)">
              Apagar
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>

import axios from "axios";

let partidaNova = () => {
  return {
    time_casa: "",
    time_visitante: ""
  };
};

let golNovo = () => {
  return {
    id: "",
    time: "",
    jogador: "",
    partida: ""
  };
};

export default {

  components: { },
  data() {
    return {
      partida: partidaNova(),
      partidas: [],
      gol: golNovo(),
      gols: [],
    };
  },

  methods: {
    salvar() {
      axios
          .post("http://localhost:3000/partidas", {...this.partida})
          .then((data) => {
            this.partidas.id = data.id
            this.partidas.push(this.partida);
            this.partida = partidaNova(Math.max(...this.partidas.map(t => t.id)));
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
      this.carregando = false;
      this.partida = partidaNova(Math.max(...this.partidas.map(t => t.id)));
    });

    axios.get('http://localhost:3000/gols').then(({data}) => {
      this.gol = golNovo(this.$route.params.gols, Math.max(this.gols.map(g => g.id)));
      this.gols = data;
      this.carregando = false;
    });
  },
}
</script>

<style scoped>

</style>