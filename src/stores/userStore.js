import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const pendingEvaluations = ref([]);
  const completedEvaluations = ref([]);

  const getUser = computed(() => user.value);
  const getPendingEvaluations = computed(() => pendingEvaluations.value);
  const getCompletedEvaluations = computed(() => completedEvaluations.value);

  function setUser(newUser) {
    user.value = newUser;
  }

  async function loadUser() {
    // In a real application, you would fetch the user from an API
    // For now, we'll simulate it with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a user object
        const mockUser = {
          associateId: '12345',
          firstName: 'John',
          lastName: 'Doe',
          role: 'Admin', // or 'Evaluator'
        };
        setUser(mockUser);
        resolve();
      }, 500);
    });
  }

  function setPendingEvaluations(evaluations) {
    pendingEvaluations.value = evaluations;
  }

  function setCompletedEvaluations(evaluations) {
    completedEvaluations.value = evaluations;
  }

  return {
    user,
    pendingEvaluations,
    completedEvaluations,
    getUser,
    getPendingEvaluations,
    getCompletedEvaluations,
    setUser,
    loadUser,
    setPendingEvaluations,
    setCompletedEvaluations,
  };
});
