import { mount } from "@cypress/vue";
import Summary from "./Summary.vue";
import { sym, createStore, createInitState } from "./store";
import { testSummary } from "./fixtures";
import 'virtual:windi.css'

describe("Summary", () => {
  const state = createInitState();
  before(() => {
    cy.viewport(1600, 900)
  })

  it("renders", () => {
    mount(Summary, {
      global: {
        provide: {
          [sym]: createStore({ ...state, gameplaySummary: testSummary }),
        },
      },
    });
  });
});
