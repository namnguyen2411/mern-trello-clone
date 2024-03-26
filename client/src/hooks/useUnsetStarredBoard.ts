import { useMutation, useQueryClient } from '@tanstack/react-query'
import boardAPI from 'src/apis/board.api'
import { BoardType } from 'src/types/board.type'

const useUnsetStarredBoard = (userId: string) => {
  const queryClient = useQueryClient()
  const unsetStarredBoardMutation = useMutation({
    mutationFn: boardAPI.updateBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(['boards', 'userId', userId], (oldData: BoardType[]) => {
        if (!oldData) return oldData
        return oldData.map((board) => {
          if (board._id === data._id) return data
          return board
        })
      })
    }
  })

  const handleUnsetStarredBoard = (_id: BoardType['_id']) => {
    unsetStarredBoardMutation.mutate({
      _id,
      starred: false,
      starredAt: Date.now()
    })
  }

  return {
    handleUnsetStarredBoard
  }
}

export default useUnsetStarredBoard
