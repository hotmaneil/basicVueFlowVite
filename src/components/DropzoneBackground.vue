<script lang="ts" setup>
import { Background } from '@vue-flow/background'
</script>

<template>
  <div class="dropzone-background">
    <Background :size="2" :gap="20" pattern-color="#D5BA7C" />

    <div class="overlay">
      <slot />
    </div>
  </div>
</template>
