import { ColumnType } from 'src/types/column.type'

export const generatePlaceholderCard = (column: ColumnType) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    title: 'Placeholder card',
    cover: null,
    description: null,
    FE_placeHolderCard: true
  }
}
