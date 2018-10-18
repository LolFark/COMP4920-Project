<template>
  <div id="app" class="container-full-bg">
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
        <v-btn v-if="$store.state.authenticated" @click="$router.push(/user/ + $store.state.user.username)">{{ $store.state.user.username }}</v-btn>
        <v-btn v-if="$store.state.authenticated" @click="logout">Log out</v-btn>
      </v-toolbar>
      <v-jumbotron
        :gradient="gradient"
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        class="container-full-bg"
        fill-height
      >
        <v-container fill-height fluid>
          <v-layout>
            <v-flex>
              <main>
                <router-view></router-view>
              </main>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
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
  },
  data: () => ({
    gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
  })
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
.jumbotron{
    position:fixed;
    top:0;
    z-index:-1;
    width:100%;
    text-align: center;
}
.jumbotron img{
    height:auto;
    width:100%;
    max-width:100%;
}
body {
    height: 100%;
}

</style>
