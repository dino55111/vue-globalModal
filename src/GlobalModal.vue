<template>
  <div class="GlobalModal">
    <transition
      name="animate-fade"
      appear
    >
      <div
        v-if="instance"
        class="GlobalModal__container"
      >
        <div
          class="GlobalModal__backDrop"
          @click.prevent="backdropHandler"
          @touchmove.prevent="backdropHandler"
        ></div>
        <component
          :is="instance"
          class="GlobalModal__instance"
          v-bind="propsData"
          @finish="finishHandler"
        ></component>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useModal } from './useModal'

const modal = useModal()
const { instance, options, callback, propsData } = modal.info

const lastScrollTop = ref(0)
const scrollTop = ref(0)

const scrollHandler = () => {
  scrollTop.value = document.body.scrollTop || document.documentElement.scrollTop
}

onMounted(() => {
  window.addEventListener('scroll', scrollHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
})

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

    document.body.style.top = scrollTop.value * -1 + 'px'
    lastScrollTop.value = scrollTop.value
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
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 320px;
    height: 100%;
    z-index: 70;
  }

  &__backDrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#292929, .16);
  }

  &__instance {
    position: relative;
  }
}

// fade
.animate-fade-enter,
.animate-fade-leave-to {
  @extend %transparent;
}

.animate-fade-enter-to,
.animate-fade-leave {
  opacity: 1;
}

.animate-fade-enter-active,
.animate-fade-leave-active {
  @extend %transparent-active;
}

@keyframes animate-rotate {
  100% {
    transform: rotate(1turn);
  }
}

</style>
