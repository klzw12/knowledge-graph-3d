import { graphData } from './graph-data.js'
import { Graph3D } from './Graph3D.js'
import { InfoPanel } from './InfoPanel.js'

const graph = new Graph3D('canvas-container')
const panel = new InfoPanel()

// 构建节点全量 map 供 InfoPanel 使用
const allNodes = new Map()
const walk = (node) => {
  allNodes.set(node.id, node)
  if (node.children) node.children.forEach(c => walk(c))
}
walk(graphData.root)
panel.setNodeMap(allNodes)
panel.setRelations(graphData.relations)

graph.build(graphData)

// 点击
graph.onNodeClick = (nodeData) => {
  if (nodeData) panel.show(nodeData)
  else panel.hide()
}

// 悬停面包屑
const breadcrumb = document.getElementById('breadcrumb')
graph.onNodeHover = (nodeData) => {
  breadcrumb.textContent = nodeData ? `📍 ${nodeData.label}` : ''
  breadcrumb.style.opacity = nodeData ? '1' : '0'
}

// 焦点切换
document.addEventListener('kg:focus', (e) => {
  const { nodeId } = e.detail
  const node = allNodes.get(nodeId)
  if (node) {
    graph.selectNode(nodeId)
    panel.show(node)
  }
})

// ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { panel.hide(); graph.selectNode(null) }
})

console.log('🕸️ Knowledge Graph 3D 已启动！')
console.log('📝 编辑 src/graph-data.js 来添加节点和交叉关联')
