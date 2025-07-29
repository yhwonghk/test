import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Settings, Clock, User } from 'lucide-react'
import ChessBoard from '../components/ChessBoard'
import { GameState, Position, ChessPiece } from '../types/chess'
import { createInitialGameState, getPossibleMoves } from '../utils/chessLogic'

const Practice: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState())
  const [showCoordinates, setShowCoordinates] = useState(false)

  const handleSquareClick = useCallback((position: Position) => {
    setGameState(prevState => {
      const { board, selectedPiece, currentPlayer } = prevState
      const clickedPiece = board[position.y][position.x]

      // 如果点击的是自己的棋子，选中它
      if (clickedPiece && clickedPiece.color === currentPlayer) {
        const possibleMoves = getPossibleMoves(clickedPiece, board)
        return {
          ...prevState,
          selectedPiece: clickedPiece,
          possibleMoves
        }
      }

      // 如果已经选中了棋子，尝试移动
      if (selectedPiece) {
        const isValidMove = prevState.possibleMoves.some(
          move => move.x === position.x && move.y === position.y
        )

        if (isValidMove) {
          // 执行移动
          const newBoard = board.map(row => [...row])
          const capturedPiece = newBoard[position.y][position.x]
          
          // 移动棋子
          newBoard[selectedPiece.position.y][selectedPiece.position.x] = null
          newBoard[position.y][position.x] = {
            ...selectedPiece,
            position
          }

          // 记录移动
          const move = {
            from: selectedPiece.position,
            to: position,
            piece: selectedPiece,
            capturedPiece: capturedPiece || undefined
          }

          return {
            ...prevState,
            board: newBoard,
            selectedPiece: null,
            possibleMoves: [],
            currentPlayer: currentPlayer === 'red' ? 'black' : 'red',
            moveHistory: [...prevState.moveHistory, move]
          }
        } else {
          // 取消选择
          return {
            ...prevState,
            selectedPiece: null,
            possibleMoves: []
          }
        }
      }

      return prevState
    })
  }, [])

  const resetGame = () => {
    setGameState(createInitialGameState())
  }

  const undoMove = () => {
    setGameState(prevState => {
      if (prevState.moveHistory.length === 0) return prevState

      const lastMove = prevState.moveHistory[prevState.moveHistory.length - 1]
      const newBoard = prevState.board.map(row => [...row])

      // 恢复移动
      newBoard[lastMove.from.y][lastMove.from.x] = {
        ...lastMove.piece,
        position: lastMove.from
      }
      newBoard[lastMove.to.y][lastMove.to.x] = lastMove.capturedPiece || null

      return {
        ...prevState,
        board: newBoard,
        selectedPiece: null,
        possibleMoves: [],
        currentPlayer: prevState.currentPlayer === 'red' ? 'black' : 'red',
        moveHistory: prevState.moveHistory.slice(0, -1)
      }
    })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">象棋练习</h1>
          <p className="text-white/80 text-lg">
            在这里练习你的象棋技巧，熟悉棋子的走法
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 游戏控制面板 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-80 w-full"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                游戏状态
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">当前玩家:</span>
                  <span className={`font-bold ${
                    gameState.currentPlayer === 'red' ? 'text-red-400' : 'text-gray-300'
                  }`}>
                    {gameState.currentPlayer === 'red' ? '红方' : '黑方'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/70">移动次数:</span>
                  <span className="text-white font-semibold">
                    {gameState.moveHistory.length}
                  </span>
                </div>

                {gameState.selectedPiece && (
                  <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <div className="text-yellow-200 text-sm">
                      已选中: {gameState.selectedPiece.color === 'red' ? '红' : '黑'}
                      {gameState.selectedPiece.type === 'king' ? (gameState.selectedPiece.color === 'red' ? '帅' : '将') :
                       gameState.selectedPiece.type === 'advisor' ? (gameState.selectedPiece.color === 'red' ? '仕' : '士') :
                       gameState.selectedPiece.type === 'elephant' ? (gameState.selectedPiece.color === 'red' ? '相' : '象') :
                       gameState.selectedPiece.type === 'horse' ? '马' :
                       gameState.selectedPiece.type === 'chariot' ? '车' :
                       gameState.selectedPiece.type === 'cannon' ? (gameState.selectedPiece.color === 'red' ? '炮' : '砲') :
                       gameState.selectedPiece.color === 'red' ? '兵' : '卒'}
                    </div>
                    <div className="text-yellow-200/70 text-xs mt-1">
                      可移动到 {gameState.possibleMoves.length} 个位置
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                游戏控制
              </h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetGame}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  重新开始
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={undoMove}
                  disabled={gameState.moveHistory.length === 0}
                  className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  悔棋
                </motion.button>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-white/70">显示坐标</span>
                  <button
                    onClick={() => setShowCoordinates(!showCoordinates)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showCoordinates ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showCoordinates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 移动历史 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">移动历史</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {gameState.moveHistory.length === 0 ? (
                  <p className="text-white/50 text-sm">暂无移动记录</p>
                ) : (
                  gameState.moveHistory.slice(-5).map((move, index) => (
                    <div key={index} className="text-sm text-white/70 p-2 bg-white/5 rounded">
                      第{gameState.moveHistory.length - 4 + index}步: 
                      {move.piece.color === 'red' ? '红' : '黑'}
                      {move.piece.type === 'king' ? (move.piece.color === 'red' ? '帅' : '将') :
                       move.piece.type === 'advisor' ? (move.piece.color === 'red' ? '仕' : '士') :
                       move.piece.type === 'elephant' ? (move.piece.color === 'red' ? '相' : '象') :
                       move.piece.type === 'horse' ? '马' :
                       move.piece.type === 'chariot' ? '车' :
                       move.piece.type === 'cannon' ? (move.piece.color === 'red' ? '炮' : '砲') :
                       move.piece.color === 'red' ? '兵' : '卒'} 
                      ({move.from.x + 1},{10 - move.from.y}) → ({move.to.x + 1},{10 - move.to.y})
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* 棋盘 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <ChessBoard
              gameState={gameState}
              onSquareClick={handleSquareClick}
              showCoordinates={showCoordinates}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Practice