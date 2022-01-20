import { inject, ref, shallowRef } from 'vue'

export const ModalSymbol = Symbol('GlobalModal')

export const Modal = {
  info: {
    instance: shallowRef(''),
    options: ref({
      backdropClose: false,
      autoClose: true
    }),
    callback: ref(null),
    propsData: ref(null)
  },
  defaultOptions: {
    backdropClose: false,
    autoClose: true
  },
  open ({ instance, options = {}, callback = null, props = {} }) {
    this.info.instance.value = instance
    this.info.options.value = Object.assign({}, this.info.options.value, options)
    this.info.callback.value = callback
    this.info.propsData.value = props
  },
  close () {
    this.info.instance.value = ''
    this.info.options.value = Object.assign({}, this.defaultOptions)
    this.info.callback.value = null
    this.info.propsData.value = null
  }
}

export function useModal () {
  return inject(ModalSymbol)
}
