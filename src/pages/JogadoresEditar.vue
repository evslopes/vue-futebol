<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Editar de Jogadores</h1>
    <div>
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
      <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
      <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
      <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
      <Campo nome="Time" tipo="number" v-model="jogador.time_id"></Campo>
    </div>
    <div>
      <button class="btn btn-secondary fs-8 px-8 mt-8" @click="salvar">
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
    camisa: "",
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
    salvar(index) {
      axios
          .put(`http://localhost:3000/jogadores/${Number(this.jogador.id -1)}`, {...this.jogador})
          .then(() => {
            this.jogadores.push(index, 1);
            this.editando = false
            this.carregando = false;
          });
    },
    editar(jogador) {
      this.editando = true;
      this.jogador = jogador;
    },
  },
  mounted() {
    axios.get('http://localhost:3000/jogadores/').then(({data}) => {
      this.jogadores = data;
      this.carregando = false;
      this.jogador = this.jogadores[Number(this.$route.params.jogador)]
    });
  },
};
</script>

<style scoped>

</style>