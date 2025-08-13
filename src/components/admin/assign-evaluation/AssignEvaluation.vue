<template>
  <v-container>
    <v-card>
      <v-card-title>Assign Evaluation</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="SO ID" v-model="evaluation.soId"></v-text-field>
              <v-text-field label="SO Role" v-model="evaluation.soRole"></v-text-field>
              <v-text-field label="Candidate ID" v-model="evaluation.candidateId"></v-text-field>
              <v-text-field label="Candidate Stack" v-model="evaluation.candidateStack"></v-text-field>
              <v-text-field label="First Name" v-model="evaluation.firstName"></v-text-field>
              <v-text-field label="Last Name" v-model="evaluation.lastName"></v-text-field>
              <v-file-input
                label="Resume"
                accept=".pdf,.doc,.docx"
                v-model="resumeFile"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Evaluator ID"
                v-model="evaluation.evaluatorId"
                @blur="findEvaluator"
              >
                <template v-slot:append-inner>
                  <v-icon @click="openEvaluatorDialog">mdi-magnify</v-icon>
                </template>
              </v-text-field>
              <v-text-field
                label="Evaluator First Name"
                v-model="evaluatorFirstName"
                readonly
              ></v-text-field>
              <v-text-field
                label="Evaluator Last Name"
                v-model="evaluatorLastName"
                readonly
              ></v-text-field>
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-model="evaluation.evaluationDate"
                    label="Evaluation Date"
                    readonly
                    v-bind="props"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="evaluation.evaluationDate"
                  :min="today"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="submitForm">Assign</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="evaluatorDialog" class="custom-dialog" max-width="800px">
      <v-card>
        <v-card-title>Select Evaluator</v-card-title>
        <v-card-text>
          <v-data-table
            :headers="evaluatorHeaders"
            :items="evaluators"
            @click:row="(event, { item }) => selectEvaluator(item.raw)"
          ></v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getEvaluators, assignEvaluation, uploadResume } from '../../../services/admin-home.js';

const form = ref(null);
const evaluation = reactive({
  candidateId: '',
  candidateStack: '',
  firstName: '',
  lastName: '',
  soId: '',
  soRole: '',
  evaluationDate: null,
  status: 'PENDING',
  evaluatorId: '',
});
const evaluatorFirstName = ref('');
const evaluatorLastName = ref('');
const resumeFile = ref(null);
const dateMenu = ref(false);
const today = new Date().toISOString().substr(0, 10);
const evaluatorDialog = ref(false);
const evaluators = ref([]);
const evaluatorHeaders = [
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Role', value: 'role' },
  { title: 'Pending', value: 'pendingEvaluations' },
  { title: 'Completed', value: 'completedEvaluations' },
];

const findEvaluator = async () => {
  // API call to find evaluator by ID
};

const openEvaluatorDialog = async () => {
  try {
    const response = await getEvaluators();
    evaluators.value = response.data.map(evaluator => ({
      id: evaluator.associateId,
      name: `${evaluator.firstName} ${evaluator.lastName}`,
      role: evaluator.role,
      pendingEvaluations: evaluator.pendingEvaluations,
      completedEvaluations: evaluator.completedEvaluations,
      raw: evaluator
    }));
    console.log(evaluators.value);
    evaluatorDialog.value = true;
  } catch (error) {
    console.error("Error fetching evaluators:", error);
    // Optionally, show a user-friendly error message
  }
};

const selectEvaluator = (evaluator) => {
  evaluation.evaluatorId = evaluator.id;
  evaluatorFirstName.value = evaluator.firstName;
  evaluatorLastName.value = evaluator.lastName;
  evaluatorDialog.value = false;
};

const submitForm = async () => {
  const payload = {
    ...evaluation,
    candidateId: parseInt(evaluation.candidateId, 10),
    evaluatorId: parseInt(evaluation.evaluatorId, 10),
  };
  const assignedEvaluation = await assignEvaluation(payload);
  if (resumeFile.value) {
    await uploadResume(resumeFile.value, assignedEvaluation.id);
  }
};
</script>