import { FunctionalComponent, h } from 'vue'
import { colors } from '../style'

export const Padding: FunctionalComponent = (props, { slots }) => h('div', { class: `${colors.gray} p-4` }, slots)
