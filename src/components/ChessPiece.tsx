import React from 'react'
import { motion } from 'framer-motion'
import { ChessPiece, PIECE_NAMES } from '../types/chess'

interface ChessPieceProps {
  piece: ChessPiece
  isSelected?: boolean
}

const ChessPieceComponent: React.FC<ChessPieceProps> = ({ piece, isSelected = false }) => {
  const pieceName = PIECE_NAMES[piece.type][piece.color]

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`chess-piece ${piece.color} ${isSelected ? 'selected' : ''} w-12 h-12`}
    >
      <span className="select-none font-bold text-lg">
        {pieceName}
      </span>
    </motion.div>
  )
}

export default ChessPieceComponent