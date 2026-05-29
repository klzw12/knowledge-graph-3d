/**
 * 📂 语言与框架
 * 
 * 编程语言和 AI 框架
 */

export default {
  root: {
    id: 'languages',
    label: '语言与框架',
    color: '#8b5cf6',
    description: 'AI 领域的编程语言和框架',
    src: '/pages/computer/languages.html',
    content: { summary: '将算法构想转化为可运行代码的工具生态，AI 开发者的兵器谱。', tags: ['工具'] },
    children: [
      { id: 'python', label: 'Python', color: '#3776AB', description: 'AI 第一语言' },
      { id: 'pytorch', label: 'PyTorch', color: '#EE4C2C' },
      { id: 'tf', label: 'TensorFlow', color: '#FF6F00' },
      { id: 'jax', label: 'JAX', color: '#00AEDB' },
    ],
  },
  relations: [
    { source: 'python', target: 'common-ml', label: '实现语言', color: '#3776AB' },
    { source: 'python', target: 'dl', label: '实现语言', color: '#3776AB' },
    { source: 'pytorch', target: 'dl', label: '主流框架', color: '#EE4C2C' },
    { source: 'tf', target: 'dl', label: '框架', color: '#FF6F00' },
    { source: 'jax', target: 'dl', label: '框架', color: '#00AEDB' },
    { source: 'python', target: 'pytorch', label: '生态', color: '#3776AB' },
    { source: 'python', target: 'tf', label: '生态', color: '#3776AB' },
  ],
}
