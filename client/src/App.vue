<template>
  <div id="app">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer />
        <app-toolbar />
        <v-content>
          <div class="page-wrapper">
            <router-view :key="$route.fullPath"></router-view>
          </div>
          <v-footer height="auto" class="white pa-3 app--footer" absolute>
            <span class="caption">
              <img src="/img/footer.png" alt="" width="40">
            </span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> Todos os direitos reservados </span>
          </v-footer>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
import AppToolbar  from '@/components/AppToolbar'
import AppDrawer from '@/components/AppDrawer'
export default {
  name: 'App',

  components: {
    AppToolbar,
    AppDrawer
  },

  data () {
    return {
      //
    }
  },

  created () {
    window.getApp = this
  }
}
</script>
<style lang="scss" scoped>
#app {
  min-height: 100%;
}
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
