<template>
  <div id="app">
    <v-app>
      <v-toolbar fixed dark color="primary">
        <v-toolbar-title>
          <router-link class="home" tag="span" :to="{ name: 'Courses' }">Communicourse</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'Register' }">
          <v-btn icon v-if="!$store.state.authenticated">
            <v-icon>person_add</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'Login'}">
          <v-btn icon v-if="!$store.state.authenticated">
            <v-icon>account_circle</v-icon>
          </v-btn>
        </router-link>
        <v-btn v-if="$store.state.authenticated" @click="$router.push(/user/ + $store.state.user.username)">{{ $store.state.user.username}}</v-btn>
        <v-btn v-if="$store.state.authenticated" @click="logout">Log out</v-btn>
      </v-toolbar>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Courses'
      })
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
