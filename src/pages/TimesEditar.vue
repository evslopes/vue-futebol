<template>
  <div class="container-fluid container-md">
    <h1 class="fs-1 px-2 mt-5">Edição de Time</h1>
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

export default {
  name: 'EditarTimes',
  components: {Campo, CampoDropDown, CampoText},
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
      carregando: true,
      editando: false,
      estados: ESTADOS,
    };
  },
  methods: {
    salvar(index) {
      axios
          .put(`${API}/times/${Number(this.time.id)}`, {...this.time})
          .then(() => {
            this.times.push(index, 1);
            this.editando = false
            this.carregando = false;
          });
    },
    editar(time) {
      this.editando = true;
      this.time = time;
    },
  },
  mounted() {
    axios.get(`${API}/times/`).then(({data}) => {
      this.times = data;
      this.carregando = false;
      this.time = this.times[Number(this.$route.params.time)];
    });
  },
};
</script>

<style scoped>

</style>