<template>
  <!-- Use chart.js chartkick and vue-chartkick wrapper here 
  https://alligator.io/vuejs/intro-to-component-props/ Revist this page to see how data can be shared between  components
  https://medium.com/@codebyjeff/vue-js-simple-tuts-dynamic-components-452861d678e4
  https://www.youtube.com/watch?v=9qqFH60isFc
  -->
  <div>
     <!-- <line-chart :data="townshipSummary" download="Reims Chart" ></line-chart> -->
      <pie-chart v-if="chartType === 'pie'" :data="townshipSummary" download="Reims Chart" ></pie-chart>
      <line-chart v-if="chartType === 'line'" :data="townshipSummary" download="Reims Chart" ></line-chart>
      <bar-chart v-if="chartType === 'bar'" :data="townshipSummary" download="Reims Chart" ></bar-chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['chartType'],
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'townshipSummary'
      // ,       'anotherGetter',
    ])
  }
}

</script>

