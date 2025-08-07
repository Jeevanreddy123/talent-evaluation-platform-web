<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Talent Evaluation System</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <p class="text-h6 text-center py-2">Login</p>
            <v-alert
              v-if="errorMessage"
              type="error"
              density="compact"
              class="mb-4"
              closable
              @click:close="errorMessage = ''"
            >
              {{ errorMessage }}
            </v-alert>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Email"
                prepend-icon="mdi-account"
                type="email"
                variant="outlined"
                density="compact"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn to="/registration" variant="text" size="small">Need an account?</v-btn>
            <v-spacer />
            <v-btn
              @click="login"
              :loading="isLoading"
              color="primary"
              variant="elevated"
            >
              Login
              <v-icon icon="mdi-chevron-right" end />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';
import Cookies from 'js-cookie';
import axios from '../../services/axios/axios-instance';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();

// Define a type for our expected JWT payload for better type safety
interface CustomJwtPayload extends JwtPayload {
  sub: string;
  role: string | string[];
}

const login = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both email and password.';
    return;
  }
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.post('/login', {
      username: username.value,
      password: password.value,
    });

    const { token } = response.data;
    Cookies.set('accessToken', token);

    const decodedToken = jwtDecode<CustomJwtPayload>(token);

    const user = {
      username: decodedToken.sub,
      // Handle cases where role might be a single string or an array
      role: Array.isArray(decodedToken.role) ? decodedToken.role[0] : decodedToken.role,
    };

    userStore.setUser(user);

    if (user.role === 'Admin') {
      router.push('/admin-home').catch(err => console.error('Router push to AdminHome failed:', err));
    } else if (user.role === 'Evaluator') {
      router.push('/evaluator/home').catch(err => console.error('Router push to EvaluatorHome failed:', err));
    } else {
      console.warn(`Unhandled user role: ${user.role}. Redirecting to home.`);
      router.push({ name: 'Home' }).catch(err => console.error('Router push to Home failed:', err)); // Assuming a generic 'Home' route exists
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      errorMessage.value = 'Invalid credentials. Please try again.';
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again later.';
    }
    console.error('Login failed:', error); // Keep console log for debugging
  } finally {
    isLoading.value = false;
  }
};
</script>
