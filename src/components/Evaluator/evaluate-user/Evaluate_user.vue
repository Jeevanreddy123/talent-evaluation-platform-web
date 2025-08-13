<template>
  <div class="evaluation-form-only">
    <!-- Breadcrumb Header -->
    <div class="breadcrumb-header">
      <div class="breadcrumb">You are here : / My Account / Home</div>
    </div>
    <!-- Candidate Details -->
    <section class="candidate-details">
      <h3>Candidate Details</h3>
      <div class="details-row">
        <div><strong>Associate ID</strong><br />23232323</div>
        <div><strong>Associate Name</strong><br />John mayor</div>
        <div><strong>Role</strong><br />Sr. Developer</div>
        <div><strong>Tech Stack</strong><br />Java/vue3</div>
        <div><strong>Evaluation Date</strong><br />10-Nov-2023</div>
      </div>
    </section>
    <!-- Evaluation Details -->
    <section class="evaluation-details">
      <h3>Evaluation Details</h3>
      <div class="skills-section">
        <div class="skills-column">
          <div class="skills-title">Technical Skills</div>
          <div v-for="(item, idx) in technicalSkills" :key="'tech-' + idx" class="skill-row">
            <input type="checkbox" v-model="item.checked" />
            <span>Products & Frameworks</span>
            <input type="range" min="1" max="5" v-model="item.value" />
            <span class="slider-value">{{ item.value }}</span>
          </div>
        </div>
        <div class="skills-column">
          <div class="skills-title">Soft Skill</div>
          <div v-for="(item, idx) in softSkills" :key="'soft-' + idx" class="skill-row">
            <input type="checkbox" v-model="item.checked" />
            <span>Products & Frameworks</span>
            <input type="range" min="1" max="5" v-model="item.value" />
            <span class="slider-value">{{ item.value }}</span>
          </div>
        </div>
      </div>
      <div class="feedback-section">
        <label>Detailed Qualitative Feedback</label>
        <textarea v-model="feedback" rows="3" placeholder="Enter text here"></textarea>
      </div>
      <div class="radio-section">
        <label>Result:</label>
        <label class="radio-label">
          <input type="radio" value="Selected" v-model="result" /> Selected
        </label>
        <label class="radio-label">
          <input type="radio" value="Rejected" v-model="result" /> Rejected
        </label>
      </div>
      <div class="button-row">
        <button class="submit-btn" @click="submitEvaluation">Submit</button>
        <button class="cancel-btn" @click="cancelEvaluation">Cancel</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { evaluateCandidate } from '@/services/user-management-system-service.js';

const technicalSkills = ref(Array(5).fill().map(() => ({ checked: false, value: 3 })));
const softSkills = ref(Array(5).fill().map(() => ({ checked: false, value: 3 })));
const feedback = ref('');
const result = ref('Selected');

async function submitEvaluation() {
  const payload = {
    technicalSkills: technicalSkills.value.map(({ checked, value }) => ({ checked, value })),
    softSkills: softSkills.value.map(({ checked, value }) => ({ checked, value })),
    feedback: feedback.value,
    result: result.value,
    // Add candidateId or other required fields if needed
    associateId: '23232323',
    associateName: 'John mayor',
    role: 'Sr. Developer',
    techStack: 'Java/vue3',
    evaluationDate: '10-Nov-2023',
  };
  try {
    const response = await evaluateCandidate(payload);
    alert('Evaluation submitted successfully!');
    // Optionally reset form or navigate
  } catch (error) {
    alert('Failed to submit evaluation.');
  }
}

function cancelEvaluation() {
  feedback.value = '';
  technicalSkills.value = Array(5).fill().map(() => ({ checked: false, value: 3 }));
  softSkills.value = Array(5).fill().map(() => ({ checked: false, value: 3 }));
  result.value = 'Selected';
}
</script>

<style scoped>
.evaluation-form-only {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px 0;
}
.breadcrumb-header {
  background: #eaf4fb;
  padding: 12px 0 12px 18px;
  border-bottom: 1px solid #cce0f5;
  margin-bottom: 18px;
  border-radius: 4px 4px 0 0;
}
.breadcrumb {
  color: #0074c2;
  font-size: 0.95rem;
  font-weight: 500;
}
.candidate-details {
  margin: 18px 0 24px 0;
}
.candidate-details h3 {
  color: #0074c2;
  margin-bottom: 10px;
}
.details-row {
  display: flex;
  gap: 40px;
  font-size: 1rem;
  background: #f5faff;
  padding: 12px 18px;
  border-radius: 6px;
  box-shadow: 0 1px 2px #e0e0e0;
}
.evaluation-details h3 {
  color: #0074c2;
  margin-bottom: 10px;
}
.skills-section {
  display: flex;
  gap: 40px;
  margin-bottom: 18px;
}
.skills-column {
  flex: 1;
}
.skills-title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
  text-align: center;
}
.skill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  background: #fff;
  padding: 4px 0;
}
.skill-row input[type="checkbox"] {
  accent-color: #0074c2;
}
.skill-row input[type="range"] {
  flex: 1;
  margin: 0 8px;
}
.slider-value {
  width: 32px;
  text-align: center;
  font-weight: 500;
  background: #f0f3f7;
  border-radius: 6px;
  color: #555;
  font-size: 1.1rem;
  padding: 2px 0;
}
.feedback-section {
  margin: 18px 0 10px 0;
}
.feedback-section textarea {
  width: 100%;
  border-radius: 6px;
  border: 1px solid #cce0f5;
  padding: 8px;
  font-size: 1rem;
  resize: vertical;
}
.radio-section {
  margin: 10px 0 18px 0;
  display: flex;
  align-items: center;
  gap: 24px;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid #cce0f5;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
}
.radio-label input[type="radio"] {
  accent-color: #0074c2;
}
.button-row {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 12px;
}
.submit-btn, .cancel-btn {
  padding: 10px 60px;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 8px;
}
.submit-btn {
  background: #0074c2;
  color: #fff;
}
.cancel-btn {
  background: #fff;
  color: #0074c2;
  border: 2px solid #0074c2;
}
</style>
