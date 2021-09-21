<template>
  <div class="col-12 text-sm-lef text-start">
    <label :for="nome" class="form-label fs-5">{{ nome }}</label>
    <select
        class="form-control dropdown"
        :id="nome"
        :placeholder="nome"
        :value="value"
        @input="$emit('input', $event.target.value)">
      <option
          v-for="item in itens"
          :key="item"
          :value="item">{{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CampoDropDown',
  props: ['nome', 'value', 'itens'],
  methods: {
    atualizar(){
      this.$emit('bombom')
    }
  }
}
</script>

<style>
</style>