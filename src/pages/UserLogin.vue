<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field type="email" name="email" label="Email" ></v-text-field>
        <v-text-field type="password" name="password" label="Password" ></v-text-field>
        <v-btn class="light-green lighten-2" @click="login" type="submit">Click to Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import { login } from '@/api/auth'
  import Panel from '@/components/Common/Panel'

  export default {
    components: {
      Panel
    },
    data: () => ({
      username: '',
      password: '',
      alert: {}
    }),
    methods: {
      login () {

            this.$store.commit('SET_AUTH_STATUS', true)
            this.$router.push(this.$route.query.return_to || '/municipal-page')
          }

      }
  }
</script>

<style scoped>
  .center-aligned{
    width: 80%;
    max-width: 500px;
    margin: 60px auto;
    padding: 0
  }
  .form-control {
    margin: 20px 10px 20px 5px;
  }
  button.form-control {
    margin-bottom: 0;
  }
  .alert {
    padding: 10px;
    background: #f03939;
    color: #fff
  }
</style>
