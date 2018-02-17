<template>
  <div>
  <b-container fluid style="padding: 20px;" height="100%;">

    <b-card-group deck class="mb-3">
      <b-card border-variant="light"
              header="Mapview">
              <p>Add map search functionality here</p>
          <MyMap/>
      </b-card>
      <b-card border-variant="light"
              header="Cadastre Analytics"
              align="left">
        <my-standslist></my-standslist>
      </b-card>
    </b-card-group>

    <b-card >
      <MyFooter/>
    </b-card>
  </b-container>

  </div>
</template>


<script>
  import Map from '@/components/Map.vue'
  import MyStandslist from '@/components/Standslist.vue'
  import WelcomePage from '@/components/Welcome.vue'
  import MyFooter from '@/components/Footer.vue'
  import Analytics from '@/components/Analytics.vue'
  import ReimsCharts from '@/components/charts/Reimscharts.vue' 
  


  export default {
    name: 'app',

    components: {
      MyMap: Map,
      MyStandslist,
      ReimsCharts,
      Analytics, 
      WelcomePage, 
      MyFooter

    },

    mounted () {
      this.$store.dispatch('LOAD_STANDS_LIST')
    },
    data () {
      return {
        chartType: 'pie'
      }
    }
  }
</script>
