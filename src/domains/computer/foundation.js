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
    src: '/pages/foundation.html',
    content: { summary: '一切自然科学的基石与通用语言，AI 算法的理论源头。', tags: ['基础'] },
    children: [
      {
        id: 'linear-algebra',
        label: '线性代数',
        color: '#d4a000',
        src: '/pages/foundation/linear-algebra.html',
        children: [
          {
            id: 'determinant',
            label: '行列式',
            color: '#c89810',
            src: '/pages/foundation/linear-algebra/determinant.html',
          },
          { id: 'matrix', label: '矩阵运算', color: '#c09000', src: '/pages/foundation/linear-algebra/matrix.html' },
          {
            id: 'vector',
            label: '向量与线性方程组',
            color: '#b08000',
            src: '/pages/foundation/linear-algebra/vector.html',
          },
          {
            id: 'linear-equations',
            label: '线性方程组',
            color: '#a87800',
            src: '/pages/foundation/linear-algebra/linear-equations.html',
          },
          {
            id: 'eigen',
            label: '特征值分解',
            color: '#ac8000',
            src: '/pages/foundation/linear-algebra/eigen.html',
          },
          { id: 'svd', label: 'SVD 分解', color: '#987000' },
          {
            id: 'quadratic-forms',
            label: '二次型',
            color: '#906000',
            src: '/pages/foundation/linear-algebra/quadratic-forms.html',
          },
        ],
      },
      {
        id: 'calculus',
        label: '微积分',
        color: '#c0a000',
        src: '/pages/foundation/calculus.html',
        children: [
          { id: 'derivative', label: '导数与梯度', color: '#ac8c00' },
          { id: 'chain-rule', label: '链式法则', color: '#987800' },
        ],
      },
      {
        id: 'probability',
        label: '概率与统计',
        color: '#b09800',
        src: '/pages/foundation/probability.html',
        children: [
          {
            id: 'prob-ch1',
            label: '随机事件与概率',
            color: '#a89000',
            src: '/pages/foundation/probability/chapter-1.html',
            content: { summary: '随机事件、概率空间公理化、古典概型、条件概率、全概率与贝叶斯公式、伯努利概型。概率论的基石章节，涵盖从直观到公理化的完整概率认知路径。', tags: ['概率论', '考研'] },
            children: [
              { id: 'ch1-basic', label: '随机事件与样本空间', color: '#a08400' },
              { id: 'ch1-prob-def', label: '概率的定义与性质', color: '#987800' },
              { id: 'ch1-classical', label: '古典概型与几何概型', color: '#8c7000' },
              { id: 'ch1-conditional', label: '条件概率', color: '#806800' },
              { id: 'ch1-total-bayes', label: '全概率与贝叶斯公式', color: '#746000' },
              { id: 'ch1-bernoulli', label: '伯努利概型与二项分布', color: '#685800' },
            ],
          },
          { id: 'bayes', label: '贝叶斯定理', color: '#9c8400' },
          { id: 'distribution', label: '概率分布', color: '#887000' },
        ],
      },
      {
        id: 'optimization',
        label: '最优化',
        color: '#a09000',
        src: '/pages/foundation/optimization.html',
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
    // 概率论内部
    { source: 'ch1-total-bayes', target: 'bayes', label: '贝叶斯公式', color: '#b09800' },
    { source: 'ch1-bernoulli', target: 'distribution', label: '伯努利→二项分布', color: '#b09800' },
    { source: 'ch1-bernoulli', target: 'common-ml', label: '分类问题基础', color: '#b09800' },
    // 线代内部
    { source: 'determinant', target: 'matrix', label: '矩阵标量映射', color: '#d4a000' },
    { source: 'determinant', target: 'eigen', label: '特征方程基础', color: '#d4a000' },
    { source: 'vector', target: 'determinant', label: '相关⇔|A|=0', color: '#d4a000' },
    { source: 'vector', target: 'matrix', label: '三秩相等', color: '#d4a000' },
    { source: 'linear-equations', target: 'matrix', label: '秩判定', color: '#d4a000' },
    { source: 'linear-equations', target: 'vector', label: '解空间结构', color: '#d4a000' },
    { source: 'linear-equations', target: 'determinant', label: 'D=0⇔非零解', color: '#d4a000' },
    { source: 'eigen', target: 'matrix', label: '相似对角化', color: '#d4a000' },
    { source: 'eigen', target: 'vector', label: '特征向量空间', color: '#d4a000' },
    { source: 'eigen', target: 'determinant', label: '特征多项式', color: '#d4a000' },
    { source: 'quadratic-forms', target: 'eigen', label: '正交变换化标准形', color: '#d4a000' },
    { source: 'quadratic-forms', target: 'matrix', label: '实对称矩阵', color: '#d4a000' },
    { source: 'quadratic-forms', target: 'determinant', label: '顺序主子式判正定', color: '#d4a000' },
  ],
}
