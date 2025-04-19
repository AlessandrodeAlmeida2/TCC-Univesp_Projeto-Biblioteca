import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//@ts-ignore
import LoginView from '@/views/LoginView.vue'
//@ts-ignore
import { supabase } from '../supabase';
import FooterView from '@/components/FooterView.vue';

let localUser;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',
      //meta: { requiresAuth: true }
    },
    {
      path: '/aluno',
      name: 'aluno',
      component: () => import('@/components/AlunoView.vue'),
      //meta: { requiresAuth: true }
    },
    {
      path: '/cadastro-aluno',
      name: 'cadastro-aluno',
      component: () => import('../components/CadastroAlunoView.vue')
    },
    {
      path: '/editar-alunos',
      name: 'editar-alunos',
      component: () => import('../components/EditarAlunosView.vue'),
    },
    {
      path: '/editar-aluno/:ra',
      name: 'editar-aluno',
      component: ()=> import('@/components/EditarAlunoView.vue')
    },
    {
      path: '/consulta-aluno',
      name: 'consulta-aluno',
      component: () => import('../components/ConsultaAlunoView.vue'),
    },
    {
      path: '/cadastro-livro',
      name: 'cadastro-livro',
      component: () => import('../components/CadastroLivroView.vue')
    },
    {
      path: '/editar-livro',
      name: 'editar-livro',
      component: () => import('../components/EditarLivroView.vue')
    },
    {
      path: '/consulta-livro',
      name: 'consulta-livro',
      component: () => import('../components/ConsultaLivroView.vue')
    },
    {
      path: '/cadastro-emprestimo',
      name: 'cadastro-emprestimo',
      component: () => import('../components/CadastroEmprestimoView.vue')
    },
    {
      path: '/editar-emprestimo',
      name: 'editar-emprestimo',
      component: () => import('../components/EditarEmprestimoView.vue')
    },
    {
      path: '/consulta-emprestimo',
      name: 'consulta-emprestimo',
      component: () => import('../components/ConsultaEmprestimoView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: () => import('@/components/CadastroAdmin.vue')
    },  
    {
      path: '/footer',
      name: 'footer',
      component: FooterView
    },
  ]
})

//getUser
async function getUser(next: NavigationGuardNext) {
  localUser = await supabase.auth.getSession();

  if (localUser.data.session == null) {
    next('/login');
  }
  else if (localUser.data.session == "admin@email.com") {
    next('/home');
  } else {
    next('/aluno');
  }
}

//auth requirements
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
})

export default router
