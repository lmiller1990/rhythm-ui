import { mount } from "@cypress/vue";
import Gameplay from "./Gameplay.vue";
import { sym, createStore, createInitState } from "./store";
import { routerKey } from 'vue-router'
import 'virtual:windi.css'

describe("Gameplay", () => {
  const state = createInitState();
  before(() => {
    cy.viewport(1600, 900)
  })

  it("retursn to / when pressing enter", () => {
    const mockRouter = {
      push: cy.stub()
    }

    mount(Gameplay, {
      props: {
        initGameplay: false
      },
      global: {
        provide: {
          [sym]: createStore({ ...state }),
          // @ts-ignore - TS Bug.
          [routerKey]: mockRouter
        },
      },
    });
  });
});
