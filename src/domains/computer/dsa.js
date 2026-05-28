/**
 * 🔷 数据结构与算法
 *
 * 计算机科学基础——数据组织方式与核心算法
 */

export default {
  root: {
    id: 'dsa',
    label: '数据结构与算法',
    color: '#00cec9',
    description: '计算机程序的基石：数据的组织、存储与操作方式',
    content: { summary: '程序效率之源，计算机科学的灵魂。决定了算法的时间与空间边界。', tags: ['基础', '核心'] },
    children: [
      {
        id: 'knowledge-graph',
        label: '图结构 · 知识图谱',
        color: '#00a8a0',
        description: '用图结构表示实体及其关系的知识库',
        content: { summary: '以节点表示实体、边表示关系的图结构数据模型。广泛应用于推荐、搜索、问答等领域。', tags: ['图结构', '数据模型'] },
      },
    ],
  },
  relations: [
    { source: 'knowledge-graph', target: 'recommender', label: '可用于推荐', color: '#00cec9' },
  ],
}
