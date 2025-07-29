import { ChessPiece, Position, PieceType, PieceColor, GameState } from '../types/chess'

// 初始化棋盘
export const initializeBoard = (): (ChessPiece | null)[][] => {
  const board: (ChessPiece | null)[][] = Array(10).fill(null).map(() => Array(9).fill(null))

  // 黑方棋子 (上方)
  const blackPieces: Array<{ type: PieceType; x: number; y: number }> = [
    { type: 'chariot', x: 0, y: 0 }, { type: 'chariot', x: 8, y: 0 },
    { type: 'horse', x: 1, y: 0 }, { type: 'horse', x: 7, y: 0 },
    { type: 'elephant', x: 2, y: 0 }, { type: 'elephant', x: 6, y: 0 },
    { type: 'advisor', x: 3, y: 0 }, { type: 'advisor', x: 5, y: 0 },
    { type: 'king', x: 4, y: 0 },
    { type: 'cannon', x: 1, y: 2 }, { type: 'cannon', x: 7, y: 2 },
    { type: 'soldier', x: 0, y: 3 }, { type: 'soldier', x: 2, y: 3 },
    { type: 'soldier', x: 4, y: 3 }, { type: 'soldier', x: 6, y: 3 },
    { type: 'soldier', x: 8, y: 3 },
  ]

  // 红方棋子 (下方)
  const redPieces: Array<{ type: PieceType; x: number; y: number }> = [
    { type: 'chariot', x: 0, y: 9 }, { type: 'chariot', x: 8, y: 9 },
    { type: 'horse', x: 1, y: 9 }, { type: 'horse', x: 7, y: 9 },
    { type: 'elephant', x: 2, y: 9 }, { type: 'elephant', x: 6, y: 9 },
    { type: 'advisor', x: 3, y: 9 }, { type: 'advisor', x: 5, y: 9 },
    { type: 'king', x: 4, y: 9 },
    { type: 'cannon', x: 1, y: 7 }, { type: 'cannon', x: 7, y: 7 },
    { type: 'soldier', x: 0, y: 6 }, { type: 'soldier', x: 2, y: 6 },
    { type: 'soldier', x: 4, y: 6 }, { type: 'soldier', x: 6, y: 6 },
    { type: 'soldier', x: 8, y: 6 },
  ]

  // 放置黑方棋子
  blackPieces.forEach(({ type, x, y }, index) => {
    board[y][x] = {
      type,
      color: 'black',
      position: { x, y },
      id: `black-${type}-${index}`
    }
  })

  // 放置红方棋子
  redPieces.forEach(({ type, x, y }, index) => {
    board[y][x] = {
      type,
      color: 'red',
      position: { x, y },
      id: `red-${type}-${index}`
    }
  })

  return board
}

// 检查位置是否在棋盘内
export const isValidPosition = (x: number, y: number): boolean => {
  return x >= 0 && x <= 8 && y >= 0 && y <= 9
}

// 检查位置是否在九宫格内
export const isInPalace = (x: number, y: number, color: PieceColor): boolean => {
  if (color === 'red') {
    return x >= 3 && x <= 5 && y >= 7 && y <= 9
  } else {
    return x >= 3 && x <= 5 && y >= 0 && y <= 2
  }
}

// 检查大象是否过河
export const isElephantCrossRiver = (x: number, y: number, color: PieceColor): boolean => {
  if (color === 'red') {
    return y < 5
  } else {
    return y > 4
  }
}

// 获取棋子可能的移动位置
export const getPossibleMoves = (
  piece: ChessPiece,
  board: (ChessPiece | null)[][]
): Position[] => {
  const moves: Position[] = []
  const { x, y } = piece.position

  switch (piece.type) {
    case 'king':
      // 帅/将：只能在九宫格内移动，每次只能移动一格
      const kingMoves = [
        { x: x + 1, y }, { x: x - 1, y },
        { x, y: y + 1 }, { x, y: y - 1 }
      ]
      kingMoves.forEach(pos => {
        if (isValidPosition(pos.x, pos.y) && isInPalace(pos.x, pos.y, piece.color)) {
          const targetPiece = board[pos.y][pos.x]
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(pos)
          }
        }
      })
      break

    case 'advisor':
      // 士：只能在九宫格内斜向移动
      const advisorMoves = [
        { x: x + 1, y: y + 1 }, { x: x + 1, y: y - 1 },
        { x: x - 1, y: y + 1 }, { x: x - 1, y: y - 1 }
      ]
      advisorMoves.forEach(pos => {
        if (isValidPosition(pos.x, pos.y) && isInPalace(pos.x, pos.y, piece.color)) {
          const targetPiece = board[pos.y][pos.x]
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(pos)
          }
        }
      })
      break

    case 'elephant':
      // 相/象：斜向移动两格，不能过河，不能被蹩脚
      const elephantMoves = [
        { x: x + 2, y: y + 2, block: { x: x + 1, y: y + 1 } },
        { x: x + 2, y: y - 2, block: { x: x + 1, y: y - 1 } },
        { x: x - 2, y: y + 2, block: { x: x - 1, y: y + 1 } },
        { x: x - 2, y: y - 2, block: { x: x - 1, y: y - 1 } }
      ]
      elephantMoves.forEach(({ x: newX, y: newY, block }) => {
        if (isValidPosition(newX, newY) && 
            !isElephantCrossRiver(newX, newY, piece.color) &&
            !board[block.y][block.x]) {
          const targetPiece = board[newY][newX]
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push({ x: newX, y: newY })
          }
        }
      })
      break

    case 'horse':
      // 马：走"日"字，不能被蹩脚
      const horseMoves = [
        { x: x + 2, y: y + 1, block: { x: x + 1, y } },
        { x: x + 2, y: y - 1, block: { x: x + 1, y } },
        { x: x - 2, y: y + 1, block: { x: x - 1, y } },
        { x: x - 2, y: y - 1, block: { x: x - 1, y } },
        { x: x + 1, y: y + 2, block: { x, y: y + 1 } },
        { x: x + 1, y: y - 2, block: { x, y: y - 1 } },
        { x: x - 1, y: y + 2, block: { x, y: y + 1 } },
        { x: x - 1, y: y - 2, block: { x, y: y - 1 } }
      ]
      horseMoves.forEach(({ x: newX, y: newY, block }) => {
        if (isValidPosition(newX, newY) && !board[block.y][block.x]) {
          const targetPiece = board[newY][newX]
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push({ x: newX, y: newY })
          }
        }
      })
      break

    case 'chariot':
      // 车：横向和纵向直线移动
      const directions = [
        { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
        { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
      ]
      directions.forEach(({ dx, dy }) => {
        for (let i = 1; i < 10; i++) {
          const newX = x + dx * i
          const newY = y + dy * i
          if (!isValidPosition(newX, newY)) break
          
          const targetPiece = board[newY][newX]
          if (targetPiece) {
            if (targetPiece.color !== piece.color) {
              moves.push({ x: newX, y: newY })
            }
            break
          } else {
            moves.push({ x: newX, y: newY })
          }
        }
      })
      break

    case 'cannon':
      // 炮：直线移动，吃子时需要跳过一个棋子
      const cannonDirections = [
        { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
        { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
      ]
      cannonDirections.forEach(({ dx, dy }) => {
        let hasJumped = false
        for (let i = 1; i < 10; i++) {
          const newX = x + dx * i
          const newY = y + dy * i
          if (!isValidPosition(newX, newY)) break
          
          const targetPiece = board[newY][newX]
          if (targetPiece) {
            if (!hasJumped) {
              hasJumped = true
            } else {
              if (targetPiece.color !== piece.color) {
                moves.push({ x: newX, y: newY })
              }
              break
            }
          } else {
            if (!hasJumped) {
              moves.push({ x: newX, y: newY })
            }
          }
        }
      })
      break

    case 'soldier':
      // 兵/卒：向前移动，过河后可以横向移动
      const isRed = piece.color === 'red'
      const forwardY = isRed ? y - 1 : y + 1
      const hasRiver = isRed ? y <= 4 : y >= 5

      // 向前移动
      if (isValidPosition(x, forwardY)) {
        const targetPiece = board[forwardY][x]
        if (!targetPiece || targetPiece.color !== piece.color) {
          moves.push({ x, y: forwardY })
        }
      }

      // 如果过河了，可以横向移动
      if (hasRiver) {
        const leftX = x - 1
        const rightX = x + 1
        
        if (isValidPosition(leftX, y)) {
          const targetPiece = board[y][leftX]
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push({ x: leftX, y })
          }
        }
        
        if (isValidPosition(rightX, y)) {
          const targetPiece = board[y][rightX]
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push({ x: rightX, y })
          }
        }
      }
      break
  }

  return moves
}

// 创建初始游戏状态
export const createInitialGameState = (): GameState => {
  return {
    board: initializeBoard(),
    currentPlayer: 'red',
    selectedPiece: null,
    possibleMoves: [],
    moveHistory: [],
    gameStatus: 'playing'
  }
}