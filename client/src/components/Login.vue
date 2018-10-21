<template>
  <div>
    <h4>Login</h4>
    <form id="login"
    autocomplete="off">
      <p v-if="error">{{ error }}</p>
      <v-layout justify-center>
      <v-flex xs12 sm6 md3 justify-center>
        <v-text-field
          label="Username"
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Password"
          :type="'password'"
          v-model="password"
        ></v-text-field>
      </v-flex>
      </v-layout>
      <div>
        <v-btn v-on:click="login()">Login</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      console.log(`Login with ${this.username}`);
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        console.log(response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push({
          name: 'Courses',
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};

</script>

<style>

</style>
