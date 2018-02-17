<template>
<v-app>
    <h1>{{ msg }}</h1>

    <b-container fluid style="padding: 20px;" height="100%;">

      <b-card-group deck class="mb-3">

        <b-card border-variant="light"
                header="Welcome to Municipal GIS Suite"
                align="left">
          <welcome-page id="welcomepage"></welcome-page>
        </b-card>

        <b-card border-variant="light"
                header="Mapview"
                align="left">
                <p>Add map search functionality here</p>
            <MyMap/>
        </b-card>

      </b-card-group>

      <b-card >
        <MyFooter/>
      </b-card>
    </b-container>

</v-app>

</template>


<script>
  import Map from '@/components/Map.vue'
  import WelcomePage from '@/components/Welcome.vue'
  import MyFooter from '@/components/Footer.vue'
  
  export default {
    name: 'app',

    components: {
      MyMap: Map,
      WelcomePage, 
      MyFooter

    },

    mounted () {
      this.$store.dispatch('LOAD_STANDS_LIST')
    },
    data () {
      return {
        msg: 'Welcome to Municipal GIS App'
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

h1, h2 {  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

