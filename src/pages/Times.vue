<template>
  <div>
    <h1>Times</h1>
    <div>
      <ul>
        <li :v-for="time in times"> {{ time.nome }} </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
  components: {  },
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
    axios.get('http://localhost:3000/times').then(({ data }) => {
      this.times = data;
    });
  },
};
</script>

<style scoped>

</style>