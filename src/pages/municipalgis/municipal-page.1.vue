<template>
  <v-layout wrap>
    <v-container>
      <engineering></engineering>              

        <v-spacer></v-spacer>
        <v-btn @click.stop="drawer = !drawer" color="green" dark>Menu</v-btn>
    </v-container>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      dark
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Dr Charles Paradzayi</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>
import Engineering from '@/pages/engineering/engineering-menu'
  
export default {
    components: {
      Engineering
    },
    data () {
      return {
        drawer: null,
        items: [
          { path: '/home', title: 'Home', icon: 'dashboard' },
          { path: '/engineering',title: 'Engineering', icon: 'dashboard' },
          { path: '/civil-engineering', title: 'Financial Analytics', icon: 'business' },
          { path: '/home', title: 'Administration', icon: 'dashboard' },
          { path: '/home', title: 'Public', icon: 'dashboard' },
          { path: '/home', title: 'Housing and Amenities', icon: 'dashboard' },
          { path: '/home', title: 'About', icon: 'question_answer' }
        ],
        mini: false,
        right: null
      }
    }
  }
</script>