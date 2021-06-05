import { createWebHistory, createRouter } from "vue-router";
import Menu from "./Menu.vue";
import Gameplay from "./Gameplay.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Menu,
      path: "/",
    },
    {
      component: Gameplay,
      path: "/gameplay",
    },
  ],
});
