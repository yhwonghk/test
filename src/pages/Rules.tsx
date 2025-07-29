import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react'

const Rules: React.FC = () => {
  const rulesSections = [
    {
      title: '基本规则',
      icon: Info,
      color: 'from-blue-500 to-cyan-500',
      content: [
        {
          subtitle: '游戏目标',
          items: [
            '将死对方的帅或将',
            '使对方无法应将',
            '对方认输或超时'
          ]
        },
        {
          subtitle: '基本概念',
          items: [
            '红方先行，黑方后行',
            '轮流走棋，每次走一步',
            '棋子放在交叉点上，不是格子里',
            '吃子：移动到对方棋子的位置'
          ]
        }
      ]
    },
    {
      title: '特殊规则',
      icon: AlertCircle,
      color: 'from-orange-500 to-red-500',
      content: [
        {
          subtitle: '将军规则',
          items: [
            '直接攻击对方帅将称为"将军"',
            '被将军的一方必须立即应将',
            '应将方法：移动帅将、用子阻挡、吃掉攻击子',
            '无法应将即为"将死"，游戏结束'
          ]
        },
        {
          subtitle: '照面规则',
          items: [
            '帅和将不能在同一直线上直接对面',
            '中间没有其他棋子阻挡时不能照面',
            '违反此规则的走法无效'
          ]
        },
        {
          subtitle: '困毙规则',
          items: [
            '虽未被将军，但无任何合法走法',
            '此时为"困毙"，判负'
          ]
        }
      ]
    },
    {
      title: '胜负判定',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      content: [
        {
          subtitle: '获胜条件',
          items: [
            '将死对方帅将',
            '对方认输',
            '对方超时（如有时间限制）',
            '对方违规被判负'
          ]
        },
        {
          subtitle: '平局条件',
          items: [
            '双方同意和棋',
            '长将不变（连续将军循环）',
            '长捉不变（连续捉子循环）',
            '双方都无法取胜的残局'
          ]
        }
      ]
    },
    {
      title: '禁止着法',
      icon: XCircle,
      color: 'from-red-500 to-pink-500',
      content: [
        {
          subtitle: '无效走法',
          items: [
            '不符合棋子走法规则的移动',
            '移动后使自己的帅将被将军',
            '帅将照面的走法',
            '越出棋盘边界的走法'
          ]
        },
        {
          subtitle: '禁止循环',
          items: [
            '长将：连续将军超过三次',
            '长捉：连续捉同一子超过三次',
            '一将一杀：交替将军和杀棋',
            '其他重复局面超过三次'
          ]
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">象棋规则</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            详细了解中国象棋的完整规则，包括基本走法、特殊规则和胜负判定
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {rulesSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} mr-4`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.content.map((subsection, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {subsection.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: sectionIndex * 0.2 + index * 0.1 + itemIndex * 0.05, 
                            duration: 0.4 
                          }}
                          className="flex items-start text-white/80"
                        >
                          <div className="w-2 h-2 bg-white/40 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 补充说明 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Info className="w-6 h-6 mr-3 text-blue-400" />
            重要提示
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">学习建议</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                  先熟悉各棋子的基本走法
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                  理解将军和应将的概念
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                  多练习实战对局
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-1 mr-2 flex-shrink-0" />
                  学习基本的杀法和战术
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">常见错误</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 mr-2 flex-shrink-0" />
                  忘记应将，继续其他走法
                </li>
                <li className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 mr-2 flex-shrink-0" />
                  让自己的帅将暴露在攻击下
                </li>
                <li className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 mr-2 flex-shrink-0" />
                  不理解棋子的限制条件
                </li>
                <li className="flex items-start">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 mr-2 flex-shrink-0" />
                  过于急躁，不考虑后果
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
              记住
            </h3>
            <p className="text-white/80 leading-relaxed">
              象棋是一门深奥的艺术，需要长期的学习和练习。不要急于求成，
              先掌握基本规则和走法，然后通过大量实战来提高水平。
              每一盘棋都是学习的机会，失败也是成长的一部分。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Rules