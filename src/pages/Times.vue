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
        <tr v-for="(time, index) in times">
          <td>{{ time.nome }}</td>
          <td>{{ time.estado }}</td>
          <td>{{ time.tecnico }}</td>
          <td>{{ time.torcida }}</td>
          <td>{{ time.fundacao_ano }}</td>
          <td>{{ time.info }}</td>
          <td>
            <button class="btn btn-warning fs-8 px-1 mt-1" @click="editar(time)">Editar</button>
            <span v-if="carregando">carregando...</span>
            <button class="btn btn-danger fs-8 px-1 mt-1" v-else @click="apagar(time, index)">Apagar</button>
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
  mounted() {
    axios.get('http://localhost:3000/times').then(({data}) => {
      this.times = data;
    });
  },
};
</script>

<style scoped>

</style>