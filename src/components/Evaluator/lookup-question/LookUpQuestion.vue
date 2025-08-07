<template>
  <v-container>
    <v-card>
      <v-card-title>Look Up Questions</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5">
            <v-select
              label="Technology/Framework"
              v-model="selectedTechnology"
              :items="technologies"
            ></v-select>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              label="Difficulty Level"
              v-model="selectedDifficulty"
              :items="['Simple', 'Intermediate', 'Difficult']"
            ></v-select>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn @click="fetchQuestions">Submit</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4" v-if="questions.length">
      <v-card-text>
        <div>
          <strong>Question:</strong>
          <p>{{ currentQuestion.question }}</p>
        </div>
        <div>
          <strong>Answer:</strong>
          <p>{{ currentQuestion.answer }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="prevQuestion" :disabled="currentIndex === 0">Previous</v-btn>
        <v-btn @click="nextQuestion" :disabled="currentIndex === questions.length - 1">Next</v-btn>
        <v-spacer></v-spacer>
        <a @click="downloadQuestions">Download Question File</a>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { lookUpQuestions } from "../../../services/user-home-page-service.js";
import * as XLSX from 'xlsx';

const selectedTechnology = ref(null);
const technologies = ref([]);
const selectedDifficulty = ref(null);
const questions = ref([]);
const currentIndex = ref(0);

const currentQuestion = computed(() => questions.value[currentIndex.value]);

const fetchQuestions = async () => {
  questions.value = await lookUpQuestions(
    selectedDifficulty.value,
    selectedTechnology.value
  );
  currentIndex.value = 0;
};

const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  }
};

const downloadQuestions = () => {
  const worksheet = XLSX.utils.json_to_sheet(questions.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');
  XLSX.writeFile(workbook, 'questions.xlsx');
};
</script>
