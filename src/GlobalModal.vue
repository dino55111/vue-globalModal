<template>
  <div class="GlobalModal">
    <transition
      name="animate-fade"
      appear
    >
      <div
        v-if="instance"
        class="GlobalModal__container fixed w-full h-full top-0 left-0 flex justify-center items-center min-w-320"
      >
        <div
          class="fixed top-0 left-0 w-full h-full bg-gray-600 opacity-16"
          @click.prevent="backdropHandler"
          @touchmove.prevent="backdropHandler"
        ></div>
        <component
          :is="instance"
          class="relative"
          v-bind="propsData"
          @finish="finishHandler"
        ></component>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, toRef } from 'vue'
import { useUserAgentStore } from '@/store/useUserAgent'
import { useModal } from './useModal'

const modal = useModal()
const { instance, options, callback, propsData } = modal.info

const lastScrollTop = ref(0)
const useUserAgent = useUserAgentStore()
const storeScrollTop = toRef(useUserAgent.scroll, 'top')

const backdropHandler = () => {
  if (options.value && options.value.backdropClose) {
    finishHandler()
  }
}

const finishHandler = (payload = {}) => {
  exacuteCallback({ payload })
  if (options.value && options.value.autoClose) {
    modal.close()
  }
}

const exacuteCallback = (event) => {
  const callbackFn = callback.value
  if (callbackFn && typeof callbackFn === 'function') {
    callback.value(event)
  }
}

const lockBody = (isLock) => {
  if (!modal.bodyFixed) return
  const body = document.body
  if (isLock) {
    body.style.position = 'static'
    body.style.overflow = 'auto'
  } else {
    body.style.position = 'fixed'
    body.style.overflow = 'hidden'
    body.style.width = '100%'
  }
}

watch(instance, (newValue, oldValue) => {
  const isOpen = !!newValue
  if (isOpen) {
    lockBody(!isOpen)

    document.body.style.top = storeScrollTop.value * -1 + 'px'
    lastScrollTop.value = storeScrollTop.value
  } else {
    nextTick(() => {
      lockBody(!isOpen)

      document.body.style.top = ''
      window.scrollTo(0, lastScrollTop.value)
    })
  }
})

</script>

<style lang="scss">
.GlobalModal {
  &__container {
    z-index: 70;
  }
}

// xl | lg | md | sm
// @screen xl {}
</style>
