<template>
  <div id="page-home">
    <loading :value="loading" />
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Home">
            <div slot="widget-content" class="d-flex align-center" style="min-height: 400px;" fill-height>
              <v-layout wrap align-center justify-center row>

                <v-flex xs6 sm6 md4 lg4 class="text-xs-center">
                  <v-btn class="btn-shortcut" depressed outline color="primary"
                    :to="{name: 'categories'}">
                    <v-icon :size="45" class="icon">fas fa-list</v-icon>
                    <span class="shortcut-name">Categorias</span>
                  </v-btn>
                </v-flex>

                <v-flex xs6 sm6 md4 lg4 class="text-xs-center">
                  <v-btn class="btn-shortcut" depressed outline color="primary"
                    :to="{name: 'companies'}">
                    <v-icon :size="45" class="icon">fas fa-building</v-icon>
                    <span class="shortcut-name">Empresas</span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget'
import Loading from '@/components/ui/Loading'
export default {
  name: 'home',

  components: {
    VWidget,
    Loading
  },

  data () {
    return {
      loading: false
    }
  },

  mounted () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.btn-shortcut {
  width: 140px;
  height: 120px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 1px 1px 1px 0px rgba(3,169,244,.2),
              -1px -1px 1px 1px rgba(3,169,244,.1);
}
.icon {
  padding-bottom: 5px;
  color: inherit !important;
}
.shortcut-name {
  font-size: 11.5px;
}
@media (max-width: 320px) {
  .btn-shortcut {
    width: 100px;
    height: 80px;
  }
}
</style>

<style media="screen">
#page-home .v-btn__content {
  flex-direction: column !important;
  position: relative;
  word-break: break-word;
  overflow: hidden;
  white-space: normal;
  padding: 5px;
}
#page-home .v-card__text {
  padding: 1px;
}
@media (max-width: 360px) {
  #page-home .icon {
    font-size: 30px !important;
  }
}
</style>