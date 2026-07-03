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
          {
            id: 'marxism',
            label: '马克思主义基本原理',
            color: '#ec4899',
            src: '/pages/humanities/marxism-philosophy.html',
            content: { summary: '马克思主义基本原理。三大组成部分：马克思主义哲学、政治经济学、科学社会主义，构成严密的内在逻辑体系。', tags: ['马原', '马克思主义', '哲学', '政治经济学', '科学社会主义'] },
            children: [
              // ============ 哲学篇 ============
              {
                id: 'marxist-philosophy',
                label: '马克思主义哲学',
                color: '#db2777',
                src: '/pages/humanities/marxism-philosophy.html',
                content: { summary: '唯物论与辩证法→实践与认识→唯物史观逐层推进。从世界的物质统一性出发，揭示矛盾规律、认识到社会发展的根本动力。', tags: ['唯物论', '辩证法', '认识论', '唯物史观'] },
                children: [
                  { id: 'marxist-materialism', label: '唯物论', color: '#db2777', src: '/pages/humanities/marxism-philosophy.html#materialism' },
                  { id: 'marxist-dialectics', label: '辩证法', color: '#db2777', src: '/pages/humanities/marxism-philosophy.html#dialectics' },
                  { id: 'marxist-epistemology', label: '实践与认识', color: '#be185d', src: '/pages/humanities/marxism-philosophy.html#epistemology' },
                  { id: 'marxist-historical', label: '唯物史观', color: '#9d174d', src: '/pages/humanities/marxism-philosophy.html#historical' },
                ],
              },
              // ============ 政治经济学 ============
              {
                id: 'marxist-economics',
                label: '政治经济学',
                color: '#0891b2',
                src: '/pages/humanities/marxism-economics.html',
                content: { summary: '商品二因素→劳动二重性→价值规律→剩余价值→资本积累→垄断资本主义，逐层揭示资本主义经济制度的本质、矛盾和发展趋势。', tags: ['政治经济学', '剩余价值', 'cvm', '资本积累', '垄断'] },
                children: [
                  { id: 'marxist-commodity', label: '商品与货币', color: '#0891b2', src: '/pages/humanities/marxism-economics.html#commodity' },
                  { id: 'marxist-surplus', label: '剩余价值', color: '#0e7490', src: '/pages/humanities/marxism-economics.html#surplus' },
                  { id: 'marxist-accumulation', label: '资本积累', color: '#0d5c70', src: '/pages/humanities/marxism-economics.html#accumulation' },
                  { id: 'marxist-monopoly', label: '垄断资本主义', color: '#0e7490', src: '/pages/humanities/marxism-economics.html#monopoly' },
                ],
              },
              // ============ 科学社会主义 ============
              {
                id: 'marxist-socialism',
                label: '科学社会主义',
                color: '#7c3aed',
                src: '/pages/humanities/marxism-socialism.html',
                content: { summary: '从空想到科学→十大基本原则→社会主义实践→共产主义崇高理想。唯物史观和剩余价值学说两大发现使社会主义从空想变为科学。', tags: ['科学社会主义', '空想社会主义', '共产主义', '基本原则'] },
                children: [
                  { id: 'marxist-scientific', label: '从空想到科学', color: '#7c3aed', src: '/pages/humanities/marxism-socialism.html#scientific' },
                  { id: 'marxist-principles', label: '基本原则', color: '#6d28d9', src: '/pages/humanities/marxism-socialism.html#principles' },
                  { id: 'marxist-practice', label: '社会主义实践', color: '#6d28d9', src: '/pages/humanities/marxism-socialism.html#practice' },
                  { id: 'marxist-communism', label: '共产主义学说', color: '#6d28d9', src: '/pages/humanities/marxism-socialism.html#communism' },
                ],
              },
            ],
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
            content: { summary: '战国·鬼谷子（王诩）著 · 纵横家根本经典。共存15篇（亡佚2篇），以捭阖为核心，系统阐述游说、揣摩、决策之术，兼内功心法。', tags: ['鬼谷子', '纵横家', '阴阳开合', '揣摩权谋', '决断'] },
            children: [
              { id: 'guiguzi-baihe', label: '捭阖第一', color: '#6366f1', src: '/pages/humanities/guiguzi.html#baihe' },
              { id: 'guiguzi-fanying', label: '反应第二', color: '#6366f1', src: '/pages/humanities/guiguzi.html#fanying' },
              { id: 'guiguzi-neiqian', label: '内揵第三', color: '#6366f1', src: '/pages/humanities/guiguzi.html#neiqian' },
              { id: 'guiguzi-dixi', label: '抵巇第四', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#dixi' },
              { id: 'guiguzi-feiqian', label: '飞箝第五', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#feiqian' },
              { id: 'guiguzi-wuhe', label: '忤合第六', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#wuhe' },
              { id: 'guiguzi-chuai', label: '揣篇第七', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#chuai' },
              { id: 'guiguzi-mo', label: '摩篇第八', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#mo', content: { tags: ['十摩', '微摩探应'] } },
              { id: 'guiguzi-quan', label: '权篇第九', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#quan', content: { tags: ['权衡', '九依法则'] } },
              { id: 'guiguzi-mou', label: '谋篇第十', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#mou', content: { tags: ['三仪', '奇谋'] } },
              { id: 'guiguzi-jue', label: '决篇第十一', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#jue', content: { tags: ['决断', '利之'] } },
              { id: 'guiguzi-fuyan', label: '符言第十二', color: '#4f46e5', src: '/pages/humanities/guiguzi.html#fuyan', content: { tags: ['君主术', '循名责实'] } },
              { id: 'guiguzi-benshu', label: '本经阴符七术', color: '#3730a3', src: '/pages/humanities/guiguzi.html#benshu', content: { tags: ['内修', '盛神养志', '道术'] } },
              { id: 'guiguzi-chishu', label: '持枢', color: '#3730a3', src: '/pages/humanities/guiguzi.html#chishu', content: { tags: ['天道枢纽', '自然规律'] } },
              { id: 'guiguzi-zhongjing', label: '中经', color: '#3730a3', src: '/pages/humanities/guiguzi.html#zhongjing', content: { tags: ['制人', '控制之术'] } },
            ],
          },
        ],
      },
    ],
  },
  relations: [
    // ========== 马原 · 内部联系（哲学→政经→科社 层层推进） ==========
    // 哲学内部
    { source: 'marxist-dialectics', target: 'marxist-epistemology', label: '辩证规律贯穿认识过程', color: '#db2777' },
    { source: 'marxist-dialectics', target: 'marxist-historical', label: '辩证唯物论向社会领域延伸', color: '#db2777' },
    // 哲学→政经：方法论指导
    { source: 'marxist-dialectics', target: 'marxist-surplus', label: '矛盾分析→解剖资本主义的钥匙', color: '#db2777' },
    { source: 'marxist-epistemology', target: 'marxist-surplus', label: '实践→揭示资本主义本质规律', color: '#be185d' },
    { source: 'marxist-historical', target: 'marxist-economics', label: '社会结构分析→政治经济学起点', color: '#9d174d' },
    { source: 'marxist-historical', target: 'marxist-monopoly', label: '生产力发展→垄断阶段必然', color: '#9d174d' },
    // 政经内部
    { source: 'marxist-commodity', target: 'marxist-surplus', label: '商品二因素→剩余价值的逻辑起点', color: '#0891b2' },
    { source: 'marxist-surplus', target: 'marxist-accumulation', label: '剩余价值资本化→资本积累', color: '#0891b2' },
    { source: 'marxist-accumulation', target: 'marxist-monopoly', label: '生产集中→自由竞争走向垄断', color: '#0891b2' },
    // 政经→科社
    { source: 'marxist-surplus', target: 'marxist-socialism', label: '资本主义矛盾→社会主义必然', color: '#7c3aed' },
    { source: 'marxist-monopoly', target: 'marxist-communism', label: '垄断资本主义→共产主义终结论', color: '#7c3aed' },
    { source: 'marxist-economics', target: 'marxist-socialism', label: '经济分析→科学社会主义的物质基础', color: '#7c3aed' },
    // 唯物史观→科社
    { source: 'marxist-historical', target: 'marxist-socialism', label: '社会发展规律→科学社会主义', color: '#7c3aed' },
    // ========== 跨域连线（与其他著作的思想对话） ==========
    { source: 'marxist-dialectics', target: 'daodejing', label: '对立统一 vs 阴阳相生', color: '#8b5cf6' },
    { source: 'marxist-dialectics', target: 'guiguzi', label: '矛盾规律 vs 捭阖之道', color: '#8b5cf6' },
  ],
}
