<template>
  <div class="container">
    <h1 class="fs-1 px-2 mt-5">Cadastro de Jogadores</h1>

    <div>
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
      <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
      <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
      <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
    </div>
    <Campo nome="Time" tipo="number" v-model="jogador.time_id"></Campo>
    <div>
      <button class="btn btn-secondary fs-8 px-8 mt-8" @click="salvar">
        <router-link to="/jogadores">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import CampoDropDown from "../components/CampoDropDown.vue";
import axios from "axios";
import {POSICAO} from "../Const";

let jogadorNovo = () => {

  return {
    nome: "",
    salario: "",
    posicao: "",
    time_id: ""
  };
};
export default {
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
  computed: {
    time_filtrado() {
      return this.jogadores.filter(j => j.time.id === this.$route.params.time_id)
    }
  },
  methods: {
    salvar() {
      axios
          .post('http://localhost:3000/jogadores', {...this.jogador})
          .then((data) => {
            this.jogador.id = data.id
            this.jogadores.push(this.jogador);
            this.jogador = jogadorNovo(this.$route.params.time_id);
            this.carregando = false;
          });
    },
    editar(jogador) {
      this.editando = true;
      this.jogador = jogador;
    },
    mounted() {
      axios.get('http://localhost:3000/jogadores').then(({data}) => {
        this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(this.jogadores.map(j => j.id)));
        this.jogadores = data;
        this.carregando = false;
      });
    },
  }
};
</script>

<style scoped>

</style>