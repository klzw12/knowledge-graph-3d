/**
 * 🕸️ Domain 入口
 * ==============
 * 所有数据合并的入口。
 * 每个大类是顶级分类，平级挂载在虚拟根节点下。
 * 
 * 目录结构：
 *   index.js              ← 入口（你在这里）
 *   domain-colors.js      ← 领域色彩配置
 *   computer/
 *   ├── ai.js             ← "人工智能"大类（合并 ml/dl/rl/nlp/cv/systems）
 *   ├── ai/
 *   │   ├── ml.js, dl.js, ...
 *   ├── foundation.js     ← "数学基础"大类（叶子）
 *   └── languages.js      ← "语言与框架"大类（叶子）
 * 
 * 📝 新增大类：
 *   1. 在 computer/ 下新建文件（或任何位置）
 *   2. 在下面 import 并加入 categories 数组
 */

import ai from './computer/ai.js'
import foundation from './computer/foundation.js'
import languages from './computer/languages.js'

// ★ 新大类加在这里！
const categories = [
  ai,             // 🤖 人工智能
  foundation,     // 📐 数学基础
  languages,      // 🔧 语言与框架
]

// 虚拟根节点
export const graphData = {
  title: '知识图谱',
  root: {
    id: 'root',
    label: '知识图谱',
    color: '#ffffff',
    description: '我的知识体系',
    children: categories.map(c => c.root),
  },
  relations: categories.flatMap(c => c.relations || []),
}

// 打印统计
const totalNodes = countNodes(graphData.root)
console.log(`🕸️ 已加载 ${categories.length} 个大类, 共 ${totalNodes} 个节点, ${graphData.relations.length} 条交叉关联`)

function countNodes(root) {
  let n = 1
  if (root.children) root.children.forEach(c => { n += countNodes(c) })
  return n
}
