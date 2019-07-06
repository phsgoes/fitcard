<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    :dark="$vuetify.dark"
    fixed
    app
    v-model="drawer"
    width="260"
  >
    <v-toolbar color="primary" flat dark class="py-0">
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="logo-title" style="height: 48px !important">
            <img src="/img/logo.svg" height="32" class="align-logo" alt="FitCard">
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list>
      <v-list-tile :to="'/'" @click.stop="() => false">
        <v-list-tile-action>
          <v-icon>fas fa-home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Home</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="'/categories'" @click.stop="() => false">
        <v-list-tile-action>
          <v-icon>fas fa-list</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Categorias</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="'/companies'" @click.stop="() => false">
        <v-list-tile-action>
          <v-icon>far fa-building</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Empresas</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="'/'" @click.stop="logout">
        <v-list-tile-action>
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Sair</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'AppDrawer',

  data () {
    return {
      appName: 'FitCard',
      mini: false,
      drawer: true
    }
  },
  
  created () {
    window.getApp.$on('APP_DRAWER_TOGGLED', () => { this.drawer = !this.drawer })
  },

  methods: {
    ...mapMutations({
      logoff: 'LOGOFF'
    }),
    
    logout () {
      this.logoff()
      localStorage.clear()
      this.$router.push('login')
    }
  }
}
</script>
<style lang="scss">
.align-logo {
  display: inline-block;
  margin: 5px 40px;
}
</style>
