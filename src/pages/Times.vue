<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5 display-1">Tabela de Times Cadastrados</h1>

    <div class="d-grid gap-2 col-6 mx-auto">
      <router-link to="CadastroTimes">
        <button class="btn btn-primary fs-8 px-1 mt-1 btn-sm">Novo Time</button>
      </router-link>
    </div>

    <div>
      <table class="table px-2 mt-5">
        <thead>
        <th scope="col">Id</th>
        <th scope="col">Nome</th>
        <th scope="col">Estado</th>
        <th scope="col">Técnico</th>
        <th scope="col">Torcida</th>
        <th scope="col">Ano</th>
        <th scope="col">Informações</th>
        <th scope="col">Gols</th>
        <th scope="col">Editar ou apagar</th>
        </thead>
        <tbody>
        <tr v-bind:key="time.id" v-for="(time, index) in times">
          <td>{{ time.id }}</td>
          <td class="text-decoration-none">
            <router-link :to="{name: 'detalhestime', params: {time:time.id - 1}}">
            {{ time.nome }}
            </router-link>
          </td>
          <td>{{ time.estado }}</td>
          <td>{{ time.tecnico }}</td>
          <td>{{ time.torcida }}</td>
          <td>{{ time.fundacao_ano }}</td>
          <td>{{ time.info }}</td>
          <td>{{ time.qtGols }}</td>
          <td class="d-grid gap-2 d-md-flex justify-content-md-center">
            <button class="btn btn-outline-warning btn-sm fs-12 px-1 mt-1 me-md-2" @click="editar(time)">
              <router-link :to="{name: 'editartimes', params: {time:time.id - 1}}">
                Editar
              </router-link>
            </button>
            <button class="btn btn-outline-danger btn-sm fs-12 px-1 mt-1 me-md-2" @click="apagar(time, index)">Apagar</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      time: {
        nome: "",
        estado: "",
        tecnico: "",
        torcida: "",
        fundacao_ano: "",
        info: "",
        qtGols: ""
      },
      times: [],
    };
  },

  methods: {
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
    axios.get('http://localhost:3000/times/').then(({data}) => {
      this.times = data;
    });
  },
};
</script>

<style scoped>

</style>