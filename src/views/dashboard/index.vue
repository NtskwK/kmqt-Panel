<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <p>{{ location }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  mounted() {
    this.getLocation();
  },


  data() {
    return {
      location: ''
    }
  },

  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },

  methods: {
    getLocation() {
      axios.get('https://ipapi.co/json')
        .then(response => {
          console.log(response)
          this.location = response.data.city
        })
        .catch(error => (console.log(error)))
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
