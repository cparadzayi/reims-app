<template>
  <div>
      <v-card fluid flat tile>
        <v-card-title class="teal white--text"></v-card-title>
        <v-card-text class="grey lighten-3">
          <v-layout>
            <v-flex
              v-for="(col, i) in rows"
              :key="i"
              xs4
            >
              <span class="body-2" v-text="col.title.toUpperCase()"/>
              <div
                v-for="(child, i) in col.children"
                :key="i"
                v-text="child"
              />
            </v-flex>
            <v-flex xs4 layout column>
              <span class="body-2">CONTACT</span>
              <div>
                <v-icon size="18px" class="mr-3">fa-home</v-icon>
                Centre for Earth Observation and Geospatial Analytics, Senga Road, Gweru, Zimbabwe
              </div>
              <div>
                <v-icon size="18px" class="mr-3">fa-envelope</v-icon>
                info@ceoga.msu.ac.zw
              </div>
              <div>
                <v-icon size="18px" class="mr-3">fa-phone</v-icon>
                + 263 774 003 137
              </div>
              <div>
                <v-icon size="18px" class="mr-3">fa-print</v-icon>
                + 263 774 003 137
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="grey lighten-2 justify-center">
          &copy; {{ new Date().getFullYear() }} Midlands State University - Centre for Earth Observation and Geospatial Analytics <strong>www.msu.ac.zw</strong>

        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      rows: [
        {
          title: 'Centre for Earth Observation and Geospatial Analytics',
          children: ['Department of Surveying and Geomatics', 'Faculty of Science and Technology','Midlands State University','Zimbabwe']
        },
        {
          title: 'GIS Solutions',
          children: ['Engineering', 'Financial Analytics', 'Housing and Amenities', 'Health and Environment', 'Administration']
        }
      ]
    })
  }
</script>