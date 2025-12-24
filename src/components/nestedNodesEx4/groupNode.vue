<template>
  <div>
    {{ data.label }}

    <Handle id="sub-left" type="target" :position="Position.Left" :connectable="false" />
    <Handle id="sub-right" type="target" :position="Position.Right" :connectable="false" />
    <Handle id="sub-bottom" type="source" :position="Position.Bottom" :connectable="false" />
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core';
const props = defineProps(['id', 'data']);
</script>

<style>

</style>
