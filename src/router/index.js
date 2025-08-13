import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes'
import { useUserStore } from '../stores/userStore';
import Cookies from 'js-cookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const { user, loadUser } = useUserStore();
//   const accessToken = Cookies.get('accessToken');

//   if (to.meta.requiresAuth) {
//     if (accessToken) {
//       if (!user) {
//         await loadUser();
//       }

//       if (to.meta.role && to.meta.role !== user.role) {
//         // Redirect to user's home page if role does not match
//         if (user.role === 'Admin') {
//           next({ name: 'AdminHome' });
//         } else if (user.role === 'Evaluator') {
//           next({ name: 'EvaluatorHome' });
//         } else {
//           next({ name: 'Login' });
//         }
//       } else {
//         next();
//       }
//     } else {
//       next({ name: 'Login' });
//     }
//   } else {
//     next();
//   }
// });

export default router;
