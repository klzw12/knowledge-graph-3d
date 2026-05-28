/**
 * 💻 计算机科学
 * 
 * 合并 AI + 语言与框架
 */

import ai from './computer/ai.js'
import languages from './computer/languages.js'

const subs = [ai, languages]

export default {
  root: {
    id: 'computer',
    label: '计算机科学',
    color: '#4d96ff',
    description: '计算机科学与技术',
    content: { summary: '涵盖 AI、编程语言、框架等计算机领域知识。', tags: ['大类'] },
    children: subs.map(d => d.root),
  },
  relations: subs.flatMap(d => d.relations || []),
}
