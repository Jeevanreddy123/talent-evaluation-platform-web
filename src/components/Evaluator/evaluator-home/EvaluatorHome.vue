<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search by candidate ID or name"
      single-line
      hide-details
    ></v-text-field>

    <v-card class="mt-4">
      <v-card-title>Pending Evaluations</v-card-title>
      <v-table>
        <thead>
          <tr>
            <th>SO ID</th>
            <th>Associate ID</th>
            <th>Associate Name</th>
            <th>Role</th>
            <th>Tech Stack</th>
            <th>Evaluation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredPending" :key="item.associateId">
            <td>
              {{ item.soId }}
              <a @click="viewResume(item.associateId)">View Resume</a>
            </td>
            <td>
              {{ item.associateId }}
              <router-link :to="`/evaluate-candidate/${item.associateId}`">Quick Evaluation</router-link>
            </td>
            <td>
              {{ item.associateName }}
              <router-link to="/lookup-question">LookUp Questions</router-link>
            </td>
            <td>{{ item.role }}</td>
            <td>{{ item.techStack }}</td>
            <td>{{ item.evaluationDate }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>Completed Evaluations</v-card-title>
      <v-data-table
        :headers="completedHeaders"
        :items="filteredCompleted"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../../../stores/userStore';
import { getData, getResume } from '../../../services/user-home-page-service';

const search = ref('');
const userStore = useUserStore();

const filteredPending = computed(() => {
  // Filtering logic for pending evaluations
  return userStore.pendingEvaluations;
});

const filteredCompleted = computed(() => {
  // Filtering logic for completed evaluations
  return userStore.completedEvaluations;
});

const completedHeaders = [
  // Headers for completed evaluations table
];

const viewResume = async (candidateId: string) => {
  try {
    const response = await getResume(candidateId);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'resume.pdf'; // default file name
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (fileNameMatch && fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading resume:', error);
  }
};

onMounted(async () => {
  const { pending, completed } = await getData();
  userStore.setPendingEvaluations(pending);
  userStore.setCompletedEvaluations(completed);
});
</script>
