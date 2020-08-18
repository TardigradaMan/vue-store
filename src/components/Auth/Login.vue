<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="24">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Введите данные для входа</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation
              ><v-text-field
                label="Введите email"
                name="email"
                prepend-icon="mdi-account-box"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Введите пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :counter="6"
                :rules="passwordRules"
                @keyup.enter="onSubmit"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit" :disabled="!valid"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'Данное поле обязательно для заполнения',
        v => /.+@.+\..+/.test(v) || 'E-mail должен быть действительным'
      ],
      passwordRules: [
        v => !!v || 'Данное поле обязательно для заполнения',
        v => (v && v.length >= 6) || 'Пароль должен быть не менее 6 символов'
      ]
    }
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('loginUser', user).then(() => {
            this.$router.push('/')
          })
        } catch (e) {}
      }
    }
  }
}
</script>
