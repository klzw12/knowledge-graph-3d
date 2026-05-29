/**
 * 📂 传统机器学习 (Common ML)
 * 编辑这个文件来管理 Common ML 领域的所有节点
 */
export default {
  root: {
    id: 'common-ml',
    label: '传统机器学习',
    color: '#ffaa3a',
    description: '从数据中学习模式（非深度学习传统方法）',
    content: { summary: 'Traditional Machine Learning — 让计算机通过数据自动学习规律，无需显式编程。传统机器学习包括监督、无监督和集成方法。', tags: ['核心领域'] },
    children: [
      {
        id: 'supervised',
        label: '监督学习',
        color: '#ff9933',
        src: 'pages/computer/ai/algo-base/common-ml/supervised.html',
        children: [
          { id: 'linear-reg', label: '线性回归', color: '#ff8866', src: 'pages/computer/ai/algo-base/common-ml/linear-reg.html' },
          { id: 'svm', label: 'SVM', color: '#ff7755', src: 'pages/computer/ai/algo-base/common-ml/svm.html' },
          { id: 'decision-tree', label: '决策树', color: '#ff6644', src: 'pages/computer/ai/algo-base/common-ml/decision-tree.html' },
          { id: 'knn', label: 'KNN', color: '#ff5533', src: 'pages/computer/ai/algo-base/common-ml/knn.html' },
        ],
      },
      {
        id: 'unsupervised',
        label: '无监督学习',
        color: '#e8c840',
        src: 'pages/computer/ai/algo-base/common-ml/unsupervised.html',
        children: [
          { id: 'kmeans', label: 'K-Means', color: '#d4b830', src: 'pages/computer/ai/algo-base/common-ml/kmeans.html' },
          { id: 'pca', label: 'PCA', color: '#c0a820', src: 'pages/computer/ai/algo-base/common-ml/pca.html' },
        ],
      },
      {
        id: 'ensemble',
        label: '集成学习',
        color: '#d4a030',
        src: 'pages/computer/ai/algo-base/common-ml/ensemble.html',
        children: [
          { id: 'random-forest', label: '随机森林', color: '#c09020', src: 'pages/computer/ai/algo-base/common-ml/random-forest.html' },
          { id: 'xgboost', label: 'XGBoost', color: '#ac8010', src: 'pages/computer/ai/algo-base/common-ml/xgboost.html' },
        ],
      },
    ],
  },
  relations: [
    { source: 'linear-reg', target: 'linear-algebra', label: '依赖线性代数', color: '#eab308' },
    { source: 'svm', target: 'optimization', label: '依赖凸优化', color: '#eab308' },
    { source: 'pca', target: 'linear-algebra', label: '依赖线性代数', color: '#eab308' },
    { source: 'decision-tree', target: 'probability', label: '依赖信息论', color: '#eab308' },
    { source: 'knn', target: 'math', label: '依赖距离度量', color: '#eab308' },
    { source: 'kmeans', target: 'math', label: '依赖距离度量', color: '#eab308' },
  ],
}
