import { mount } from '@cypress/vue'
import Summary from './Summary.vue'
import { sym, createStore, createInitState } from './store'
import { routerKey } from 'vue-router'
import { testSummary } from './fixtures'
import 'tailwindcss/dist/tailwind.css'

describe('Summary', () => {
  const state = createInitState()
  before(() => {
    cy.viewport(1600, 900)
  })

  it('retursn to / when pressing enter', () => {
    const mockRouter = {
      push: cy.stub(),
    }

    mount(Summary, {
      global: {
        provide: {
          [sym]: createStore({ ...state, gameplaySummary: testSummary }),
          // @ts-ignore - TS Bug.
          [routerKey]: mockRouter,
        },
      },
    })

    cy.window()
      .trigger('keydown', { code: 'Enter' })
      .then(() => {
        expect(mockRouter.push).to.have.been.called
      })
  })
})
