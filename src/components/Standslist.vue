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
        v-bind:custom-filter="customFilter"
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
        search: '',
        pagination: {},
        headers: [
          {
            text: 'DSG Number', align: 'left',
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

    sortOptions () {
      // Create an options list from our fields
      return this.headers
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    } ,
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
            customFilter(items, search, filter) {
                //this custom filter will do a multi-match separated by a space.
                // Source: https://asyoulook.com/computers%20&%20internet/javascript-vuetify-data-tables-creating-custom-filters/316911
                
                if (!search) { 
                  this.$store.commit('SET_FILTERED_STANDS', [])
                  
                  return items } //if the search is empty just return all the items

                function  new_filter (val, search) {
                  
                    return val !== null &&
                        ['undefined', 'boolean'].indexOf(typeof val) === -1 &&
                        val.toString().toLowerCase().replace(/[^0-9a-zA-Z]+/g,"").indexOf(search) !== -1
                }

                let needleAry = search.toString().toLowerCase().split(" ").filter(x => x);
                //whenever we encounter a space in our search we will filter for both the first and second word (or third word)

                let filteredStands = items.filter(row => needleAry.every(needle => Object.keys(row).some(key => new_filter(row[key],needle))));
                // SYNCRONISE WITH THE MAP
                if (search.length >= 3) {
                  this.$store.commit('SET_FILTERED_STANDS', filteredStands.map(stand => {
                    return {
                      dsg_num: stand.dsg_num,
                      township_name: stand.township_name
                    }
                  }))
                } 
                return filteredStands
                //foreach needle in our array cycle through the data (row[key]) in the current row looking for a match.
                // .some will return true and exit the loop if it finds one it will return false if it doesnt
                // .every will exit the loop if we dont find a match but will return true if all needles match
                // .filter the rows on each match


            }
        }
  }
</script>