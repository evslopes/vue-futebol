<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5">Edição de Partida</h1>
    <div class="d-grid gap-2 col-6 mx-auto">
      <Campo nome="Time da Casa" v-model="partida.time_casa"></Campo>
      <Campo nome="Time Visitante" v-model="partida.time_visitante"></Campo>
      </div>
    <div class="d-grid gap-2 col-6 mx-auto d-grid gap-2">
      <button class="btn btn-outline-success btn-mdfs-6 px-1 mt-1 me-md-2" @click="salvar">
        <router-link :to="{name:'partidas'}">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import axios from "axios";
import API from "@/services/API";

export default {
  name: 'EditarTimes',
  components: {Campo},
  data() {
    return {
      partida: {
        id: "",
        time_casa: "",
        time_visitante: "",
      },
      partidas: [],
      carregando: true,
      editando: false
    };
  },
  methods: {
    salvar(index) {
      axios
          .put(`${API}/partidas/${Number(this.partida.id)}`, {...this.partida})
          .then(() => {
            this.partidas.push(index, 1);
            this.editando = false
            this.carregando = false;
          });
    },
    editar(partida) {
      this.editando = true;
      this.partida = partida;
    },
  },
  mounted() {
    axios.get(`${API}/partidas/`).then(({data}) => {
      this.partidas = data;
      this.carregando = false;
      this.partida = this.partidas[Number(this.$route.params.partida)];
    });
  },
};
</script>

<style scoped>

</style>