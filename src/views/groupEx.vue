<template>
  <VueFlow
    v-model:nodes="nodes"
    v-model:edges="edges"
    :node-types="nodeTypes"
    fit-view
  />
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import GroupNode from '../components/groupEx/GroupNode.vue'

const nodeTypes = {
  group: GroupNode
}

const nodes = ref([
  {
    id: 'group-1',
    type: 'group',
    position: { x: 100, y: 100 },
    data: {
      label: '群組 A',
      collapsed: false,
      children: ['a', 'b', 'c']
    }
  },
  {
    id: 'a',
    position: { x: 150, y: 200 },
    data: { label: '子節點 A' }
  },
  {
    id: 'b',
    position: { x: 250, y: 250 },
    data: { label: '子節點 B' }
  },
  {
    id: 'c',
    position: { x: 350, y: 200 },
    data: { label: '子節點 C' }
  }
])

const edges = ref([
  { id: 'e1', source: 'group-1', target: 'a' },
  { id: 'e2', source: 'group-1', target: 'b' },
  { id: 'e3', source: 'group-1', target: 'c' }
])
</script>