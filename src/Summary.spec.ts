import { mount } from "@cypress/vue";
import Summary from "./Summary.vue";
import { sym, createStore, createInitState } from "./store";
import { testSummary } from "./fixtures";

describe("Summary", () => {
  const state = createInitState();
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
