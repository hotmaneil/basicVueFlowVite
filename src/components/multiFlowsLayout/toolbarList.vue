<template>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <el-button plain @click="addNewSubRoute()">新增子途程</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="Name" width="180" />
    </el-table>
  </NodeToolbar>
</template>

<script setup>
import { NodeToolbar } from '@vue-flow/node-toolbar';

const props = defineProps(['id', 'data']);

const tableData = [
  {
    id: 1,
    name: '子途程1',
  },
  {
    id: 2,
    name: '子途程2',
  },
  {
    id: 3,
    name: '子途程3',
  },
];

const emit = defineEmits(['update:isOpenDrawer']);
function addNewSubRoute() {
  console.log('addNewSubRoute');
  emit('update:isOpenDrawer', true);
}
</script>
