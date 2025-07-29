export type PieceType = 'king' | 'advisor' | 'elephant' | 'horse' | 'chariot' | 'cannon' | 'soldier'
export type PieceColor = 'red' | 'black'

export interface ChessPiece {
  type: PieceType
  color: PieceColor
  position: Position
  id: string
}

export interface Position {
  x: number
  y: number
}

export interface Move {
  from: Position
  to: Position
  piece: ChessPiece
  capturedPiece?: ChessPiece
}

export interface GameState {
  board: (ChessPiece | null)[][]
  currentPlayer: PieceColor
  selectedPiece: ChessPiece | null
  possibleMoves: Position[]
  moveHistory: Move[]
  gameStatus: 'playing' | 'checkmate' | 'draw'
}

export const PIECE_NAMES: Record<PieceType, { red: string; black: string }> = {
  king: { red: '帅', black: '将' },
  advisor: { red: '仕', black: '士' },
  elephant: { red: '相', black: '象' },
  horse: { red: '马', black: '马' },
  chariot: { red: '车', black: '车' },
  cannon: { red: '炮', black: '砲' },
  soldier: { red: '兵', black: '卒' }
}