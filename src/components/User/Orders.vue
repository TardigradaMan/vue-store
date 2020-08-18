<template>
  <v-container>
    <v-row>
      <v-col class="text-center" v-if="loading">
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
      </v-col>
      <v-col sm="6" offset-sm="3" v-else-if="!loading && orders.length !== 0">
        <h1 class="text--primary mb-3">Заказы</h1>
        <v-list subheader two-line flat
          ><v-list-item v-for="order of orders" :key="order.id">
            <v-list-item-action>
              <v-checkbox
                :input-value="order.done"
                @change="markDone(order)"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="primary" :to="'/ad/' + order.adId">Открыть</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col class="text-center" v-else>
        <h1 class="text--secondary">У вас нет заказов</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Orders',
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    orders() {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch('markOrderDone', order.id)
        .then(() => {
          order.done = true
        })
        .catch(() => {})
    }
  },
  created() {
    this.$store.dispatch('fetchOrder')
  }
  // mounted () {
  //
  // }
}
</script>

<style scoped></style>
