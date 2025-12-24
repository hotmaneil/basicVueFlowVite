<template>
  <div class="childCard">
    {{ data.label }}

    <Handle id="main-top" type="target" :position="Position.Top" />
    <Handle id="main-left" type="source" :position="Position.Left" />
    <Handle id="main-left-reveive" type="target" :position="Position.Left" />
    <Handle id="main-right" type="source" :position="Position.Right" />
    <Handle id="main-right-reveive" type="target" :position="Position.Right" />
    <Handle id="main-bottom" type="source" :position="Position.Bottom" />
  </div>
</template>

<script setup>
import { Handle, Position } from '@vue-flow/core';
const props = defineProps(['id', 'data']);
</script>

<style>
.childCard {
  background: white;
  padding: 10px;
  width: 130px;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
}
</style>
