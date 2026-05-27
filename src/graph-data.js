/**
 * 🕸️ Knowledge Graph 数据
 * =======================
 * 
 * 数据格式 = 树层级（root + children） + relations[]（交叉关联）
 * 
 * 为什么这样设计？
 * - 树层级 → 维护清晰，一眼看出归属关系
 * - relations → 任意交叉，不受树结构限制！
 * 
 * 📝 添加节点：
 *   在对应父节点的 children 数组里加，格式：
 *   { id: '唯一id', label: '显示名', color: '#hex',
 *     description: '...', url: '...', content: {...},
 *     children: [ ... ] }  // 可选子节点
 * 
 * 📝 添加交叉关联（树做不到的）：
 *   在 relations 数组里加：
 *   { source: '节点A', target: '节点B', label: '关系描述', color: '#hex' }
 *   A 和 B 可以是树上任意位置的任意节点，完全不受层级限制！
 */

export const graphData = {
  title: 'AI 知识图谱',

  // ── 根节点（层级嵌套，维护清晰） ──
  root: {
    id: 'ai',
    label: '人工智能',
    color: '#ff6b6b',
    description: '让机器模拟人类智能的学科',
    content: { summary: '人工智能是计算机科学的分支，涵盖机器学习、推理、感知、自然语言处理等领域。', tags: ['核心'] },
    children: [
      // ── 数学基础 ──
      {
        id: 'math',
        label: '数学基础',
        color: '#ffd93d',
        description: 'AI 算法的数学根基',
        content: { summary: '线性代数、概率统计、微积分、最优化——AI 算法的数学根基。', tags: ['基础'] },
      },

      // ── 机器学习 ──
      {
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

      // ── 深度学习 ──
      {
        id: 'dl',
        label: '深度学习',
        color: '#6bcb77',
        description: '多层神经网络学习层次化特征',
        content: { summary: '基于多层神经网络的机器学习方法，在图像、语音、文本等领域取得突破。', tags: ['核心领域', '神经网络'] },
        children: [
          { id: 'cnn', label: 'CNN', color: '#4ecdc4', description: '卷积神经网络' },
          { id: 'rnn', label: 'RNN', color: '#45b7d1', description: '循环神经网络' },
          {
            id: 'transformer',
            label: 'Transformer',
            color: '#96ceb4',
            description: '自注意力机制',
            content: { summary: '基于自注意力机制的架构。彻底改变了 NLP 和 CV 领域。', tags: ['里程碑', 'NLP', 'CV'] },
            children: [
              { id: 'bert', label: 'BERT', color: '#86bea4' },
              { id: 'gpt', label: 'GPT', color: '#76ae94' },
            ],
          },
          { id: 'gan', label: 'GAN', color: '#88d8b0', description: '生成对抗网络' },
        ],
      },

      // ── 强化学习 ──
      {
        id: 'rl',
        label: '强化学习',
        color: '#4d96ff',
        description: '智能体与环境交互学习最优策略',
        content: { summary: 'Agent 通过试错学习最大化累积奖励。', tags: ['核心领域'] },
        children: [
          { id: 'dqn', label: 'DQN', color: '#2d76df' },
          { id: 'ppo', label: 'PPO', color: '#3d86df' },
        ],
      },

      // ── 应用领域 ──
      {
        id: 'nlp',
        label: '自然语言处理',
        color: '#a29bfe',
        description: '让计算机理解、生成和处理人类语言',
        content: { summary: '涵盖文本分析、语义理解、语言生成等方向。', tags: ['应用领域', '语言'] },
      },
      {
        id: 'cv',
        label: '计算机视觉',
        color: '#fd79a8',
        description: '让计算机理解和分析图像与视频',
        content: { summary: '图像分类、目标检测、语义分割、姿态估计。', tags: ['应用领域', '视觉'] },
      },
      {
        id: 'yolo',
        label: 'YOLO',
        color: '#007d75',
        description: 'You Only Look Once — 实时目标检测',
      },
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
        content: { summary: '以图结构表示实体及其关系。就像我们这个项目！', tags: ['meta', '图结构'] },
      },

      // ── 工具 ──
      { id: 'python', label: 'Python', color: '#3776AB', description: 'AI 第一语言' },
      { id: 'pytorch', label: 'PyTorch', color: '#EE4C2C' },
      { id: 'tf', label: 'TensorFlow', color: '#FF6F00' },
    ],
  },

  // ── ★ 交叉关联（树做不到的！） ──
  // source/target 可以是树上任意位置的任意节点
  relations: [
    // DL ↔ 应用领域 交叉
    { source: 'transformer', target: 'nlp', label: '核心架构', color: '#ffaa00' },
    { source: 'transformer', target: 'cv', label: '应用', color: '#ff6688' },
    { source: 'cnn', target: 'cv', label: '核心方法', color: '#ff6688' },
    { source: 'rnn', target: 'nlp', label: '传统方法', color: '#ffaa00' },
    { source: 'yolo', target: 'cnn', label: '基于', color: '#4ecdc4' },
    { source: 'yolo', target: 'cv', label: '应用', color: '#fd79a8' },

    // NLP/DL 交叉
    { source: 'nlp', target: 'bert', label: '核心模型', color: '#ffaa00' },
    { source: 'nlp', target: 'gpt', label: '核心模型', color: '#ffaa00' },

    // 跨领域
    { source: 'recommender', target: 'ml', label: '基于', color: '#ffaa44' },
    { source: 'knowledge-graph', target: 'nlp', label: '相关', color: '#ffaa00' },
    { source: 'knowledge-graph', target: 'recommender', label: '可用于', color: '#00cec9' },

    // 工具关联
    { source: 'python', target: 'ml', label: '语言', color: '#3776AB' },
    { source: 'python', target: 'dl', label: '语言', color: '#3776AB' },
    { source: 'pytorch', target: 'dl', label: '框架', color: '#EE4C2C' },
    { source: 'tf', target: 'dl', label: '框架', color: '#FF6F00' },
    { source: 'python', target: 'pytorch', label: '生态', color: '#3776AB' },
    { source: 'python', target: 'tf', label: '生态', color: '#3776AB' },
  ],
}
