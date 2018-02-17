<template lang="html">
  <div v-if="stands.objects">
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <!-- Filter component -->
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Filter" class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-button>
                  <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-button>
              </b-input-group>
            </b-form-group>
          </b-col>

          <!-- Sort component -->
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Sort" class="mb-0">
              <b-input-group>
                <b-form-select v-model="sortBy" :options="sortOptions">
                  <option slot="first" :value="null">-- none --</option>
                </b-form-select>
                <b-input-group-button>
                  <b-form-select :disabled="!sortBy" v-model="sortDesc">
                    <option :value="false">Asc</option>
                    <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group-button>
              </b-input-group>
            </b-form-group>
          </b-col>

        </b-row>
      <br>
      <!-- Main table element -->
      <b-table
        show-empty
        stacked="md"
        :items="stands.objects.output.geometries.map(s => s.properties)"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        @filtered="onFiltered">
      </b-table>

      <br>
        <b-row>
          <!-- Pagination -->
          <b-col md="6" class="my-1">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>

          <!-- Per page results -->
          <b-col md="6" class="my-1">
            <b-form-group horizontal label="Per page" class="mb-0">
              <b-form-select :options="pageOptions" v-model="perPage" />
            </b-form-group>
          </b-col>
        </b-row>

    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// https://codepen.io/AndrewThian/pen/QdeOVa Filter using a specific field

export default {
  name: 'StandsList',
  data () {
    return {
      search: '',
      fields: [
        { key: 'dsg_num', label: 'DSG Number', sortable: true },
        { key: 'township_name', label: 'Township', sortable: true, 'class': 'text-center' },
        { key: 'city_name', label: 'City' }
        // { key: 'status', label: 'Status', sortable: true }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 6 ],
      sortBy: null,
      sortDesc: false,
      filter: '',
      modalInfo: { title: '', content: '' }
    }
  },

  computed: {

    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
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
        console.log('about to commit')
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

// References
  // https://github.com/epicmaxco/vuestic-admin -Dashboard layout sample - limited browser support - missing IE11
  // http://vuejs.creative-tim.com/vue-paper-dashboard/#/admin/overview - Ideal dashboard with broad browser support
  // https://mcmap.org/qol-dev/ Tobin Bradley sample dashboard - good layout too, but too complicated
  // https://mcmap.org/qol-dev/ sample dashboard with nice looking menu
  
  // Major challenge -  component layout design and watching different states of datasets for visualisation

  // http://vuejs.creative-tim.com/vue-paper-dashboard/#/admin/overview
</script>
