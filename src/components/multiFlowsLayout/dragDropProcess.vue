<template>
  <div class="dnd-flow" @drop="handleDrop">
    <selectSidebar />

    <VueFlow :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave">
      <dropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#FFED97' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">Drop here</p>
      </dropzoneBackground>

      <template #node-In="Props">
        <processInSelect v-bind="Props" :options="options"></processInSelect>
      </template>

      <template #node-selectNode="Props">
        <processSelect
          v-bind="Props"
          :options="options"
          @update:isOpenList="(val) => updateIsOpenList(val, Props)"
        ></processSelect>
        <toolbarList
          :id="Props.id"
          :data="Props.data"
          @update:isOpenDrawer="(val) => emit('update:isOpenDrawer', val)"
        />
      </template>

      <template #node-Out="Props">
        <processOutSelect v-bind="Props" :options="options"></processOutSelect>
      </template>

      <Panel class="process-panel" position="top-left">
        <div class="layout-panel">
          <button title="set vertical layout" @click="layoutGraph('TB')">排版</button>
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { VueFlow, useVueFlow, Panel, Position } from '@vue-flow/core';
import selectSidebar from './selectSidebar.vue';
import dropzoneBackground from './dropzoneBackground.vue';
import useDragAndDrop from './useDragAndDrop';

import processInSelect from './processInSelect.vue';
import processSelect from './processSelect.vue';
import processOutSelect from './processOutSelect.vue';

import { useLayout } from '../../utils/useLayout';

import toolbarList from './toolbarList.vue';

const { onDrop, isDragOver, onDragOver, onDragLeave } = useDragAndDrop();

const nodes = ref([]);

const edges = ref([]);

const { onConnect, addEdges, fitView } = useVueFlow();

onConnect(({ source, target, sourceHandle, targetHandle }) => {
  console.log('source', source);
  console.log('target', target);
  console.log('sourceHandle', sourceHandle);
  console.log('targetHandle', targetHandle);

  const timeStr = `${new Date().getMinutes()}-${new Date().getSeconds()}`;

  addEdges([
    {
      id: timeStr, // 可選，若未指定會自動生成
      source: source,
      target: target,
      sourceHandle: sourceHandle,
      targetHandle: targetHandle,
      type: 'straight', // 指定自訂類型
    },
  ]);

  edges.value.push({
    id: timeStr,
    source: source,
    target: target,
    type: 'straight',
  });
});

/**
 * 拖曳動作
 * @param event
 */
function handleDrop(event) {
  console.log('handleDrop event', event);
  const newNode = onDrop(event);
  nodes.value.push(newNode);
}

const options = [
  {
    value: 'IQC',
    label: 'IQC',
  },
  {
    value: 'GRI',
    label: 'GRI',
  },
  {
    value: 'SKR',
    label: 'SKR',
  },
  {
    value: 'JD',
    label: 'JD',
  },
  {
    value: 'OQC',
    label: 'OQC',
  },
];

const emit = defineEmits(['update:isOpenDrawer']);

const { layout } = useLayout();

async function layoutGraph(direction) {
  nodes.value = layout(nodes.value, edges.value, direction);

  nextTick(() => {
    fitView();
  });
}

/** 接收到並更新是否開啟子途程列表 */
function updateIsOpenList(source, Props) {
  Props.data.toolbarVisible = source;
  Props.data.toolbarPosition = Position.Right;
}
</script>
