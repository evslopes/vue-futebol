<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Tabela de Jogadores</h1>

    <div class="d-grid gap-2 col-6 mx-auto">
      <router-link :to="{name:'cadastrojogadores'}">
        <button class="btn btn-primary fs-8 px-1 mt-1 btn-sm">Novo Jogador</button>
      </router-link>
    </div>

    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">ID</th>
        <th scope="col">Nome</th>
        <th scope="col">Camisa</th>
        <th scope="col">Salário</th>
        <th scope="col">Posição</th>
        <th scope="col">Time</th>
        <th scope="col">Gols</th>
        <th scope="col">Editar ou Apagar</th>
        </thead>
        <tbody>
        <tr v-bind:key="jogador.id" v-for="(jogador, index) in jogadores">
          <td scope="row">{{ jogador.id }}</td>
          <td scope="row">
            <router-link :to="{name: 'detalhesjogador', params: {jogador:jogador.id - 1}}">
            {{ jogador.nome }}
            </router-link>
          </td>
          <td scope="row">{{ jogador.camisa }}</td>
          <td scope="row">{{ jogador.salario }}</td>
          <td scope="row">{{ jogador.posicao }}</td>
          <td scope="row">{{ jogador.time_id }}</td>
          <td scope="row">{{ jogador.qtGols }}</td>
          <td scope="row" class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button class="btn btn-outline-warning btn-sm fs-12 px-1 mt-1 me-md-2" @click="editar(jogador)">
              <router-link :to="{name: 'editarjogadores', params: {jogador:jogador.id - 1}}">Editar</router-link>
            </button>
            <button class="btn btn-outline-danger btn-sm fs-12 px-1 mt-1 me-md-2" @click="apagar(jogador, index)">
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
import {POSICAO} from "@/Const";

let jogadorNovo = () => {
  return {
    id: "",
    nome: "",
    salario: "",
    posicao: "",
    time_id: "",
    qtGols: ""
  };
};
export default {

  data() {
    return {
      jogador: jogadorNovo(),
      jogadores: [],
      carregando: true,
      editando: false,
      posicao: POSICAO,
    };
  },
  methods: {

    editar(jogador) {
      this.editando = true;
      this.jogador = jogador;
    },
    apagar(jogador, index) {
      this.carregando = true;
      axios
          .delete(`http://localhost:3000/jogadores/${jogador.id}`)
          .then(() => {
            this.jogadores.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/jogadores/').then(({data}) => {
      this.jogadores = data;
      this.carregando = false;
    });
  },
};
</script>

<style scoped>

</style>