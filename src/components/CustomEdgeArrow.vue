<!-- 客製箭頭邊元件 -->

<script setup>
import { BaseEdge,EdgeLabelRenderer, getBezierPath, useVueFlow } from '@vue-flow/core'
import { computed } from 'vue'
import CustomArrowMarker from './CustomArrowMarker.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
  sourcePosition: {
    type: String,
    required: true,
  },
  targetPosition: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: false,
  },
  deleteFunction:Function
})

const path = computed(() => getBezierPath(props))

const markerId = computed(() => `${props.id}-marker`)

</script>

<script>
export default {
  inheritAttrs: false,
}
</script>

<template>
  <BaseEdge
    :id="id"
    :path="path[0]"
    :marker-end="`url(#${markerId})`" 
   
    :label-x="path[1]"
    :label-y="path[2]"
    label-bg-style="fill: whitesmoke"
  />
  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(-50%, -90%) translate(${path[1]}px,${path[2]}px)`,
      }"
      class="nodrag nopan"
    >
      <button class="edgebutton" @click="deleteFunction(id)">×</button>
    </div>
  </EdgeLabelRenderer>
  <CustomArrowMarker :id="markerId"  :stroke-width="2" :width="30" :height="30" />
</template>

<style>
.edgebutton {
  border-radius: 999px;
  cursor: pointer;
}

.edgebutton:hover {
  box-shadow: 0 0 0 2px pink, 0 0 0 4px #f05f75;
}
</style>
