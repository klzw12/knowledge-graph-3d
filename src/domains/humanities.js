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
          {
            id: 'murphy',
            label: '墨菲定律',
            color: '#0891b2',
            src: '/pages/humanities/murphy.html',
            content: { summary: '阿瑟·布洛赫 提出 · 弘丰/编。心理学与职场法则经典，4章34节。涵盖墨菲定律、因果定律、零和游戏定律、鸟笼效应等，揭示工作与生活中的隐性规律。', tags: ['墨菲定律', '心理学'] },
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
        ],
      },
      {
        id: 'strategy',
        label: '兵法与谋略',
        color: '#dc2626',
        description: '兵家经典与战略智慧',
        children: [
          {
            id: 'sunzi',
            label: '孙子兵法',
            color: '#dc2626',
            src: '/pages/humanities/sunzi.html',
            content: { summary: '孙武 著 · 兵家根本经典。13篇，以"计"为首，系统阐述战争规律与战略智慧。', tags: ['孙子兵法', '孙武', '兵家'] },
            children: [
              { id: 'sunzi-shiji', label: '计篇', color: '#dc2626', src: '/pages/humanities/sunzi.html#shiji' },
              { id: 'sunzi-zuozhan', label: '作战篇', color: '#dc2626', src: '/pages/humanities/sunzi.html#zuozhan' },
              { id: 'sunzi-mougong', label: '谋攻篇', color: '#dc2626', src: '/pages/humanities/sunzi.html#mougong' },
              { id: 'sunzi-xing', label: '形篇', color: '#dc2626', src: '/pages/humanities/sunzi.html#xing' },
              { id: 'sunzi-shi', label: '势篇', color: '#dc2626', src: '/pages/humanities/sunzi.html#shi' },
              { id: 'sunzi-xushi', label: '虚实篇', color: '#dc2626', src: '/pages/humanities/sunzi.html#xushi' },
              { id: 'sunzi-junzheng', label: '军争篇', color: '#b91c1c', src: '/pages/humanities/sunzi.html#junzheng' },
              { id: 'sunzi-jiubian', label: '九变篇', color: '#b91c1c', src: '/pages/humanities/sunzi.html#jiubian' },
              { id: 'sunzi-xingjun', label: '行军篇', color: '#b91c1c', src: '/pages/humanities/sunzi.html#xingjun' },
              { id: 'sunzi-dixing', label: '地形篇', color: '#991b1b', src: '/pages/humanities/sunzi.html#dixing' },
              { id: 'sunzi-jiudi', label: '九地篇', color: '#991b1b', src: '/pages/humanities/sunzi.html#jiudi' },
              { id: 'sunzi-huogong', label: '火攻篇', color: '#7f1d1d', src: '/pages/humanities/sunzi.html#huogong' },
              { id: 'sunzi-yongjian', label: '用间篇', color: '#7f1d1d', src: '/pages/humanities/sunzi.html#yongjian' },
            ],
          },
          {
            id: '36ji',
            label: '三十六计',
            color: '#059669',
            src: '/pages/humanities/36ji.html',
            content: { summary: '檀道济（传）著 · 兵家谋略经典。6套36计，每计含解语、按语、战例。以"走为上策"收尾，体系自胜战至败战。', tags: ['三十六计', '兵家', '谋略'] },
            children: [
              { id: '36ji-shengzhan', label: '胜战计', color: '#059669', src: '/pages/humanities/36ji.html#shengzhan' },
              { id: '36ji-dizhan', label: '敌战计', color: '#047857', src: '/pages/humanities/36ji.html#dizhan' },
              { id: '36ji-gongzhan', label: '攻战计', color: '#047857', src: '/pages/humanities/36ji.html#gongzhan' },
              { id: '36ji-hunzhan', label: '混战计', color: '#065f46', src: '/pages/humanities/36ji.html#hunzhan' },
              { id: '36ji-bingzhan', label: '并战计', color: '#065f46', src: '/pages/humanities/36ji.html#bingzhan' },
              { id: '36ji-baizhan', label: '败战计', color: '#064e3b', src: '/pages/humanities/36ji.html#baizhan' },
            ],
          },
          {
            id: 'guiguzi',
            label: '鬼谷子',
            color: '#6366f1',
            src: '/pages/humanities/guiguzi.html',
            content: { summary: '战国·鬼谷子（王诩）著 · 纵横家根本经典。共存15篇（亡佚2篇），以捭阖为核心，系统阐述游说、揣摩、决策之术，兼内功心法。', tags: ['鬼谷子', '纵横家'] },
            children: [
              { id: 'guiguzi-baihe', label: '捭阖第一', color: '#6366f1', src: '/pages/humanities/guiguzi.html#baihe' },
              { id: 'guiguzi-fanying', label: '反应第二', color: '#6366f1', src: '/pages/humanities/guiguzi.html#fanying' },
              { id: 'guiguzi-neiqian', label: '内揵第三', color: '#6366f1', src: '/pages/humanities/guiguzi.html#neiqian' },
              { id: 'guiguzi-dixi', label: '抵巇第四', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#dixi' },
              { id: 'guiguzi-feiqian', label: '飞箝第五', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#feiqian' },
              { id: 'guiguzi-wuhe', label: '忤合第六', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#wuhe' },
              { id: 'guiguzi-chuai', label: '揣篇第七', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#chuai' },
            ],
          },
        ],
      },
    ],
  },
  relations: [],
}
