<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-brand text-decoration-none">
        <router-link to="/">VueFut</router-link>
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
<!--          <li class="nav-item">-->
<!--            <a class="nav-link active">-->
<!--              <router-link to="/">Home</router-link>-->
<!--            </a>-->
<!--          </li>-->
          <li class="nav-item">
            <a class="nav-link active">
              <router-link :to="{name:'times'}">Times</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active">
              <router-link :to="{name:'jogadores'}">Jogadores</router-link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active">
              <router-link :to="{name:'partidas'}">Partidas</router-link>
            </a>
          </li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}
</style>
