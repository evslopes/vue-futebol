<template>
  <div class="col-16">
    <label  :for="nome" class="form-label mx-auto" >{{ nome }}</label>
    <input  :type="tipo"
           class="form-control mx-auto"
           :id="nome"
           :placeholder="nome"
           :value="value"
           @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'Campo',
  props: ['nome', 'value', 'tipo'],
  methods: {
    atualizar() {
      this.$emit('bombom')
    }
  }
}
</script>

<style scoped>

.colorido {

}

.textoAesquerda{
  text-align: left;
}

</style>