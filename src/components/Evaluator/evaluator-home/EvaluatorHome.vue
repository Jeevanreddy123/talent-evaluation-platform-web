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
                  <th>Status</th>
          </tr>
        </thead>
        <tbody>
                <tr v-for="evaluation in paginatedCompletedEvaluations" :key="evaluation.soId">
                  <td>{{ evaluation.soId }}</td>
                  <td>{{ evaluation.associateId }}</td>
                  <td>{{ evaluation.associateName }}</td>
                  <td>{{ evaluation.role }}</td>
                  <td>{{ evaluation.techStack }}</td>
                  <td>{{ evaluation.evaluationDate }}</td>
                  <td>
                    <v-chip :color="evaluation.status.toLowerCase() === 'selected' ? 'success' : 'error'" size="small">
                      {{ evaluation.status }}
                    </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
          </v-card-text>

    </v-card>

        <v-row class="mt-4">
          <v-col class="d-flex justify-center">
            <v-pagination 
              v-if="totalPages > 1" 
              v-model="currentPage" 
              :length="totalPages"
              :total-visible="2" 
              rounded="circle">
            </v-pagination>
          </v-col>
        </v-row>
  </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getData, getResume } from '@/services/user-home-page-service'

const userName = ref('User Name')
const searchQuery = ref('')
const itemsPerPage = 3

const pendingEvaluations = ref([])
const completedEvaluations = ref([])

const pendingCurrentPage = ref(1)
const completedCurrentPage = ref(1)
const currentPage = ref(1)

const getEvaluatorData = async () => {
  try {
    const response = await getData()
    pendingEvaluations.value = response.data.pendingEvaluations
    completedEvaluations.value = response.data.completedEvaluations
  } catch (error) {
    console.error('Error fetching data:', error)
    pendingEvaluations.value = [
      {
        soId: '1233434',
        associateId: '29232323',
        associateName: 'John mayor',
        role: 'Sr. Developer',
        techStack: 'Java/vue3',
        evaluationDate: '10-Nov-2023'
      },
      {
        soId: '1233435',
        associateId: '29232324',
        associateName: 'Jane Smith',
        role: 'Sr. Developer',
        techStack: 'Java/vue3',
        evaluationDate: '10-Nov-2023'
      },
      {
        soId: '1233436',
        associateId: '29232325',
        associateName: 'Alice Johnson',
        role: 'Jr. Developer',
        techStack: 'Python/React',
        evaluationDate: '11-Nov-2023'
      },
      {
        soId: '1233437',
        associateId: '29232326',
        associateName: 'Bob Williams',
        role: 'Sr. Developer',
        techStack: 'Node.js/Vue3',
        evaluationDate: '11-Nov-2023'
      },
      {
        soId: '1233438',
        associateId: '29232327',
        associateName: 'Charlie Brown',
        role: 'DevOps Engineer',
        techStack: 'AWS/Docker',
        evaluationDate: '12-Nov-2023'
      },
      
    ]
    completedEvaluations.value = [
      {
        soId: '1233434',
        associateId: '29232323',
        associateName: 'John mayor',
        role: 'Sr. Developer',
        techStack: 'Java/vue3',
        evaluationDate: '10-Nov-2023',
        status: 'Selected'
      },
      {
        soId: '1233435',
        associateId: '29232324',
        associateName: 'Jane Smith',
        role: 'Sr. Developer',
        techStack: 'Java/vue3',
        evaluationDate: '10-Nov-2023',
        status: 'Rejected'
      },
      
    ]
  }
}

onMounted(() => {
  getEvaluatorData()
})

const filteredPendingEvaluations = computed(() => {
  if (!searchQuery.value) return pendingEvaluations.value
  const query = searchQuery.value.toLowerCase()
  return pendingEvaluations.value.filter(item =>
    item.soId.toLowerCase().includes(query) ||
    item.associateId.toLowerCase().includes(query) ||
    item.associateName.toLowerCase().includes(query) ||
    item.role.toLowerCase().includes(query) ||
    item.techStack.toLowerCase().includes(query)
  )
})

const filteredCompletedEvaluations = computed(() => {
  if (!searchQuery.value) return completedEvaluations.value
  const query = searchQuery.value.toLowerCase()
  return completedEvaluations.value.filter(item =>
    item.soId.toLowerCase().includes(query) ||
    item.associateId.toLowerCase().includes(query) ||
    item.associateName.toLowerCase().includes(query) ||
    item.role.toLowerCase().includes(query) ||
    item.techStack.toLowerCase().includes(query)
  )
})


const paginatedPendingEvaluations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPendingEvaluations.value.slice(start, end)
})


const paginatedCompletedEvaluations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCompletedEvaluations.value.slice(start, end)
})

const handleSignout = () => {
  // Implement signout logic
}

watch(searchQuery, () => {
  pendingCurrentPage.value = 1
  completedCurrentPage.value = 1
  currentPage.value = 1
})
const viewResume = async (evaluation) => {
  try {
    const response = await getResume(evaluation.associateId)
    const file = new Blob([response.data], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(file)
    window.open(fileURL)
  } catch (error) {
    console.error('Error fetching resume:', error)
  }
}

const totalPages = computed(() => {
  const totalItems = filteredPendingEvaluations.value.length + filteredCompletedEvaluations.value.length
  return Math.ceil(totalItems / itemsPerPage)
})
</script>
