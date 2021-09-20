<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Cadastro de Partida</h1>
    <div>
      <Campo nome="Time da Casa" tipo="number" v-model="partida.time_casa"></Campo>
      <Campo nome="Time Visitante" tipo="number" v-model="partida.time_visitante"></Campo>

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

let partidaNova = (max) => {
  let max_id = max || 0
  return {
    id: max_id + 1,
    time_casa: "",
    time_visitante: ""
  };
};
export default {
  components: {Campo},
  data() {
    return {
      partida: partidaNova(),
      partidas: [],
      carregando: true,
      editando: false,
    };
  },
  methods: {
    salvar() {
      console.log(this.partida)
      axios
          .post("http://localhost:3000/partidas", {...this.partida})
          .then((data) => {
            this.partidas.id = data.id
            this.partidas.push(this.partida);
            this.partida = partidaNova(Math.max(...this.times.map(t => t.id)));
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
    axios.get("http://localhost:3000/partidas").then(({data}) => {
      this.partidas = data;
      this.carregando = false;
      this.partida = partidaNova(Math.max(...this.partidas.map(t => t.id)));
    });
  },
};
</script>

<style scoped>

</style>