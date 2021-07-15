import { createWebHistory, createRouter } from "vue-router";
import Menu from "./Menu.vue";
import Summary from "./Summary.vue";
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
    {
      component: Summary,
      path: "/summary",
    },
  ],
});
