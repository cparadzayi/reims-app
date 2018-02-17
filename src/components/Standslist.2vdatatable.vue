<template>
  <div v-if="stands.objects">
  <v-card>
    <v-card-title>
      {{city}} Stands
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="stands.objects.output.geometries.map(s => s.properties)"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">

        <td class="text-xs-left">{{ props.item.dsg_num }}</td>
        <td class="text-xs-left">{{ props.item.township_name }}</td>
        <td class="text-xs-left">{{ props.item.city_name }}</td>

      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    name: 'StandsList',
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'DSG Number',
            align: 'left',
            sortable: true,
            filterable: true,
            value: 'dsg_num'
          },
          { text: 'Township', align: 'left',sortable: true, filterable: true, value: 'township_name' },
          { text: 'City', align: 'left',sortable: true, filterable: true, value: 'city_name' }
        ],
        items: [],
        city: 'Table of City'
      }
    },

  computed: {
    filteredItems() {
      return this.headers.filter((i) => {
        return !this.selectedTownship || (i.value === this.selectedTownship)
      })
    },
    /*,
    sortOptions () {
      // Create an options list from our fields
      return this.headers
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    } */
    ...mapGetters([
      'stands'
    ])
  },

  watch: {
    stands (value) {
      this.totalRows = value.objects.output.geometries.length
    }
  },

  methods: {


    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1

      // SYNCRONISE WITH THE MAP
      if (this.filter.length >= 3) {
        console.log('about to commit filtered stands!!')
        this.$store.commit('SET_FILTERED_STANDS', filteredItems.map(stand => {
          return {
            dsg_num: stand.dsg_num,
            township_name: stand.township_name
          }
        }))
      } else if (this.filter.length === 0) {
        this.$store.commit('SET_FILTERED_STANDS', [])
      }

    }
    
  }
  }
</script>