/**
 * 📂 推荐系统 & 知识图谱
 */
export default {
  root: {
    id: 'systems',
    label: '推荐与知识',
    color: '#e17055',
    description: '推荐系统和知识图谱',
    children: [
      {
        id: 'recommender',
        label: '推荐系统',
        color: '#e17055',
        description: '为用户推荐个性化内容',
      },
      {
        id: 'knowledge-graph',
        label: '知识图谱',
        color: '#00cec9',
        description: '用图结构组织知识',
        content: { summary: '以图结构表示实体及其关系的知识库。就像我们这个项目！', tags: ['meta', '图结构'] },
      },
    ],
  },
  relations: [
    { source: 'recommender', target: 'ml', label: '基于', color: '#ffaa44' },
    { source: 'knowledge-graph', target: 'nlp', label: '相关', color: '#ffaa00' },
    { source: 'knowledge-graph', target: 'recommender', label: '可用于', color: '#00cec9' },
  ],
}
