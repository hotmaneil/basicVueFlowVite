<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init>
    <Background />
    <template #node-subflow="props">
      <linkSubFlow
        :id="props.id"
        :data="props.data"
        @update:getSubFlowNodes="(val) => emit('update:getSubFlowNodes', val)"
        @update:getSubFlowEdges="(val) => emit('update:getSubFlowEdges', val)"
      />
    </template>
  </VueFlow>
</template>

<script setup>
import { Background } from '@vue-flow/background';
import { VueFlow } from '@vue-flow/core';
import linkSubFlow from './linkSubFlow.vue';

const props = defineProps({
  nodes: {
    type: Array,
    required: true,
  },
  edges: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:getSubFlowNodes', 'update:getSubFlowEdges']);
</script>
