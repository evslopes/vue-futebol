<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Detalhes do Jogador</h1>
    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">Nome</th>
        <th scope="col">Camisa</th>
        <th scope="col">Salário</th>
        <th scope="col">Posição</th>
        <th scope="col">Time</th>
        <th scope="col">Gols</th>
        </thead>
        <tbody>
        <tr>
          <td scope="row">{{ jogador.nome }}</td>
          <td scope="row">{{ jogador.camisa }}</td>
          <td scope="row">{{ jogador.salario }}</td>
          <td scope="row">{{ jogador.posicao }}</td>
          <td scope="row">{{ jogador.time_id }}</td>
          <td scope="row">{{ jogador.qtGols }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <h2 class="fs-2 px-2 mt-5 display-2">Gols Marcados</h2>
    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">ID</th>
        <th scope="col">Partida</th>
        <th scope="col">Adversário</th>
        </thead>
        <tbody>
        <tr v-bind:key="gol.id" v-for="(gol) in gols">
          <td scope="row">{{ gol.id }}</td>
          <td>{{ gol.id }}</td>
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

  data() {
    return {
      jogador: {
        id: "",
        nome: "",
        camisa: "",
        salario: "",
        posicao: "",
        time_id: "",
        qtGols: ""
      },
      jogadores: [],
      gol: {
        id: "",
        time: "",
        jogador: "",
        partida: ""
      },
      gols: [],
      carregando: true,
      editando: false,
    };
  },
  methods: {},
  mounted() {
    axios.get(`${API}/jogadores/`).then(({data}) => {
      this.jogadores = data;
      this.carregando = false;
      this.jogador = this.jogadores[Number(this.$route.params.jogador)];
    });

    {
      axios.get(`${API}/gols?jogador=${Number(this.$route.params.jogador + 1)}`).then(({data}) => {
        this.gols = data;
        this.carregando = false;
      });
    }
  },
};
</script>

<style scoped>

</style>