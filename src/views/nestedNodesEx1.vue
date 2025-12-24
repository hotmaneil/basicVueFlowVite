<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    @node-click="onNodeClick"
    fit-view-on-init
    elevate-edges-on-select
  >
    <MiniMap />

    <Controls />

    <Background />
  </VueFlow>
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { useVueFlow } from '@vue-flow/core';

const { updateNode } = useVueFlow();

const nodes = ref([
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
  {
    id: 'iqc',
    data: { label: 'IQC' },
    position: { x: 250, y: 100 },
  },

  {
    id: 'gri',
    data: { label: 'GRI', collapsed: false },
    position: { x: 230, y: 200 },
    style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '200px' },
  },
  {
    id: 'gri-1',
    type: 'input',
    data: { label: 'Rework In:GRI' },
    position: { x: 10, y: 30 },
    parentNode: 'gri',
  },
  {
    id: 'gri-2',
    data: { label: 'IQC' },
    position: { x: 10, y: 90 },
    parentNode: 'gri',
  },
  {
    id: 'gri-3',
    type: 'output',
    data: { label: 'Rework Out:GRI' },
    position: { x: 10, y: 150 },
    parentNode: 'gri',
  },

  {
    id: 'skr',
    data: { label: 'SKR', collapsed: false },
    position: { x: 230, y: 450 },
    style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '250px' },
  },
  {
    id: 'skr-1',
    type: 'input',
    data: { label: 'Rework In:SKR' },
    position: { x: 10, y: 30 },
    parentNode: 'skr',
  },
  {
    id: 'skr-2',
    data: { label: 'THINNING' },
    position: { x: 10, y: 90 },
    parentNode: 'skr',
  },
  {
    id: 'skr-3',
    data: { label: 'GRI' },
    position: { x: 10, y: 150 },
    parentNode: 'skr',
  },
  {
    id: 'skr-4',
    type: 'output',
    data: { label: 'Rework Out:JD' },
    position: { x: 10, y: 200 },
    parentNode: 'skr',
  },

  {
    id: 'jd',
    data: { label: 'JD' },
    position: { x: 250, y: 750 },
  },
]);

const edges = ref([
  { id: 'start-iqc', source: 'start', target: 'iqc', type: 'step' },
  { id: 'iqc-gri', source: 'iqc', target: 'gri', type: 'step' },

  { id: 'gri-1-2', source: 'gri-1', target: 'gri-2', type: 'step' },
  { id: 'gri-2-3', source: 'gri-2', target: 'gri-3', type: 'step' },
  { id: 'gri-skr', source: 'gri', target: 'skr', type: 'step' },

  { id: 'skr-1-2', source: 'skr-1', target: 'skr-2', type: 'step' },
  { id: 'skr-2-3', source: 'skr-2', target: 'skr-3', type: 'step' },
  { id: 'skr-3-4', source: 'skr-3', target: 'skr-4', type: 'step' },

  { id: 'skr-jd', source: 'skr', target: 'jd', type: 'step' },
]);

/** 基本範例1：隱藏GRI */
const hideGri = () => {
  const groupId = 'gri';

  // 隱藏外框
  updateNode('gri', { hidden: true });

  // 隱藏所有子節點
  nodes.value
    .filter((n) => n.parentNode === groupId)
    .forEach((child) => {
      updateNode(child.id, { hidden: true });
    });
};

/**「基本範例2：折疊群組」功能（點 gri → 自動隱藏子節點） */
const toggleGri = () => {
  const groupId = 'gri';
  const group = nodes.value.find((n) => n.id === groupId);

  const collapsed = !group.data?.collapsed;

  updateNode(groupId, {
    data: { ...group.data, collapsed },
    hidden: collapsed,
  });

  nodes.value
    .filter((n) => n.parentNode === groupId)
    .forEach((child) => {
      updateNode(child.id, { hidden: collapsed });
    });
};

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
  if (node.id === 'gri' || node.id === 'skr') {
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
