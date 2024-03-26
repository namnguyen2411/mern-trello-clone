import { useMutation, useQueryClient } from '@tanstack/react-query'
import boardAPI from 'src/apis/board.api'
import { BoardType } from 'src/types/board.type'

const useSetStarredBoard = (userId: string) => {
  const queryClient = useQueryClient()
  const setStarredBoardMutation = useMutation({
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

  const handleSetStarredBoard = (_id: BoardType['_id']) => {
    setStarredBoardMutation.mutate({
      _id,
      starred: true,
      starredAt: Date.now()
    })
  }

  return {
    handleSetStarredBoard
  }
}

export default useSetStarredBoard
