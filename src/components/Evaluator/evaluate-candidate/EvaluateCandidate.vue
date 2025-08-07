<template>
  <v-container>
    <v-card>
      <v-card-title>Evaluate Candidate: {{ $route.params.candidateId }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-textarea label="Evaluation Notes"></v-textarea>
          <v-select label="Overall Rating" :items="['Poor', 'Fair', 'Good', 'Excellent']"></v-select>
          <v-btn color="primary">Submit Evaluation</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// This component will handle the submission of the evaluation.
</script>
