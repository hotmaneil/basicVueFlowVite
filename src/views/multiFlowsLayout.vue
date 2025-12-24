<template>
  <div class="multiflows">
    <dragDropProcess @update:isOpenDrawer="receiveIsOpenDrawer" />
  </div>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
    <span>子途程</span>
    <dragDropProcess />
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import dragDropProcess from '../components/multiFlowsLayout/dragDropProcess.vue';

/** 是否開啟側邊框 */
const drawer = ref(false);

function receiveIsOpenDrawer(source) {
  console.log('receiveIsOpenDrawer source', source);
  drawer.value = source;
}
</script>

<style>
.multiflows {
  display: flex;
  height: 100%;
}

.multiflows .vue-flow {
  height: 100%;
}

.multiflows .vue-flow:first-child {
  border-right: 2px solid #333;
}
</style>
