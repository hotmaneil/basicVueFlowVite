<!-- 
 drag & drop
 主要修改
 -->

<template>
    <div class="dnd-flow" @drop="handleDrop">
        <VueFlow :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave">
            <DropzoneBackground :style="{
                backgroundColor: isDragOver ? '#FFED97' : 'transparent',
                transition: 'background-color 0.2s ease',
            }">
                <p v-if="isDragOver">Drop here</p>
            </DropzoneBackground>
            <template #edge-custom="edgeProps">
                <CustomEdgeArrow v-bind="edgeProps" :deleteFunction="deleteEdge" @nodes-change="onChange"
                    @edges-change="onChange" />
            </template>
        </VueFlow>
        <selectSidebar />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow, MarkerType } from '@vue-flow/core'
// import CustomEdge from '../components/CustomEdge.vue'
import CustomEdgeArrow from '../components/CustomEdgeArrow.vue'
import selectSidebar from '../components/selectSidebar.vue'
import DropzoneBackground from '../components/DropzoneBackground.vue'
import useDragAndDrop from '../js/useDragAndDrop'

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()

const nodes = ref([
    {
        id: '1',
        type: 'input',
        position: { x: 100, y: 100 },
        data: { label: '煮珍珠（工序 A）' },
    },

    {
        id: '2',
        position: { x: 100, y: 200 },
        data: { label: '泡茶（工序 B）' },
    },

    {
        id: '3',
        position: { x: 100, y: 300 },
        data: { label: '加料混合（工序 C）' },
    },

    {
        id: '4',
        type: 'output',
        position: { x: 100, y: 400 },
        data: { label: '封口 & 包裝（工序 D）' },
    },
])

const edges = ref([
    {
        id: 'e1->2',
        source: '1',
        target: '2',
        type: "custom",
        markerEnd: MarkerType.Arrow,
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

const { onConnect, addEdges, removeEdges, applyNodeChanges } = useVueFlow()
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
        type: "custom",     
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
    const nextChanges = []

    for (const change of changes) {
        if (change.type === 'remove') {
            console.log('onNodesChange remove change', change)
            nodes.value = nodes.value.filter(x => x.id != change.id)
        } else {
            nextChanges.push(change)
        }
    }

    applyNodeChanges(nextChanges)
})

onEdgesChange((changes) => {
    // changes are arrays of type `EdgeChange`
    console.log('onEdgesChange', changes)
})

const onChange = (changes) => {
    // changes are arrays of type `NodeChange` or `EdgeChange`
    console.log('onChange', changes)
}

/**
 * 拖曳動作
 * @param event 
 */
function handleDrop(event) {
    const newNode = onDrop(event)
    console.log('handleDrop newNode', newNode)
    console.log('handleDrop event', event)
    nodes.value.push(newNode)
}
</script>


<style></style>