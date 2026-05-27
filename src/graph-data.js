/**
 * 🕸️ Knowledge Graph 数据
 * =======================
 * 
 * 图结构 = nodes + edges
 * 比树强在：一个节点可以有多个父节点，任意交叉关联！
 * 
 * 📝 添加节点：
 *   { id: '唯一id', label: '显示名', color: '#hex', group: '分组', description: '...', url: '...', content: {...} }
 * 
 * 📝 添加关联：
 *   { source: '节点id', target: '节点id', label: '关系名', color: '#hex' }
 *   关联可以任意交叉，不受树结构限制！
 */

export const graphData = {
  title: 'AI 知识图谱',
  nodes: [
    // ── 根领域 ──
    { id: 'ai', label: '人工智能', color: '#ff6b6b', group: 'core',
      description: '让机器模拟人类智能的学科',
      content: { summary: '人工智能是计算机科学的分支，涵盖机器学习、推理、感知、自然语言处理等领域。', tags: ['核心'] } },

    { id: 'math', label: '数学基础', color: '#ffd93d', group: 'foundation',
      description: 'AI 的数学基石',
      content: { summary: '线性代数、概率统计、微积分、最优化——AI 算法的数学根基。', tags: ['基础'] } },

    // ── ML ──
    { id: 'ml', label: '机器学习', color: '#ffd93d', group: 'ml',
      description: '从数据中学习模式',
      content: { summary: '让计算机通过数据自动学习规律，无需显式编程。', tags: ['核心领域'] } },

    { id: 'supervised', label: '监督学习', color: '#ffaa3a', group: 'ml',
      description: '使用标注数据训练模型',
      children: ['linear-reg', 'svm', 'decision-tree', 'knn'] },
    { id: 'linear-reg', label: '线性回归', color: '#ff9933', group: 'ml' },
    { id: 'svm', label: 'SVM', color: '#ff8833', group: 'ml' },
    { id: 'decision-tree', label: '决策树', color: '#ff7733', group: 'ml' },
    { id: 'knn', label: 'KNN', color: '#ff6655', group: 'ml' },

    { id: 'unsupervised', label: '无监督学习', color: '#e8c840', group: 'ml' },
    { id: 'ensemble', label: '集成学习', color: '#d4a030', group: 'ml',
      children: ['random-forest', 'xgboost'] },
    { id: 'random-forest', label: '随机森林', color: '#c09020', group: 'ml' },
    { id: 'xgboost', label: 'XGBoost', color: '#ac8010', group: 'ml' },

    // ── DL ──
    { id: 'dl', label: '深度学习', color: '#6bcb77', group: 'dl',
      description: '多层神经网络学习层次化特征',
      content: { summary: '基于多层神经网络的机器学习方法，在图像、语音、文本等领域取得突破。', tags: ['核心领域', '神经网络'] } },

    { id: 'cnn', label: 'CNN', color: '#4ecdc4', group: 'dl',
      description: '卷积神经网络 — 处理网格化数据' },
    { id: 'rnn', label: 'RNN', color: '#45b7d1', group: 'dl',
      description: '循环神经网络 — 处理序列数据' },
    { id: 'transformer', label: 'Transformer', color: '#96ceb4', group: 'dl',
      description: '自注意力机制 — 彻底改变 NLP 和 CV',
      content: { summary: '基于自注意力机制的架构。核心：多头注意力、位置编码、Feed-Forward。', tags: ['里程碑', 'NLP', 'CV'] } },
    { id: 'gan', label: 'GAN', color: '#88d8b0', group: 'dl',
      description: '生成对抗网络' },
    { id: 'bert', label: 'BERT', color: '#86bea4', group: 'dl' },
    { id: 'gpt', label: 'GPT', color: '#76ae94', group: 'dl' },

    // ── RL ──
    { id: 'rl', label: '强化学习', color: '#4d96ff', group: 'rl',
      description: '智能体与环境交互学习最优策略',
      content: { summary: 'Agent 通过试错学习最大化累积奖励。核心：状态、动作、奖励、策略。', tags: ['核心领域'] } },
    { id: 'dqn', label: 'DQN', color: '#2d76df', group: 'rl' },
    { id: 'ppo', label: 'PPO', color: '#3d86df', group: 'rl' },

    // ── 应用领域 ──
    { id: 'nlp', label: '自然语言处理', color: '#a29bfe', group: 'app',
      description: '让计算机理解、生成和处理人类语言',
      content: { summary: '涵盖文本分析、语义理解、语言生成等方向。', tags: ['应用领域', '语言'] } },
    { id: 'cv', label: '计算机视觉', color: '#fd79a8', group: 'app',
      description: '让计算机理解和分析图像与视频',
      content: { summary: '图像分类、目标检测、语义分割、姿态估计。', tags: ['应用领域', '视觉'] } },
    { id: 'yolo', label: 'YOLO', color: '#007d75', group: 'dl',
      description: '实时目标检测 — You Only Look Once' },
    { id: 'recommender', label: '推荐系统', color: '#e17055', group: 'app' },
    { id: 'knowledge-graph', label: '知识图谱', color: '#00cec9', group: 'app',
      description: '用图结构组织知识',
      content: { summary: '以图结构表示实体及其关系的知识库，就像我们这个项目一样！', tags: ['meta', '图结构'] } },

    // ── 编程 ──
    { id: 'python', label: 'Python', color: '#3776AB', group: 'tool',
      description: 'AI 第一语言' },
    { id: 'pytorch', label: 'PyTorch', color: '#EE4C2C', group: 'tool' },
    { id: 'tf', label: 'TensorFlow', color: '#FF6F00', group: 'tool' },
  ],

  edges: [
    // ── 领域包含关系 ──
    { source: 'ai', target: 'ml', label: '包含', color: '#ffaa4488' },
    { source: 'ai', target: 'dl', label: '包含', color: '#6bcb7788' },
    { source: 'ai', target: 'rl', label: '包含', color: '#4d96ff88' },
    { source: 'ai', target: 'nlp', label: '包含', color: '#a29bfe88' },
    { source: 'ai', target: 'cv', label: '包含', color: '#fd79a888' },

    // ── 依赖关系 ──
    { source: 'ml', target: 'math', label: '依赖', color: '#ffd93d66' },
    { source: 'dl', target: 'math', label: '依赖', color: '#6bcb7766' },
    { source: 'rl', target: 'math', label: '依赖', color: '#4d96ff66' },

    // ── ML 内部 ──
    { source: 'ml', target: 'supervised', label: '包含', color: '#ffaa3a66' },
    { source: 'ml', target: 'unsupervised', label: '包含', color: '#e8c84066' },
    { source: 'ml', target: 'ensemble', label: '包含', color: '#d4a03066' },
    { source: 'supervised', target: 'linear-reg', label: '包含', color: '#ff993366' },
    { source: 'supervised', target: 'svm', label: '包含', color: '#ff883366' },
    { source: 'supervised', target: 'decision-tree', label: '包含', color: '#ff773366' },
    { source: 'supervised', target: 'knn', label: '包含', color: '#ff665566' },
    { source: 'ensemble', target: 'random-forest', label: '包含', color: '#c0902066' },
    { source: 'ensemble', target: 'xgboost', label: '包含', color: '#ac801066' },

    // ── DL / ML 交叉 ──
    { source: 'dl', target: 'ml', label: '子领域', color: '#88ff8866' },
    { source: 'random-forest', target: 'ensemble', label: '属于', color: '#88ff8866' },

    // ── DL 内部 ──
    { source: 'dl', target: 'cnn', label: '包含', color: '#4ecdc466' },
    { source: 'dl', target: 'rnn', label: '包含', color: '#45b7d166' },
    { source: 'dl', target: 'transformer', label: '包含', color: '#96ceb466' },
    { source: 'dl', target: 'gan', label: '包含', color: '#88d8b066' },

    // ── ★ 交叉关联：Tree 做不到的 ──
    { source: 'transformer', target: 'nlp', label: '核心架构', color: '#ffaa00aa' },
    { source: 'transformer', target: 'cv', label: '应用', color: '#ff6688aa' },
    { source: 'transformer', target: 'bert', label: '衍生', color: '#86bea466' },
    { source: 'transformer', target: 'gpt', label: '衍生', color: '#76ae9466' },
    { source: 'cnn', target: 'cv', label: '核心方法', color: '#ff6688aa' },
    { source: 'rnn', target: 'nlp', label: '传统方法', color: '#ffaa00aa' },
    { source: 'yolo', target: 'cnn', label: '基于', color: '#4ecdc466' },
    { source: 'yolo', target: 'cv', label: '应用', color: '#ff668866' },
    { source: 'nlp', target: 'bert', label: '核心模型', color: '#ffaa00aa' },
    { source: 'nlp', target: 'gpt', label: '核心模型', color: '#ffaa00aa' },
    { source: 'rl', target: 'dqn', label: '包含', color: '#2d76df66' },
    { source: 'rl', target: 'ppo', label: '包含', color: '#3d86df66' },

    // ── 推荐系统 / 知识图谱 ──
    { source: 'recommender', target: 'ml', label: '基于', color: '#ffaa4466' },
    { source: 'knowledge-graph', target: 'nlp', label: '相关', color: '#ffaa0066' },
    { source: 'knowledge-graph', target: 'recommender', label: '可用于', color: '#00cec966' },

    // ── 工具 ──
    { source: 'python', target: 'ml', label: '语言', color: '#3776AB66' },
    { source: 'python', target: 'dl', label: '语言', color: '#3776AB66' },
    { source: 'pytorch', target: 'dl', label: '框架', color: '#EE4C2C66' },
    { source: 'tf', target: 'dl', label: '框架', color: '#FF6F0066' },
    { source: 'python', target: 'pytorch', label: '生态', color: '#3776AB66' },
    { source: 'python', target: 'tf', label: '生态', color: '#3776AB66' },
  ],
}
