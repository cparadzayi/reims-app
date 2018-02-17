<template>
  <v-app light>          
    <v-navigation-drawer app :clipped="clipped" v-model="drawer" enable-resize-watcher app dark class="success lighten-3">
      <v-list>
        <v-list-group v-for="item in items" :value="item.active" :key="item.title">
          <v-list-tile slot="item" 
                       :to="item.path == '#' ? '' : item.path" 
                       :exact="item.exact" 
                       class="yellow--text"
                       active-class="green--text">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.items.length > 0">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>         
        </v-list-group>
      </v-list>
    </v-navigation-drawer>  
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>GIS Applications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>  

    <v-content>      
      <v-container fluid>
        <router-view></router-view>
        <app-landing app> </app-landing>
        
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import appLanding from '@/pages/appLanding'  

export default {
  components: {
    appLanding
  },

  data () {
    return {
      drawer: true,
      clipped: false,
      items: [
        {
          action: 'local_activity',
          title: 'Engineering',
          path: '/engineering',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Finance',
          path: '/finance',
          items: []
        }       
      ]
    }
  }
  }
</script>
