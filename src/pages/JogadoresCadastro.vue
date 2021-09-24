<template>
  <div class="container-fluid container-md bg-light">
    <h1 class="fs-1 px-2 mt-5 display-1">Cadastro de Jogadores</h1>
    <div class="d-grid gap-2 col-6 mx-auto">
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
      <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
      <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
      <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
      <Campo nome="Time" tipo="number" v-model="jogador.time_id"></Campo>
      <Campo nome="Gols" tipo="number" v-model="jogador.qtGols"></Campo>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto d-grid gap-2">
      <button class="btn btn-outline-success btn-mdfs-12 px-1 mt-1 me-md-2" @click="salvar">
        <router-link :to="{name:'jogadores'}">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import CampoDropDown from "../components/CampoDropDown.vue";
import axios from "axios";
import {POSICAO} from "../Const";
import API from "@/services/API";

let jogadorNovo = () => {

  return {
    nome: "",
    salario: "",
    posicao: "",
    time_id: "",
    qtGols: ""
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
          .post(`${API}/jogadores`, {...this.jogador})
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
      axios.get(`${API}/jogadores`).then(({data}) => {
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