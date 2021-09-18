<template>
  <div>
    <h1 class="fs-1 px-2 mt-5">Edição de Times</h1>
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

export default {
  name: 'EditarTimes',
  components: {Campo, CampoDropDown, CampoText},
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
      carregando: true,
      editando: false,
      estados: ESTADOS,
    };
  },
  methods: {
    salvar(index) {
      axios
          .put(`http://localhost:3000/times/${Number(this.time.id - 1)}`, {...this.time})
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
    axios.get(`http://localhost:3000/times/`).then(({data}) => {
      this.times = data;
      this.carregando = false;
      this.time = this.times[Number(this.$route.params.time)];
    });
  },
};
</script>

<style scoped>

</style>