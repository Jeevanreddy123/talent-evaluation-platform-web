<template>
  <v-container>
    <v-row justify="center" class="my-4">
      <v-col cols="12" class="text-center">
        <h1>Admin Home</h1>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-btn to="/assign-evaluation" color="primary" large>
          <v-icon left>mdi-account-plus</v-icon>
          Assign Evaluation
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn to="/upload-questions" color="primary" large>
          <v-icon left>mdi-upload</v-icon>
          Upload Questions
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn to="/user-management" color="primary" large>
          <v-icon left>mdi-account-group</v-icon>
          User Management
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>
