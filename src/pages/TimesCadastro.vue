<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Cadastro de Times</h1>
    <div>
      <Campo nome="Nome" v-model="time.nome"></Campo>
      <CampoDropDown
          nome="Estado"
          v-model="time.estado"
          :itens="estados"
      ></CampoDropDown>
      <Campo nome="Técnico" v-model="time.tecnico"></Campo>
      <Campo nome="Torcida" tipo="number" v-model="time.torcida"></Campo>
      <Campo nome="Fundação" tipo="number" v-model="time.fundacao_ano"></Campo>
      <CampoText
          nome="Informações"
          tipo="texto"
          v-model="time.info"
      ></CampoText>
    </div>
    <div>
      <button class="btn btn-secondary fs-8 px-8 mt-8" @click="salvar">
        <router-link to="/times">Salvar</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import Campo from "../components/Campo.vue";
import CampoText from "../components/CampoText";
import CampoDropDown from "../components/CampoDropDown.vue";
import axios from "axios";
import {ESTADOS} from "../Const";

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
  components: {Campo, CampoDropDown, CampoText},
  data() {
    return {
      time: timeNovo(),
      times: [],
      carregando: true,
      editando: false,
      estados: ESTADOS,
    };
  },
  methods: {
    salvar() {
      console.log(this.time)
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
    axios.get("http://localhost:3000/times").then(({data}) => {
      this.times = data;
      this.carregando = false;
      this.time = timeNovo(Math.max(...this.times.map(t => t.id)));
    });
  },
};
</script>

<style scoped>

</style>