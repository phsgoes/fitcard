<template>
  <div id="page-category">
    <loading :value="loading" />
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Categorias">
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
                    placeholder="Procurar categoria por nome"
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
                      <td>{{ props.item.name }}</td>
                      <td>
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
              <category-create />
              <category-edit />
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
import CategoryCreate from '@/components/categories/CategoryCreate'
import CategoryEdit from '@/components/categories/CategoryEdit'

export default {
  name: 'Categories',

  components: {
    VWidget,
    Loading,
    CategoryCreate,
    CategoryEdit,
  },
  
  data () {
    return {
      loading: false,
      search: '',
      dataTable: {
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Nome', value: 'name' },
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
      items: 'GET_CATEGORIES'
    })
  },

  created () {
    this.loading = true
    if (this.getCategories(this.auth)) this.loading = false
  },

  mounted () {
    window.getApp.$on('CATEGORY_CREATED', value => this.$swal('Sucesso', 'Categoria criada com sucesso', 'success'))
    window.getApp.$on('CATEGORY_UPDATED', value => this.$swal('Sucesso', 'Categoria atualizada com sucesso', 'success'))
  },

  methods: {
    ...mapActions({
      getCategories: 'GET_CATEGORIES',
      deleteCategory: 'DELETE_CATEGORY'
    }),

    onCreate () {
      window.getApp.$emit('CREATE_CATEGORY', true)
    },

    onEdit (item) {
      window.getApp.$emit('EDIT_CATEGORY', item)
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
          const response = await this.deleteCategory({ id: id, auth: this.auth })
          console.log(response)
          if (response.data) {
            this.loading = false
            this.$swal('Sucesso', response.data, 'success')
          } else {
            this.loading = false
            this.$swal('Erro', 'Não foi possível apagar esta categoria', 'error')
          }
        }
      })
    }
  }
}
</script>
