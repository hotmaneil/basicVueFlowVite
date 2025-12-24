<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  stroke: {
    type: String,
    required: false,
    default: '#b1b1b7',
  },
  fill: {
    type: String,
    required: false,
    default: '#b1b1b7',
  },
  strokeWidth: {
    type: Number,
    required: false,
    default: 1,
  },
  width: {
    type: Number,
    required: false,
    default: 12.5,
  },
  height: {
    type: Number,
    required: false,
    default: 12.5,
  },
})
</script>

<template>
  <svg class="vue-flow__marker vue-flow__container">
    <defs>
      <marker
        :id="id"
        class="vue-flow__arrowhead"
        viewBox="-10 -10 20 20"
        refX="0"
        refY="0"
        :markerWidth="width"
        :markerHeight="height"
        markerUnits="strokeWidth"
        orient="auto-start-reverse"
      >
        <path
          :fill="fill"
          d="M -4 0 L 0 12 L 4 0 Z"
          orient="auto"
          transform="rotate(270) translate(0, -12)"
        />
      </marker>
    </defs>
  </svg>
</template>
