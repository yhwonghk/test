import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BookOpen, Target, Zap, Crown, Shield, Swords } from 'lucide-react'

interface TutorialSection {
  id: string
  title: string
  icon: React.ComponentType<any>
  description: string
  content: React.ReactNode
  color: string
}

const Tutorial: React.FC = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const tutorialSections: TutorialSection[] = [
    {
      id: 'basics',
      title: '基础知识',
      icon: BookOpen,
      description: '了解象棋的基本概念和棋盘布局',
      color: 'from-blue-500 to-cyan-500',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">象棋基础知识</h3>
          
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-semibold text-white mb-3">棋盘介绍</h4>
            <p className="text-white/80 mb-4">
              中国象棋棋盘由9条直线和10条横线交叉组成，共有90个交叉点。
              棋子就放置在这些交叉点上。棋盘中间的空白地带称为"河界"，
              上面写着"楚河汉界"。
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              <li>棋盘共有90个交叉点</li>
              <li>9条竖线，10条横线</li>
              <li>中间有"楚河汉界"分隔</li>
              <li>两端各有一个"九宫格"</li>
            </ul>
          </div>

          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-semibold text-white mb-3">棋子介绍</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-red-400 mb-2">红方棋子</h5>
                <ul className="text-white/70 space-y-1">
                  <li>帅（1个）- 统帅全军</li>
                  <li>仕（2个）- 保护帅</li>
                  <li>相（2个）- 防守要员</li>
                  <li>马（2个）- 机动部队</li>
                  <li>车（2个）- 攻击主力</li>
                  <li>炮（2个）- 远程火力</li>
                  <li>兵（5个）- 前锋部队</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-300 mb-2">黑方棋子</h5>
                <ul className="text-white/70 space-y-1">
                  <li>将（1个）- 统帅全军</li>
                  <li>士（2个）- 保护将</li>
                  <li>象（2个）- 防守要员</li>
                  <li>马（2个）- 机动部队</li>
                  <li>车（2个）- 攻击主力</li>
                  <li>砲（2个）- 远程火力</li>
                  <li>卒（5个）- 前锋部队</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'moves',
      title: '走法规则',
      icon: Target,
      description: '学习每个棋子的具体走法',
      color: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">棋子走法详解</h3>
          
          <div className="grid gap-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                帅/将的走法
              </h4>
              <p className="text-white/80 mb-3">
                帅和将是象棋中最重要的棋子，它们的走法完全相同：
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>只能在九宫格内移动</li>
                <li>每次只能走一格</li>
                <li>可以横走、竖走，不能斜走</li>
                <li>不能离开九宫格范围</li>
                <li>帅和将不能在同一条直线上直接对面（照面）</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                仕/士的走法
              </h4>
              <p className="text-white/80 mb-3">
                仕和士是保护帅将的重要棋子：
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>只能在九宫格内移动</li>
                <li>每次只能斜走一格</li>
                <li>走法形成"田"字的对角线</li>
                <li>主要用于防守，保护帅将</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">相/象的走法</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>每次走两格对角线（田字格的对角）</li>
                <li>不能过河（不能越过楚河汉界）</li>
                <li>走法会被"蹩脚"：如果田字中心有棋子，则不能走</li>
                <li>主要用于防守本方阵地</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">马的走法</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>走"日"字：先走一格直线，再走一格对角线</li>
                <li>会被"蹩马腿"：如果第一格有棋子，则不能走</li>
                <li>攻防兼备，机动性强</li>
                <li>可以越过其他棋子（除了蹩腿的情况）</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
                <Swords className="w-5 h-5 mr-2 text-red-400" />
                车的走法
              </h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>可以横走或竖走任意格数</li>
                <li>不能斜走</li>
                <li>路径上不能有其他棋子阻挡</li>
                <li>攻击力最强的棋子之一</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">炮的走法</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>移动时与车相同：横走或竖走任意格数</li>
                <li>吃子时必须跳过一个棋子（炮架）</li>
                <li>不吃子时路径必须畅通</li>
                <li>远程攻击能力强</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">兵/卒的走法</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>过河前：只能向前走一格</li>
                <li>过河后：可以向前、向左、向右走一格</li>
                <li>永远不能后退</li>
                <li>数量多，是重要的攻击力量</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tactics',
      title: '基础战术',
      icon: Zap,
      description: '掌握常用的象棋战术和技巧',
      color: 'from-purple-500 to-violet-500',
      content: (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">象棋基础战术</h3>
          
          <div className="grid gap-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">将军和应将</h4>
              <p className="text-white/80 mb-3">
                将军是象棋中的重要概念，指直接威胁对方帅将的着法。
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li><strong>将军：</strong>直接攻击对方的帅或将</li>
                <li><strong>应将：</strong>被将军后必须立即解除威胁</li>
                <li><strong>应将方法：</strong>移动帅将、阻挡攻击、吃掉攻击棋子</li>
                <li><strong>绝杀：</strong>无法应将的局面，游戏结束</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">常见杀法</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-white mb-2">白脸将</h5>
                  <p className="text-white/70">用车或炮在帅将面前将军，对方无法应将。</p>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">闷宫杀</h5>
                  <p className="text-white/70">利用对方自己的棋子阻挡帅将的退路。</p>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">双车错</h5>
                  <p className="text-white/70">两车配合，轮流将军，形成连续攻击。</p>
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">马后炮</h5>
                  <p className="text-white/70">马和炮配合，马控制关键位置，炮负责将军。</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">开局原则</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>先出子，后出车</li>
                <li>马炮并进，控制中路</li>
                <li>不要过早出动大子</li>
                <li>注意子力协调配合</li>
                <li>控制要点，争夺主动权</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">中局战术</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li><strong>牵制：</strong>限制对方重要棋子的活动</li>
                <li><strong>闪击：</strong>移开一子，露出后面子力的攻击</li>
                <li><strong>引离：</strong>引开对方的防守棋子</li>
                <li><strong>堵塞：</strong>阻断对方子力的联系</li>
                <li><strong>献祭：</strong>牺牲小子换取更大优势</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-3">残局要点</h4>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>帅将要主动出击</li>
                <li>兵卒的作用增大</li>
                <li>子力要相互配合</li>
                <li>计算要精确到底</li>
                <li>寻找对方弱点</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ]

  const activeContent = tutorialSections.find(section => section.id === activeSection)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">象棋教学</h1>
          <p className="text-white/80 text-lg">
            系统学习象棋知识，从入门到精通
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧导航 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-80 w-full"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">学习目录</h3>
              <div className="space-y-3">
                {tutorialSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-white/20 border border-white/30'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color} mr-3`}>
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{section.title}</h4>
                        <p className="text-sm text-white/60 mt-1">{section.description}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-white/40 transition-transform ${
                        activeSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右侧内容 */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              {activeContent?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial