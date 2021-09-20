<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Edição de Partida</h1>
    <div>
      <Campo nome="Time da Casa" v-model="partida.time_casa"></Campo>
      <Campo nome="Time Visitante" v-model="partida.time_visitante"></Campo>
      </div>
    <div>

      <button class="btn btn-secondary fs-8 px-8 mt-8" @click="salvar">
        <router-link to="Partidas">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import axios from "axios";

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
          .put(`http://localhost:3000/partidas/${Number(this.partida.id - 1)}`, {...this.partida})
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
    axios.get(`http://localhost:3000/partidas/`).then(({data}) => {
      this.partidas = data;
      this.carregando = false;
      this.partida = this.partidas[Number(this.$route.params.partida)];
    });
  },
};
</script>

<style scoped>

</style>