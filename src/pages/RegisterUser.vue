<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <v-text-field type="email" name="email" label="Email"></v-text-field>
        <v-text-field type="password" name="password" label="Password"></v-text-field>
        <v-btn class="light-green lighten-2" @click="register" type="submit">Submit Registration</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
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
      register () {
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
