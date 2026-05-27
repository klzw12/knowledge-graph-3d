/**
 * 📂 机器学习 (ML)
 * 编辑这个文件来管理 ML 领域的所有节点
 */
export default {
  root: {
    id: 'ml',
    label: '机器学习',
    color: '#ffaa3a',
    description: '从数据中学习模式',
    content: { summary: '让计算机通过数据自动学习规律，无需显式编程。', tags: ['核心领域'] },
    children: [
      {
        id: 'supervised',
        label: '监督学习',
        color: '#ff9933',
        children: [
          { id: 'linear-reg', label: '线性回归', color: '#ff8866' },
          { id: 'svm', label: 'SVM', color: '#ff7755' },
          { id: 'decision-tree', label: '决策树', color: '#ff6644' },
          { id: 'knn', label: 'KNN', color: '#ff5533' },
        ],
      },
      {
        id: 'unsupervised',
        label: '无监督学习',
        color: '#e8c840',
        children: [
          { id: 'kmeans', label: 'K-Means', color: '#d4b830' },
          { id: 'pca', label: 'PCA', color: '#c0a820' },
        ],
      },
      {
        id: 'ensemble',
        label: '集成学习',
        color: '#d4a030',
        children: [
          { id: 'random-forest', label: '随机森林', color: '#c09020' },
          { id: 'xgboost', label: 'XGBoost', color: '#ac8010' },
        ],
      },
    ],
  },

  // 本域内的交叉关联（也可引用其他域的节点）
  relations: [],
}
