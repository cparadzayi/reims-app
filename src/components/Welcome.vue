<template>
<div>
          <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
          <b-button-group class="mx-1">
            <b-btn class="primary" v-on:click="component = 'register'">Register</b-btn>
            <b-btn class="success" v-on:click="component = 'login'">Login</b-btn>
          </b-button-group>
        </b-button-toolbar>

    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <span class="subheading">A smart GIS platform for Local Authorities in Zimbabwe</span>
          <v-divider class="my-3"></v-divider>
          <b-card fluid>
            <keep-alive>
            <component v-bind:is="component"></component>
            </keep-alive>
          </b-card>   
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import Panel from '@/components/Common/Panel'
import Login from '@/pages/UserLogin'
import Register from '@/pages/RegisterUser'

export default {
  components: {
    Panel,
    Login,
    Register
  },
  data() {
    return {
       component: Register
    }
  }
}
</script>
