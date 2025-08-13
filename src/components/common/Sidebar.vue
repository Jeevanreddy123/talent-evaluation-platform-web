<template>
  <v-navigation-drawer permanent>
    <v-list dense>
      <div v-if="userRole === 'Admin'">
        <v-list-item link to="/admin-home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/upload-questions">
          <v-list-item-action>
            <v-icon>mdi-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Upload Questions</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/assign-evaluation">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Assign Evaluations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/user-management">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>User Management</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-if="userRole === 'Evaluator'">
        <v-list-item link to="/evaluator-home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/evaluate-candidate">
          <v-list-item-action>
            <v-icon>mdi-account-question</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Evaluate Candidate</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/lookup-question">
          <v-list-item-action>
            <v-icon>mdi-book-search</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Question Lookup</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userRole = computed(() => userStore.getUser?.role);
</script>