<template>
  <v-dialog v-model="active" persistent max-width="470" @keydown.esc.stop="onCancel">
    <v-card>
      <v-card-title class="fc-card-title">
        <h2 class="subheading">Criar categoria</h2>
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex sm12>
            <v-form ref="categoryCreation" @submit.prevent @keyup.native.enter="onSubmit">
              <v-text-field
                autofocus
                prepend-icon="fas fa-list-ol"
                label="Nome da categoria"
                v-model.trim="category.name"
                maxlength="70"
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
        <v-btn color="info" :disabled="!isCompleted" @click="onSubmit" :loading="loading">
          <v-icon left>save</v-icon> Salvar
        </v-btn>
        <v-btn color="error" @click="onCancel" flat>
          <v-icon left>clear</v-icon> Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'category-create',

  data () {
    return {
      active: false,
      category: { name: null },
      loading: false,
      rules: {
        name: [
          v => !!v || 'Categoria é obrigatório',
          v => this.$utils.countLength(v, 2) || 'Categoria deve ter pelo menos 2 caracteres'
        ]
      }
    }
  },

  computed: {
    isCompleted () {
      return !!this.category.name
    }
  },

  watch: {
    active () {
      this.$refs.categoryCreation.reset()
    }
  },

  mounted () {
    if (!window.getApp._events.CREATE_CATEGORY) {
      window.getApp.$on('CREATE_CATEGORY', value => { this.active = value })
    }
  },

  methods: {
    ...mapActions({
      createCategory: 'CREATE_CATEGORY'
    }),

    onCancel () {
      this.$refs.categoryCreation.reset()
      this.active = false
    },

    async onSubmit () {
      if (this.$refs.categoryCreation.validate()) {
        this.loading = true
        const response = await this.createCategory({ data: this.category, auth: this.auth})
        if (response.data) {
          this.category.name = null
          this.loading = this.active = !response
          window.getApp.$emit('CATEGORY_CREATED', true)
        } else {
          this.loading = false
          this.$swal('Erro', this.$utils.formatErrors(response.errors), 'error')
        }
      }
    }
  }
}
</script>