<script setup>
import Header from './components/common/Header.vue';
import Sidebar from './components/common/Sidebar.vue';
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/' || route.path === '/registration');
</script>

<template>
  <v-app>
    <Header v-if="!isLoginPage" />
    <Sidebar v-if="!isLoginPage" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
