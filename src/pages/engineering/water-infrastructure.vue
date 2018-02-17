<template>
<div>
  <b-container fluid style="padding: 20px;" >
    <hr>

    <b-card-group deck class="mb-3">
      <b-card border-variant="light"
              header="Mapview">
              <MyMap/>
      </b-card>

            <b-card title="Summary"
                    img-top>
                <reims-charts id="Reimscharts" :chartType="chartType"></reims-charts>

                <div slot="footer">
                  <button class="btn" @click="chartType='pie'" :class="{ 'btn-primary': chartType === 'pie' }">Pie chart</button>
                  <button class="btn" @click="chartType='bar'" :class="{ 'btn-primary': chartType === 'bar' }">Bar chart</button>
                  <button class="btn" @click="chartType='line'" :class="{ 'btn-primary': chartType === 'line' }">Line chart</button>

                    <small class="text-muted">Different charts here - Pie, Bar, Histograms</small>
                </div>
            </b-card>

    </b-card-group>
  </b-container>


      <div>
        <b-card-group deck>

        <b-card border-variant="light"
              header="Tables and Graphs"
              align="left">
              <my-standslist id="standsList"></my-standslist>
        
        </b-card>



        </b-card-group>
    </div>

    <hr>
      <div class="col-xs-12 col-sm-12">
        <div class="alert alert-info" style="text-align: center">
          <a href="#">MSU - CEOGA</a>
        </div>
      </div>
</div>
</template>


<script>
  import Map from '@/components/Map.vue'
  import Standslist from '@/components/Standslist.vue'
  import ReimsCharts from '@/components/charts/Reimscharts.vue' 


  export default {
    name: 'app',

    components: {
      MyMap: Map,
      MyStandslist: Standslist,
      ReimsCharts
    },

    mounted () {
      this.$store.dispatch('LOAD_STANDS_LIST')
    }
  }
</script>
