<template>
  <div class="node">
    <!-- Element Plus 元件 -->
    <el-row>
      <el-col :span="24">
        <el-select v-model="value" placeholder="Select" style="width: 150px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-button type="primary" plain>設定</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="info" plain>子途程</el-button>
      </el-col>
    </el-row>

    <!-- Vue Flow 連接點 -->
    <Handle type="target" :position="Position.Top" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useVueFlow, Handle, Position } from '@vue-flow/core';

const props = defineProps(['id', 'data', 'options']);

const { updateNodeData } = useVueFlow();

const value = computed({
  get: () => props.data.value,
  set: (value) => updateNodeData(props.id, { value }),
});
</script>

<style scoped>
.node {
  padding: 10px;
  background: #f0f1ed;
  border: 1px solid #ddd;
  border-radius: 6px;
  border-color: red;
}
</style>
