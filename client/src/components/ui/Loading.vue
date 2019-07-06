<template>
  <v-dialog v-model="value" content-class="elevation-0" full-width persistent>
    <v-container fill-height>
      <v-layout column justify-center align-center>
        <v-progress-circular indeterminate :size="70" :width="7" :color="progressColor"></v-progress-circular>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: 'loading',

  props: {
    value: {
      type: Boolean, 
      default: false
    },
    progressColor: {
      type: String,
      default: 'primary',
      required: false
    },
  },

  data () {
    return {
      //
    };
  },
};
</script>
<style lang="scss" scoped>
.v-dialog:not(.v-dialog--fullscreen) {
  min-height: 100%;
}
</style>