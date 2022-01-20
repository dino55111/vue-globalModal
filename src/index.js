import GlobalModal from './GlobalModal.vue'
import { ModalSymbol, Modal } from './useModal'

export default {
  install: (app, options = { bodyFixed: true }) => {
    app.component('GlobalModal', GlobalModal)
    app.provide(ModalSymbol, { ...Modal, ...options })
  }
}

export { useModal } from './useModal'
