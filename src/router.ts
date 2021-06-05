import { createWebHistory, createRouter } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Menu,
      path: '/',
    },
    {
      component: Gameplay,
      path: '/gameplay',
    },
  ]
})
