<template>
  <div id="page-company">
    <loading :value="loading" />
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Empresas">
            <div slot="widget-content" style="min-height: 400px;" fill-height>
              <v-card>
                <v-btn absolute dark fab top right small color="pink" @click="onCreate">
                  <v-icon>add</v-icon>
                </v-btn>
                <v-toolbar card color="white">
                  <v-text-field
                    flat
                    solo
                    prepend-icon="search"
                    placeholder="Procurar empresa por nome"
                    v-model="search"
                    hide-details
                    maxlength="50"
                  />
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                  <v-data-table
                    :headers="dataTable.headers"
                    :search="search"
                    :items="items"
                    :rows-per-page-items="[10, 25, 50,{ text: 'Todos', 'value': -1 }]"
                    class="elevation-1"
                    item-key="id"
                    :pagination.sync="dataTable.pagination"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.id }}</td>
                      <td>{{ props.item.razao_social }}</td>
                      <td>{{ props.item.status ? 'Ativo' : 'Inativo' }}</td>
                      <td>
                        <v-btn
                          depressed
                          outline
                          icon
                          fab
                          dark
                          color="deep-purple darken-3"
                          @click="onShow(props.item)"
                          small
                        >
                          <v-icon>far fa-eye</v-icon>
                        </v-btn>
                        <v-btn
                          depressed
                          outline
                          icon
                          fab
                          dark
                          color="info"
                          @click="onEdit(props.item)"
                          small
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn
                          depressed
                          outline
                          icon
                          fab
                          dark
                          color="pink"
                          @click="confirmDeletion(props.item.id)"
                          small
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </td>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              <company-create />
              <company-edit />
              <!-- Display info -->
              <v-dialog v-model="displayInfo" persistent width="650" v-if="empresa !== null" @keydown.esc="clearInfo">
                <v-card class="elevation-0">
                  <v-card-text class="grey-text">
                    <h4 class="breakword">{{ empresa.razao_social }}</h4>
                    <hr>
                    <div class="mt-4 responsive-sm">
                      <table class="table empresa-table">
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-edit</v-icon>
                          </td>
                          <td width="33%"><strong>Nome fantasia:</strong></td>
                          <td width="59%" class="breakword"><i>{{ empresa.nome_fantasia ? empresa.nome_fantasia : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-id-card</v-icon>
                          </td>
                          <td width="33%"><strong>CNPJ:</strong></td>
                          <td width="59%"><i>{{ $utils.formatCNPJ(empresa.cnpj) }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-at</v-icon>
                          </td>
                          <td width="33%"><strong>E-mail de contato:</strong></td>
                          <td width="59%"><i>{{ empresa.email ? empresa.email : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-mail-bulk</v-icon>
                          </td>
                          <td width="33%"><strong>CEP:</strong></td>
                          <td width="59%"><i>{{ empresa.cep ? empresa.cep : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-road</v-icon>
                          </td>
                          <td width="33%"><strong>Endereço:</strong></td>
                          <td width="59%"><i>{{ empresa.endereco ? empresa.endereco : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fas fa-sort-numeric-up</v-icon>
                          </td>
                          <td width="33%"><strong>Número:</strong></td>
                          <td width="59%"><i>{{ empresa.numero ? empresa.numero : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-street-view</v-icon>
                          </td>
                          <td width="33%"><strong>Bairro:</strong></td>
                          <td width="59%"><i>{{ empresa.bairro ? empresa.bairro : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">far fa-plus-square</v-icon>
                          </td>
                          <td width="33%"><strong>Complemento:</strong></td>
                          <td width="59%"><i>{{ empresa.complemento ? empresa.complemento : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-city</v-icon>
                          </td>
                          <td width="33%"><strong>Cidade:</strong></td>
                          <td width="59%"><i>{{ empresa.cidade ? empresa.cidade : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-atlas</v-icon>
                          </td>
                          <td width="33%"><strong>Estado:</strong></td>
                          <td width="59%"><i>{{ empresa.estado ? empresa.estado : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">phone</v-icon>
                          </td>
                          <td width="33%"><strong>Telefone:</strong></td>
                          <td width="59%"><i>{{ empresa.telefone ? $utils.displayPhoneNumber(empresa.telefone) : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-calendar</v-icon>
                          </td>
                          <td width="33%"><strong>Data de cadastro:</strong></td>
                          <td width="59%"><i>{{ empresa.data_de_cadastro ? $utils.formatDate(empresa.data_de_cadastro) : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-question</v-icon>
                          </td>
                          <td width="33%"><strong>Status:</strong></td>
                          <td width="59%"><i>{{ empresa.status ? 'Ativo' : 'Inativo' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-university</v-icon>
                          </td>
                          <td width="33%"><strong>Agência:</strong></td>
                          <td width="59%"><i>{{ empresa.agencia ? $utils.formatAgencia(empresa.agencia) : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-money-check-alt</v-icon>
                          </td>
                          <td width="33%"><strong>Conta:</strong></td>
                          <td width="59%"><i>{{ empresa.conta ? $utils.formatConta(empresa.conta) : 'Não disponível' }}</i></td>
                        </tr>
                        <tr>
                          <td width="8%">
                            <v-icon :size="16">fas fa-list</v-icon>
                          </td>
                          <td width="33%"><strong>Categoria:</strong></td>
                          <td width="59%"><i>{{ empresa.category_id ? categories.find(i => i.id === empresa.category_id)['name'] : 'Não disponível' }}</i></td>
                        </tr>
                      </table>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="error" @click="clearInfo">
                      <v-icon left>clear</v-icon> Fechar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import VWidget from '@/components/VWidget'
import Loading from '@/components/ui/Loading'
import CompanyCreate from '@/components/companies/CompanyCreate'
import CompanyEdit from '@/components/companies/CompanyEdit'
export default {
  name: 'Companies',

  components: {
    VWidget,
    Loading,
    CompanyCreate,
    CompanyEdit
  },

  data () {
    return {
      loading: false,
      search: '',
      empresa: null,
      displayInfo: false,
      dataTable: {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Razão social', value: 'razao_social' },
          { text: 'Status', value: 'status' },
          { text: 'Ações', value: '', sortable: false }
        ],
        pagination: {
          descending: true,
          sortBy: 'id',
          page: 1
        },
        items: []
      }
    }
  },

  computed: {
    ...mapGetters({
      items: 'GET_COMPANIES',
      categories: 'GET_CATEGORIES'
    })
  },

  async created () {
    await this.getCategories(this.auth)
    this.loading = true
    if (this.getCompanies(this.auth)) this.loading = false
  },

  mounted () {
    window.getApp.$on('COMPANY_CREATED', value => this.$swal('Sucesso', 'Empresa criada com sucesso', 'success'))
    window.getApp.$on('COMPANY_UPDATED', value => this.$swal('Sucesso', 'Empresa atualizada com sucesso', 'success'))
  },

  methods: {
    ...mapActions({
      getCompanies: 'GET_COMPANIES',
      deleteCompany: 'DELETE_COMPANY',
      getCategories: 'GET_CATEGORIES'
    }),

    clearInfo () {
      this.empresa = null
      this.displayInfo = false
    },

    onShow (item) {
      this.empresa = item
      this.displayInfo = true
    },

    onCreate () {
      window.getApp.$emit('CREATE_COMPANY', true)
    },

    onEdit (item) {
      window.getApp.$emit('EDIT_COMPANY', item)
    },

    confirmDeletion (id) {
      this.$swal({
        title: 'Tem certeza?',
        text: 'Esta ação não poderá ser desfeita',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then(async (result) => {
        if (result.value) {
          this.loading = true
          const response = await this.deleteCompany({ id: id, auth: this.auth })
          if (response.data) {
            this.loading = false
            this.$swal('Sucesso', response.data, 'success')
          } else {
            this.loading = false
            this.$swal('Erro', 'Não foi possível apagar esta empresa', 'error')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.empresa-table {
  width: 100%;
  margin: 0 auto;
  thead > tr th {
    border-bottom: 1px solid #ddd;
    padding-bottom: .25rem;
    margin-bottom: .5rem;
  }
}
.breakword {
  word-break: break-all;
}
</style>