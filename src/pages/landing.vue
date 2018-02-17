<template>
    <b-container fluid style="padding: 20px;" height="100%;">

      <b-card-group deck class="mb-3">

        <b-card border-variant="light"
                header="Welcome to Municipal GIS Suite"
                align="left">
          <welcome-page id="welcomepage"></welcome-page>
        </b-card>

        <b-card border-variant="light"
                header="Mapview">
                <p>Add map search functionality here</p>
            <MyMap/>
        </b-card>

      </b-card-group>

      <b-card >
        <MyFooter/>
      </b-card>
    </b-container>

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



