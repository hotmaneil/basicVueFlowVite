<template>
  <div
    class="group-node"
    :style="{
      width: collapsed ? '160px' : '260px',
      height: collapsed ? '40px' : '160px',
      border: '2px solid #4a90e2',
      borderRadius: '8px',
      background: '#f0f6ff',
      padding: '8px',
      transition: 'all 0.25s ease'
    }"
    @click.stop="toggle"
  >
    <div style="font-weight: bold; margin-bottom: 6px;">
      {{ data.label }} {{ collapsed ? '(展開)' : '(折疊)' }}
    </div>

    <div v-if="!collapsed">
      <slot />
      <div style="font-size: 12px; color: #666;">
        子節點數：{{ data.children?.length || 0 }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
// import { runLayout } from '../../utils/layout'

const props = defineProps({
  id: String,
  data: Object
})

const vueFlow = inject('vueFlow')

const toggle = () => {
  const collapsed = !props.data.collapsed
  props.data.collapsed = collapsed

  const children = props.data.children || []

  vueFlow.updateNode(props.id, { data: props.data })

  // 切換子節點 hidden
  children.forEach(childId => {
    vueFlow.updateNode(childId, {
      hidden: collapsed
    })
  })

   // ✅ 在這裡呼叫 layout
//   const newPositions = runLayout(nodes.value, edges.value)
  vueFlow.updateNodePositions(newPositions)

  // 可選：重新 layout
  if (vueFlow.fitView) {
    setTimeout(() => vueFlow.fitView({ padding: 0.2 }), 50)
  }
}
</script>

<style scoped>
.group-node {
  cursor: pointer;
  user-select: none;
}
</style>