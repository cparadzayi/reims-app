<template>
  <v-layout justify-space-around>

  <v-tabs  fluid icons center>
    <v-tabs-bar dark color="light">
      <v-tabs-slider color="green"></v-tabs-slider>
      <v-tabs-item href="#tab-1">
        Tables
      </v-tabs-item>
      <v-tabs-item href="#tab-2">
        Summaries
      </v-tabs-item>

    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 2"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Add analytics material here!!'
      }
    }
  }
</script>