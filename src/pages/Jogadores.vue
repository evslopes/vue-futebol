<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Tabela de Jogadores Cadastrados</h1>

    <div >
      <router-link to="/cadastrojogadores">
        <button class="btn btn-primary fs-8 px-1 mt-1">Novo Jogador</button>
      </router-link>
    </div>

    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">Nome</th>
        <th scope="col">Camisa</th>
        <th scope="col">Salário</th>
        <th scope="col">Posição</th>
        <th scope="col">Time</th>
        <th scope="col">Editar ou Apagar</th>
        </thead>
        <tbody>
        <tr v-bind:key="jogador.id" v-for="(jogador, index) in jogadores">
          <td scope="row">{{ jogador.nome }}</td>
          <td>{{ jogador.camisa }}</td>
          <td>{{ jogador.salario }}</td>
          <td>{{ jogador.posicao }}</td>
          <td>{{ jogador.timeId }}</td>
          <td>
            <button class="btn btn-warning fs-6 px-1 mt-1" @click="editar(jogador)"><span >Editar</span></button>
            <span v-if="carregando">carregando...</span>
            <button class="btn btn-danger fs-6 px-1 mt-1" v-else @click="apagar(jogador, index)">
              <span>Apagar</span></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


<script>
import axios from "axios";

let jogadorNovo = (time_id,max) => {
  let max_id = max || 0
  return {
    'id': max_id + 1,
    'nome': "",
    'salario': "",
    'posicao': "",
    'time_id': time_id
  };
};
export default {

  data() {
    return {
      jogador: jogadorNovo(),
      jogadores: [],
      carregando: true,
      editando: false,
      posicao: [
        "ATACANTE",
        "GOLEIRO",
        "LATERAL DIREITO",
        "LATERAL ESQUERDO",
        "MEIA ARMADOR",
        "PONTA DIREITA",
        "PONTA ESQUERDA",
        "QUARTO ZAGUEIRO",
        "SEGUNDO VOLANTE",
        "VOLANTE",
        "ZAGUEIRO CENTRAL"
      ],
    };
  },
  methods: {
    salvar() {
      axios
          .post('http://localhost:3000/jogadores', {...this.jogador})
          .then(() => {
            this.jogadores.push(this.time);
            this.jogador = jogadorNovo();
            this.carregando = false;
          });
    },
    editar(jogador) {
      this.editando = true;
      this.jogador = jogador;
    },
    apagar(jogador, index) {
      this.carregando = true;
      axios
          .delete(`$http://localhost:3000/jogadores/id/${jogador.id}`)
          .then(() => {
            this.jogadores.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/jogadores').then(({data}) => {
      this.jogadores = data;
      this.carregando = false;
    });
  },
};
</script>

<style scoped>

</style>