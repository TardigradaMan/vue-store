<template>
  <v-container>
    <v-row v-if="!loading && myAds.length !== 0">
      <v-col sm="8" offset-sm="2">
        <h1 class="text--secondary mb-3">Список объявлений</h1>

        <v-card class="elevation-20 mb-4" v-for="ad of myAds" :key="ad.id"
          ><v-row>
            <v-col cols="5" class="pt-0 pb-0">
              <v-img :src="ad.imageSrc" height="200"></v-img>
            </v-col>
            <v-col cols="7">
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="red darken-3" @click="deleteAd(ad.id)"
                  >Удалить</v-btn
                >
                <v-btn class="info" :to="'/ad/' + ad.id">Открыть</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading && myAds.length === 0">
      <v-col class="text-center">
        <h1 class="text-primary">У вас нет объявлений</h1>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="text-center">
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddList',
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    myAds() {
      return this.$store.getters.myAds
    }
  },
  methods: {
    async deleteAd(id) {
      await this.$store.dispatch('deleteAd', id)
    }
  }
}
</script>
