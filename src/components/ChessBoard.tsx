import React from 'react'
import { motion } from 'framer-motion'
import { ChessPiece, Position, GameState } from '../types/chess'
import ChessPieceComponent from './ChessPiece'

interface ChessBoardProps {
  gameState: GameState
  onSquareClick: (position: Position) => void
  showCoordinates?: boolean
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  gameState, 
  onSquareClick, 
  showCoordinates = false 
}) => {
  const { board, selectedPiece, possibleMoves } = gameState

  const isValidMove = (position: Position): boolean => {
    return possibleMoves.some(move => move.x === position.x && move.y === position.y)
  }

  const isSelected = (position: Position): boolean => {
    return selectedPiece?.position.x === position.x && selectedPiece?.position.y === position.y
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-chess-board p-6 rounded-lg shadow-2xl border-4 border-chess-line"
      >
        {/* 棋盘背景线条 */}
        <div className="relative">
          <svg 
            width="640" 
            height="720" 
            className="absolute inset-0"
            style={{ zIndex: 1 }}
          >
            {/* 横线 */}
            {Array.from({ length: 10 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1="40"
                y1={40 + i * 80}
                x2="600"
                y2={40 + i * 80}
                stroke="#8B4513"
                strokeWidth="2"
              />
            ))}
            {/* 竖线 */}
            {Array.from({ length: 9 }, (_, i) => (
              <g key={`v-${i}`}>
                <line
                  x1={40 + i * 80}
                  y1="40"
                  x2={40 + i * 80}
                  y2="360"
                  stroke="#8B4513"
                  strokeWidth="2"
                />
                <line
                  x1={40 + i * 80}
                  y1="440"
                  x2={40 + i * 80}
                  y2="680"
                  stroke="#8B4513"
                  strokeWidth="2"
                />
              </g>
            ))}
            {/* 九宫格对角线 */}
            <line x1="280" y1="40" x2="360" y2="120" stroke="#8B4513" strokeWidth="2" />
            <line x1="360" y1="40" x2="280" y2="120" stroke="#8B4513" strokeWidth="2" />
            <line x1="280" y1="600" x2="360" y2="680" stroke="#8B4513" strokeWidth="2" />
            <line x1="360" y1="600" x2="280" y2="680" stroke="#8B4513" strokeWidth="2" />
          </svg>

          {/* 楚河汉界 */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center space-x-8 text-chess-line font-bold text-2xl z-10">
            <span>楚河</span>
            <span>汉界</span>
          </div>

          {/* 棋盘格子 */}
          <div className="relative z-20">
            {board.map((row, y) =>
              row.map((piece, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`absolute w-16 h-16 flex items-center justify-center cursor-pointer rounded-full transition-all duration-200 ${
                    isSelected({ x, y }) 
                      ? 'bg-yellow-300/50 ring-4 ring-yellow-400' 
                      : isValidMove({ x, y })
                      ? 'bg-green-300/50 hover:bg-green-400/50'
                      : 'hover:bg-white/20'
                  }`}
                  style={{
                    left: `${8 + x * 80}px`,
                    top: `${8 + y * 80}px`,
                  }}
                  onClick={() => onSquareClick({ x, y })}
                >
                  {piece && (
                    <ChessPieceComponent
                      piece={piece}
                      isSelected={isSelected({ x, y })}
                    />
                  )}
                  {isValidMove({ x, y }) && !piece && (
                    <div className="w-4 h-4 bg-green-500 rounded-full opacity-60" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* 坐标显示 */}
          {showCoordinates && (
            <div className="absolute inset-0 pointer-events-none">
              {/* X轴坐标 */}
              {Array.from({ length: 9 }, (_, i) => (
                <div
                  key={`x-${i}`}
                  className="absolute text-xs text-chess-line font-semibold"
                  style={{
                    left: `${32 + i * 80}px`,
                    top: '10px',
                  }}
                >
                  {i + 1}
                </div>
              ))}
              {/* Y轴坐标 */}
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={`y-${i}`}
                  className="absolute text-xs text-chess-line font-semibold"
                  style={{
                    left: '10px',
                    top: `${32 + i * 80}px`,
                  }}
                >
                  {10 - i}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ChessBoard