import { createMemoryHistory, createRouter } from 'vue-router'



const routes = [
  { path: '/', component: ()=> import('../views/pg_inicial/pg_inicial.vue')},
  { path: '/cadastrar', component: ()=> import('../views/pg_cadastra/pg_cadastra.vue'), meta: { breadcrumb: ["Home", "Cadastro"] }},
  { path: '/editar', component: ()=> import('../views/Modal/consultacpf.vue'), meta: { breadcrumb: ["Home", "Edição"] }},
  { path: '/editar/:cpf', component: ()=> import('../views/Modal/consultacpf.vue'), meta: { breadcrumb: ["Home", "Edição por CPF"] }},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;