import { noteClass, noteClassBase } from './gameplay'
import 'tailwindcss/dist/tailwind.css'
import './gameplay.css'

const div = () => document.createElement('div')

function mount(child: HTMLDivElement) {
  const id = '__cy_root'
  const wrapper = document.getElementById(id)!
  wrapper.style.height = '100vh'
  wrapper.className = 'background flex justify-around'
  wrapper.appendChild(child)
}

it('renders notes', () => {
  const notes: HTMLDivElement[] = []
  for (let i = 0; i < 6; i++) {
    const note = div()
    note.className = `${noteClassBase} is-note-${i + 1}`
    note.style.width = `var(--target-height)`
    note.style.height = `var(--target-height)`
    notes.push(note)
  }

  notes.map(mount)
})
