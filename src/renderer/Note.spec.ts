import { noteClass, targetClass, applyTargetHitAnim } from './gameplay'
import 'tailwindcss/dist/tailwind.css'
import './gameplay.css'

const div = () => document.createElement('div')

function mount(child: HTMLDivElement) {
  const id = '__cy_root'
  const wrapper = document.getElementById(id)!
  wrapper.style.height = '100vh'
  wrapper.className = 'background'
  wrapper.appendChild(child)
}

function classify(className: string) {
  return `.${className.replaceAll(' ', '.')}`
}

xit('renders a note', () => {
  const el = div()
  el.className = noteClass
  mount(el)
  cy.get(classify(noteClass))
})

it('renders a target', () => {
  const el = div()
  el.dataset.dataGame = 'col-1'
  el.className = targetClass

  const wrap = div()
  wrap.style.width = '40px'
  wrap.style.position = 'relative'
  wrap.appendChild(el)

  mount(wrap)

  cy.get(classify(targetClass))

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    applyTargetHitAnim(el)
  })
})
