/**
 * 🕸️ Domain 合并器
 * ==================
 * 自动合并所有 domain 文件为一个完整图谱。
 * 
 * 新增领域只需：
 * 1. 在 src/domains/ 下新建文件
 * 2. 在这里 import + 加入 domains 数组
 * 搞定！
 */

import ml from './ml.js'
import dl from './dl.js'
import rl from './rl.js'
import nlp from './nlp.js'
import cv from './cv.js'
import tools from './tools.js'
import foundation from './foundation.js'
import systems from './systems.js'

// ★ 新领域加在这里！
const domains = [
  foundation,
  ml,
  dl,
  rl,
  nlp,
  cv,
  tools,
  systems,
]

// 合并所有 domain
export const graphData = {
  title: 'AI 知识图谱',

  // 根节点包含所有领域
  root: {
    id: 'ai',
    label: '人工智能',
    color: '#ff6b6b',
    description: '让机器模拟人类智能的学科',
    content: { summary: '人工智能是计算机科学的分支，涵盖机器学习、推理、感知、自然语言处理等领域。', tags: ['核心'] },
    children: domains.map(d => d.root),
  },

  // 合并所有交叉关联
  relations: domains.flatMap(d => d.relations || []),
}

// 打印统计
console.log(`🕸️ 已加载 ${domains.length} 个领域`)
console.log(`📊 共 ${countNodes(graphData.root)} 个节点, ${graphData.relations.length} 条交叉关联`)

function countNodes(root) {
  let n = 1
  if (root.children) root.children.forEach(c => { n += countNodes(c) })
  return n
}
