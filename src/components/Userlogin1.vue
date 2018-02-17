<template>
<div>
  <span class="subheading">A smart GIS platform for Local Authorities in Zimbabwe</span>

    <v-container fluid fill-height>
      <v-layout align-center>
        <v-flex>
          <component  v-bind:is="component"></component>
          <button large class="primary" v-on:click="component = 'register'">Register</button>
          <button large class="success" v-on:click="component = 'login'">Login</button>   
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
// Vuejs Project: Fetching data with axios |Login | Register | Logout : https://www.youtube.com/watch?v=5alYl63tXL8
// Vue JS 2 Tutorial #28 - Dynamic Components : https://www.youtube.com/watch?v=09n2945JW_0


export default {
  methods: {
    handleSubmit () {
      alert('Login credentials have been submitted')
    }
  }
  
}
</script>

<style>

</style>

