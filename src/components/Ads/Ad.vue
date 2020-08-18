<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p class="mt-3">{{ ad.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <add-edit-ad-modal :ad="ad" v-if="isOwner"></add-edit-ad-modal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else>
          <v-progress-linear indeterminate color="cyan"></v-progress-linear>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from './EditAdModal'
export default {
  name: 'Ad',
  props: ['id'],
  computed: {
    ad() {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading() {
      return this.$store.getters.loading
    },
    isOwner() {
      return this.ad.ownerId === this.$store.getters.user
    }
  },
  components: {
    addEditAdModal: EditAdModal
  }
}
</script>

<style scoped></style>
