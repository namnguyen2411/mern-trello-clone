import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import boardAPI from 'src/apis/board.api'
import { BoardType } from 'src/types/board.type'

type CreateNewBoardFormType = {
  title: string
  type: BoardType['type']
}

const useCreateNewBoard = (
  userId: string,
  createNewBoardForm: CreateNewBoardFormType,
  handleCloseCreateNewBoard: () => void
) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createNewBoardMutation = useMutation({
    mutationFn: boardAPI.createNewBoard,
    onSuccess: (data) => {
      queryClient.setQueryData(['boards', 'userId', userId], (oldData: BoardType[]) => {
        if (!oldData) return oldData
        return [...oldData, data]
      })
      handleCloseCreateNewBoard()
      navigate(`/b/${data._id}/${data.slug}`, {
        state: {
          from: 'create-new-board'
        }
      })
    }
  })

  const handleSubmitCreateNewForm = () => {
    createNewBoardMutation.mutate({
      title: createNewBoardForm.title,
      type: createNewBoardForm.type,
      ownerId: userId
    })
  }

  return {
    handleSubmitCreateNewForm
  }
}

export default useCreateNewBoard
