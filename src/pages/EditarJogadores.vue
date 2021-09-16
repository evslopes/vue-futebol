<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Editar de Jogadores</h1>
    <div>
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
      <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
      <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
      <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
    </div>
    <div>
      <span v-if="carregando">carregando...</span>
      <button class="btn btn-secondary fs-8 px-8 mt-8" v-else @click="salvar">
        <router-link to="/jogadores">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo";
import CampoDropDown from "../components/CampoDropDown";
import axios from "axios";
import {POSICAO} from "../Const";

let jogadorNovo = () => {
  return {
    id: "",
    nome: "",
    salario: "",
    posicao: "",
    time_id: ""
  };
};

export default {
  name: "EditarJogadores",
  components: {Campo, CampoDropDown},
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
    salvar() {
      axios
          .post('http://localhost:3000/jogadores', {data: [this.jogador]})
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
          .delete(`$http://localhost:3000/jogadores/${jogador.id}`)
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
}
</script>

<style scoped>

</style>