<template>
    <b-card>
      <b-nav>
          
          <b-nav-item brand href="#/" style="font-weight: bold"  :class="{underline: $route.name === 'home'}">MunicipalGIS</b-nav-item>
          <b-nav-item  v-for="menu in menus" :key="menu.path" :href="`#/${menu.path}`" :class="{underline: selectedMenu === menu.path}">{{ menu.title }}</b-nav-item>
      </b-nav>
      <a class="btn btn-danger float-right" v-if="isLoggedIn == true"  @click="logout(), $router.push('/')">Logout</a>
      <a class="btn btn-primary float-right" v-else @click="$router.push('/login')">Login</a>
      
      <!-- Authenticate users here and only proceed after user is cleared -->
      <div v-if="matchingRoutes.length">
      <hr>
        <b-nav pills >
          <b-nav-item  :active="$route.name===route.path" v-for="route in matchingRoutes" :key="route.path" :href="`#/${selectedMenu}/${route.path}`">{{ route.title }}</b-nav-item>
        </b-nav>
      </div> 
    </b-card>
</template>

<script>
  import { isLoggedIn, logout } from '../../api/auth'

  export default {
    mounted() {
      //console.log(this.$route)
    },
    data: () => ({
      selectedMenu: '',
      menus: [
        {
          path: 'finance',
          title: 'Financial Analytics',
          children: [
            { path: 'billing-analysis', title: 'Billing Analysis' },
            { path: 'meter-reading', title: 'Meter Reading' },
            { path: 'billboards', title: 'Billboard Management' },
            { path: 'audit', title: 'Internal Audit' }
          ]
        }

      ]
    }),
    computed: {
      isLoggedIn () {
        return this.$store.getters.isLoggedIn
      },
      
      matchingRoutes () {
        let splitUrl = this.$route.fullPath.split('/')
        let matchingRoutes = []
        splitUrl.forEach(path => {
          const match = this.menus.find(menu => menu.path === path)
          if (match) {
            this.selectedMenu = match.path
            matchingRoutes = match.children || []
          }
        })
        if (this.$route.name === 'home') this.selectedMenu = 'home'
        
        return matchingRoutes
      }
    },

    methods: {
      logout () {
        logout()
        this.$store.commit('SET_AUTH_STATUS', false)
      }
    }
  }
</script>


<style>
  .underline {
    display: inline-block;
    border-bottom: 2px blue solid;
  }
  .float-right{
    right: 5px;
    top: -42px;
    color: #fff
  }
</style>
