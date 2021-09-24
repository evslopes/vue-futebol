<template>
  <div class="container-fluid container-md bg-light">
    <h1 class="fs-1 px-2 mt-5 display-1">Cadastro de Gols</h1>
    <div class="d-grid gap-2 col-6 mx-auto">
      <Campo nome="Time" v-model="gol.time"></Campo>
      <Campo nome="Jogador" tipo="number" v-model="gol.jogador"></Campo>
      <Campo nome="Partida" tipo="number" v-model="gol.partida"></Campo>
      <div class="d-grid gap-2 col-6 mx-auto d-grid gap-2">
        <button class="btn btn-outline-success btn-mdfs-12 px-1 mt-1 me-md-2" @click="salvar">
          <router-link :to="{name:'gols'}">Salvar</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import axios from "axios";
import API from "@/services/API";

let golNovo = () => {
  return {
    id: "",
    time: "",
    jogador: "",
    partida: ""
  };
};
export default {
  components: {Campo},
  data() {
    return {
      gol: golNovo(),
      gols: [],
      carregando: true,
      editando: false,
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
          .post(`${API}/gols`, {...this.gol})
          .then((data) => {
            this.gol.id = data.id
            this.gols.push(this.gol);
            this.gol = golNovo(Math.max(...this.gols.map(g => g.id)));
            this.carregando = false;
          });
    },
    editar(gol) {
      this.editando = true;
      this.gol = gol;
    },
    mounted() {
      axios.get(`${API}/gols`).then(({data}) => {
        this.gol = golNovo(this.$route.params.gols, Math.max(this.gols.map(g => g.id)));
        this.gols = data;
        this.carregando = false;
      });
    },
  }
};
</script>

<style scoped>

</style>