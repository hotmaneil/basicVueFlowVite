<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const nodes = ref([
    {
        id: '1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: '煮珍珠（工序 A）' },
    },

    {
        id: '2',
        position: { x: 200, y: 200 },
        data: { label: '泡茶（工序 B）' },
    },

    {
        id: '3',
        position: { x: 300, y: 300 },
        data: { label: '加料混合（工序 C）' },
    },

    {
        id: '4',
        type: 'output',
        position: { x: 400, y: 400 },
        data: { label: '封口 & 包裝（工序 D）' },
    },
])

const edges = ref([

])

const { onConnect, addEdges } = useVueFlow()
onConnect(({ source, target, sourceHandle, targetHandle }) => {
    console.log('source', source)
    console.log('target', target)
    console.log('sourceHandle', sourceHandle)
    console.log('targetHandle', targetHandle)
    addEdges({ source, target, sourceHandle, targetHandle })

    const timeStr = `${new Date().getMinutes()}-${new Date().getSeconds()}`
    edges.value.push({
        id: timeStr,
        source: source,
        target: target,
    })
})

</script>

<template>
    <VueFlow :nodes="nodes" :edges="edges">
    </VueFlow>
</template>

<style></style>