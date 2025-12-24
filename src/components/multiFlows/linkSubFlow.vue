<template>
  <div class="card">
    {{ data.label }}
    <button @click="handleClick(data.label)" class="tooltip">
      +
      <span class="tooltiptext"> 打開子途程 </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['id', 'data']);

const emit = defineEmits(['update:getSubFlowNodes', 'update:getSubFlowEdges']);

/**
 * 按下事件
 * @param value
 */
function handleClick(value) {
  if (value === 'GRI') {
    console.log('確認是GRI');
    emit('update:getSubFlowNodes', sub_route_gri_nodes);
    emit('update:getSubFlowEdges', sub_route_gri_edges);
  }

  if (value === 'SKR') {
    console.log('確認是SKR');
    emit('update:getSubFlowNodes', sub_route_skr_nodes);
    emit('update:getSubFlowEdges', sub_route_skr_edges);
  }
}

//
// 模擬傳資料給子途程
//

/** 子途程的節點陣列-GRI */
const sub_route_gri_nodes = ref([
  {
    id: 'sub_route_gri_in',
    type: 'input',
    data: { label: 'Rework In:GRI' },
    position: { x: 10, y: 30 },
  },
  {
    id: 'sub_route_gri_iqc',
    data: { label: 'IQC' },
    position: { x: 10, y: 90 },
  },
  {
    id: 'sub_route_gri_out',
    type: 'output',
    data: { label: 'Rework Out:sub_route_gri' },
    position: { x: 10, y: 150 },
  },
]);

/** 子途程的節邊陣列-GRI */
const sub_route_gri_edges = ref([
  {
    id: 'sub_route_gri_in-iqc',
    source: 'sub_route_gri_in',
    target: 'sub_route_gri_iqc',
  },
  {
    id: 'sub_route_gri_iqc-out',
    source: 'sub_route_gri_iqc',
    target: 'sub_route_gri_out',
  },
]);

/** 子途程的節點陣列-SKR */
const sub_route_skr_nodes = ref([
  {
    id: 'skr_in',
    type: 'input',
    data: { label: 'Rework In:SKR' },
    position: { x: 10, y: 30 },
  },
  {
    id: 'skr_thinning',
    data: { label: 'THINNING' },
    position: { x: 10, y: 90 },
  },
  {
    id: 'skr_gri',
    data: { label: 'GRI' },
    position: { x: 10, y: 150 },
  },
  {
    id: 'skr_out',
    type: 'output',
    data: { label: 'Rework Out:JD' },
    position: { x: 10, y: 210 },
  },
]);

/** 子途程的節邊陣列-SKR */
const sub_route_skr_edges = ref([
  { id: 'skr_in-skr_thinning', source: 'skr_in', target: 'skr_thinning' },
  { id: 'skr_thinning-skr_gri', source: 'skr_thinning', target: 'skr_gri' },
  { id: 'skr_gri-skr_out', source: 'skr_gri', target: 'skr_out' },
]);
</script>

<style>
.card {
  background: white;
  padding: 10px;
  width: 130px;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
}

.tooltip {
  position: relative;
  left: 47px;
  display: inline-block;
  border-bottom: 1px dotted black;
  cursor: pointer;
}

.tooltiptext {
  visibility: hidden;
  width: 130px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
