<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">Register</v-card-title>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="register">
              <v-text-field
                v-model="formData.associateId"
                label="Associate ID"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.firstName"
                label="First Name"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.lastName"
                label="Last Name"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.techStack"
                label="Tech Stack"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.projectRole"
                label="Project Role"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.username"
                label="User Name (Email)"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.password"
                label="Password"
                type="password"
                :rules="[rules.required, rules.password]"
                required
              ></v-text-field>
              <v-text-field
                v-model="formData.confirmPassword"
                label="Confirm Password"
                type="password"
                :rules="[rules.required, rules.confirmPassword]"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary" block :disabled="!valid">Register</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../../services/register-user-service.js';

console.log("......")

const router = useRouter();
const valid = ref(false);
const formData = reactive({
  associateId: '',
  firstName: '',
  lastName: '',
  techStack: '',
  projectRole: '',
  username: '',
  password: '',
  confirmPassword: '',
});

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  password: (value) => value.length >= 8 || 'Min 8 characters',
  confirmPassword: (value) =>
    value === formData.password || 'Passwords do not match',
};

const register = async () => {
  if (valid.value) {
    try {
      await registerUser(formData);
      // Automatically log in the user after registration
      // You might need to adjust this part based on your API response
      router.push({ name: 'Login' });
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  }
};
</script>
