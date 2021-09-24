<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Controle de Gols</h1>
    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">ID</th>
        <th scope="col">Time</th>
        <th scope="col">Jogador</th>
        <th scope="col">Gol</th>
        <th scope="col">Editar ou Apagar</th>
        </thead>
        <tbody>
        <tr v-bind:key="gol.id" v-for="(gol, index) in gols">
          <td scope="row">{{ gol.id }}</td>
          <td>{{ gol.time }}</td>
          <td>{{ gol.jogador }}</td>
          <td>{{ gol.partida }}</td>

          <td class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button class="btn btn-outline-warning btn-sm fs-12 px-1 mt-1 me-md-2" @click="editar(gol)">
              <router-link :to="{name: 'editargols', params: {gol:gol.id - 1}}">Editar</router-link>
            </button>
            <button class="btn btn-outline-danger btn-sm fs-12 px-1 mt-1 me-md-2" @click="apagar(gol, index)">
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

let golNovo = (time_id, jogador_id, partida_id, max) => {
  let max_id = max || 0
  return {
    id: max_id + 1,
    time_id: time_id,
    jogador_id: jogador_id,
    partida_id: partida_id
  };
};
export default {

  data() {
    return {
      gol: golNovo(),
      gols: [],
      carregando: true,
      editando: false,
    };
  },
  methods: {

    editar(gol) {
      this.editando = true;
      this.jogador = gol;
    },
    apagar(gol, index) {
      this.carregando = true;
      axios
          .delete(`http://localhost:3000/gols/${gol.id}`)
          .then(() => {
            this.gols.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/gols/').then(({data}) => {
      this.gols = data;
      this.carregando = false;
    });
  },
};
</script>

<style scoped>

</style>