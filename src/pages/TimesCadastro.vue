<template>
  <div class="container-fluid container-md bg-light">
    <h1 class="fs-1 px-2 mt-5 display-1">Cadastro de Time</h1>
    <div class="d-grid gap-2 col-6 mx-auto">
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
      <Campo nome="Gols" tipo="number" v-model="time.qtGols"></Campo>
    </div>
    <div class="d-grid gap-2 col-6 mx-auto d-grid gap-2">
      <button class="btn btn-outline-success btn-mdfs-12 px-1 mt-1 me-md-2" @click="salvar">
        <router-link :to="{name:'times'}">Salvar</router-link>
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
import API from "@/services/API";

let timeNovo = () => {
  return {
    nome: "",
    estado: "",
    tecnico: "",
    torcida: "",
    fundacao_ano: "",
    info: "",
    qtGols: ""
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
      axios
          .post(`${API}/times`, {...this.time})
          .then((data) => {
            this.times.id = (data.id) - 1
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
          .delete(`${API}/times/${time.id}`)
          .then(() => {
            this.times.splice(index, 1);
            this.carregando = false;
          });
    },
  },
  mounted() {
    axios.get(`${API}/times`).then(({data}) => {
      this.times = data;
      this.carregando = false;
      this.time = timeNovo(Math.max(...this.times.map(t => t.id)));
    });
  },
};
</script>

<style scoped>

</style>