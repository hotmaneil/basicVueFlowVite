<!-- 
結合 nestedNodesEx1 和 simplaeLayout 
-->

<template>
  <div class="layout-flow">
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

      <!-- <Panel class="process-panel" position="top-right">
        <div class="layout-panel">
          <button title="set horizontal layout" @click="layoutGraph('LR')">
            <Icon name="horizontal" />
          </button>

          <button title="set vertical layout" @click="layoutGraph('TB')">
            <Icon name="vertical" />
          </button>
        </div>
      </Panel> -->
    </VueFlow>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import { useVueFlow } from '@vue-flow/core';
// import { useLayout } from '../utils/useLayout';
import Icon from '../components/simplaeLayout/Icon.vue';
import { runLayout } from '../utils/layout';

const { updateNode, updateNodePositions } = useVueFlow();

const position = { x: 0, y: 0 };
const nodes = ref([
  {
    id: 'start',
    position,
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
  {
    id: 'iqc',
    position,
    data: { label: 'IQC' },
    position: { x: 250, y: 100 },
  },

  {
    id: 'gri',
    position,
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
    position,
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
    // position,
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
const toggleGroup = async (groupId) => {
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

  // 等 Vue Flow 更新完畢後再 layout
  await nextTick();

  // 取得最新 nodes/edges
  const newPositions = runLayout(nodes.value, edges.value);

  // 套用新位置
  updateNodePositions(newPositions);
};

// const { layout } = useLayout();

// const { fitView } = useVueFlow();

/**
 * 依照方向排版
 * @param direction
 */
// async function layoutGraph(direction) {
//   nodes.value = layout(nodes.value, edges.value, direction);

//   nextTick(() => {
//     fitView();
//   });
// }
</script>

<style>
.layout-flow {
  background-color: #1a192b;
  height: 100%;
  width: 100%;
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.process-panel {
  background-color: #2d3748;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.process-panel button {
  border: none;
  cursor: pointer;
  background-color: #4a5568;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.process-panel button {
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-panel {
  display: flex;
  align-items: center;
  gap: 10px;
}

.process-panel button:hover,
.layout-panel button:hover {
  background-color: #2563eb;
  transition: background-color 0.2s;
}

.process-panel label {
  color: white;
  font-size: 12px;
}

.stop-btn svg {
  display: none;
}

.stop-btn:hover svg {
  display: block;
}

.stop-btn:hover .spinner {
  display: none;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
