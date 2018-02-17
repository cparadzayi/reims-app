<template>
  <table></table>
</template>

<script>
export default {
  name: 'data-table',
  props: ['stands'],
  data() {
    return {
      headers: [
        { title: 'Stand Number' },
        { title: 'Township name', class: 'some-special-class' },
        { title: 'City Id' },
        { title: 'Status' }
      ],
      rows: [] ,
      dtHandle: null
    }
  }
}
</script>

<style>

</style>
