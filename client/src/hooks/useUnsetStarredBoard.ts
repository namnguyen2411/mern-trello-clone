import { useMutation, useQueryClient } from '@tanstack/react-query'
import boardAPI from 'src/apis/board.api'
import { BoardType } from 'src/types/board.type'
import { UserType } from 'src/types/user.type'

const useUnsetStarredBoard = (user: UserType) => {
  const queryClient = useQueryClient()
  const unsetStarredBoardMutation = useMutation({
    mutationFn: boardAPI.updateBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(['boards', 'userId', user._id], (oldData: BoardType[]) => {
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
