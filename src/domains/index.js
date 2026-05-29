/**
 * 🕸️ Domain 入口
 * ==============
 * 
 * 两大顶级领域：
 *   💻 计算机科学 → AI / 语言与框架
 *   📐 数学       → 线性代数 / 微积分 / ...
 * 
 * 📝 新增大类：在下面 import 并加入 categories 数组
 */

import computer from './computer.js'
import foundation from './computer/foundation.js'

const categories = [
  computer,     // 💻 计算机科学
  foundation,   // 📐 数学
]

export const graphData = {
  title: '知识图谱',
  root: {
    id: 'root',
    label: '知识图谱',
    color: '#ffffff',
    description: '我的知识体系',
    src: '_template.html',
    children: categories.map(c => c.root),
  },
  relations: categories.flatMap(c => c.relations || []),
}

const totalNodes = countNodes(graphData.root)
console.log(`🕸️ 已加载 ${categories.length} 个大类, 共 ${totalNodes} 个节点, ${graphData.relations.length} 条交叉关联`)

function countNodes(root) {
  let n = 1
  if (root.children) root.children.forEach(c => { n += countNodes(c) })
  return n
}
