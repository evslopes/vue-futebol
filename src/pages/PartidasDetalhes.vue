<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Detalhes da Partida</h1>
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
        <tr>
          <td>{{ partida.id }}</td>
          <td>{{ partida.time_casa }}</td>
          <td> GOLs</td>
          <td>VS</td>
          <td>GOLS</td>
          <td>{{ partida.time_visitante }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <h1 class="fs-1 px-2 mt-5 display-1">Gols da Partida</h1>
    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">ID</th>
        <th scope="col">Time</th>
        <th scope="col">Jogador</th>
        <th scope="col">Partida</th>
        </thead>
        <tbody>
        <tr v-bind:key="gol.id" v-for="(gol) in gols">
          <td scope="row">{{ gol.id }}</td>
          <td>{{ gol.time }}</td>
          <td>{{ gol.jogador }}</td>
          <td>{{ gol.partida }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import API from "@/services/API";

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
      gol: {
        id: "",
        time: "",
        jogador: "",
        partida: ""
      },
      gols: []
    };
  },

  mounted() {
    axios.get(`${API}/partidas/`).then(({data}) => {
      this.partidas = data;
      this.carregando = false;
      this.partida = this.partidas[Number(this.$route.params.partida)];
    });

    axios.get(`${API}/gols?partida=${Number(this.$route.params.partida) + 1}`).then(({data}) => {
      this.gols = data;
      this.carregando = false;
      this.gol = this.gols[Number(this.$route.params.gol)]
    });

  },
}
</script>

<style scoped>

</style>