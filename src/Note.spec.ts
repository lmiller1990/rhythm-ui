import { noteClass, targetClass } from './gameplay'
import 'virtual:windi.css'
import './gameplay.css'

function mount(className: string) {
  const id = '__cy_root'
  const el = document.createElement('div')
  el.style.height = '40px'
  el.style.width = '40px'
  el.className = className
  const wrapper = document.getElementById(id)!
  wrapper.style.padding = '10px'
  wrapper.style.height = '100vh'
  wrapper.className = 'background'
  wrapper.appendChild(el)
}

function classify(className: string) {
  return `.${className.replaceAll(' ', '.')}`
}

xit('renders a note', () => {
  mount(noteClass)
  cy.get(classify(noteClass))
})

it('renders a target', () => {
  mount(targetClass)
  cy.get(classify(targetClass))
})
