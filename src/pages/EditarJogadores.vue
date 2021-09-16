<template>
  <div >
    <h4 style="align-self: normal;">- Editar -</h4>
    <Campo nome="Nome" v-model="jogador.nome"></Campo>
    <Campo nome="Camisa" tipo="number" v-model="jogador.camisa"></Campo>
    <Campo nome="Salário" tipo="number" v-model="jogador.salario"></Campo>
    <CampoDropDown nome="Posição" v-model="jogador.posicao" :itens="posicao"></CampoDropDown>
  </div>
  <div >
    <span v-if="carregando">carregando...</span>
  </div>
</template>

<script>
import Campo from "../components/Campo";
import CampoDropDown from "../components/CampoDropDown";
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
  name: "EditarJogadores",
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
}
</script>

<style scoped>

</style>