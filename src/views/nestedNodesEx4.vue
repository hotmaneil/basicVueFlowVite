<!-- 按照Tom想要的圖畫出-->
<template>
  <VueFlow
    class="all-flow"
    :nodes="nodes"
    :edges="edges"
    @node-click="onNodeClick"
    fit-view-on-init
    elevate-edges-on-select
  >
    <MiniMap />

    <Controls />

    <Background />

    <template #node-child="props">
      <childNode :id="props.id" :data="props.data" />
    </template>

    <template #node-group="props">
      <groupNode :id="props.id" :data="props.data" />
    </template>

    <template #edge-custom="edgeProps">
      <customEdgeArrow v-bind="edgeProps" />
    </template>
  </VueFlow>
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { useVueFlow } from '@vue-flow/core';
import childNode from '../components/nestedNodesEx4/childNode.vue';
import groupNode from '../components/nestedNodesEx4/groupNode.vue';
import customEdgeArrow from '../components/nestedNodesEx4/customEdgeArrow.vue';

const { updateNode } = useVueFlow();

const nodes = ref([
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },

  {
    id: 'main_route',
    data: { label: 'Main Route', collapsed: false },
    position: { x: 250, y: 100 },
    style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '400px' },
  },

  {
    id: 'iqc',
    data: { label: 'IQC' },
    position: { x: 10, y: 30 },
    parentNode: 'main_route',
  },

  {
    id: 'gri',
    data: { label: 'GRI' },
    position: { x: 10, y: 90 },
    type: 'child',
    parentNode: 'main_route',
  },

  {
    id: 'skr',
    data: { label: 'SKR' },
    position: { x: 10, y: 150 },
    type: 'child',
    parentNode: 'main_route',
  },

  {
    id: 'jd',
    data: { label: 'JD' },
    type: 'child',
    position: { x: 10, y: 210 },
    parentNode: 'main_route',
  },

  {
    id: 'oqc',
    data: { label: 'OQC' },
    position: { x: 10, y: 270 },
    parentNode: 'main_route',
  },

  {
    id: 'pack',
    data: { label: 'PACK' },
    position: { x: 10, y: 330 },
    parentNode: 'main_route',
  },

  {
    id: 'sub_route_gri',
    data: { label: 'Sub Route GRI', collapsed: false },
    position: { x: 520, y: 70 },
    type: 'group',
    style: { backgroundColor: 'rgba(161, 285, 129, 0.5)', width: '200px', height: '210px' },
  },

  {
    id: 'sub_route_gri_in',
    type: 'input',
    data: { label: 'Rework In:GRI' },
    position: { x: 10, y: 30 },
    parentNode: 'sub_route_gri',
  },
  {
    id: 'sub_route_gri_iqc',
    data: { label: 'IQC' },
    position: { x: 10, y: 90 },
    parentNode: 'sub_route_gri',
  },
  {
    id: 'sub_route_gri_out',
    type: 'output',
    data: { label: 'Rework Out:sub_route_gri' },
    position: { x: 10, y: 150 },
    parentNode: 'sub_route_gri',
  },

  {
    id: 'sub_route_skr',
    data: { label: 'Sub Route SKR', collapsed: false },
    position: { x: 10, y: 130 },
    type: 'group',
    style: { backgroundColor: 'rgba(161, 285, 129, 0.5)', width: '200px', height: '260px' },
  },

  {
    id: 'skr_in',
    type: 'input',
    data: { label: 'Rework In:SKR' },
    position: { x: 10, y: 30 },
    parentNode: 'sub_route_skr',
  },
  {
    id: 'skr_thinning',
    data: { label: 'THINNING' },
    position: { x: 10, y: 90 },
    parentNode: 'sub_route_skr',
  },
  {
    id: 'skr_gri',
    data: { label: 'GRI' },
    position: { x: 10, y: 150 },
    parentNode: 'sub_route_skr',
  },
  {
    id: 'skr_out',
    type: 'output',
    data: { label: 'Rework Out:JD' },
    position: { x: 10, y: 210 },
    parentNode: 'sub_route_skr',
  },
]);

const edges = ref([
  { id: 'start-iqc', source: 'start', target: 'main_route', type: 'custom' },
  { id: 'iqc-gri', source: 'iqc', target: 'gri', type: 'custom' },
  {
    id: 'gri-skr',
    source: 'gri',
    target: 'skr',
    sourceHandle: 'main-bottom',
    targetHandle: 'main-top',
    type: 'custom',
  },
  {
    id: 'skr-jd',
    source: 'skr',
    target: 'jd',
    sourceHandle: 'main-bottom',
    targetHandle: 'main-top',
    type: 'custom',
  },
  {
    id: 'jd-oqc',
    source: 'jd',
    target: 'oqc',
    sourceHandle: 'main-bottom',
    targetHandle: 'main-top',
    type: 'custom',
  },
  { id: 'oqc-pack', source: 'oqc', target: 'pack', type: 'custom' },

  {
    id: 'gri_sub_route_gri',
    source: 'gri',
    target: 'sub_route_gri',
    animated: true,
    sourceHandle: 'main-right',
    targetHandle: 'sub-left',
    type: 'custom',
    data: { styleType: 'step' },
  },
  {
    id: 'sub_route_gri_in-iqc',
    source: 'sub_route_gri_in',
    target: 'sub_route_gri_iqc',
    type: 'custom',
  },
  {
    id: 'sub_route_gri_iqc-out',
    source: 'sub_route_gri_iqc',
    target: 'sub_route_gri_out',
    type: 'custom',
  },
  {
    id: 'sub_route_gri-gri',
    source: 'sub_route_gri',
    target: 'gri',
    animated: true,
    sourceHandle: 'sub-bottom',
    targetHandle: 'main-right-reveive',
    type: 'custom',
    data: { styleType: 'step' },
  },

  {
    id: 'skr-sub_route_skr',
    source: 'skr',
    target: 'sub_route_skr',
    animated: true,
    sourceHandle: 'main-left',
    targetHandle: 'sub-right',
    type: 'custom',
    data: { styleType: 'step' },
  },
  { id: 'skr_in-skr_thinning', source: 'skr_in', target: 'skr_thinning', type: 'custom' },
  { id: 'skr_thinning-skr_gri', source: 'skr_thinning', target: 'skr_gri', type: 'custom' },
  { id: 'skr_gri-skr_out', source: 'skr_gri', target: 'skr_out', type: 'custom' },
  {
    id: 'sub_route_skr-jd',
    source: 'sub_route_skr',
    target: 'jd',
    animated: true,
    sourceHandle: 'sub-bottom',
    targetHandle: 'main-left-reveive',
    type: 'custom',
    data: { styleType: 'step' },
  },
]);

/** 
 * 
點擊群組外框 → 折疊/展開

自動隱藏子節點

自動調整群組外框大小

可選：自動 layout（dagre）

完全不破壞你現有的 parentNode 結構
 * 
 */
const onNodeClick = (event) => {
  console.log('onNodeClick');
  const node = event.node;

  // 只對 gri / skr 做折疊
  if (node.id === 'sub_route_gri' || node.id === 'sub_route_skr') {
    toggleGroup(node.id);
  }
};

/** 觸發群組 */
const toggleGroup = (groupId) => {
  console.log('toggleGroup groupId', groupId);

  const group = nodes.value.find((n) => n.id === groupId);
  console.log('group', group);

  const collapsed = !group.data?.collapsed;
  console.log('collapsed', collapsed);

  // 更新 group 狀態
  updateNode(groupId, {
    data: { ...group.data, collapsed },
    style: collapsed
      ? { ...group.style, height: '40px' } // 折疊後變小
      : group.style, // 展開回原本大小
  });

  const findParant = nodes.value.find((x) => x.id === groupId);
  findParant.data.collapsed = collapsed;

  // 找出所有子節點
  const children = nodes.value.filter((n) => n.parentNode === groupId);

  // 隱藏或顯示子節點
  children.forEach((child) => {
    updateNode(child.id, { hidden: collapsed });
  });
};

</script>

<style>
.all-flow {
  background-color: #d5e6f0;
  height: 100%;
  width: 100%;
}

.vue-flow__node-child .vue-flow__handle[data-handleid='main-right'] {
  top: 25%;
}

.vue-flow__node-child .vue-flow__handle[data-handleid='main-right-reveive'] {
  top: 75%;
}

.vue-flow__node-child .vue-flow__handle[data-handleid='main-left'] {
  top: 25%;
}

.vue-flow__node-child .vue-flow__handle[data-handleid='main-left-reveive'] {
  top: 75%;
}
</style>
