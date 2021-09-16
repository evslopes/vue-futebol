<template>
  <div class="container">
    <h1 class="fs-1 px-2 mt-5">Cadastro de Jogadores</h1>

    <div>
      <Campo nome="Nome" v-model="jogador.nome"></Campo>
      <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
      <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
      <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
    </div>
    <div>
      <span v-if="carregando">carregando...</span>
      <button class="btn btn-secondary fs-8 px-8 mt-8" v-else @click="salvar">
        <router-link to="/jogadores">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import CampoDropDown from "../components/CampoDropDown.vue";
import axios from "axios";

let jogadorNovo = (time_id,max) => {
  let max_id = max || 0
  return {
    'id': max_id + 1,
    'nome': "",
    'salario': "",
    'posicao': "",
    'time_id': time_id
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
  computed: {
    time_filtrado(){
      return this.jogadores.filter(j => j.time.id === this.route.params.time_id)
    }
  },
  methods: {
    salvar() {
      axios
          .post('http://localhost:3000/jogadores', {...this.jogador})
          .then(() => {
            this.jogadores.push(this.jogador);
            this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(this.jogadores.map(j => j.id)));
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
          .delete(`http://localhost:3000/jogadores/id/${jogador.id}`)
          .then(() => {
            this.jogadores.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/jogadores').then(({data}) => {
      this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(this.jogadores.map(j => j.id)));
      this.jogadores = data;
      this.carregando = false;
    });
  },
};
</script>

<style scoped>

</style>