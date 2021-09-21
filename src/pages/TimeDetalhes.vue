<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Detalhes do Time</h1>

    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">Id</th>
        <th scope="col">Nome</th>
        <th scope="col">Estado</th>
        <th scope="col">Técnico</th>
        <th scope="col">Torcida</th>
        <th scope="col">Ano</th>
        <th scope="col">Informações</th>
        </thead>
        <tbody>
        <tr>
          <td>{{ time.id }}</td>
          <td class="text-decoration-none">
            {{ time.nome }}
          </td>
          <td>{{ time.estado }}</td>
          <td>{{ time.tecnico }}</td>
          <td>{{ time.torcida }}</td>
          <td>{{ time.fundacao_ano }}</td>
          <td>{{ time.info }}</td>
        </tr>
        </tbody>
      </table>

      <h2 class="fs-2 px-2 mt-5 display-2">Jogadores do Time</h2>

      <div>
        <table class="table px-2 mt-5">
          <thead>
          <th scope="col">Nome</th>
          <th scope="col">Camisa</th>
          <th scope="col">Salário</th>
          <th scope="col">Posição</th>
          <th scope="col">Time</th>
          </thead>
          <tbody>
          <tr v-bind:key="jogador.id" v-for="(jogador) in jogadores">
            <td scope="row">{{ jogador.nome }}</td>
            <td>{{ jogador.camisa }}</td>
            <td>{{ jogador.salario }}</td>
            <td>{{ jogador.posicao }}</td>
            <td>{{ jogador.time_id }}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ESTADOS} from "@/Const";

export default {
  components: {},
  data() {
    return {
      time: {
        id: "",
        nome: "",
        estado: "",
        tecnico: "",
        torcida: "",
        fundacao_ano: "",
        info: "",
      },
      times: [],

      jogador: {
        id: "",
        nome: "",
        camisa: "",
        salario: "",
        posicao: "",
        time_id: ""
      },

      jogadores: [],
      carregando: true,
      editando: false,
      estados: ESTADOS,
    };
  },

  methods: {},
  mounted() {
    axios.get(`http://localhost:3000/times/`).then(({data}) => {
      this.times = data;
      this.carregando = false;
      this.time = this.times[Number(this.$route.params.time)];
    }),

    axios.get('http://localhost:3000/jogadores/').then(({data}) => {
      this.jogadores = data;
      this.carregando = false;
    });
  },
};
</script>

<style scoped>

</style>