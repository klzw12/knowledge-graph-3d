/**
 * 🕸️ Domain 入口
 * ==============
 * 所有数据合并的入口，按"大类 → 子域"层级导入。
 * 
 * 目录结构：
 *   index.js        ← 入口（你在这里）
 *   computer.js     ← "计算机"大类
 *   computer/
 *   ├── ai.js       ← "人工智能"子域
 *   ├── ai/
 *   │   ├── ml.js   ← 机器学习（叶子）
 *   │   ├── dl.js
 *   │   ├── rl.js
 *   │   ├── nlp.js
 *   │   ├── cv.js
 *   │   └── systems.js
 *   ├── foundation.js ← 数学基础（叶子）
 *   └── tools.js      ← 工具链（叶子）
 * 
 * 📝 新增大类（如：学习方法）：
 *   1. 在 domains/ 下建个文件夹，里面放子域文件
 *   2. 建一个 xxx.js 合并它们
 *   3. 在下面 import 并加入 categories 数组
 */

import computer from './computer.js'

// ★ 新大类加在这里！
const categories = [
  computer,
  // { id: 'dopamine', label: '学习方法', ... }
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
