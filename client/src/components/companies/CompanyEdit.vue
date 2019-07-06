<template>
  <v-dialog v-model="active" persistent max-width="600" scrollable @keydown.esc.stop="onCancel">
    <v-card>
      <v-card-title class="fc-card-title">
        <h2 class="subheading">Editar empresa</h2>
      </v-card-title>
      <v-card-text v-if="company !== null">
        <v-layout row wrap>
          <v-flex sm12>
            <v-form ref="empresaEdition" @submit.prevent>
              <v-container grid-list-sm text-xs-center>
                <v-layout justify-space-between row wrap>
                  <v-flex>
                    <v-text-field
                      prepend-icon="fas fa-building"
                      label="Razão social"
                      v-model.trim="company.razao_social"
                      maxlength="250"
                      readonly
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex>
                    <v-text-field
                      prepend-icon="fas fa-edit"
                      label="Nome fantasia"
                      v-model.trim="company.nome_fantasia"
                      maxlength="250"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-text-field
                      prepend-icon="far fa-id-card"
                      label="CNPJ"
                      v-model.trim="company.cnpj"
                      maxlength="18"
                      :mask="'##.###.###/####-##'"
                      readonly
                    />
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      prepend-icon="fas fa-at"
                      label="E-mail"
                      v-model.trim="company.email"
                      maxlength="60"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                      :rules="rules.email"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-text-field
                      v-model.number="company.cep"
                      prepend-icon="fas fa-mail-bulk"
                      label="CEP"
                      mask="#####-###"
                      maxlength="8"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                      :loading="cepLoading"
                      @change="getAddress"
                    />
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      v-model.trim="company.numero"
                      prepend-icon="fas fas fa-sort-numeric-up"
                      label="Número"
                      maxlength="10"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex>
                    <v-text-field
                      v-model.trim="company.endereco"
                      prepend-icon="fas fa-road"
                      label="Endereço"
                      maxlength="120"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-text-field
                      v-model.trim="company.cidade"
                      prepend-icon="fas fa-city"
                      label="Cidade"
                      maxlength="100"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      v-model.trim="company.estado"
                      prepend-icon="fas fa-atlas"
                      maxlength="50"
                      label="Estado"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-text-field
                      v-model.trim="company.bairro"
                      prepend-icon="fas fa-street-view"
                      label="Bairro"
                      maxlength="100"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      v-model.trim="company.complemento"
                      prepend-icon="far fa-plus-square"
                      label="Complemento"
                      maxlength="100"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-text-field
                      v-model.number="company.telefone"
                      prepend-icon="phone"
                      label="Telefone"
                      v-mask="['(##) ####-####', '(##) #####-####']"
                      maxlength="15"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                      :rules="rules.telefone"
                    />
                  </v-flex>
                  <v-flex sm6>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="menu"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="company.data_de_cadastro"
                        label="Data de cadastro"
                        prepend-icon="event"
                        readonly
                        clearable
                        :clear-icon="'fas fa-backspace fa-sm'"
                      />
                      <v-date-picker
                        ref="insertionDate"
                        :max="new Date().toISOString().substr(0, 10)"
                        :locale="$vuetify.lang.current"
                        v-model="company.data_de_cadastro"
                        @input="menu = false"
                      />
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-text-field
                      v-model.number="company.agencia"
                      label="Agência"
                      mask="###-#"
                      maxlength="4"
                      prepend-icon="fas fa-university"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                  <v-flex sm6>
                    <v-text-field
                      v-model.number="company.conta"
                      label="Conta"
                      mask="##.###-#"
                      maxlength="6"
                      prepend-icon="fas fa-money-check-alt"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                    />
                  </v-flex>
                </v-layout>
                <v-layout justify-space-between row wrap>
                  <v-flex sm6>
                    <v-layout row align-center wrap>
                      <v-flex xs5 class="text-xs-left">
                        <p class="v-label" style="margin-bottom:3px; color: rgb(117,117,117)">
                          <i class="fas fa-question fa-lg mr-2"></i>Status:</p>
                      </v-flex>
                      <v-flex xs7 class="text-xs-left">
                        <v-switch
                          color="info"
                          v-model="company.status"
                          :label="!company.status ? `Inativo` : `Ativo`"
                        />
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex sm6>
                    <v-autocomplete
                      ref="categoryId"
                      v-model.trim="company.category_id"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Categoria"
                      prepend-icon="fas fa-list-ol"
                      clearable
                      :clear-icon="'fas fa-backspace fa-sm'"
                      @change="phoneValidator = $event"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn color="info" :disabled="!canBeSubmitted" @click="onSubmit" :loading="loading">
          <v-icon left>refresh</v-icon> Atualizar
        </v-btn>
        <v-btn color="error" @click="onCancel" flat>
          <v-icon left>clear</v-icon> Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'company-edit',

  data () {
    return {
      active: false,
      menu: false,
      loading: false,
      cepLoading: false,
      phoneValidator: null,
      company: {
        razao_social: null,
        nome_fantasia: null,
        cnpj: null,
        email: null,
        cep: null,
        endereco: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
        complemento: null,
        telefone: null,
        data_de_cadastro: new Date().toISOString().substr(0, 10),
        status: false,
        category_id: null,
        agencia: null,
        conta: null
      },
      rules: {
        email: [
          v => this.$utils.checkEmptyOrValidEmail(v) || 'E-mail deve ser válido'
        ],
        telefone: [
          v => this.validateTelephone(v, this.phoneValidator) || 'Telefone é obrigatório'
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      categories: 'GET_CATEGORIES'
    }),

    canBeSubmitted () {
      return !!this.company.razao_social && !!this.company.cnpj
    }
  },

  mounted () {
    if (!window.getApp._events.CREATE_CATEGORY) {
      window.getApp.$on('EDIT_COMPANY', async (value) => {
        await this.getCategories(this.auth)
        this.company = JSON.parse(JSON.stringify(value))
        this.company.telefone = this.$utils.displayPhoneNumber(this.company.telefone)
        this.active = value
      })
    }
  },

  methods: {
    ...mapActions({
      editCompany: 'UPDATE_COMPANY',
      getCategories: 'GET_CATEGORIES'
    }),

    getAddress () {
      const cep = String(this.company.cep)
      if (cep.length === 8) {
        this.cepLoading = true
        this.$utils.getAddressByCEP(cep).then(response => {
          this.company.endereco = response.data.logradouro
          this.company.bairro = response.data.bairro
          this.company.cidade = response.data.localidade
          this.company.estado = response.data.uf
          this.company.numero = ''
          this.company.complemento = ''
          this.cepLoading = false
        }, error => { this.cepLoading = false })
      }
    },

    onCancel () {
      this.$refs.empresaEdition.reset()
      this.resetCompany()
      this.active = false
    },

    async onSubmit () {
      if (this.$refs.empresaEdition.validate()) {
        this.loading = true
        // Format fields
        this.company.telefone = this.$utils.formatPhoneNumber(this.company.telefone)
        this.company.status = !!this.company.status
        
        const response = await this.editCompany({ data: this.company, auth: this.auth})

        if (response.data) {
          this.resetCompany()
          this.loading = this.active = !response
          window.getApp.$emit('COMPANY_UPDATED', true)
        } else {
          this.loading = false
          this.$swal('Erro', this.$utils.formatErrors(response.errors), 'error')
        }
      }
    },

    resetCompany () {
      this.company = _.mapValues(this.company, () => null)
      this.company.data_de_cadastro = new Date().toISOString().substr(0, 10)
      this.company.status = false
    },

    validateTelephone (telephone, category = null) {
      if (!['', null, undefined].includes(category)) {
       const categoria = this.categories.find(i => i.id === category).name.toLowerCase()
       
       // Not a good idea hardcode category :(
       return !(categoria === 'supermercado' && ['', null, undefined].includes(telephone))
      }
      return true
    }
  }
}
</script>
