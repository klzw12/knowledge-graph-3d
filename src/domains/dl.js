/**
 * 📂 深度学习 (DL)
 */
export default {
  root: {
    id: 'dl',
    label: '深度学习',
    color: '#6bcb77',
    description: '多层神经网络学习层次化特征',
    content: { summary: '基于多层神经网络的机器学习方法。', tags: ['核心领域', '神经网络'] },
    children: [
      { id: 'cnn', label: 'CNN', color: '#4ecdc4', description: '卷积神经网络' },
      { id: 'rnn', label: 'RNN', color: '#45b7d1', description: '循环神经网络' },
      {
        id: 'transformer',
        label: 'Transformer',
        color: '#96ceb4',
        description: '自注意力机制 — 彻底改变 NLP 和 CV',
        content: { summary: '基于自注意力机制的架构。核心：多头注意力、位置编码。', tags: ['里程碑', 'NLP', 'CV'] },
        children: [
          { id: 'bert', label: 'BERT', color: '#86bea4' },
          { id: 'gpt', label: 'GPT', color: '#76ae94' },
        ],
      },
      { id: 'gan', label: 'GAN', color: '#88d8b0', description: '生成对抗网络' },
      { id: 'yolo', label: 'YOLO', color: '#007d75', description: 'You Only Look Once — 实时目标检测' },
    ],
  },

  // DL 与其他域的交叉关联
  relations: [
    { source: 'transformer', target: 'nlp', label: '核心架构', color: '#ffaa00' },
    { source: 'transformer', target: 'cv', label: '应用', color: '#ff6688' },
    { source: 'cnn', target: 'cv', label: '核心方法', color: '#ff6688' },
    { source: 'rnn', target: 'nlp', label: '传统方法', color: '#ffaa00' },
    { source: 'yolo', target: 'cnn', label: '基于', color: '#4ecdc4' },
    { source: 'yolo', target: 'cv', label: '应用', color: '#fd79a8' },
    { source: 'nlp', target: 'bert', label: '核心模型', color: '#ffaa00' },
    { source: 'nlp', target: 'gpt', label: '核心模型', color: '#ffaa00' },
  ],
}
