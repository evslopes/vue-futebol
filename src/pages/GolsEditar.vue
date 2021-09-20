<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Editar Gols</h1>

    <div>
      <Campo nome="Time" tipo="number" v-model="gol.time"></Campo>
      <Campo nome="Jogador" tipo="number" v-model="gol.jogador"></Campo>
      <Campo nome="Partida" tipo="number" v-model="gol.partida"></Campo>

      <div>
        <button class="btn btn-secondary fs-8 px-8 mt-8" @click="salvar">
          <router-link to="Gols">Salvar</router-link>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import Campo from "../components/Campo";

import axios from "axios";

let golNovo = () => {
  return {
    id: "",
    time: "",
    jogador: "",
    partida: ""
  };
};

export default {
  name: "EditarJogadores",
  components: {Campo},
  data() {
    return {
      gol: golNovo(),
      gols: [],
      carregando: true,
      editando: false,
    };
  },
  methods: {
    salvar(index) {
      axios
          .put(`http://localhost:3000/gols/${Number(this.gol.id - 1)}`, {...this.gols})
          .then(() => {
            this.gols.push(index, 1);
            this.editando = false
            this.carregando = false;
          });
    },
    editar(gol) {
      this.editando = true;
      this.gols = gol;
    },
  },
  mounted() {
    axios.get('http://localhost:3000/gols/').then(({data}) => {
      this.gols = data;
      this.carregando = false;
      this.gol = this.gols[Number(this.$route.params.gol)]
    });
  },
};
</script>

<style scoped>

</style>