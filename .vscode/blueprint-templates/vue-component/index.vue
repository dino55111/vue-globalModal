<template>
  <div class="{{ pascalCase name }}">
    {{ pascalCase name }}
  </div>
</template>

<script setup>
import { } from 'vue'

const props = defineProps({})

const emit = defineEmits([]) 

defineExpose({})
</script>

<style lang="scss">
.{{ pascalCase name }} {
}

// xl | lg | md | sm
// @screen xl {}
</style>
