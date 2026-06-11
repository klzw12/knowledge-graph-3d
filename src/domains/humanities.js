/**
 * 📚 人文与成长
 * 
 * 阅读过的自我提升、人文著作
 */

export default {
  root: {
    id: 'humanities',
    label: '人文与成长',
    color: '#f59e0b',
    description: '阅读与自我提升',
    src: '/pages/humanities.html',
    content: { summary: '读书、思考、成长。记录值得反复咀嚼的著作与感悟。', tags: ['人文'] },
    children: [
      {
        id: 'self-help',
        label: '自我激励',
        color: '#d97706',
        description: '励志与个人成长经典',
        children: [
          {
            id: 'sheepskin',
            label: '羊皮卷',
            color: '#b45309',
            src: '/pages/humanities/sheepskin.html',
            content: { summary: '奥格·曼狄诺 编著 · 自我激励经典。全书8篇，讲述保持心态、制定目标、坚持不懈、认识自我等人生课题。', tags: ['羊皮卷', '自我激励'] },
          },
        ],
      },
      {
        id: 'social',
        label: '社交与人际',
        color: '#0ea5e9',
        description: '人际交往与沟通技巧',
        children: [
          {
            id: 'weakness',
            label: '人性的弱点',
            color: '#0284c7',
            src: '/pages/humanities/weakness.html',
            content: { summary: '戴尔·卡耐基 著 · 人际关系经典。4章22篇，讲述如何与人相处、赢得他人好感与信任。', tags: ['人性的弱点', '卡耐基'] },
          },
        ],
      },
      {
        id: 'philosophy',
        label: '哲学与世界观',
        color: '#8b5cf6',
        description: '哲思经典与世界观塑造',
        children: [
          {
            id: 'daodejing',
            label: '道德经',
            color: '#7c3aed',
            src: '/pages/humanities/daodejing.html',
            content: { summary: '老子 著 · 道家根本经典。81章，以"道"为核心，阐述天地万物变化的根本规律与处世智慧。', tags: ['道德经', '老子', '道家'] },
          },
          {
            id: 'sunzi',
            label: '孙子兵法',
            color: '#dc2626',
            src: '/pages/humanities/sunzi.html',
            content: { summary: '孙武 著 · 兵家根本经典。13篇，以"计"为首，系统阐述战争规律与战略智慧。', tags: ['孙子兵法', '孙武', '兵家'] },
          },
        ],
      },
    ],
  },
  relations: [],
}
