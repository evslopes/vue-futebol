<template>
  <div>
    <h3>Jogadores</h3>
    <div id="content">
      <table class="table">
        <thead>
        <th scope="col">Nome</th>
        <th scope="col">Camisa</th>
        <th scope="col">Salário</th>
        <th scope="col">Posição</th>
        <th scope="col">Time</th>
        </thead>
        <tbody>
        <tr :v-for="(jogador, index) in jogadores">
          <td scope="row">{{ jogador.nome }}</td>
          <td>{{ jogador.camisa }}</td>
          <td>{{ jogador.salario }}</td>
          <td>{{ jogador.posicao }}</td>
          <td>{{ jogador.timeId }}</td>
          <td>
            <button class="border-none" @click="editar(jogador)"><span class="material-icons">edit</span></button>
            <span v-if="carregando">carregando...</span>
            <button class="border-none" v-else @click="apagar(jogador, index)"><span
                class="material-icons">delete</span></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div id="editarcontent">
      <router-link to="/cadastrojogadores">
        <button>Cadastrar Novo Jogador</button>
      </router-link>
    </div>

    <div class="editarcontent" id="editarcontent">
      <h4 style="align-self: normal;">- Editar -</h4>
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
      <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
      <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
      <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
    </div>
    <div id="editarcontent">
      <span v-if="carregando">carregando...</span>
    </div>
  </div>
</template>


<script>
import Campo from "../components/Campo.vue";
import CampoDropDown from "../components/CampoDropDown.vue";
import axios from "axios";

let jogadorNovo = () => {
  return {
    id: "",
    nome: "",
    estado: "",
    tecnico: "",
    torcida: "",
    fundacao_ano: "",
    info: "",
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
      posicao: [
        "ATACANTE",
        "GOLEIRO",
        "LATERAL DIREITO",
        "LATERAL ESQUERDO",
        "MEIA ARMADOR",
        "PONTA DIREITA",
        "PONTA ESQUERDA",
        "QUARTO ZAGUEIRO",
        "SEGUNDO VOLANTE",
        "VOLANTE",
        "ZAGUEIRO CENTRAL"
      ],
    };
  },
  methods: {
    salvar() {
      axios
          .post('http://localhost:3000/jogadores', {data: [this.jogador]})
          .then(() => {
            this.jogadores.push(this.time);
            this.jogador = jogadorNovo();
            this.carregando = false;
          });
    },
    editar(jogador) {
      this.editando = true;
      this.jogador = jogador;
    },
    apagar(jogador, index) {
      this.carregando = true;
      axios
          .delete(`$http://localhost:3000/jogadores/id/${jogador.id}`)
          .then(() => {
            this.jogadores.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/jogadores').then(({data}) => {
      this.jogadores = data;
      this.carregando = false;
    });
  },
};
</script>

<style scoped>

#content {
  display: grid;
}

#editarcontent {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: flex-start;
}
</style>