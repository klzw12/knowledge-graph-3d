/**
 * 🎯 推荐系统
 *
 * AI 应用领域：为用户推荐个性化内容
 */

export default {
  root: {
    id: 'recommender',
    label: '推荐系统',
    color: '#ec4899',
    description: '为用户推荐个性化内容',
    content: { summary: '利用用户行为数据和内容特征，预测用户偏好并推荐相关内容。核心方法包括协同过滤、内容基和混合推荐。', tags: ['应用', '推荐'] },
    children: [],
  },
  relations: [
    { source: 'recommender', target: 'algo-base', label: '基于算法底座', color: '#a29bfe' },
    { source: 'recommender', target: 'dl', label: 'DL 推荐模型', color: '#a855f7' },
  ],
}
