<template>
  <div class = "maps">
     <!-- The map will be auto injected-->
    <div id='mapview'></div>
  </div>
</template>

<script>
  import mapboxgl from 'mapbox-gl'
  import omnivore from 'leaflet-omnivore' // to convert topojson to geojson for display in mapbox gl maps
  // See https://chriswhong.com/data-visualization/introducing-postgis-preview/
  // Important sites
  // https://www.mapbox.com/mapbox-gl-js/api/
  // https://www.mapbox.com/mapbox-gl-js/example/navigation/
  // https://www.mapbox.com/mapbox-gl-js/example/filter-features-within-map-view/


  // Pending issues: 
  // 1. Export to png/pdf : https://github.com/TheGartrellGroup/Mapbox-GL-Print-Export-For-Port
  

  import * as topojson from "topojson-client" // to be able to convert from topojson to geojson
  import extent from 'turf-extent' // to be able to get bounding extent of geojson data
  import { mapGetters } from 'vuex'

  export default {
    name: 'maps',
    data () {
      return {
        // initialisation options for mapbox
        mapOptions: {
          container: 'mapview', // container id
          style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
          center: [30.15, -18.13], // starting position
          zoom: 10, // starting zoom
          minZoom: 4, 
          attributionControl: false         
        },

      standsGeojson: {}, 
// check these sites: https://www.mapbox.com/mapbox-gl-js/api/
// http://www.cnblogs.com/think8848/p/7627251.html
// https://www.npmjs.com/package/mapbox-gl-vue for scale control and geolocation what what
// https://mikewilliamson.wordpress.com/2016/02/24/using-mapbox-gl-and-webpack-together/
// https://www.mapbox.com/mapbox-gl-js/api/ Controlling mapbox gl components
// https://blog.mapbox.com/turf-gis-for-web-maps-314ab06127a Turf : GIS for web maps 
// http://govhack-toolkit.readthedocs.io/technical/geographic-data/ IMMPPP for u

// https://www.e-education.psu.edu/geog585/node/759 web mapping from PSU 

        // The map object
        map: {}
      }
    },

    mounted () {
      // Initilise the map and fetch the spatial data (static parts of the map)
      this.initMap()
      this.displayPopup()
      // this.fetchData()
    },

    computed: {
      ...mapGetters(['filteredStands', 'stands'])
    },

    watch: {
      filteredStands (newVal, oldVal) {
        // here change the selection effects of the map
        this.selectedStands(newVal)
      },
      stands (newVal, oldVal) {
        // newVal == topojson
        this.standsGeojson = topojson.feature(newVal, newVal.objects.output);
        this.addBaseMap()
      }
    },

    methods: {

      /*
        Make a new map and attach map event
      */
      initMap: function () {
        // apply the accessToken and start the map
        mapboxgl.accessToken = 'pk.eyJ1IjoicmFpa28iLCJhIjoiSy1KVE82byJ9.dcia_8lqXX8DsL8czQNB9A'

        // Create a new map with the specified options
        this.map = new mapboxgl.Map(this.mapOptions)

        // Add zoom and rotation controls to the map.
        this.map.addControl(new mapboxgl.NavigationControl()); 
        this.map.addControl(new mapboxgl.FullscreenControl());
        this.map.addControl(new mapboxgl.ScaleControl({
                maxWidth: 80,
                unit: 'metric'
            }));
          this.map.addControl(new mapboxgl.AttributionControl({
            compact: true
          }));
          

      },

      selectedStands: function (value) {
        let filterString = value || []
        if (this.map.isStyleLoaded()) {
          // add the filter layer
          if (this.map.getLayer('standsFilter')) {
            this.map.removeLayer('standsFilter')
          }

          this.map.addLayer({
            id: 'standsFilter',
            type: 'fill',
            source: 'stands',
            paint: {
              // 'fill-opacity': 0.2,
              'fill-color': 'yellow',
              'fill-outline-color': 'blue'
            }
          })

          
          this.map.setFilter('standsFilter', [
            'all',
            ['in', 'dsg_num'].concat(value.map(stand => stand.dsg_num)),
            ['in', 'township_name'].concat(value.map(stand => stand.township_name))
          ])
        }

      },
/* OPTIONS FOR GETTING DATA FROM EXTERNAL SOURCE using axios, vue-axios configuration
https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/ IMMMPPPP

    Vue.axios.get(api).then((response) => {
      console.log(response.data)
    })
    
    this.axios.get(api).then((response) => {
      console.log(response.data)
    })
    
    this.$http.get(api).then((response) => {
      console.log(response.data)
    })
*/

      addBaseMap () {
        const orgBbox = extent(this.standsGeojson); // See https://stackoverflow.com/questions/35673704/how-do-i-get-the-bounding-box-of-a-mapboxgl-geojsonsource-object

        // add the source
        if (!this.map.getSource('stands')) {
            this.map.addSource('stands', {
              type: 'geojson',
              data: this.standsGeojson
            })
        }

        if (this.map.getLayer('stands')) {
          this.map.removeLayer('stands')
        }

        this.map.addLayer({
          id: 'stands',
          type: 'fill',
          source: 'stands',
          paint: {
            'fill-opacity': 0.2,
            'fill-outline-color': 'red'
          }
        })

        this.map.fitBounds(orgBbox, {padding: 20});
      },
      displayPopup () {
        
        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: true
        });


        this.map.on('mousemove', (e) => {
            var features = this.map.queryRenderedFeatures(e.point, {
                layers: ['standsFilter']
            });
            // Change the cursor style as a UI indicator.
            this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

            if (!features.length) {
                popup.remove();
                return;
            }

            var feature = features[0];

            // Populate the popup and set its coordinates
            // based on the feature found.

            // document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
            //console.log(features);
            popup.setLngLat(feature.geometry.coordinates[0][0])
                .setHTML(['<strong> Name: </strong><p> <label class=\'text-muted small\'>' + feature.properties.dsg_num + '</label></p>',
                    '<strong>Location: </strong><p> <label class=\'text-muted small\'>' + feature.properties.township_name + '</label></p>',
                    '<strong>City: </strong><p> <label class=\'text-muted small\'>' + feature.properties.city_name + '</label></p>'
                ].join(''))
                .addTo(this.map);

        });

      }
    }
  }
</script>

  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url(../../static/mapbox-gl.css);
  #mapview { 
    position: relative;
    height: 60vh;
    min-height:400px;
    width: 100%;
  }

</style>
