<template>
  <div class="multiflows">
    <customFlow
      :nodes="nodes"
      :edges="edges"
      @update:getSubFlowNodes="receiveSubFlowNodes"
      @update:getSubFlowEdges="receiveSubFlowEdges"
    />
    <customFlow :nodes="sub_nodes" :edges="sub_edges" />
  </div>
</template>

<script setup>
import customFlow from '../components/multiFlows/customFlow.vue';

import { ref } from 'vue';

//
// 主途程
//
const nodes = ref([
  {
    id: 'iqc',
    data: { label: 'IQC' },
    position: { x: 10, y: 30 },
  },

  {
    id: 'gri',
    data: { label: 'GRI' },
    position: { x: 10, y: 90 },
    type: 'subflow',
  },

  {
    id: 'skr',
    data: { label: 'SKR' },
    position: { x: 10, y: 150 },
    type: 'subflow',
  },

  {
    id: 'jd',
    data: { label: 'JD' },
    position: { x: 10, y: 210 },
  },

  {
    id: 'oqc',
    data: { label: 'OQC' },
    position: { x: 10, y: 270 },
  },

  {
    id: 'pack',
    data: { label: 'PACK' },
    position: { x: 10, y: 330 },
  },
]);

const edges = ref([
  { id: 'iqc-gri', source: 'iqc', target: 'gri' },
  {
    id: 'gri-skr',
    source: 'gri',
    target: 'skr',
  },
  {
    id: 'skr-jd',
    source: 'skr',
    target: 'jd',
  },
  {
    id: 'jd-oqc',
    source: 'jd',
    target: 'oqc',
  },
  { id: 'oqc-pack', source: 'oqc', target: 'pack' },
]);

const sub_nodes = ref([]);

/** 接收來自子途程的節點陣列 */
function receiveSubFlowNodes(source) {
  console.log('receiveSubFlowNodes value', source.value);
  sub_nodes.value = source.value;
}

const sub_edges = ref([]);

/** 接收來自子途程的邊陣列 */
function receiveSubFlowEdges(source) {
  console.log('receiveSubFlowEdges value', source.value);
  sub_edges.value = source.value;
}
</script>

<style>
#app {
  margin: 0;
  height: 100%;
}

#app {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

.vue-flow__node.dark {
  background: #000;
  color: #fff;
}

.multiflows {
  display: flex;
  height: 100%;
}

.multiflows .vue-flow {
  width: 100%;
  height: 100%;
}

.multiflows .vue-flow:first-child {
  border-right: 2px solid #333;
}
</style>
