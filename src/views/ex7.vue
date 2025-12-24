<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import CustomEdge from "../components/CustomEdge.vue";

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
        type: "custom"
    },
    {
        id: 'e2->3',
        source: '2',
        target: '3',
        type: "custom"
    },
    {
        id: 'e3->4',
        source: '3',
        target: '4',
        type: "custom"
    }
])

const { onConnect, addEdges, removeEdges } = useVueFlow()
onConnect(({ source, target, sourceHandle, targetHandle }) => {
    console.log('source', source)
    console.log('target', target)
    console.log('sourceHandle', sourceHandle)
    console.log('targetHandle', targetHandle)
    // addEdges({ source, target, sourceHandle, targetHandle })

    const timeStr = `${new Date().getMinutes()}-${new Date().getSeconds()}`

    addEdges([
        {
            id: timeStr, // 可選，若未指定會自動生成
            source: source,
            target: target,
            sourceHandle: sourceHandle,
            targetHandle: targetHandle,
            type: 'custom', // 指定自訂類型
        },
    ])

    edges.value.push({
        id: timeStr,
        source: source,
        target: target,
        type: "custom"
    })
})

/**
 * 刪除邊
 * @param id 
 */
function deleteEdge(id) {
    console.log('deleteEdge id', id)
    removeEdges(id)
    edges.value = edges.value.filter(x => x.id != id)
}

const { onNodesChange, onEdgesChange } = useVueFlow()

onNodesChange((changes) => {
    // changes are arrays of type `NodeChange`
    console.log('onNodesChange', changes)
})

onEdgesChange((changes) => {
    // changes are arrays of type `EdgeChange`
    console.log('onEdgesChange', changes)
})

const onChange = (changes) => {
    // changes are arrays of type `NodeChange` or `EdgeChange`
    console.log('onChange', changes)
}
</script>

<template>
    <VueFlow :nodes="nodes" :edges="edges">
        <template #edge-custom="edgeProps">
            <CustomEdge v-bind="edgeProps" :deleteFunction="deleteEdge" @nodes-change="onChange"
                @edges-change="onChange" />
        </template>
    </VueFlow>
</template>

<style></style>