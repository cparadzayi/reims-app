<template>
<div id="app">
  <v-app light>       
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app dark class="success lighten-3">
      <v-list>
        <v-list-group v-for="item in items" :value="item.active" :key="item.title">
          <v-list-tile slot="item" 
                       :to="item.path == '#' ? '' : item.path" 
                       :exact="item.exact" 
                       class="yellow--text"
                       active-class="red--text">
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
      <v-toolbar-title>Engineering Apps</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>      
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>
<script>


export default {
  data () {
    return {
      drawer: true,
      clipped: false,
      items: [
        {
          action: 'restaurant',
          title: 'Water Infrastructure',
          path: '/engineering/water-infrastructure',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Sewer Infrastructure',
          path: '/engineering/sewer-infrastructure',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Waste Management',
          path: '/engineering/waste-management',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Fire and Ambulance',
          path: '/engineering/fire-and-ambulance',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Town Planning',
          path: '/engineering/town-planning',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Surveying',
          path: '/engineering/surveying',
          items: []
        },
        {
          action: 'restaurant',
          title: 'Electrical',
          path: '/engineering/electrical',
          items: []
        },
        {
          action: 'local_activity',
          title: 'Civils',
          path: '/engineering/civil-engineering',
          items: []
        }        
      ]
    }
  }
  }
</script>
