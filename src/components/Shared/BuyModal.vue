<template>
  <v-dialog width="400px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="primary" dark v-on="on">
        Купить
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title>
              <h3 class="text--primary">Купить этот товар?</h3>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-card-text>
              <v-text-field
                name="name"
                label="Ваше имя"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                label="Ваш телефон"
                name="phone"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="blue-grey lighten-2"
                text
                @click="onCancel"
                :disabled="localLoading"
                >Закрыть</v-btn
              >
              <v-btn
                class="success ml-2"
                text
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
                >Купить!</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BuyModal',
  props: ['ad'],
  data() {
    return {
      modal: false,
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel() {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave() {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store
          .dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })

          .finally(() => {
            this.name = ''
            this.phone = ''
            this.localLoading = false
            this.modal = false
          })
      }
    }
  }
}
</script>
