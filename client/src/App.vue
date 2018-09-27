<template>
  <div id="app">
    <a href="/register">Register</a>
    <a href="/login">Login</a>
    <h1 @click="navigate('/')">Communicourse</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    navigate (to) {
      this.$router.push(to)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
