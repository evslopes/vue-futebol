<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Tabela de Times Cadastrados</h1>

    <div>
      <router-link to="/cadastrotimes">
        <button class="btn btn-primary fs-8 px-1 mt-1">Novo Time</button>
      </router-link>
    </div>

    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">Nome</th>
        <th scope="col">Estado</th>
        <th scope="col">Técnico</th>
        <th scope="col">Torcida</th>
        <th scope="col">Ano</th>
        <th scope="col">Informações</th>
        </thead>
        <tbody>
        <tr v-bind:key="time.id" v-for="(time, index) in times">
          <td>{{ this.time.nome }}</td>
          <td>{{ this.time.estado }}</td>
          <td>{{ time.tecnico }}</td>
          <td>{{ time.torcida }}</td>
          <td>{{ time.fundacao_ano }}</td>
          <td>{{ time.info }}</td>
          <td>
            <button class="btn btn-warning fs-8 px-1 mt-1" @click="editar(time)">
              <router-link to="EditarTimes">Editar</router-link>
            </button>
            <button class="btn btn-danger fs-8 px-1 mt-1" @click="apagar(time, index)">Apagar</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let timeNovo = (max) => {
  let max_id = max || 0
  return {
    id: max_id + 1,
    nome: "",
    estado: "",
    tecnico: "",
    torcida: "",
    fundacao_ano: "",
    info: "",
  };
};

export default {
  components: {},
  data() {
    return {
      time: {
        id: "",
        nome: "",
        estado: "",
        tecnico: "",
        torcida: "",
        fundacao_ano: "",
        info: "",
      },
      times: [],
    };
  },

  methods: {
    salvar() {
      axios
          .post("http://localhost:3000/times", {...this.time})
          .then(() => {
            this.times.push(this.time);
            this.time = timeNovo(Math.max(...this.times.map(t => t.id)));
            this.editando = false
            this.carregando = false;
          });
    },
    editar(time) {
      this.editando = true;
      this.time = time;
    },
    apagar(time, index) {
      this.carregando = true;
      axios
          .delete(`http://localhost:3000/times/${time.id}`)
          .then(() => {
            this.times.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/times').then(({data}) => {
      this.times = data;
    });
  },
};
</script>

<style scoped>

</style>