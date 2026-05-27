/**
 * 📂 强化学习 (RL)
 */
export default {
  root: {
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
  relations: [],
}
