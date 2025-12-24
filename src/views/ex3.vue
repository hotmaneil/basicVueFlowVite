<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

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
    {
        id: 'e1->2',
        source: '1',
        target: '2',
    },
    {
        id: 'e2->3',
        source: '2',
        target: '3',
    },
    {
        id: 'e3->4',
        source: '3',
        target: '4',
    }
])
</script>

<template>
    <VueFlow :nodes="nodes" :edges="edges">
    </VueFlow>
</template>

<style></style>