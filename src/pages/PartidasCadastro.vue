<template>
  <div class="container">
    <h1 class="fs-1 px-2 mt-5 display-1">Partida</h1>

    <div class="d-grid gap-2 col-6 mx-auto">
      <div class="col">
        <div class="row">
          <Campo class="text-center" nome="Time da Casa" tipo="number" v-model="partida.time_casa"></Campo>
          <div>0</div>
        </div>
      </div>
      <div class="col">
        <div>X</div>
      </div>
      <div class="col">
        <div class="row">
          <div>0</div>
          <Campo class="text-center" nome="Time Visitante" tipo="number" v-model="partida.time_visitante"></Campo>
        </div>
      </div>
    </div>

    <div class="d-grid gap-2 col-6 mx-auto d-grid gap-2">
      <button class="btn btn-outline-primary btn-mdfs-12 px-1 mt-1 me-md-2" @click="salvarPartida">
        Criar Partida
      </button>
    </div>


    <div class="container">
      <h2 class="fs-2 px-2 mt-5 display-2">Cadastro de Gols</h2>

      <div class="d-grid gap-2 col-6 mx-auto">
        <Campo nome="Time" v-model="gol.time"></Campo>
        <Campo nome="Jogador" tipo="number" v-model="gol.jogador"></Campo>
        <Campo nome="Partida" tipo="number" v-model="gol.partida"></Campo>
        <div class="d-grid gap-2 col-6 mx-auto d-grid gap-2">
          <button class="btn btn-outline-success btn-mdfs-12 px-1 mt-1 me-md-2" @click="salvarGols">
            Gol
          </button>
        </div>
      </div>

      <div class="d-grid gap-2 col-6 mx-auto">

        <h2 class="fs-2 px-2 mt-5 display-2">Lista de Gols</h2>
        <table class="table px-2 mt-5">
          <thead>
          <th scope="col">Time</th>
          <th scope="col">Jogador</th>
          </thead>
          <tbody>
          <tr v-bind:key="gol.id" v-for="(gol) in gols">
            <td>{{ gol.time }}</td>
            <td>{{ gol.jogador }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto">
      <button class="btn btn-outline-success btn-mdfs-12 px-1 mt-1 me-md-2">
        <router-link :to="{name:'partidas'}">Finalizar Partida</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import axios from "axios";

let partidaNova = () => {
  return {
    time_casa: "",
    time_visitante: ""
  };
};

let golNovo = (partida_id) => {
  return {
    id: "",
    time: "",
    jogador: "",
    partida: partida_id
  };
};

export default {
  name: 'PartidasCadastro',
  components: {Campo},
  data() {
    return {
      partida: partidaNova(),
      partidas: [],
      gol: golNovo(),
      gols: [],
      carregando: true,
      editando: false,
    };
  },
  methods: {
    salvarPartida() {
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

    salvarGols() {
      axios
          .post('http://localhost:3000/gols', {...this.gol})
          .then((data) => {
            this.gol.id = data.id
            this.gols.push(this.gol);
            this.gol = golNovo(Math.max(...this.gols.map(g => g.id)));
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

    axios.get(`http://localhost:3000/gols/gols?partida_id=${Math.max(...this.partidas.map(t => t.id))}`).then(({data}) => {
      this.gol = golNovo();
      this.gols = data;
      this.carregando = false;
    });

  },
};
</script>

<style scoped>

</style>