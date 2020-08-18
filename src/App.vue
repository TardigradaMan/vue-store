<template>
  <v-app id="inspire">
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isUserLoggedIn" @click="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Выход'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app
      ><v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer"
          >Моё приложение (Сайт объявлений)</router-link
        >
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="link of links" :key="link.title" :to="link.url" text>
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn @click="onLogout" text v-if="isUserLoggedIn">
          <v-icon left>mdi-exit-to-app</v-icon>
          Выход
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
        :value="true"
        color="error"
        :timeout="5000"
        @input="closeError"
      >
        {{ error }}
        <v-btn dark text @click="closeError">
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import messages from './utils/messages'

export default {
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    error() {
      return messages[this.$store.getters.error]
    },
    isUserLoggedIn() {
      return this.$store.getters.user
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Заказы', icon: 'mdi-bookmark-outline', url: '/orders' },
          {
            title: 'Новое объявление',
            icon: 'mdi-book-plus-multiple',
            url: '/new'
          },
          {
            title: 'Мои объявления',
            icon: 'mdi-format-list-bulleted-square',
            url: '/list'
          }
        ]
      }
      return [
        { title: 'Войти', icon: 'mdi-lock', url: '/login' },
        { title: 'Регистрация', icon: 'mdi-face', url: '/registration' }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('autoLoginUser')
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },
    onLogout() {
      this.$store.dispatch('logoutUser')
      if (this.$route.name !== 'home') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
