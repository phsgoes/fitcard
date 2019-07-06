<template>
  <v-dialog v-model="active" persistent max-width="470" @keydown.esc.stop="onCancel">
    <v-card>
      <v-card-title class="fc-card-title">
        <h2 class="subheading">Editar categoria</h2>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex sm12 v-if="category">
            <v-form ref="categoryEdition" @submit.prevent>
              <v-text-field
                prepend-icon="fas fa-list-ol"
                label="Nome da categoria"
                v-model.trim="category.name"
                maxlength="70"
                autofocus
                :rules="rules.name"
                clearable
                :clear-icon="'fas fa-backspace fa-sm'"
              />
            </v-form>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="pb-3">
        <v-spacer></v-spacer>
        <v-btn color="info" :disabled="!isCompleted" @click="onUpdate(category.id)" :loading="loading">
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
import _ from 'lodash'
import { mapActions } from 'vuex';
export default {
  name: 'category-edit',

  data () {
    return {
      active: false,
      category: { id: null, name: null },
      loading: false,
      rules: {
        name: [
          v => !!v || 'O nome da categoria é obrigatório',
          v => this.$utils.countLength(v, 2) || 'O nome da categoria deve ter pelo menos 2 caracteres'
        ]
      }
    }
  },

  computed: {
    isCompleted () {
      return !!this.category.name
    }
  },

  mounted () {
    if (!window.getApp._events.EDIT_CATEGORY) {
      window.getApp.$on('EDIT_CATEGORY', value => {
        this.category = JSON.parse(JSON.stringify(value))
        this.active = true
      })
    }
  },

  methods: {
    ...mapActions({
      updateCategory: 'UPDATE_CATEGORY'
    }),

    onCancel () {
      this.$refs.categoryEdition.reset()
      this.active = false
    },

    async onUpdate (id) {
      if (this.$refs.categoryEdition.validate()) {
        this.loading = true
        const response = await this.updateCategory({ data: this.category, auth: this.auth })
        if (response.data) {
          this.category = _.mapValues(this.category, () => null)
          this.loading = this.active = !response
          window.getApp.$emit('CATEGORY_UPDATED', true)
        } else {
          this.loading = false
          this.$swal('Erro', this.$utils.formatErrors(response.errors), 'error')
        }
      }
    }
  }
}
</script>