<template>
  <v-toolbar color="primary" fixed dark app>
    <v-toolbar-title class="ml-0 pl-1">
      <v-toolbar-side-icon :size="16" @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>  
  </v-toolbar>
</template>
<script>
export default {
  name: 'AppToolbar',
  
  data () {
    return {
      logo: 'FitCard',
    }
  },

  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
  }
}
</script>
