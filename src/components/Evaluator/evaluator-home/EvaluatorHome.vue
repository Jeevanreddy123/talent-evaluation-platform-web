<template>
  <v-app>
    <v-app-bar color="primary" elevation="1">
      <v-container class="d-flex align-center px-0">
        <div class="d-flex align-center flex-grow-1">
          <v-app-bar-title class="text-h5 font-weight-bold">
            Talent Evaluation System
          </v-app-bar-title>
          <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <span class="text-left">{{ userName }}</span>
            <v-divider vertical class="mx-3"></v-divider>
            <v-btn variant="text" @click="handleSignout">Signout</v-btn>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer permanent width="200" color="white">
      <v-list nav class="py-4 px-2">
        <v-list-item to="/evaluator-home" :active="$route.path === '/evaluator-home'" :class="{
          'nav-item': true
        }" class="mb-2 rounded" min-height="40" active-color="white" :ripple="false">
          <template v-slot:prepend>
            <v-icon size="small" :color="$route.path === '/evaluator-home' ? 'white' : 'default'">mdi-home</v-icon>
          </template>
          <v-list-item-title :class="{ 'text-black': $route.path === '/evaluator-home' }"
            class="text-body-2">Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/evaluate-candidate" :active="$route.path === '/evaluate-candidate'" :class="{
          'nav-item': true
        }" class="rounded" min-height="40" active-color="white" :ripple="false">
          <template v-slot:prepend>
            <v-icon size="small"
              :color="$route.path === '/evaluate-candidate' ? 'white' : 'default'">mdi-account-check</v-icon>
          </template>
          <v-list-item-title :class="{ 'text-white': $route.path === '/evaluate-candidate' }"
            class="text-body-2">Evaluate Candidate</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="px-1">
        <v-breadcrumbs density="compact" :items="[
          { title: 'My Account', disabled: false },
          { title: 'Home', disabled: true }
        ]"></v-breadcrumbs>

        <v-card class="mb-6" elevation="2">
        <v-card-title class="d-flex align-center py-2">
            <span class="text-subtitle-1">Pending Evaluations</span>
            <v-spacer></v-spacer>
            <v-text-field v-model="searchQuery" density="compact" variant="outlined" label="Search"
              append-inner-icon="mdi-magnify" hide-details style="max-width: 300px;"></v-text-field>
          </v-card-title>

          <v-card-text>
            <v-table fixed-header height="auto" class="custom-table">
              <thead>
                <tr class="text-subtitle-2">
                  <th class="pa-3" style="min-width: 160px">SO ID</th>
                  <th class="pa-3" style="min-width: 160px">Associate ID</th>
                  <th class="pa-3" style="min-width: 160px">Associate Name</th>
                  <th class="pa-3" style="min-width: 160px">Role</th>
                  <th class="pa-3" style="min-width: 160px">Tech Stack</th>
                  <th class="pa-3" style="min-width: 160px">Evaluation Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="evaluation in paginatedPendingEvaluations" :key="evaluation.soId" class="text-body-2">
                  <td class="pa-3">
                    <div class="d-flex flex-column gap-2">
                      <span class="font-weight-medium">{{ evaluation.soId }}</span>
                      <a href="#" class="text-caption text-primary" @click.prevent="viewResume(evaluation.associateId)">View Resume</a>
                    </div>
                  </td>
                  <td class="pa-3">
                    <div class="d-flex flex-column gap-2">
                      <span class="font-weight-medium">{{ evaluation.associateId }}</span>
                      <a href="#" class="text-caption text-primary">Quick Evaluation</a>
                    </div>
                  </td>
                  <td class="pa-3">
                    <div class="d-flex flex-column gap-2">
                      <span class="font-weight-medium">{{ evaluation.associateName }}</span>
                      <a href="#" class="text-caption text-primary">Lookup Questions</a>
                    </div>
                  </td>
                  <td class="pa-3">{{ evaluation.role }}</td>
                  <td class="pa-3">{{ evaluation.techStack }}</td>
                  <td class="pa-3">{{ evaluation.evaluationDate }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>

        </v-card>

        <v-card elevation="2" class="mb-4">
          <v-card-title class="d-flex align-center py-2">
            <span class="text-subtitle-1">Completed Evaluations</span>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text>
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
