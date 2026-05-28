/**
 * 📂 数学
 * 
 * AI/ML 所需的核心数学知识
 */

export default {
  root: {
    id: 'math',
    label: '数学',
    color: '#eab308',
    description: 'AI 算法的数学根基',
    content: { summary: '一切自然科学的基石与通用语言，AI 算法的理论源头。', tags: ['基础'] },
    children: [
      {
        id: 'linear-algebra',
        label: '线性代数',
        color: '#d4a000',
        children: [
          { id: 'matrix', label: '矩阵运算', color: '#c09000' },
          { id: 'eigen', label: '特征值分解', color: '#ac8000' },
          { id: 'svd', label: 'SVD 分解', color: '#987000' },
        ],
      },
      {
        id: 'calculus',
        label: '微积分',
        color: '#c0a000',
        children: [
          { id: 'derivative', label: '导数与梯度', color: '#ac8c00' },
          { id: 'chain-rule', label: '链式法则', color: '#987800' },
        ],
      },
      {
        id: 'probability',
        label: '概率与统计',
        color: '#b09800',
        children: [
          { id: 'bayes', label: '贝叶斯定理', color: '#9c8400' },
          { id: 'distribution', label: '概率分布', color: '#887000' },
        ],
      },
      {
        id: 'optimization',
        label: '最优化',
        color: '#a09000',
        children: [
          { id: 'gd', label: '梯度下降', color: '#8c7c00' },
          { id: 'convex', label: '凸优化', color: '#786800' },
        ],
      },
    ],
  },
  relations: [
    // 跨域：ML ↔ 数学
    { source: 'linear-reg', target: 'linear-algebra', label: '依赖', color: '#eab308' },
    { source: 'pca', target: 'linear-algebra', label: '依赖', color: '#eab308' },
    { source: 'svm', target: 'optimization', label: '依赖', color: '#eab308' },
    { source: 'gd', target: 'dl', label: '核心算法', color: '#eab308' },
    { source: 'chain-rule', target: 'dl', label: '反向传播基础', color: '#eab308' },
    { source: 'bayes', target: 'nlp', label: '基础', color: '#eab308' },
    { source: 'distribution', target: 'common-ml', label: '基础', color: '#eab308' },
    { source: 'matrix', target: 'dl', label: '张量运算基础', color: '#eab308' },
    { source: 'svd', target: 'recommender', label: '推荐系统基础', color: '#eab308' },
  ],
}
