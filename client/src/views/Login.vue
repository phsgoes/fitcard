<template>  
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 oh">
              <v-toolbar dark color="secondary" class="ma-0 pa-0">
                <template v-slot:extension>
                  <v-tabs v-model="theTab" color="secondary" grow fixed-tabs slider-color="white">
                    <v-tab>Acessar</v-tab>
                    <v-tab>Registrar</v-tab>
                  </v-tabs>
                </template>
              </v-toolbar>
              <v-tabs-items v-model="theTab" touchless>
                <v-tab-item class="white">
                  <v-card-text>
                    <v-form ref="loginForm" @keyup.native.enter="doLogin">
                      <v-layout column wrap>
                        <v-flex>
                          <v-text-field
                            prepend-icon="person"
                            label="E-mail"
                            v-model.trim="login.email"
                            :rules="rules.email"
                          />
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            prepend-icon="lock"
                            label="Senha"
                            type="password"
                            v-model.trim="login.password"
                            :rules="rules.password"
                          />
                        </v-flex>
                        <v-flex class="text-xs-right">
                          <v-btn
                            flat
                            depressed
                            small
                            class="mt-4 mb-3 pa-0"
                            color="accent"
                            @click="forgot"
                          >
                            <span>Esqueceu sua senha?</span>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout column wrap>
                      <v-flex class="text-xs-right">
                        <v-btn
                          color="secondary"
                          class="mr-2"
                          @click="doLogin"
                          dark
                          :loading="loginLoading"
                        >
                        Acessar
                        <v-icon right>fas fa-sign-in-alt</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <v-form ref="registerForm" @keyup.native.enter="doRegister">
                      <v-layout column wrap>
                        <v-flex>
                          <v-text-field
                            prepend-icon="person"
                            label="Nome"
                            v-model.trim="register.username"
                            :rules="rules.username"
                          />
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            prepend-icon="fas fa-at"
                            label="E-mail"
                            v-model.trim="register.email"
                            :rules="rules.email"
                          />
                        </v-flex>
                        <v-flex>
                          <v-text-field
                            prepend-icon="lock"
                            label="Senha"
                            type="password"
                            v-model.trim="register.password"
                            :rules="rules.password"
                          />
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout column wrap>
                      <v-flex class="text-xs-right">
                        <v-btn
                          color="secondary"
                          class="mr-2"
                          @click="doRegister"
                          dark
                          :loading="registerLoading"
                        >
                          <span>Registrar</span>
                          <v-icon right>far fa-edit</v-icon>
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      drawer: null,
      theTab: null,
      loginLoading: false,
      registerLoading: false,
      login: {
        email: null,
        password: null
      },
      register: {
        username: null,
        email: null,
        password: null,
      },
      rules: {
        username: [
          v => !!v || 'Nome de usuário é obrigatório',
          v => this.$utils.countLength(v, 2) || 'Nome de usuário deve ter pelo menos 2 caracteres'
        ],
        email: [
          v => !!v || 'E-mail é obrigatório',
          v => this.$utils.checkEmail(v) || 'Forneça um e-mail válido'
        ],
        password: [
          v => !!v || 'Senha é obrigatório',
          v => this.$utils.countLength(v, 6) || 'A senha deve ter pelo menos 6 caracteres'
        ]
      }
    }
  },

  watch: {
    theTab (newValue, oldValue) {
      this.$refs.loginForm.reset()
      this.$refs.registerForm.reset()
    }
  },

  methods: {
    doRegister () {
      if (this.$refs.registerForm.validate()) {
        this.registerLoading = true
        this.axios.post(`${process.env.VUE_APP_ROOT_API}auth/register`, this.register).then(response => {
          this.$swal('Sucesso', 'Te enviamos um e-mail de confirmação mas você já pode acessar o nosso sistema', 'success')
          this.register = _.mapValues(this.register, () => null)
          this.$refs.registerForm.reset()
          this.registerLoading = false
        }, error => {
          this.registerLoading = false 
          this.$swal('Erro', this.$utils.formatErrors(error.response.data), 'error')
        })
      }
    },
    doLogin () {
      if (this.$refs.loginForm.validate()) {
        this.loginLoading = true
        this.$store.dispatch('LOG_USER', this.login).then(response => {
          this.login = _.mapValues(this.login, () => null)
          this.$refs.loginForm.reset()
          this.loginLoading = false
          this.$router.push('/')
        }, error => {
          if (error.response.data[0].field === 'email') {
            this.$swal('Erro', 'Não é possível encontrar usuário com o email fornecido', 'error')
          }
          if (error.response.data[0].field === 'password') {
            this.$swal('Erro', 'Senha inválida', 'error')
          }
          this.loginLoading = false })
      }
    },
    forgot () {
      this.$swal('', 'Ainda em implementação...', 'info')
    }
  }
}
</script>
<style scoped lang="scss">
#login {
  min-height: 100%;
  width: 100%;
  background: linear-gradient(to top, #FFFFFF 50%, #AC192F 50%);
}
.oh { overflow: hidden }
.white { background: #ffffff }
</style>
