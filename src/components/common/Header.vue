<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Talent Evaluation Platform</v-toolbar-title>
    <v-spacer></v-spacer>
    <span class="mr-5">{{ userFullName }}</span>
    <v-btn text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { useUserStore } from '../../stores/userStore';

export default {
  name: 'Header',
  computed: {
    userFullName() {
      const userStore = useUserStore();
      if (userStore.user) {
        return `${userStore.user.firstName} ${userStore.user.lastName}`;
      }
      return '';
    },
  },
  methods: {
    logout() {
      const userStore = useUserStore();
      userStore.setUser(null);
      this.$router.push('/');
    },
  },
};
</script>