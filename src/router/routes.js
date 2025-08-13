import LoginPage from '../components/Login/LoginPage.vue';
import RegistrationPage from '../components/Registration/RegistrationPage.vue';
import AdminHome from '../components/admin/AdminHome.vue';
import AssignEvaluation from '../components/admin/assign-evaluation/AssignEvaluation.vue';
import UploadQuestions from '../components/admin/upload-questions/UploadQuestions.vue';
import UserManagementSystem from '../components/admin/user-management-system/UserManagementSystem.vue';
import EvaluatorHome from '../components/Evaluator/evaluator-home/EvaluatorHome.vue';
import LookUpQuestion from '../components/Evaluator/lookup-question/LookUpQuestion.vue';
import EvaluateCandidate from '../components/Evaluator/evaluate-candidate/EvaluateCandidate.vue';
import Evaluate_user from '../components/Evaluator/evaluate-user/Evaluate_user.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationPage,
  },
  {
    path: '/admin-home',
    name: 'AdminHome',
    component: AdminHome,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/assign-evaluation',
    name: 'AssignEvaluation',
    component: AssignEvaluation,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/upload-questions',
    name: 'UploadQuestions',
    component: UploadQuestions,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/user-management',
    name: 'UserManagementSystem',
    component: UserManagementSystem,
    meta: { requiresAuth: true, role: 'Admin' },
  },
  {
    path: '/evaluator-home',
    name: 'EvaluatorHome',
    component: EvaluatorHome,
    meta: { requiresAuth: true, role: 'Evaluator' },
  },
  {
    path: '/lookup-question',
    name: 'LookUpQuestion',
    component: LookUpQuestion,
    meta: { requiresAuth: true, role: 'Evaluator' },
  },
  {
    // path: '/evaluate-candidate/:candidateId',
    path: '/evaluate-user',
    name: 'EvaluateUser',
    component: Evaluate_user,
    meta: { requiresAuth: true, role: 'Evaluator' },
  },
  // {
  //   path: '/evaluate-user',
  //   name: 'EvaluateUser',
  //   component: Evaluate_user,
  //   meta: { requiresAuth: false },
  // },
];

export default routes;
