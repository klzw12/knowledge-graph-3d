/**
 * 💻 计算机科学
 *
 * AI 领域 + 数据结构与算法 + 语言与框架
 */

import ai from './computer/ai.js'
import dsa from './computer/dsa.js'
import languages from './computer/languages.js'

const subs = [ai, dsa, languages]

export default {
  root: {
    id: 'computer',
    label: '计算机科学',
    color: '#4d96ff',
    description: '计算机科学与技术',
    content: { summary: '涵盖 AI、数据结构与算法、编程语言与框架等计算机领域知识。', tags: ['大类'] },
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
