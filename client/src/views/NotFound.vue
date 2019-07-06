<template>
  <v-app id="404">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <div class="text-md-center">
          <h1>404</h1>
          <!-- <h2 class="my-3 headline ">{{ $t('routes.PAGE_NOT_FOUND') }}</h2> -->
          <div>
            <v-btn color="primary" @click="goHome">
              <!-- <v-icon left>home</v-icon> {{ $t('routes.HOME') }} -->
            </v-btn>
          </div>  
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push({ path: '/' });
    }
  }  
};
</script>
<style scoped lang="scss">
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;    
  }
</style>
