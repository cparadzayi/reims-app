<template>
<v-app id="app">
    <b-container fluid style="padding: 20px;" height="100%;">
        <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
    <v-list dense="">
      <template v-for="(item, i) in items">
        <v-layout row="" v-if="item.heading" align-center="" :key="i">
          <v-flex xs6="">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6="" class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
          <v-list-tile slot="item" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i" @click="$router.push(item.path + child.path)">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="$router.push(item.path)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    </v-navigation-drawer>
  <v-layout justify-center="" space-between="">
    <v-toolbar class="white" white="" app="" clipped-left="" fixed="">
      <v-toolbar-title class="">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        Municipal GIS
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field autofocus="" solo="" append-icon="search" placeholder="Search"></v-text-field>
      <v-btn icon="">
        <v-icon>apps</v-icon>
      </v-btn>
     </v-toolbar></v-layout>
     
    <main>
      <v-content>
        <v-container fluid="" fill-height="">
          <v-layout justify-center="" align-center="">
            <v-tooltip right="">
              <v-btn icon="" large="" :href="source" target="_blank" slot="activator">
                <v-icon large="">code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    <v-fab-transition>
      <v-btn fab="" bottom="" right="" class="blue darken-3" dark="" fixed="" @click.stop="dialog = !dialog" v-show="!hidden">
        <v-icon>chat</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          Contact Andrew
        </v-card-title>
        <v-container grid-list-sm="" class="pa-4">
          <v-layout row="" wrap="">
            <v-flex xs12="" d-flex="" align-center="" justify-space-between="">
              <v-avatar size="40px" class="mr-3">
                <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
              </v-avatar>
              <v-text-field placeholder="Name"></v-text-field>
            </v-flex>
            <v-flex xs6="">
              <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
            </v-flex>
            <v-flex xs6="">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-flex>
            <v-flex xs12="">
              <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
            </v-flex>
            <v-flex xs12="">
              <v-text-field prepend-icon="phone" placeholder="(000) 000 - 0000" mask="phone"></v-text-field>
            </v-flex>
            <v-flex xs12="">
              <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat="" primary="">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat="" primary="" @click="dialog = false">Cancel</v-btn>
          <v-btn flat="" @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <b-card-group deck class="mb-3">
      
        <b-card border-variant="light"
                header="Mapview"
              >
          <app-map></app-map> 
          <p>Add map search here</p>  
        </b-card>

        <b-card border-variant="light"
                header="Stand Analytics">
          <app-stands-list></app-stands-list>   
        </b-card> 
      </b-card-group>
    <b-card>
    <app-footer></app-footer>
    </b-card>
    </b-container>
  </v-app>
</template>

<script>
import appMap from "@/components/Map"
import appStandsList from "@/components/Standslist"
import appFooter from "@/components/Footer"

// http://unlockcampus.org/code/tutoring/google-contacts-vuetifyjs-template

  export default {
    components: {
      appMap, 
      appStandsList,
      appFooter
    },
  data: () => ({
    hidden: true,
    dialog: false,
    drawer: false,
    items: [
      { icon: "home", text: "Home Page", path: '/' },
      { icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Engineering",
        path: '/engineering',
        model: false,
        children: [
              { path: '/surveying', text: 'Cadastre' },
              { path: 'planning',text: 'Town Planning' },
              { path: 'register',text: 'Waste Management' },
              { path: 'login', text: 'Fire and Ambulance' },
              { path: 'public', text: 'Development Control' },
              { path: 'login',text: 'Road Infrastructure' },
              { path: 'login',text: 'Water Infrastructure' },
              { path: 'public',text: 'Sewer and Stormwater' },
              { path: 'basemap',text: 'Elecrical Engineering' }         
        ]
        },
      { icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down", 
        text: "Financial Analytics",
        model: false,
        children: [
          { text: "Metering" },
          { text: "Billing Anaysis" },
          { text: "Billboard Management" },
          { text: "Audit and Internal Control" }
        ]
  },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Administration",
        model: false,
        children: [
              { text: 'City Mayor' },
              { text: 'Town Clerk' },
              { text: 'Asset Manager' },
              { text: 'Chamber Secretary' },
              { text: 'System Administrator' }
              
          ]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Housing and Amenities",
        model: false,
        children: [
              { text: 'Cemeteries' },
              { text: 'Waiting List' },
              { text: 'Demographics' },
              { text: 'Housing and Estates' },
              { text: 'Vendor Information Management' },
              { text: 'Parks and Recreational Facilities' }
        ]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Health",
        model: false,
        children: [
              { text: 'Disease Surveillance' },
              { text: 'Health Information Management' },
              { text: 'Safety, Health and Environment' }
        ]
      },
      { 
        icon: "settings", 
        text: "Public" 
      },
      { icon: "chat_bubble", text: "Send feedback" },
      { icon: "help", text: "Public" }
    ]
  }),
  props: {
    source: String
  },

    mounted () {
      this.$store.dispatch('LOAD_STANDS_LIST')
    }
  
  }
</script>

<style scoped>
    
    nav div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    nav .toolbar__title {
      margin: 0;
    }
    
    .btn--icon {
      border-radius: 0;
    }
    .btn--icon .btn__content::before {
      border-radius: 0;
    }
</style>
