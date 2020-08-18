<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset-sm="3">
        <v-form ref="form" v-model="valid" lazy-validation
          ><v-text-field
            label="Добавить заголовок"
            name="title"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Данное поле обязательно для заполнения']"
          ></v-text-field>
          <v-textarea
            label="Добавить описание"
            name="description"
            type="text"
            multi-line
            v-model="description"
            :rules="[v => !!v || 'Данное поле обязательно для заполнения']"
            :auto-grow="true"
            :clearable="true"
          ></v-textarea>
        </v-form>
        <v-row>
          <v-col class="mx-auto col-auto">
            <v-btn
              class="ma-2 white--text blue darken-3"
              @click="triggerUpload"
            >
              Загрузить изображение
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
              @change="onFileChange"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto col-auto">
            <v-img
              height="150"
              class="grey darken-4"
              v-if="imageSrc"
              :src="imageSrc"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-switch
              v-model="promo"
              label="Добавить на главную страницу"
              color="purple darken-4"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mx-auto col-auto">
            <v-btn
              class="success"
              @click="createAd"
              :disabled="!valid || !image || loading"
              :loading="loading"
              >Добавить объявление</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NewAdd',
  data() {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },

  methods: {
    async createAd() {
      if (this.$refs.form.validate() && this.image) {
        // logic
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        try {
          await this.$store.dispatch('createAd', ad)
          await this.$router.push('/list')
        } catch (e) {}
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>
