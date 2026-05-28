/**
 * 🕸️ Domain 合并器
 * ==================
 * 自动合并所有 domain 文件为一个完整图谱。
 * 
 * 树结构：
 *   root (虚拟根)
 *     └── 💻 计算机
 *         ├── 🤖 人工智能
 *         │   ├── 机器学习 (ml)
 *         │   ├── 深度学习 (dl)
 *         │   ├── 强化学习 (rl)
 *         │   ├── NLP (nlp)
 *         │   ├── CV (cv)
 *         │   └── 推荐系统 & 知识图谱 (systems)
 *         ├── 📐 数学基础 (foundation)
 *         └── 🔧 工具链 (tools)
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

// AI domain — 作为 computer 的子域，聚合 ml/dl/rl/nlp/cv/systems
const aiDomain = {
  id: 'ai',
  label: '人工智能',
  color: '#ff6b6b',
  description: '让机器模拟人类智能的学科',
  content: { summary: '人工智能是计算机科学的核心分支，涵盖机器学习、推理、感知、自然语言处理等领域。', tags: ['核心'] },
  children: [ml.root, dl.root, rl.root, nlp.root, cv.root, systems.root],
}

// 合并所有 domain
export const graphData = {
  title: '知识图谱',

  // 根节点：虚拟根 → 计算机
  root: {
    id: 'root',
    label: '知识图谱',
    color: '#ffffff',
    description: '我的知识体系',
    children: [
      {
        id: 'computer',
        label: '计算机科学',
        color: '#4d96ff',
        description: '计算机科学与技术',
        content: { summary: '计算机科学是研究信息与计算的理论基础，以及如何在计算机系统中实现它们的学科。', tags: ['大类'] },
        children: [
          aiDomain,
          foundation.root,
          tools.root,
        ],
      },
      // ★ 未来可以在 root 下加其他大类，比如：
      // { id: 'dopamine', label: '学习方法', color: '#ff88cc', children: [...] }
    ],
  },

  // 合并所有交叉关联
  relations: [
    ...domains.flatMap(d => d.relations || []),
    // 也可以在这里加跨域的全局关联
    // { source: 'ml', target: 'foundation', label: '依赖数学基础', color: '#ffaa00' },
  ],
}

// 打印统计
console.log(`🕸️ 已加载 ${domains.length} 个领域`)

function countNodes(root) {
  let n = 1
  if (root.children) root.children.forEach(c => { n += countNodes(c) })
  return n
}
const totalNodes = countNodes(graphData.root)
console.log(`📊 共 ${totalNodes} 个节点, ${graphData.relations.length} 条交叉关联`)
