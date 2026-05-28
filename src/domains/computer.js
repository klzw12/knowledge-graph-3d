/**
 * 💻 计算机科学 (Computer)
 * 
 * 合并计算机大类下的所有子域（AI、数学基础、工具链）
 * 由 index.js 导入
 */

import ai from './computer/ai.js'
import foundation from './computer/foundation.js'
import tools from './computer/tools.js'

const subDomains = [ ai, foundation, tools ]

export default {
  root: {
    id: 'computer',
    label: '计算机科学',
    color: '#4d96ff',
    description: '计算机科学与技术',
    content: { summary: '计算机科学是研究信息与计算的理论基础，以及如何在计算机系统中实现它们的学科。', tags: ['大类'] },
    children: subDomains.map(d => d.root),
  },
  relations: subDomains.flatMap(d => d.relations || []),
}
