<template>
  <div class="col-12 text-start">
    <label :for="nome" class="form-label fs-5">{{ nome }}</label>
    <textarea
        v-if="tipo === 'texto'"
        :type="tipo"
        class="form-control"
        :id="nome"
        :placeholder="nome"
        :value="value"
        @input="$emit('input', $event.target.value)">
    </textarea>
  </div>
</template>

<script>
export default {
  name: 'CampoText',
  props: ['nome', 'value', 'tipo'],
  methods: {
    atualizar(){
      this.$emit('bombom')
    }
  }
}
</script>

<style scoped>

</style>
