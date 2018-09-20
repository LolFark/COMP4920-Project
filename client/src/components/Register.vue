<template>
  <div>
    <h1>Sign up</h1>
    <form id="register"
    @submit="checkform"
    action="localhost:8081/register"
    method="post">
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="name" required autofocus>
            </div>

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>

            <label for="password-confirm">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" v-model="password_confirmation" required>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Register
                </button>
            </div>
        </form>
  </div>
</template>

<script>
export default {

  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
      success: ''
    }
  },

  methods: {
    checkform: function (e) {
      e.preventDefault()
      this.errors = [];
      if (!this.name) {
        this.errors.push("Name required.");
      }
      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('University email required.');
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /edu\.au/
      return re.test(email);
    },
    async register(username, email, password) {
      const response = await RegisterService.register(username, email, password)
      success = response.data.success
    }
  }
}
</script>

<style>

</style>
