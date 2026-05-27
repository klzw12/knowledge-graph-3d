import { graphData } from './graph-data.js'
import { Graph3D } from './Graph3D.js'
import { InfoPanel } from './InfoPanel.js'

// 构建 nodeMap 供 InfoPanel 使用
const nodeMap = new Map()
for (const n of graphData.nodes) {
  nodeMap.set(n.id, n)
}

const graph = new Graph3D('canvas-container')
const panel = new InfoPanel(graphData.edges, nodeMap)

graph.build(graphData)

// 点击节点
graph.onNodeClick = (nodeData) => {
  if (nodeData) {
    panel.show(nodeData)
  } else {
    panel.hide()
  }
}

// 悬停面包屑
const breadcrumb = document.getElementById('breadcrumb')
graph.onNodeHover = (nodeData) => {
  breadcrumb.textContent = nodeData ? `📍 ${nodeData.label}` : ''
  breadcrumb.style.opacity = nodeData ? '1' : '0'
}

// 焦点切换（从详情面板点击关联节点）
document.addEventListener('kg:focus', (e) => {
  const { nodeId } = e.detail
  const node = nodeMap.get(nodeId)
  if (node) {
    graph.selectNode(nodeId)
    panel.show(node)
  }
})

// ESC 关闭面板
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    panel.hide()
    graph.selectNode(null)
  }
})

console.log('🕸️ Knowledge Graph 3D 已启动！')
console.log('📝 编辑 src/graph-data.js 来添加节点和关联')
