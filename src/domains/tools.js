/**
 * 📂 工具与语言
 */
export default {
  root: {
    id: 'tools',
    label: '工具与语言',
    color: '#888899',
    description: 'AI 领域的编程语言和框架',
    children: [
      { id: 'python', label: 'Python', color: '#3776AB', description: 'AI 第一语言' },
      { id: 'pytorch', label: 'PyTorch', color: '#EE4C2C' },
      { id: 'tf', label: 'TensorFlow', color: '#FF6F00' },
    ],
  },
  relations: [
    { source: 'python', target: 'ml', label: '语言', color: '#3776AB' },
    { source: 'python', target: 'dl', label: '语言', color: '#3776AB' },
    { source: 'pytorch', target: 'dl', label: '框架', color: '#EE4C2C' },
    { source: 'tf', target: 'dl', label: '框架', color: '#FF6F00' },
    { source: 'python', target: 'pytorch', label: '生态', color: '#3776AB' },
    { source: 'python', target: 'tf', label: '生态', color: '#3776AB' },
  ],
}
