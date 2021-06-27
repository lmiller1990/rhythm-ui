import { noteClass } from './gameplay'

function mount() {
  const id = '__cy_vue_root'
  const el = document.createElement('div')
  el.id = id
  el.className = noteClass
}