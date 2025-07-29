import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Play, FileText, Star, Users, Trophy } from 'lucide-react'

const Home: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: '系统教学',
      description: '从基础规则到高级战术，循序渐进的学习体系',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Play,
      title: '互动练习',
      description: '实时对弈练习，巩固所学知识',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FileText,
      title: '规则详解',
      description: '详细的象棋规则说明和走法图解',
      color: 'from-purple-500 to-violet-500'
    }
  ]

  const stats = [
    { icon: Users, label: '学习用户', value: '10,000+' },
    { icon: Trophy, label: '完成课程', value: '5,000+' },
    { icon: Star, label: '用户评分', value: '4.9/5' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6">
            <div className="text-6xl font-bold text-white">象</div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          中国象棋教学
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
        >
          从零开始学习中国象棋，掌握千年智慧的精髓
          <br />
          专业的教学体系，让你快速成为象棋高手
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/tutorial">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            >
              开始学习
            </motion.button>
          </Link>
          <Link to="/practice">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full border-2 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-200"
            >
              立即练习
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            为什么选择我们？
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="w-12 h-12 text-white mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="py-20 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            准备好开始你的象棋之旅了吗？
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            加入我们的学习社区，与千万棋友一起探索象棋的奥秘
          </p>
          <Link to="/tutorial">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              立即开始学习
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default Home